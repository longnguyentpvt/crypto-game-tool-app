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

const ChartOptions = {
  legend : {
    labels : {
      fontColor : "rgba(255, 255, 255, 0.7)",
    }
  },
  responsive : true,
  maintainAspectRatio : false,
  tooltips : {
    enabled : false
  }
};

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

  const loadChart = async () => {
    const petCounts = await getPetCountStatistics();
    const {
      totalPet,
      noLevel1Pet,
      noLevelMaxPet,
      noBurnedPet,
    } = petCounts;
    const otherPet = totalPet - noLevel1Pet - noLevelMaxPet - noBurnedPet;

    const labels = [
      "Level 1: " + noLevel1Pet,
      "Max Level: " + noLevelMaxPet,
      "No. Burned: " + noBurnedPet,
      "Other Pets: " + otherPet
    ];

    setChartData({
      labels,
      datasets : [
        {
          backgroundColor : [
            "rgba(56, 190, 72, 0.8)",
            "rgba(255, 201, 60, 0.8)",
            "rgba(232, 80, 91, 0.8)",
            "rgba(42, 147, 213, 0.8)"
          ],
          borderColor : [
            "rgba(56, 190, 72, 1)",
            "rgba(255, 201, 60, 1)",
            "rgba(232, 80, 91, 1)",
            "rgba(42, 147, 213, 1)"
          ],
          data : [noLevel1Pet, noLevelMaxPet, noBurnedPet, otherPet]
        }
      ]
    });
  };

  useEffect(() => {
    loadChart();
  }, []);

  return (
    <div className="statistic-section-card nft-transaction-section-card card">
      <div className="card-body">
        <div className="card-title mb-3">
          <div className="h5 text-light-green">
            Elemon Pet NFT Analtyics
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

export default ElemonPetNftStatisticChart;
