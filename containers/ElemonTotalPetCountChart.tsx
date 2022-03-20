import {
  useEffect,
  useState
} from "react";
import {
  Pie
} from "react-chartjs-2";

import {
  getPetCountStatistics
} from "../apis/elemon-apis";

function ElemonTotalPetCountChart(props : React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
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

  const loadChart = async () => {
    const petCounts = await getPetCountStatistics();
    const {
      totalPet,
      noLevel1Pet,
      noLevelMaxPet,
      noBurnedPet,
    } = petCounts;
    const otherPet = totalPet - noLevel1Pet - noLevelMaxPet - noBurnedPet;

    setChartData({
      labels : ["Level 1 Pets", "Level Max Pets", "Burned Pets", "Other Pets"],
      datasets : [
        {
          backgroundColor : [
            "rgb(42, 147, 213)",
            "rgb(56, 190, 72)",
            "rgb(232, 80, 91)",
            "rgb(128, 128, 128)"
          ],
          borderColor : [
            "rgb(42, 147, 213)",
            "rgb(56, 190, 72)",
            "rgb(232, 80, 91)",
            "rgb(128, 128, 128)"
          ],
          data : [
            noLevel1Pet,
            noLevelMaxPet,
            noBurnedPet,
            otherPet
          ]
        }
      ]
    });
  };

  useEffect(() => {
    loadChart();
  }, []);

  const chartOptions = {
    legend : {
      labels : {
        fontColor : "rgba(255, 255, 255, 0.7)",
      }
    },
    responsive : true,
    maintainAspectRatio : false,
    tooltips : {
      mode : "index",
      intersect : false
    }
  };

  const {
    className,
    ...leftProps
  } = props;

  return (
    <div
      className={ `pet-count-statistic-chart d-flex${ !!className ? " " + className : "" }` }
      { ...leftProps }>
      <div
        className="py-1 flex-fill"
        style={ { minWidth : 0 } }>
        <Pie
          options={ chartOptions }
          data={ chartData } />
      </div>
    </div>
  );
}

export default ElemonTotalPetCountChart;
