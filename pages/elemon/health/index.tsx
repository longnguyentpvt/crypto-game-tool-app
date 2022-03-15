import type { NextPage } from "next";

import Head from "next/head";

import {
  Bar
} from "react-chartjs-2";

import {
  useEffect,
  useState
} from "react";
import { getPetSaleStatistics } from "../../../apis/elemon-apis";
import MainHeader from "../../../components/MainHeader";
import {
  DefaultMenu,
  RouteId
} from "../../../data/route";
import moment from "moment-timezone";

enum PET_SALE_CATEGORY {
  FOR_SALE,
  SOLD,
  CANCEL,
  VOLUME
}

const ElemonHealth : NextPage = () => {
  const [
    chartData,
    setChartData
  ] = useState<{
    labels : string[],
    datasets : any[]
  } | null>(null);
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

  useEffect(() => {
    // load pet sale statistics
    const labels : string[] = [];
    const saleMap : Record<PET_SALE_CATEGORY, number[]> = {
      [PET_SALE_CATEGORY.FOR_SALE] : [],
      [PET_SALE_CATEGORY.SOLD] : [],
      [PET_SALE_CATEGORY.CANCEL] : [],
      [PET_SALE_CATEGORY.VOLUME] : []
    }
    getPetSaleStatistics().then(statistics => {
      statistics.reverse();
      let maxPet = 0, maxVolume = 0;
      statistics.forEach(stat => {
        const {
          date,
          noForSalePets,
          noSoldPets,
          noCancelPets,
          totalVolume
        } = stat;
        labels.push(moment(date).format("DD/MM/YYYY"));
        saleMap[PET_SALE_CATEGORY.FOR_SALE].push(noForSalePets);
        saleMap[PET_SALE_CATEGORY.SOLD].push(noSoldPets);
        saleMap[PET_SALE_CATEGORY.CANCEL].push(noCancelPets);
        saleMap[PET_SALE_CATEGORY.VOLUME].push(totalVolume);

        if (noForSalePets > maxPet) maxPet = noForSalePets;
        if (noSoldPets > maxPet) maxPet = noSoldPets;
        if (noCancelPets > maxPet) maxPet = noCancelPets;
        if (totalVolume > maxVolume) maxVolume = totalVolume;
      });

      let maxPetValue = Math.round(maxPet / 100) * 100;
      if (maxPetValue < maxPet) maxPetValue += 100;
      const petStep = maxPetValue / 10;

      let maxVolumeValue = Math.round(maxVolume / 1000) * 1000;
      if (maxVolumeValue < maxVolume) maxVolumeValue += 1000;
      const volumeStep = maxVolumeValue / 10;
      setChartStep(({
        pet : petStep,
        volume : volumeStep
      }));

      const datasets =
        [
          {
            label : "No. Created Pets",
            type : "bar",
            yAxisID: "PET",
            borderColor : "rgba(42, 147, 213, 0.3)",
            backgroundColor : "rgba(42, 147, 213, 1)",
            borderWidth : 1,
            data : saleMap[PET_SALE_CATEGORY.FOR_SALE]
          },
          {
            label : "No. Sold Pets",
            type : "bar",
            yAxisID: "PET",
            borderColor : "rgba(56, 190, 72, 0.3)",
            backgroundColor : "rgba(56, 190, 72, 1)",
            borderWidth : 1,
            data : saleMap[PET_SALE_CATEGORY.SOLD]
          },
          {
            label : "No. Cancel Pets",
            type : "bar",
            yAxisID: "PET",
            borderColor : "rgba(107, 103, 103, 0.3)",
            backgroundColor : "rgb(107, 103, 103, 1)",
            borderWidth : 1,
            data : saleMap[PET_SALE_CATEGORY.CANCEL]
          },
          {
            label : "Total Volume (USD)",
            type : "line",
            yAxisID: "VOLUME",
            borderColor : "rgb(245, 108, 95)",
            backgroundColor : "transparent",
            borderWidth : 2,
            data : saleMap[PET_SALE_CATEGORY.VOLUME],
            order : -1
          }
        ];
      setChartData({
        labels,
        datasets
      });
    });
  }, []);

  let statisticChart = (
    <div
      className="h-100 text-muted"
      style={ {
        position : "absolute",
        top : "48%",
        left : "48%"
      } }>
      <h5>LOADING...</h5>
    </div>
  );

  if (!!chartData) {
    const OPTIONS = {
      layout : {
        padding : {
          left : 5,
          right : 5,
          top : 10,
          bottom : 10
        }
      },
      legend: {
        labels: {
          fontColor: "rgba(255, 255, 255, 0.7)",
        }
      },
      responsive : true,
      maintainAspectRatio : false,
      scales : {
        yAxes : [
          {
            id: 'PET',
            position: 'left',
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
            id: 'VOLUME',
            position: 'right',
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

    statisticChart = (
      <>
        <Bar
          options={ OPTIONS }
          data={ chartData } />
        <h5 className="w-100 fw-bold text-center pt-2">
          Label
        </h5>
      </>
    );
  }

  return (
    <div id="main-app">
      <Head>
        <title>Elemon Health</title>
        <meta
          name="description"
          content="Crypto Game Tool has built a NFT Market which supports useful filters and sorting for Elemon GameFi" />
        <link
          rel="icon"
          href="/assets/images/favicon.ico" />

        <link
          rel="preconnect"
          href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@300;400;500;600;700&family=Oxanium:wght@300;400;500;600;700&display=swap"
          rel="stylesheet" />

        {
          process.env.NODE_ENV === "production" ? (
            <>
              <script
                async
                src={ `https://www.googletagmanager.com/gtag/js?id=G-DS831RKYB5` } />
              <script
                dangerouslySetInnerHTML={ {
                  __html : `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);}; gtag('js', new Date()); gtag('config', 'G-DS831RKYB5');`
                } }></script>
            </>
          ) : null
        }
      </Head>

      <div id="elemon-health-app">
        <MainHeader
          activeMenu={ RouteId.ElemonHealth }
          menuList={ DefaultMenu } />

        <div className="main-app-body">
          <div className="container">
            <div className="pt-5 pb-5">
              <div className="app-body-heading text-center">
                <h1 className="h2 fw-bold">Elemon Pet Power & Upgrade Cost Calculator</h1>
                <h2 className="h5 fw-normal">
                  The calculator tool helps users to estimate the power and upgrade cost of Elemon Pet based on its
                  properties
                </h2>
              </div>
            </div>

            <div className="pet-sale-statistic-section">
              <div className="statistic-chart">
                { statisticChart }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};


export default ElemonHealth;
