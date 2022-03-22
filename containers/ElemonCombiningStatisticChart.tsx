import {
  useEffect,
  useState
} from "react";
import { ElemonNft } from "../types/service";
import { getCombiningPetStatistics } from "../apis/elemon-apis";
import PerfectScrollbar from "react-perfect-scrollbar";
import moment from "moment-timezone";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaw,
  faFire
} from "@fortawesome/free-solid-svg-icons";

import {
  getClassImg,
  getElemonNftImg,
  getRarityImg
} from "../services/elemon";

function ElemonCombiningStatisticChart() {
  const [
    transactions,
    setTransactions
  ] = useState<{
    pet1 : ElemonNft,
    pet2 : ElemonNft,
    combinedPet : ElemonNft,
    combineTime : string
  }[]>([]);

  const loadChartData = async () => {
    const data = await getCombiningPetStatistics();
    setTransactions(data);
  };

  useEffect(() => {
    loadChartData();
  }, []);


  return (
    <div className="statistic-section-card nft-transaction-section-card card">
      <div className="card-body">
        <div className="card-title mb-3">
          <div className="h5 text-light-green">
            Newest Combined Pets
          </div>
        </div>
        <div className="card-section-content">
          <PerfectScrollbar
            options={ {
              suppressScrollX : true,
              wheelPropagation : false,

            } }>
            <div className="open-box-transactions">
              <div className="row g-3">
                {
                  transactions.map(({
                    pet1,
                    pet2,
                    combinedPet,
                    combineTime
                  }) => {
                    const date = moment(combineTime).tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY HH:mm");
                    const pets = [pet1, pet2, combinedPet];

                    return (
                      <div
                        key={ combinedPet.tokenId }
                        className="col-12">
                        <div className="fw-bold">
                          <div>
                            <span className="badge bg-blue">{ date }</span>
                          </div>
                        </div>
                        <div className="pets">
                          <div className="row g-3 align-items-center">
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
                                quality
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

                                return (
                                  <div
                                    key={ tokenId }
                                    className="col-4">
                                    <div className="elemon-pet-nft">
                                      <a
                                        href={ `https://app.elemon.io/elemon/${ tokenId }` }
                                        target="_blank">
                                        <div className="d-flex align-items-end">
                                          <div>
                                            <div className="pet-class">
                                              <img src={ selfClassImg } />
                                            </div>
                                            <div className="pet-rarity">
                                              <img src={ selfRarityImg } />
                                            </div>
                                          </div>

                                          <div>
                                            <div
                                              className="nft-img position-relative"
                                              style={ { backgroundImage : `url(https://app.elemon.io/assets/images/aura/quality_${ quality }.png)` } }>
                                              <img src={ selfNftImg } />

                                              <div
                                                className={ `nft-combine-status${ index !==
                                                2 ? " removed-stt" : "" }` }>
                                                {
                                                  index !== 2 ? (
                                                    <FontAwesomeIcon icon={ faFire } />
                                                  ) : (
                                                    <FontAwesomeIcon icon={ faPaw } />
                                                  )
                                                }
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </a>

                                    </div>
                                  </div>
                                );
                              })
                            }
                          </div>
                        </div>
                      </div>
                    );
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

export default ElemonCombiningStatisticChart;
