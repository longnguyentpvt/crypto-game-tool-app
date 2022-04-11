import {
  useEffect,
  useState
} from "react";
import {
  Pie
} from "react-chartjs-2";

import {
  getPetRarityCount
} from "apis/elemon-apis";
import {
  ElemonRarityInputs
} from "data/input";


const backgroundColors = [
  "rgb(54, 162, 235)",
  "rgb(84, 200, 79)",
  "rgb(238, 98, 237)",
  "rgb(255, 205, 86)",
  "rgb(255, 99, 132)"
];

function ElemonPetRarityCountChart() {
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

  const loadChart = async () => {
    const petCounts = await getPetRarityCount();
    if (!petCounts) return;
    delete petCounts[0];

    let total = 0;
    const rarityIds = Object.keys(petCounts);
    const data : number[] = rarityIds.map(id => {
      const rarityId = parseInt(id);
      const count = petCounts[rarityId];
      total += count
      return count;
    });

    const rarityPercentageMap : Record<number, string> = {};
    rarityIds.forEach(id => {
      const rarityId = parseInt(id);
      rarityPercentageMap[rarityId] = (petCounts[rarityId] * 100 / total).toFixed(1);
    })

    const labels : string[] = [];
    ElemonRarityInputs.forEach(input => {
      const {
        id,
        name
      } = input;
      const label = name + " (" + rarityPercentageMap[id] + "%)";
      labels.push(label);
    });

    setChartData({
      labels,
      datasets : [
        {
          backgroundColor : backgroundColors,
          borderColor : backgroundColors,
          data
        }
      ]
    });
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
    responsive : true,
    maintainAspectRatio : false,
    tooltips : {
      mode : "index",
      intersect : false
    }
  };

  return (
    <div className="statistic-section-card nft-transaction-section-card card">
      <div className="card-body">
        <div className="card-title mb-1">
          <div className="h5 text-light-green">
            Elemon Pet Rarity
          </div>
        </div>
        <div className="card-section-content">
          <div className="h-100">
            <Pie
              options={ ChartOptions }
              data={ chartData } />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ElemonPetRarityCountChart;
