import type { NextPage } from "next";
import Head from "next/head";

import MainHeader from "../../../components/MainHeader";

import ElemonMarketAnalyticChart from "../../../containers/ElemonMarketAnalyticChart";

import {
  DefaultMenu,
  RouteId
} from "../../../data/route";
import ElemonOpeningBoxStatisticChart from "../../../containers/ElemonOpeningBoxStatisticChart";
import ElemonCombiningStatisticChart from "../../../containers/ElemonCombiningStatisticChart";
import ElemonPetNftStatisticChart from "../../../containers/ElemonPetNftStatisticChart";
import ElemonTopPowerNftStatisticChart from "../../../containers/ElemonTopPowerNftStatisticChart";
import ElemonTopSpeedNftStatisticChart from "../../../containers/ElemonTopSpeedNftStatisticChart";
import ElemonTopBodyPointNftStatisticChart from "../../../containers/ElemonTopBodyPointNftStatisticChart";
import ElemonTotalPetCountChart from "../../../containers/ElemonTotalPetCountChart";

const ElemonHealth : NextPage = () => {
  return (
    <div id="main-app">
      <Head>
        <title>Elemon GameFi Health Dashboard and Analytics</title>
        <meta
          name="description"
          content="Crypto Game Tool has built a analytics dashboard that tracks and reports Elemon GameFi activities, transactions and NFTs" />
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
            <div className="py-5">
              <div
                className="statistic-section mb-5"
                id="market-statistic-section">
                <div className="section-title mb-4">
                  <h3 className="main-title">
                    Elemon Market Analytics
                  </h3>
                  <h5 className="h6 mt-2">
                    Latest 7 days of all transactions and it's volume in Elemon Market including Creating Sell Order,
                    Canceling
                    Sell Order and Purchasing
                  </h5>
                </div>
                <div className="section-body">
                  <div className="statistic-section-card card">
                    <div className="card-body">
                      <ElemonMarketAnalyticChart />
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="statistic-section mb-5"
                id="pet-count-statistic-section">
                <div className="section-title mb-4">
                  <h3 className="main-title">
                    Elemon Pet Count Analytics
                  </h3>
                  <h5 className="h6 mt-2">
                    Pet count by attribute
                  </h5>
                </div>
                <div className="section-body">
                  <div className="statistic-section-card card">
                    <div className="card-body">
                      <ElemonTotalPetCountChart />
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="statistic-section mb-5"
                id="open-box-statistic-section">
                <div className="section-title mb-4">
                  <h3 className="main-title">
                    Elemon NFT Analytics
                  </h3>
                  <h5 className="h6 mt-2">
                    NFT Analytics give you the tools you need to better track all NFTs of Elemon GameFi including Pet NFTs,
                    Mystery Box NFTs and it's transactions.
                  </h5>
                </div>
                <div className="section-body">
                  <div className="row g-5">
                    <div className="col-12 col-xl-4">
                      <ElemonOpeningBoxStatisticChart />
                    </div>

                    <div className="col-12 col-xl-4">
                      <ElemonCombiningStatisticChart />
                    </div>

                    <div className="col-12 col-xl-4">
                      <ElemonPetNftStatisticChart />
                    </div>

                    <div className="col-12 col-xl-4">
                      <ElemonTopPowerNftStatisticChart />
                    </div>

                    <div className="col-12 col-xl-4">
                      <ElemonTopSpeedNftStatisticChart />
                    </div>

                    <div className="col-12 col-xl-4">
                      <ElemonTopBodyPointNftStatisticChart />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default ElemonHealth;
