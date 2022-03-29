import {
  useEffect,
  useState
} from "react";
import {
  Bar
} from "react-chartjs-2";

import {
  getPetCountStatistics
} from "../apis/elemon-apis";
import {
  ELEMON_LEVEL_RANGE
} from "../types/enums";


const backgroundColors = [
  "rgb(255, 99, 132)",
  "rgb(255, 159, 64)",
  "rgb(255, 205, 86)",
  "rgb(75, 192, 192)",
  "rgb(54, 162, 235)",
  "rgb(102, 54, 235)",
  "rgb(202, 202, 202)"
];

const petLevelLabels : Record<ELEMON_LEVEL_RANGE, string> = {
  [ELEMON_LEVEL_RANGE.U10] : "Level 1-10 Pets",
  [ELEMON_LEVEL_RANGE.U20] : "Level 11-20 Pets",
  [ELEMON_LEVEL_RANGE.U30] : "Level 21-30 Pets",
  [ELEMON_LEVEL_RANGE.U40] : "Level 31-40 Pets",
  [ELEMON_LEVEL_RANGE.U50] : "Level 41-50 Pets",
  [ELEMON_LEVEL_RANGE.U60] : "Level 51-60 Pets"
}

function ElemonPetNftStatisticChart() {
  const [
    chartData,
    setChartData
  ] = useState<{
    labels : string[],
    datasets : any[]
  }>({
    labels : [],
    datasets : []
  });
  const [
    chartStep,
    setChartStep
  ] = useState<number>(1000);

  const loadChart = async () => {
    const petCounts = await getPetCountStatistics();
    const {
      levelRangeSortedPetMap,
      noBurnedPet,
    } = petCounts;

    const labels = [
      "No. pets"
    ];
    let maxPets = 0;

    const levelRanges = Object.keys(ELEMON_LEVEL_RANGE);
    const datasets = levelRanges.map((range, index) => {
      let levelRange = ELEMON_LEVEL_RANGE.U10;
      switch (range) {
        case "U10":
          levelRange = ELEMON_LEVEL_RANGE.U10;
          break;
        case "U20":
          levelRange = ELEMON_LEVEL_RANGE.U20;
          break;
        case "U30":
          levelRange = ELEMON_LEVEL_RANGE.U30;
          break;
        case "U40":
          levelRange = ELEMON_LEVEL_RANGE.U40;
          break;
        case "U50":
          levelRange = ELEMON_LEVEL_RANGE.U50;
          break;
        case "U60":
          levelRange = ELEMON_LEVEL_RANGE.U60;
          break;
      }
      const noPet = levelRangeSortedPetMap[levelRange];
      if (noPet > maxPets) {
        maxPets = noPet;
      }

      return {
          label : petLevelLabels[levelRange],
          type : "bar",
          backgroundColor : backgroundColors[index],
          borderColor : backgroundColors[index],
          borderWidth : 1,
          data : [noPet]
        };
    });
    datasets.push(
      {
        label : "Burned Pets",
        type : "bar",
        backgroundColor : backgroundColors[levelRanges.length],
        borderColor : backgroundColors[levelRanges.length],
        borderWidth : 1,
        data : [noBurnedPet]
      }
    );

    setChartData({
      labels,
      datasets
    });

    let maxValue = Math.round(maxPets / 10000) * 10000;
    if (maxValue < maxPets) maxValue += 10000;
    const step = maxValue / 10;
    setChartStep(step);
  };

  useEffect(() => {
    loadChart();
  }, []);


  const ChartOptions = {
    legend : {
      labels : {
        fontColor : "rgb(255, 255, 255, 0.8)",
      }
    },
    layout : {
      padding : {
        left : 5,
        right : 5,
        top : 10,
        bottom : 10
      }
    },
    scales : {
      yAxes : [
        {
          gridLines : {
            display : true,
            lineWidth : 1,
            color : "rgba(255, 255, 255, 0.1)",
            drawBorder : false
          },
          ticks : {
            beginAtZero : true,
            padding : 20,
            stepSize : chartStep,
            fontColor : "rgba(255, 255, 255, 0.8)",
          }
        }
      ],
      xAxes : [
        {
          gridLines : {
            display : false
          },
          ticks : {
            padding : 10,
            fontColor : "rgba(255, 255, 255, 0.8)",
          }
        }
      ]
    },
    responsive : true,
    maintainAspectRatio : false,
    tooltips : {
      enabled : false
    }
  };

  return (
    <div className="statistic-section-card nft-transaction-section-card card">
      <div className="card-body">
        <div className="card-title mb-3">
          <div className="h5 text-light-green">
            Elemon Pet NFT Analytics
          </div>
        </div>
        <div className="card-section-content">
          <div className="h-100">
            <Bar
              options={ ChartOptions }
              data={ chartData } />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ElemonPetNftStatisticChart;
