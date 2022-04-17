import type { NextPage } from "next";
import Head from "next/head";

import MainHeader from "components/MainHeader";

import {
  DefaultMenu,
  RouteId
} from "data/route";
import ElemonPetRecentListContainer from "containers/ElemonPetRecentListContainer";
import Modal from "components/Modal";
import {
  CryptoToken
} from "types/enums";

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
              <script
                async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6796254445247606"
                crossOrigin="anonymous"></script>
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
                  <div className="row g-5">
                    <div className="col-12">
                      <div className="statistic-section-card card">
                        <div className="card-body">
                        </div>
                      </div>
                    </div>

                    <div className="col-12">
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
                    NFT Analytics give you the tools you need to better track all NFTs of Elemon GameFi including Pet
                    NFTs,
                    Mystery Box NFTs and it's transactions.
                  </h5>
                </div>
                <div className="section-body">
                  <div className="row g-5">
                    <div className="col-12 col-xl-6">
                    </div>
                    <div className="col-12 col-xl-6">
                    </div>

                    <div className="col-12 col-xl-4">
                    </div>
                    <div className="col-12 col-xl-4">
                    </div>
                    <div className="col-12 col-xl-4">
                    </div>

                    <div className="col-12">
                      {/*<ElemonPetRecentListContainer token={ CryptoToken.BUSD } />*/}
                    </div>
                    <div className="col-12">
                      {/*<ElemonPetRecentListContainer token={ CryptoToken.ELMON } />*/}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={ true }>
        <div className="modal-body">
          <div className="text-center">
            <img
              style={ { width : "48px" } }
              src="/assets/images/main-logo.png"
              alt="Crypto Game Tool Logo" />
          </div>
          <div className="text-black pt-3">
            <div className="h5 text-center">
              The website in under maintenance
            </div>

            <div className="pt-3 text-center">
              We are sorry for this inconvenience, please comeback later. Thanks for visiting our website.
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};


export default ElemonHealth;
