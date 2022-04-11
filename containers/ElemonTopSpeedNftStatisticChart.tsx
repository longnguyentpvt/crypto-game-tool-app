import {
  useEffect,
  useState
} from "react";
import { ElemonNft } from "types/service";
import { getTopElemonPets } from "apis/elemon-apis";
import { ElemonTopBodyFilter } from "types/enums";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  getClassImg,
  getElemonNftImg,
  getRarityImg
} from "services/elemon";
import MedalIcon from "components/icons/MedalIcon";
import { displayPriceWithComma } from "services/utils";

function ElemonTopSpeedNftStatisticChart() {
  const [
    pets,
    setPets
  ] = useState<ElemonNft[]>([]);

  const loadChartData = async () => {
    const data = await getTopElemonPets(ElemonTopBodyFilter.PART_6_POINT);
    setPets(data);
  };

  useEffect(() => {
    loadChartData();
  }, []);

  return (
    <div className="statistic-section-card top-nft-section-card card">
      <div className="card-body">
        <div className="card-title mb-3">
          <div className="h5 text-light-green">
            Top 10 Fastest Speed
          </div>
        </div>
        <div className="card-section-content">
          <PerfectScrollbar
            options={ {
              suppressScrollX : true,
              wheelPropagation : false
            } }>
            <div className="top-pet-list">
              <div className="row g-3">
                {
                  pets.map(({
                    tokenId,
                    rarity,
                    class : classId,
                    bodyPart1,
                    bodyPart2,
                    bodyPart3,
                    bodyPart4,
                    bodyPart5,
                    bodyPart6,
                    baseCardId,
                    quality,
                    point,
                    ownerName,
                    level,
                    points
                  }, index) => {
                    const selfRarityImg = !!rarity ? getRarityImg(rarity) : "";
                    const selfClassImg = !!classId ? getClassImg(classId) : "";
                    const selfNftImg = !!baseCardId ? getElemonNftImg(
                      baseCardId,
                      bodyPart1,
                      bodyPart2,
                      bodyPart3,
                      bodyPart4,
                      bodyPart5,
                      bodyPart6
                    ) : "";

                    let speed = !!points ? points[5] : 0;
                    const medalColor = index < 3 ? "yellow" : "green";

                    return (
                      <div className="col-12" key={ tokenId }>
                        <div className="top-pet-detail">
                          <a
                            style={ { color : "inherit"} }
                            href={ `https://app.elemon.io/elemon/${ tokenId }` }
                            target="_blank">
                            <div className="d-flex align-items-center">
                              <div>
                                <div className="pet-rank">
                                  <MedalIcon color={ medalColor } />
                                  <div className="rank-no fw-bold">
                                    { index + 1 }
                                  </div>
                                </div>
                              </div>
                              <div className="flex-fill">
                                <div className="pet-nft-info ps-3">
                                  <div className="owner fw-bold">
                                    { ownerName }
                                  </div>
                                  <div>
                                    <div className="d-flex align-items-center">
                                      <div
                                        className="nft-img"
                                        style={ { backgroundImage : `url(https://app.elemon.io/assets/images/aura/quality_${ quality }.png)` } }>
                                        <img src={ selfNftImg } />
                                      </div>

                                      <div className="pet-class">
                                        <img src={ selfClassImg } />
                                      </div>
                                      <div className="pet-rarity">
                                        <img src={ selfRarityImg } />
                                      </div>
                                      <div className="pet-level">
                                        <div className="level">
                                          { level }
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <div className="top-pet-value">
                                  <div className="d-flex flex-column align-items-center">
                                    <div className="fw-bolder text-danger">
                                      { speed }
                                    </div>
                                    <div>
                                      <img src="https://app.elemon.io/assets/images/icon_speed.png" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                    )
                  })
                }
                =
              </div>
            </div>
          </PerfectScrollbar>
        </div>
      </div>
    </div>
  );
}

export default ElemonTopSpeedNftStatisticChart;
