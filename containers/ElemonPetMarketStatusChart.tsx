import {
  useEffect,
  useState
} from "react";
import {
  Pie
} from "react-chartjs-2";

import {
  getPetMarketStatusCount
} from "apis/elemon-apis";


const backgroundColors = [
  "rgb(42, 147, 213)",
  "rgb(232, 80, 91)",
  "rgb(145, 226, 198)"
];

function ElemonPetMarketStatusChart() {
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
    const petCounts = await getPetMarketStatusCount();
    if (!petCounts) return;

    const {
      noSelling,
      noBurned,
      total
    } = petCounts;

    const others = total - noSelling - noBurned;
    const data = [
      noSelling,
      noBurned,
      others
    ];

    const noSellingPercentage = (noSelling * 100 / total).toFixed(1);
    const noBurnedPercentage = (noBurned * 100 / total).toFixed(1);
    const othersPercentage = (100 - parseFloat(noSellingPercentage) - parseFloat(noBurnedPercentage))
      .toFixed(1);

    const labels = [
      "No. Selling (" + noSellingPercentage + "%)",
      "No. Burned (" + noBurnedPercentage + "%)",
      "Others (" + othersPercentage + "%)",
    ];

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
            Elemon Pet Market Status
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

export default ElemonPetMarketStatusChart;
