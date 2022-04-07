import React, {
  memo,
  useEffect,
  useState
} from "react";
import {
  HighestPurchasedPetInfo
} from "types/service";
import {
  getTopHighestPricePets
} from "apis/elemon-apis";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  getClassImg,
  getElemonNftImg,
  getRarityImg
} from "services/elemon";
import MedalIcon from "components/icons/MedalIcon";

function ElemonTopHighestPricePets() {
  const [
    topPets,
    setTopPets
  ] = useState<HighestPurchasedPetInfo[]>([]);

  const loadData = async() : Promise<void> => {
    const topList = await getTopHighestPricePets();
    setTopPets(topList);
  };

  useEffect(() => {
    loadData();
  },[]);

  return (
    <div className="statistic-section-card top-nft-section-card card">
      <div className="card-body">
        <div className="card-title mb-3">
          <div className="h5 text-light-green">
            Top 10 Highest Price
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
                  topPets.map(({
                    petInfo,
                    price
                  }, index) => {
                    const {
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
                      ownerName,
                      level
                    } = petInfo;
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

                    const medalColor = index < 3 ? "yellow" : "green";

                    return (
                      <div className="col-12" key={ tokenId }>
                        <div className="top-pet-detail">
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
                                  <h5 className="fw-bolder text-warning">
                                    { price.toString() + "$" }
                                  </h5>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </PerfectScrollbar>
        </div>
      </div>
    </div>
  );
}

export default memo(ElemonTopHighestPricePets);