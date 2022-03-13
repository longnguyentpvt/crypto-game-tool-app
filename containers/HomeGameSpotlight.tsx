function HomeGameSpotlight(props : {
  name : string,
  description : string,
  cover : string,
  chain : string,
  gameType : string,
  backers : string,
  tokens : string,
  website : string,
  twitter : string,
  telegram : string,
  sections : {
    name : string,
    url : string
  }[]
}) {
  const {
    name,
    description,
    cover,
    chain,
    gameType,
    backers,
    tokens,
    website,
    twitter,
    telegram,
    sections
  } = props;

  return (
    <div className="home-spotlight-game-content">
      <div className="row g-4 flex-xl-row-reverse">
        <div className="col-12 col-xl-6">
          <div className="pt-1">
            <div className="mb-4">
              <div className="h3 text-yellow mb-2">
                { name }
              </div>

              <p className="text-light-green">
                { description }
              </p>
            </div>

            <div className="main-game-info-list">
              <div className="row g-2">
                <div className="col-12 game-info-item">
                  <div className="fw-bold">
                    <div className="d-flex">
                      <div>
                        <div className="game-info-label">
                          CHAIN:
                        </div>
                      </div>
                      <div className="text-light-green">{ chain }</div>
                    </div>
                  </div>
                </div>
                <div className="col-12 game-info-item">
                  <div className="fw-bold">
                    <div className="d-flex">
                      <div>
                        <div className="game-info-label">
                          TYPE:
                        </div>
                      </div>
                      <div className="text-light-green">{ gameType }</div>
                    </div>
                  </div>
                </div>
                <div className="col-12 game-info-item">
                  <div className="fw-bold">
                    <div className="d-flex">
                      <div>
                        <div className="game-info-label">
                          BACKERS:
                        </div>
                      </div>
                      <div className="text-light-green">{ backers }</div>
                    </div>
                  </div>
                </div>
                <div className="col-12 game-info-item">
                  <div className="fw-bold">
                    <div className="d-flex">
                      <div>
                        <div className="game-info-label">
                          TOKENS:
                        </div>
                      </div>
                      <div className="text-light-green">{ tokens }</div>
                    </div>
                  </div>
                </div>
                <div className="col-12 game-info-item">
                  <div className="fw-bold network-info">
                    <div className="d-flex align-items-center">
                      <div>
                        <div className="game-info-label">
                          NETWORK:
                        </div>
                      </div>
                      <div className="text-light-green flex-fill">
                        <div className="row g-2">
                          <div className="col-auto">
                            <a
                              href={ website }
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
                              href={ twitter }
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
                              href={ telegram }
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
            src={ cover }
            alt={ `${ name } Cover` } />
        </div>
      </div>

      <div className="mt-4">
        <div className="game-links">
          <div className="row g-4">
            {
              sections.map(({
                name,
                url
              }) => (
                <div
                  key={ name }
                  className="col-12 col-xl-3">
                  <a href={ url }>
                    <div className="d-flex game-list-circle align-items-center">
                      <div className="circle-icon">
                      </div>
                      <div className="ps-3">
                        <div className="h5">
                          { name }
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              ))
            }
            {
              sections.length === 0 ? (
                <div
                  className="col-12 col-xl-3">
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
              ) : null
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeGameSpotlight;
