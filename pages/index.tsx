import type { NextPage } from "next";
import Head from "next/head";
import MainHeader from "../components/MainHeader";

import {
  RouteId,
  DefaultMenu
} from "../data/route";

const Home : NextPage = () => {
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
                        <div className="border-background-content mx-auto list-game-border">
                          <div className="content-border position-relative">
                            <div className="content-background">
                              <div className="d-flex flex-column h-100">
                                <div className="bg-head" />
                                <div
                                  className="bg-body flex-fill"
                                  style={ { minHeight : "0" } } />
                                <div className="bg-bottom" />
                              </div>
                            </div>

                            <div className="content-body">
                              <div className="py-4">
                                <div className="row g-4 flex-xl-row-reverse">
                                  <div className="col-12 col-xl-6">
                                    <div className="pt-1">
                                      <div className="mb-4">
                                        <div className="h3 text-yellow mb-2">
                                          Elemon
                                        </div>

                                        <p className="text-light-green">
                                          Players summon Elemons and lead them to restore peace of the world of
                                          Elematris and
                                          earn
                                          rewards after battles.
                                        </p>
                                      </div>

                                      <div>
                                        <div className="row g-2">
                                          <div className="col-12">
                                            <div className="fw-bold">
                                              <div className="d-flex">
                                                <div style={ { width : "80px" } }>CHAIN:</div>
                                                <div className="text-light-green">BSC</div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="col-12">
                                            <div className="fw-bold">
                                              <div className="d-flex">
                                                <div style={ { width : "80px" } }>TYPE:</div>
                                                <div className="text-light-green">IDLE RPG GAME</div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="col-12">
                                            <div className="fw-bold">
                                              <div className="d-flex">
                                                <div style={ { width : "80px" } }>BACKERS:</div>
                                                <div className="text-light-green">CORSAIR, 590 VENTURES, ...</div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="col-12">
                                            <div className="fw-bold">
                                              <div className="d-flex">
                                                <div style={ { width : "80px" } }>TOKENS:</div>
                                                <div className="text-light-green">ELMON, ELCOIN</div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="col-12">
                                            <div className="fw-bold network-info">
                                              <div className="d-flex align-items-center">
                                                <div style={ { width : "80px" } }>
                                                  <div>
                                                  NETWORK:
                                                  </div>
                                                </div>
                                                <div className="text-light-green flex-fill">
                                                  <div className="row g-2">
                                                    <div className="col-auto">
                                                      <a
                                                        href="https://elemon.io/"
                                                        target="_blank">
                                                        <svg
                                                          className="network-icon website-icon"
                                                          xmlns="http://www.w3.org/2000/svg"
                                                          viewBox="0 0 500 499.8">
                                                          <path
                                                            d="M6,246.6H133.3A400,400,0,0,1,151,137.8a398.15,398.15,0,0,1-90.9-37.5A249.52,249.52,0,0,0,6,246.6Z"
                                                            transform="translate(-6 -6.1)" />
                                                          <path
                                                            d="M133.3,265.4H6A249,249,0,0,0,60.1,411.6,396.31,396.31,0,0,1,151,374.1,394.29,394.29,0,0,1,133.3,265.4Z"
                                                            transform="translate(-6 -6.1)" />
                                                          <path
                                                            d="M246.6,265.4H152.2a378.8,378.8,0,0,0,17.2,104.2,402.25,402.25,0,0,1,77.2-9.4Z"
                                                            transform="translate(-6 -6.1)" />
                                                          <path
                                                            d="M246.6,246.6V151.8a402.25,402.25,0,0,1-77.2-9.4,375.08,375.08,0,0,0-17.2,104.2Z"
                                                            transform="translate(-6 -6.1)" />
                                                          <path
                                                            d="M246.6,379.1a378.29,378.29,0,0,0-71,8.5,376.16,376.16,0,0,0,71,118.3Z"
                                                            transform="translate(-6 -6.1)" />
                                                          <path
                                                            d="M342.4,142.4a399.12,399.12,0,0,1-77,9.3v94.8h94.2A378,378,0,0,0,342.4,142.4Z"
                                                            transform="translate(-6 -6.1)" />
                                                          <path
                                                            d="M265.4,132.9a383.46,383.46,0,0,0,70.8-8.4A373.65,373.65,0,0,0,265.4,6.2V132.9Z"
                                                            transform="translate(-6 -6.1)" />
                                                          <path
                                                            d="M246.6,132.9V6.1a376.16,376.16,0,0,0-71,118.3A384.7,384.7,0,0,0,246.6,132.9Z"
                                                            transform="translate(-6 -6.1)" />
                                                          <path
                                                            d="M157,119.9A393.31,393.31,0,0,1,219.9,8.4,250.26,250.26,0,0,0,72.7,85.7,378.57,378.57,0,0,0,157,119.9Z"
                                                            transform="translate(-6 -6.1)" />
                                                          <path
                                                            d="M157,392.1a373.52,373.52,0,0,0-84.3,34.1,249.42,249.42,0,0,0,147.2,77.3A393.84,393.84,0,0,1,157,392.1Z"
                                                            transform="translate(-6 -6.1)" />
                                                          <path
                                                            d="M265.4,379.1V505.9a373.65,373.65,0,0,0,70.8-118.3A383.59,383.59,0,0,0,265.4,379.1Z"
                                                            transform="translate(-6 -6.1)" />
                                                          <path
                                                            d="M354.7,392.1A392.8,392.8,0,0,1,292,503.6a250,250,0,0,0,147.2-77.3A368.92,368.92,0,0,0,354.7,392.1Z"
                                                            transform="translate(-6 -6.1)" />
                                                          <path
                                                            d="M354.7,119.9a380.84,380.84,0,0,0,84.6-34.2A249.71,249.71,0,0,0,292.1,8.4,393.83,393.83,0,0,1,354.7,119.9Z"
                                                            transform="translate(-6 -6.1)" />
                                                          <path
                                                            d="M265.4,265.4v94.8a401,401,0,0,1,77,9.3,382,382,0,0,0,17.3-104.2H265.4Z"
                                                            transform="translate(-6 -6.1)" />
                                                          <path
                                                            d="M506,265.4H378.6a399.28,399.28,0,0,1-17.8,108.7,397.77,397.77,0,0,1,91.1,37.5A249,249,0,0,0,506,265.4Z"
                                                            transform="translate(-6 -6.1)" />
                                                          <path
                                                            d="M378.6,246.6H506a249,249,0,0,0-54.1-146.2,393.35,393.35,0,0,1-91.1,37.5A401.87,401.87,0,0,1,378.6,246.6Z"
                                                            transform="translate(-6 -6.1)" />
                                                        </svg>
                                                      </a>
                                                    </div>
                                                    <div className="col-auto">
                                                      <a
                                                        href="https://twitter.com/ElemonGame"
                                                        target="_blank">
                                                        <svg
                                                          className="network-icon website-icon"
                                                          xmlns="http://www.w3.org/2000/svg"
                                                          viewBox="0 0 471.9 384">
                                                          <path
                                                            d="M492,109.5a195.74,195.74,0,0,1-55.6,15.3A97.16,97.16,0,0,0,479,71.2a192.38,192.38,0,0,1-61.5,23.5A96.79,96.79,0,0,0,250,160.9a94.79,94.79,0,0,0,2.5,22.1A274.37,274.37,0,0,1,52.9,81.7a97.09,97.09,0,0,0,30,129.4A94.49,94.49,0,0,1,39,199v1.2a96.9,96.9,0,0,0,77.7,95,97.46,97.46,0,0,1-25.5,3.4A91.34,91.34,0,0,1,73,296.8a97,97,0,0,0,90.5,67.3A194.11,194.11,0,0,1,43.2,405.6a196.25,196.25,0,0,1-23.1-1.4A271.2,271.2,0,0,0,168.4,448C346.6,448,444,300.3,444,172.2c0-4.2-.1-8.4-.3-12.5A198.72,198.72,0,0,0,492,109.5Z"
                                                            transform="translate(-20.1 -64)" />
                                                        </svg>
                                                      </a>
                                                    </div>
                                                    <div className="col-auto">
                                                      <a
                                                        href="https://t.me/ElemonAnnouncement"
                                                        target="_blank">
                                                        <svg
                                                          className="network-icon website-icon"
                                                          xmlns="http://www.w3.org/2000/svg"
                                                          viewBox="0 0 447.96 375.68">
                                                          <path
                                                            d="M446.7,98.6,379.1,417.4c-5.1,22.5-18.4,28.1-37.3,17.5L238.8,359l-49.7,47.8c-5.5,5.5-10.1,10.1-20.7,10.1L175.8,312,366.7,139.5c8.3-7.4-1.8-11.5-12.9-4.1L117.8,284,16.2,252.2c-22.1-6.9-22.5-22.1,4.6-32.7L418.2,66.4C436.6,59.5,452.7,70.5,446.7,98.6Z"
                                                            transform="translate(-0.02 -64.4)" />
                                                        </svg>
                                                      </a>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="col-12 col-xl-6">
                                    <img
                                      src="/assets/images/elemon-list-cover.jpeg"
                                      alt="Elemon Cover" />
                                  </div>
                                </div>

                                <div className="mt-4">
                                  <div className="game-links">
                                    <div className="row g-4">
                                      <div className="col-12 col-xl-3">
                                        <a href="/">
                                          <div className="d-flex game-list-circle align-items-center">
                                            <div className="circle-icon">
                                            </div>
                                            <div className="ps-3">
                                              <div className="h5">
                                                Game Guides
                                              </div>
                                            </div>
                                          </div>
                                        </a>
                                      </div>
                                      <div className="col-12 col-xl-3">
                                        <a href="/elemon/market">
                                          <div className="d-flex game-list-circle align-items-center">
                                            <div className="circle-icon">
                                            </div>
                                            <div className="ps-3">
                                              <div className="h5">
                                                Elemon Market
                                              </div>
                                            </div>
                                          </div>
                                        </a>
                                      </div>
                                      <div className="col-12 col-xl-3">
                                        <a href="/elemon/pets/calculator">
                                          <div className="d-flex game-list-circle align-items-center">
                                            <div className="circle-icon">
                                            </div>
                                            <div className="ps-3">
                                              <div className="h5">
                                                Pet Calculator
                                              </div>
                                            </div>
                                          </div>
                                        </a>
                                      </div>
                                      <div className="col-12 col-xl-3">
                                        <a href="/elemon/account-log">
                                          <div className="d-flex game-list-circle align-items-center">
                                            <div className="circle-icon">
                                            </div>
                                            <div className="ps-3">
                                              <div className="h5">
                                                Account Analysis
                                              </div>
                                            </div>
                                          </div>
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="border-heading d-none d-xl-block">
                              <div className="h4 mb-2">
                                Elemon
                              </div>
                              <div>
                                CryptoGameTool
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="border-background-content mx-auto list-game-border">
                          <div className="content-border position-relative">
                            <div className="content-background">
                              <div className="d-flex flex-column h-100">
                                <div className="bg-head" />
                                <div
                                  className="bg-body flex-fill"
                                  style={ { minHeight : "0" } } />
                                <div className="bg-bottom" />
                              </div>
                            </div>

                            <div className="content-body">
                              <div className="py-4">
                                <div className="row g-4 flex-xl-row-reverse">
                                  <div className="col-12 col-xl-6">
                                    <div className="pt-1">
                                      <div className="mb-4">
                                        <div className="h3 text-yellow mb-2">
                                          Summoner Arena
                                        </div>

                                        <p className="text-light-green">
                                          Since the dawn of time, the goddess of all creation - Agtiz had constructed
                                          the world
                                          of Summonia, where the land became barren and desolate. Taking note of
                                          Summonia's arid
                                          condition, the goddess gave birth to her 6 children - the Elder Titans and
                                          tasked them
                                          with excavating and advancing Summonia's future.
                                        </p>
                                      </div>

                                      <div>
                                        <div className="row g-2">
                                          <div className="col-12">
                                            <div className="fw-bold">
                                              <div className="d-flex">
                                                <div style={ { width : "80px" } }>CHAIN:</div>
                                                <div className="text-light-green">BSC</div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="col-12">
                                            <div className="fw-bold">
                                              <div className="d-flex">
                                                <div style={ { width : "80px" } }>TYPE:</div>
                                                <div className="text-light-green">IDLE RPG GAME</div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="col-12">
                                            <div className="fw-bold">
                                              <div className="d-flex">
                                                <div>
                                                  <div style={ { width : "80px" } }>
                                                    BACKERS:
                                                  </div>
                                                </div>
                                                <div className="text-light-green">COINBASE VENTURES, ONECHAIN, COIN98
                                                  VENTURES,
                                                  ...
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="col-12">
                                            <div className="fw-bold">
                                              <div className="d-flex">
                                                <div style={ { width : "80px" } }>TOKENS:</div>
                                                <div className="text-light-green">SAE, ASG</div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="col-12">
                                            <div className="fw-bold network-info">
                                              <div className="d-flex align-items-center">
                                                <div style={ { width : "80px" } }>
                                                  <div>
                                                    NETWORK:
                                                  </div>
                                                </div>
                                                <div className="text-light-green flex-fill">
                                                  <div className="row g-2">
                                                    <div className="col-auto">
                                                      <a
                                                        href="https://summonersarena.io/"
                                                        target="_blank">
                                                        <svg
                                                          className="network-icon website-icon"
                                                          xmlns="http://www.w3.org/2000/svg"
                                                          viewBox="0 0 500 499.8">
                                                          <path
                                                            d="M6,246.6H133.3A400,400,0,0,1,151,137.8a398.15,398.15,0,0,1-90.9-37.5A249.52,249.52,0,0,0,6,246.6Z"
                                                            transform="translate(-6 -6.1)" />
                                                          <path
                                                            d="M133.3,265.4H6A249,249,0,0,0,60.1,411.6,396.31,396.31,0,0,1,151,374.1,394.29,394.29,0,0,1,133.3,265.4Z"
                                                            transform="translate(-6 -6.1)" />
                                                          <path
                                                            d="M246.6,265.4H152.2a378.8,378.8,0,0,0,17.2,104.2,402.25,402.25,0,0,1,77.2-9.4Z"
                                                            transform="translate(-6 -6.1)" />
                                                          <path
                                                            d="M246.6,246.6V151.8a402.25,402.25,0,0,1-77.2-9.4,375.08,375.08,0,0,0-17.2,104.2Z"
                                                            transform="translate(-6 -6.1)" />
                                                          <path
                                                            d="M246.6,379.1a378.29,378.29,0,0,0-71,8.5,376.16,376.16,0,0,0,71,118.3Z"
                                                            transform="translate(-6 -6.1)" />
                                                          <path
                                                            d="M342.4,142.4a399.12,399.12,0,0,1-77,9.3v94.8h94.2A378,378,0,0,0,342.4,142.4Z"
                                                            transform="translate(-6 -6.1)" />
                                                          <path
                                                            d="M265.4,132.9a383.46,383.46,0,0,0,70.8-8.4A373.65,373.65,0,0,0,265.4,6.2V132.9Z"
                                                            transform="translate(-6 -6.1)" />
                                                          <path
                                                            d="M246.6,132.9V6.1a376.16,376.16,0,0,0-71,118.3A384.7,384.7,0,0,0,246.6,132.9Z"
                                                            transform="translate(-6 -6.1)" />
                                                          <path
                                                            d="M157,119.9A393.31,393.31,0,0,1,219.9,8.4,250.26,250.26,0,0,0,72.7,85.7,378.57,378.57,0,0,0,157,119.9Z"
                                                            transform="translate(-6 -6.1)" />
                                                          <path
                                                            d="M157,392.1a373.52,373.52,0,0,0-84.3,34.1,249.42,249.42,0,0,0,147.2,77.3A393.84,393.84,0,0,1,157,392.1Z"
                                                            transform="translate(-6 -6.1)" />
                                                          <path
                                                            d="M265.4,379.1V505.9a373.65,373.65,0,0,0,70.8-118.3A383.59,383.59,0,0,0,265.4,379.1Z"
                                                            transform="translate(-6 -6.1)" />
                                                          <path
                                                            d="M354.7,392.1A392.8,392.8,0,0,1,292,503.6a250,250,0,0,0,147.2-77.3A368.92,368.92,0,0,0,354.7,392.1Z"
                                                            transform="translate(-6 -6.1)" />
                                                          <path
                                                            d="M354.7,119.9a380.84,380.84,0,0,0,84.6-34.2A249.71,249.71,0,0,0,292.1,8.4,393.83,393.83,0,0,1,354.7,119.9Z"
                                                            transform="translate(-6 -6.1)" />
                                                          <path
                                                            d="M265.4,265.4v94.8a401,401,0,0,1,77,9.3,382,382,0,0,0,17.3-104.2H265.4Z"
                                                            transform="translate(-6 -6.1)" />
                                                          <path
                                                            d="M506,265.4H378.6a399.28,399.28,0,0,1-17.8,108.7,397.77,397.77,0,0,1,91.1,37.5A249,249,0,0,0,506,265.4Z"
                                                            transform="translate(-6 -6.1)" />
                                                          <path
                                                            d="M378.6,246.6H506a249,249,0,0,0-54.1-146.2,393.35,393.35,0,0,1-91.1,37.5A401.87,401.87,0,0,1,378.6,246.6Z"
                                                            transform="translate(-6 -6.1)" />
                                                        </svg>
                                                      </a>
                                                    </div>
                                                    <div className="col-auto">
                                                      <a
                                                        href="https://twitter.com/SummonersArena"
                                                        target="_blank">
                                                        <svg
                                                          className="network-icon website-icon"
                                                          xmlns="http://www.w3.org/2000/svg"
                                                          viewBox="0 0 471.9 384">
                                                          <path
                                                            d="M492,109.5a195.74,195.74,0,0,1-55.6,15.3A97.16,97.16,0,0,0,479,71.2a192.38,192.38,0,0,1-61.5,23.5A96.79,96.79,0,0,0,250,160.9a94.79,94.79,0,0,0,2.5,22.1A274.37,274.37,0,0,1,52.9,81.7a97.09,97.09,0,0,0,30,129.4A94.49,94.49,0,0,1,39,199v1.2a96.9,96.9,0,0,0,77.7,95,97.46,97.46,0,0,1-25.5,3.4A91.34,91.34,0,0,1,73,296.8a97,97,0,0,0,90.5,67.3A194.11,194.11,0,0,1,43.2,405.6a196.25,196.25,0,0,1-23.1-1.4A271.2,271.2,0,0,0,168.4,448C346.6,448,444,300.3,444,172.2c0-4.2-.1-8.4-.3-12.5A198.72,198.72,0,0,0,492,109.5Z"
                                                            transform="translate(-20.1 -64)" />
                                                        </svg>
                                                      </a>
                                                    </div>
                                                    <div className="col-auto">
                                                      <a
                                                        href="https://t.me/SummonersArena"
                                                        target="_blank">
                                                        <svg
                                                          className="network-icon website-icon"
                                                          xmlns="http://www.w3.org/2000/svg"
                                                          viewBox="0 0 447.96 375.68">
                                                          <path
                                                            d="M446.7,98.6,379.1,417.4c-5.1,22.5-18.4,28.1-37.3,17.5L238.8,359l-49.7,47.8c-5.5,5.5-10.1,10.1-20.7,10.1L175.8,312,366.7,139.5c8.3-7.4-1.8-11.5-12.9-4.1L117.8,284,16.2,252.2c-22.1-6.9-22.5-22.1,4.6-32.7L418.2,66.4C436.6,59.5,452.7,70.5,446.7,98.6Z"
                                                            transform="translate(-0.02 -64.4)" />
                                                        </svg>
                                                      </a>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="col-12 col-xl-6">
                                    <img
                                      src="/assets/images/summoner-erana-list-cover.jpg"
                                      alt="Elemon Cover" />
                                  </div>
                                </div>

                                <div className="mt-4">
                                  <div className="game-links">
                                    <div className="row g-4">
                                      <div className="col-12 col-xl-3">
                                        <div className="d-flex game-list-circle align-items-center">
                                          <div className="circle-icon">
                                          </div>
                                          <div className="ps-3">
                                            <div className="h5">
                                              Coming Soon
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-12 col-xl-3">
                                        <div className="d-flex game-list-circle align-items-center">
                                          <div className="circle-icon">
                                          </div>
                                          <div className="ps-3">
                                            <div className="h5">
                                              Coming Soon
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-12 col-xl-3">
                                        <div className="d-flex game-list-circle align-items-center">
                                          <div className="circle-icon">
                                          </div>
                                          <div className="ps-3">
                                            <div className="h5">
                                              Coming Soon
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-12 col-xl-3">
                                        <div className="d-flex game-list-circle align-items-center">
                                          <div className="circle-icon">
                                          </div>
                                          <div className="ps-3">
                                            <div className="h5">
                                              Coming Soon
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="border-heading d-none d-xl-block">
                              <div className="h4 mb-2">
                                Summoner Arena
                              </div>
                              <div>
                                CryptoGameTool
                              </div>
                            </div>
                          </div>
                        </div>
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
