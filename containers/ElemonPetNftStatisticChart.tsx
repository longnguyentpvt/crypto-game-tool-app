import {
  useEffect,
  useState
} from "react";
import {
  Pie
} from "react-chartjs-2";

import {
  getPetCountStatistics
} from "apis/elemon-apis";
import {
  ELEMON_LEVEL_RANGE
} from "types/enums";


const backgroundColors = [
  "rgb(255, 99, 132)",
  "rgb(255, 159, 64)",
  "rgb(255, 205, 86)",
  "rgb(75, 192, 192)",
  "rgb(54, 162, 235)",
  "rgb(49, 99, 176)",
  "rgb(167, 153, 215)",
  "rgb(113, 113, 117)"
];

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
    totalPets,
    setTotalPets
  ] = useState<number>(0);

  const loadChart = async () => {
    const petCounts = await getPetCountStatistics();
    const {
      totalPet,
      levelRangeSortedPetMap,
      noBurnedPet,
    } = petCounts;

    setTotalPets(totalPet);

    let lv10 = 0,
      lv20 = 0,
      lv30 = 0,
      lv40 = 0,
      lv50 = 0,
      lv60 = 0;
    let totalLevelPets = 0;
    const levelRanges = Object.keys(ELEMON_LEVEL_RANGE);
    const data = levelRanges.map(range => {
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
      const percentage = (noPet * 100 / totalPet);
      console.log(levelRange, noPet, percentage)
      switch (levelRange) {
        case ELEMON_LEVEL_RANGE.U10:
          lv10 = percentage;
          break;
        case ELEMON_LEVEL_RANGE.U20:
          lv20 = percentage;
          break;
        case ELEMON_LEVEL_RANGE.U30:
          lv30 = percentage;
          break;
        case ELEMON_LEVEL_RANGE.U40:
          lv40 = percentage;
          break;
        case ELEMON_LEVEL_RANGE.U50:
          lv50 = percentage;
          break;
        case ELEMON_LEVEL_RANGE.U60:
          lv60 = percentage;
          break;
      }
      totalLevelPets += noPet;
      return noPet;
    });
    data.push(noBurnedPet);
    const burnedPetPc = (noBurnedPet * 100 / totalPet);
    const otherPet = totalPet - totalLevelPets - noBurnedPet;
    data.push(otherPet);
    const otherPc = 100 - lv10 - lv20 - lv30 - lv40 - lv50 - lv60 - burnedPetPc;

    const labels = [
      "Level 1-10 pets (" + lv10.toFixed(1) + "%)",
      "Level 11-20 pets (" + lv20.toFixed(1) + "%)",
      "Level 21-30 pets (" + lv30.toFixed(1) + "%)",
      "Level 31-40 pets (" + lv40.toFixed(1) + "%)",
      "Level 41-50 pets (" + lv50.toFixed(1) + "%)",
      "Level 51-60 pets (" + lv60.toFixed(1) + "%)",
      "Burned pets (" + burnedPetPc.toFixed(1) + "%)",
      "Others (" + otherPc.toFixed(1) + "%)"
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
        <div className="card-title mb-3">
          <div className="h5 text-light-green">
            Elemon Pet NFT Analytics
          </div>
        </div>
        <div className="card-section-content">
          <div className="h-100">
            <Pie
              options={ ChartOptions }
              data={ chartData } />
          </div>
        </div>
        {
          !!totalPets ? (
            <div className="text-white fw-bold text-center mt-3">
              Total pets: { totalPets }
            </div>
          ) : null
        }
      </div>
    </div>
  );
}

export default ElemonPetNftStatisticChart;
