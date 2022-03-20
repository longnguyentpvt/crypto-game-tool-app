import {
  useEffect,
  useMemo,
  useState
} from "react";
import {
  Bar
} from "react-chartjs-2";
import moment from "moment-timezone";

import {
  getPetSaleStatistics
} from "../apis/elemon-apis";

enum PetSaleCategory {
  FOR_SALE,
  SOLD,
  CANCEL,
  VOLUME
}

function ElemonMarketAnalyticChart(props : React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
  const [
    chartData,
    setChartData
  ] = useState<{
    labels : string[],
    datasets : any[]
  } | null>({
    labels : [],
    datasets : []
  });
  const [
    chartSteps,
    setChartStep
  ] = useState<{
    pet : number,
    volume : number
  }>({
    pet : 100,
    volume : 4000
  });

  const loadChart = async () => {
    const labels : string[] = [];
    const saleMap : Record<PetSaleCategory, number[]> = {
      [PetSaleCategory.FOR_SALE] : [],
      [PetSaleCategory.SOLD] : [],
      [PetSaleCategory.CANCEL] : [],
      [PetSaleCategory.VOLUME] : []
    };
    let maxPet = 0,
      maxVolume = 0;

    const statistics = await getPetSaleStatistics();
    statistics.reverse();

    statistics.forEach(stat => {
      const {
        date,
        noForSalePets,
        noSoldPets,
        noCancelPets,
        totalVolume
      } = stat;
      labels.push(moment(date).tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY"));
      saleMap[PetSaleCategory.FOR_SALE].push(noForSalePets);
      saleMap[PetSaleCategory.SOLD].push(noSoldPets);
      saleMap[PetSaleCategory.CANCEL].push(noCancelPets);
      saleMap[PetSaleCategory.VOLUME].push(totalVolume);

      maxPet = Math.max(maxPet, noForSalePets, noSoldPets, noCancelPets);
      maxVolume = Math.max(maxVolume, totalVolume);
    });

    let maxPetValue = Math.round(maxPet / 100) * 100;
    if (maxPetValue < maxPet) maxPetValue += 100;
    const petStep = maxPetValue / 10;

    let maxVolumeValue = Math.round(maxVolume / 1000) * 1000;
    if (maxVolumeValue < maxVolume) maxVolumeValue += 1000;
    const volumeStep = maxVolumeValue / 10;

    setChartStep({
      pet : petStep,
      volume : volumeStep
    });

    const datasets =
      [
        {
          label : "Creating Sell Order",
          type : "bar",
          yAxisID : "PET",
          borderColor : "rgba(42, 147, 213, 0.3)",
          backgroundColor : "rgba(42, 147, 213, 1)",
          borderWidth : 1,
          data : saleMap[PetSaleCategory.FOR_SALE]
        },
        {
          label : "Purchasing",
          type : "bar",
          yAxisID : "PET",
          borderColor : "rgba(56, 190, 72, 0.3)",
          backgroundColor : "rgba(56, 190, 72, 1)",
          borderWidth : 1,
          data : saleMap[PetSaleCategory.SOLD]
        },
        {
          label : "Cancelling Order",
          type : "bar",
          yAxisID : "PET",
          borderColor : "rgba(232, 80, 91, 0.3)",
          backgroundColor : "rgb(232, 80, 91, 1)",
          borderWidth : 1,
          data : saleMap[PetSaleCategory.CANCEL]
        },
        {
          label : "Total Volume (USD)",
          type : "line",
          yAxisID : "VOLUME",
          borderColor : "rgb(255, 201, 60)",
          backgroundColor : "transparent",
          borderWidth : 2,
          data : saleMap[PetSaleCategory.VOLUME],
          order : -1
        }
      ];

    setChartData({
      labels,
      datasets
    });
  };

  useEffect(() => {
    loadChart();
  }, []);

  const chartOptions = useMemo(() => {
    return {
      layout : {
        padding : {
          left : 5,
          right : 5,
          top : 10,
          bottom : 10
        }
      },
      legend : {
        labels : {
          fontColor : "rgba(255, 255, 255, 0.7)",
        }
      },
      responsive : true,
      maintainAspectRatio : false,
      scales : {
        yAxes : [
          {
            id : 'PET',
            position : 'left',
            gridLines : {
              display : true,
              lineWidth : 1,
              color : "rgba(255, 255, 255, 0.1)",
              drawBorder : false
            },
            ticks : {
              beginAtZero : true,
              padding : 20,
              stepSize : chartSteps.pet,
              fontColor : "rgba(255, 255, 255, 0.7)"
            }
          },
          {
            id : 'VOLUME',
            position : 'right',
            gridLines : {
              display : true,
              lineWidth : 1,
              color : "rgba(255, 255, 255, 0.1)",
              drawBorder : false
            },
            ticks : {
              beginAtZero : true,
              padding : 20,
              stepSize : chartSteps.volume,
              fontColor : "rgba(255, 255, 255, 0.7)"
            }
          }
        ],
        xAxes : [
          {
            gridLines : {
              display : false
            },
            ticks : {
              fontColor : "rgba(255, 255, 255, 0.8)",
              fontSize : "14"
            }
          }
        ]
      },
      tooltips : {
        mode : "index",
        intersect : false
      }
    };
  }, [
    chartSteps
  ]);

  const {
    className,
    ...leftProps
  } = props;

  return (
    <div
      className={ `market-statistic-chart d-flex${ !!className ? " " + className : "" }` }
      { ...leftProps }>
      <div className="vertical-label inverse-label">No. Transactions</div>
      <div
        className="pt-2 flex-fill"
        style={ { minWidth : 0 } }>
        <Bar
          options={ chartOptions }
          data={ chartData } />
      </div>
      <div className="vertical-label">Total Volume (BUSD)</div>
    </div>
  );
}

export default ElemonMarketAnalyticChart;
