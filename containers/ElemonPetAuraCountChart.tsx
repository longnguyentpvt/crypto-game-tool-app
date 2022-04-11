import {
  useEffect,
  useState
} from "react";
import {
  Pie
} from "react-chartjs-2";

import {
  getPetAuraCount,
} from "apis/elemon-apis";
import {
  ElemonAuraInputs
} from "data/input";

const backgroundColors = [
  "rgb(250, 250, 250)",
  "rgb(84, 200, 79)",
  "rgb(54, 162, 235)",
  "rgb(241,117,239)",
  "rgb(255, 159, 64)",
  "rgb(255, 99, 132)",
  "rgb(167, 153, 215)",
  "rgb(255, 205, 86)",
  "rgb(107, 107, 107)"
];

function ElemonPetAuraCountChart() {
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
    const petCounts = await getPetAuraCount();
    if (!petCounts) return;
    delete petCounts[0];

    let total = 0;
    const auraIds = Object.keys(petCounts);
    const data : number[] = auraIds.map(id => {
      const auraId = parseInt(id);
      const count = petCounts[auraId];
      total += count
      return count;
    });

    const auraPercentageMap : Record<number, string> = {};
    auraIds.forEach(id => {
      const auraId = parseInt(id);
      auraPercentageMap[auraId] = (petCounts[auraId] * 100 / total).toFixed(1);
    })

    const labels : string[] = [];
    ElemonAuraInputs.forEach(input => {
      const {
        id,
        name
      } = input;
      const label = name + " (" + auraPercentageMap[id] + "%)";
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
            Elemon Pet Aura
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

export default ElemonPetAuraCountChart;
