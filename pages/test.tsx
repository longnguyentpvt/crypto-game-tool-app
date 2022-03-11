import type { NextPage } from "next";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

const Test : NextPage = () => {
  return (
    <div id="main-app">
      <Head>
        <title>GameFi - P2E Game Tools, Guides and News on CryptoGamingTool</title>
        <meta
          name="description"
          content="Crypto Gaming Tool has built a NFT Market which supports useful filters and sorting for Elemon GameFi" />
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

      <div>
        <div className="container-xl">
          <div className="container">
            <div className="row g-5">
              <div>
                <div className="bg-green">
                  Class 1
                </div>
              </div>
              <div>
                <div className="bg-green">
                  Class 1
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
