import type { NextPage } from "next";
import Head from "next/head";
import MainHeader from "../components/MainHeader";

import {
  onLCP,
  onINP,
  LCPMetricWithAttribution,
  INPMetricWithAttribution,
  LCPReportCallbackWithAttribution,
  INPReportCallbackWithAttribution
} from "web-vitals/attribution";

import {
  RouteId,
  DefaultMenu
} from "../data/route";
import GamingContentBorder from "../components/GamingContentBorder";
import HomeGameSpotlight from "../containers/HomeGameSpotlight";
import Modal from "components/Modal";
import { useEffect } from "react";

type MetricDebugInfo = {
  debugTarget : string | undefined,
  eventTime : number | undefined,
  renderTime? : number,
  loadTime? : number,
  size? : number,
  eventType? : string,
  processingStart? : number,
  processingEnd? : number,
  debugDuration? : number
};

const getSelector = (node : any, maxLen = 100) : string => {
  let sel = "";
  try {
    while (node && node.nodeType !== 9) {
      const part = node.id ? "#" + node.id : node.nodeName.toLowerCase() + (
        (node.className && node.className.length) ?
          "." + Array.from(node.classList.values()).join(".") : "");
      if (sel.length + part.length > maxLen - 1) return sel || part;
      sel = sel ? part + ">" + sel : part;
      if (node.id) break;
      node = node.parentNode;
    }
  } catch (err) {
  }
  return sel;
};

const Home : NextPage = () => {

  const sendToAnalytics = (data : any, name: string) : void => {
    const w = window.innerWidth;
    data["debugWidth"] = w;

    if (process.env.NODE_ENV === "production") {
      // @ts-ignore
      gtag("event", name, data);
      console.log(data);
    } else {
      console.log("dev", data);
    }
  };

  // @ts-ignore
  const debugLcpInfo : LCPReportCallbackWithAttribution = (metric : LCPMetricWithAttribution) : void => {
    if (process.env.NODE_ENV === "production") {
      console.log("send screen vital");
      // @ts-ignore
      gtag('event', 'screen_vital', {
        'screen_name': 'homepage',
        'vital_name' : 'lcp'
      });
    }
    
    const {
      name,
      id,
      delta,
      value,
      entries,
      rating
    } = metric;

    const lastEntry = entries[entries.length - 1];
    const debugInfo : MetricDebugInfo = {
      debugTarget : getSelector(lastEntry.element),
      eventTime : lastEntry.startTime,
      renderTime : lastEntry.renderTime,
      loadTime : lastEntry.loadTime,
      size : lastEntry.size
    };

    const data = {
      eventCategory : "debugLcpInfo",
      eventName : "debugLcpInfo",
      eventAction : name,
      eventLabel : id,
      eventDelta : delta,
      eventValue : value,
      eventRating : rating,
      nonInteraction : true,
      transport : "beacon",
      ...debugInfo
    };

    sendToAnalytics(data, 'debugLcpInfo');
  };

  // @ts-ignore
  const debugInpInfo : INPReportCallbackWithAttribution = (metric : INPMetricWithAttribution) : void => {
    const {
      name,
      id,
      delta,
      value,
      entries,
      rating,
      attribution
    } = metric;

    const {
      eventTarget,
      eventType,
      eventTime,
      eventEntry
    } = attribution;

    const debugInfo : MetricDebugInfo = {
      debugTarget : eventTarget,
      eventType,
      eventTime,
      processingStart : eventEntry?.processingStart,
      processingEnd : eventEntry?.processingEnd,
      debugDuration : eventEntry?.duration
    };

    const data = {
      eventCategory : "debugInpInfo",
      eventName : "debugInpInfo",
      eventAction : name,
      eventLabel : id,
      eventDelta : delta,
      eventValue : value,
      eventRating : rating,
      nonInteraction : true,
      transport : "beacon",
      ...debugInfo
    };

    sendToAnalytics(data, 'debugInpInfo');
  };

  useEffect(() => {
    onLCP(debugLcpInfo);
    onINP(debugInpInfo);
  }, []);

  return (
    <div id="main-app">
      <Head>
        <title>GameFi - P2E Game Tools, Guides and News on Crypto Game Tool</title>
        <meta
          name="description"
          content="Crypto Game Tool is a platform with most important, useful guides, extra tools and latest news about GameFi - Play To Earn game today." />
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

      <div id="home-page">
        <MainHeader
          activeMenu={ RouteId.HomePage }
          menuList={ DefaultMenu } />

        <div className="main-app-body">
          <div className="top-cover">
            <div className="container-xl px-xl-0">
              <div>
                <div className="container">
                  <div className="row g-4 g-xl-1 align-items-center flex-column-reverse flex-xl-row">
                    <div className="col-12 col-xl-6">
                      <h1 className="heading">
                        <span className="text-yellow main fw-bolder">GameFi, Play-To-Earn Game</span>
                        <br />
                        <span className="h3 sub text-primary">Guides, Tools and News</span>
                      </h1>

                      <div className="mt-5 text-light-green">
                        <h3 className="fw-normal fs-5 mb-3">
                          Collecting and analyzing GameFi - P2E Games for gamer investment.
                        </h3>
                        <h3 className="fw-normal fs-5 mb-3">
                          Guiding users who interested to join quickly through our posts.
                        </h3>
                        <h3 className="fw-normal fs-5">
                          Providing extra tools to help gamers to take advantages of P2E games completely.
                        </h3>
                      </div>
                    </div>
                    <div className="col-12 col-xl-6">
                      <div className="cover-img">
                        <img
                          src="/assets/images/home-top-cover.png"
                          alt="CryptoGameTool - GameFi, P2E Games Tools, Guides" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="py-5">
            <div className="body-section">
              <div className="container-xl px-xl-0">
                <div className="section-heading text-center">
                  Spotlight
                </div>
                <div className="section-body">
                  <div className="container">
                    <div className="row g-5">
                      <div className="col-12">
                        <GamingContentBorder
                          name="Elemon"
                          subDescription="GameFi - P2E Game">
                          <HomeGameSpotlight
                            name="Elemon"
                            description="Players summon Elemons and lead them to restore peace of the world of Elematris and earn rewards after battles."
                            cover="/assets/images/elemon-list-cover.jpeg"
                            chain="BSC"
                            gameType="IDLE RPG GAME"
                            backers="CORSAIR, 590 VENTURES, ..."
                            tokens="ELMON, ELCOIN"
                            website="https://elemon.io/"
                            telegram="https://t.me/ElemonAnnouncement"
                            twitter="https://twitter.com/ElemonGame"
                            sections={ [
                              {
                                name : "Elemon Market",
                                url : "/elemon/market"
                              },
                              {
                                name : "Health Analytics",
                                url : "/elemon/health"
                              },
                              {
                                name : "Pet Calculator",
                                url : "/elemon/pets/calculator"
                              },
                              {
                                name : "Account Analysis",
                                url : "/elemon/account-log"
                              },
                              {
                                name : "Game Guides",
                                url : "/"
                              }
                            ] } />
                        </GamingContentBorder>
                      </div>

                      <div className="col-12">
                        <GamingContentBorder
                          name="Summoner Arena"
                          subDescription="GameFi - P2E Game">
                          <HomeGameSpotlight
                            name="Summoner Arena"
                            description="Since the dawn of time, the goddess of all creation - Agtiz had constructed
                                          the world of Summonia, where the land became barren and desolate. Taking note of
                                          Summonia's arid condition, the goddess gave birth to her 6 children - the Elder Titans and tasked them
                                          with excavating and advancing Summonia's future."
                            cover="/assets/images/summoner-erana-list-cover.jpg"
                            chain="BSC"
                            gameType="IDLE RPG GAME"
                            backers="COINBASE VENTURES, ONECHAIN, COIN98 VENTURES, ..."
                            tokens="SAE, ASG"
                            website="https://summonersarena.io/"
                            telegram="https://t.me/SummonersArena"
                            twitter="https://twitter.com/SummonersArena"
                            sections={ [] } />
                        </GamingContentBorder>
                      </div>

                      <div className="col-12">
                        <GamingContentBorder
                          name="MetaGear"
                          subDescription="GameFi - P2E Game">
                          <HomeGameSpotlight
                            name="MetaGear"
                            description="Robot Battle is the most popular tournament on the planet in 2035. Manufacturing robots to join battles is a competition for geniuses and the winner will be honored as a hero."
                            cover="/assets/images/metagear-home-list-cover.jpeg"
                            chain="BSC"
                            gameType="IDLE RPG GAME"
                            backers="ONESOFT, HUOBI, ..."
                            tokens="GEAR"
                            website="https://metagear.game/"
                            telegram="https://t.me/MetaGearGlobalGroup"
                            twitter="https://metagear.game/twitter"
                            sections={ [] } />
                        </GamingContentBorder>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer>
          <div className="container-xl px-xl-0">
            <div className="text-center">
              <div className="footer-heading mb-4">
                Contact Us
              </div>

              <div className="contact-links">
                <div className="container">
                  <div className="row align-items-center g-5 justify-content-center">
                    <div className="col-auto">
                      <div>
                        <a
                          href="https://t.me/CryptoGameTool"
                          target="_blank">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 447.96 375.68">
                            <path
                              d="M446.7,98.6,379.1,417.4c-5.1,22.5-18.4,28.1-37.3,17.5L238.8,359l-49.7,47.8c-5.5,5.5-10.1,10.1-20.7,10.1L175.8,312,366.7,139.5c8.3-7.4-1.8-11.5-12.9-4.1L117.8,284,16.2,252.2c-22.1-6.9-22.5-22.1,4.6-32.7L418.2,66.4C436.6,59.5,452.7,70.5,446.7,98.6Z"
                              transform="translate(-0.02 -64.4)" />
                          </svg>
                        </a>
                      </div>
                    </div>
                    <div className="col-auto">
                      <div>
                        <a
                          href="https://t.me/CryptoGameTool"
                          target="_blank">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 150 100">
                            <polygon
                              points="150,100 150,5.4 98.8,44.4 125.4,74.6 124.6,75.4 93.8,48.2 75,62.5 56.2,48.2 25.4,75.4 24.6,74.6 51.2,44.4
		0,5.5 0,100 	" />
                            <polygon
                              points="146.8,0 3.1,0 75,54.6 	" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </footer>
      </div>
    </div>
  );
};

export default Home;
