import {
  useEffect,
  useState
} from "react";
import PerfectScrollbar from 'react-perfect-scrollbar';

import { getOpeningBoxStatistics } from "../apis/elemon-apis";
import { ElemonNft } from "../types/service";
import {
  getClassImg,
  getElemonNftImg,
  getRarityImg
} from "../services/elemon";
import moment from "moment-timezone";

function ElemonOpeningBoxStatisticChart() {

  const [
    transactions,
    setTransactions
  ] = useState<{
    boxId : number,
    pets : ElemonNft[],
    openTime : string
  }[]>([]);

  const loadChartData = async () => {
    const data = await getOpeningBoxStatistics();
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
            Newest Released Pets From Mystery Box
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
                    boxId,
                    pets,
                    openTime
                  }) => {
                    const date = moment(openTime).tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY HH:mm");

                    return (
                      <div
                        key={ boxId }
                        className="col-12">
                        <div className="fw-bold">
                          <div>
                            <span className="badge bg-primary">Box #{ boxId }</span>
                            {" "}
                            <span className="badge bg-blue">{ date }</span>
                          </div>
                        </div>
                        <div className="pets">
                          <div className="row g-3 align-items-center">
                            {
                              pets.map(pet => {
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
                                  quality
                                } = pet;

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
                                              className="nft-img"
                                              style={ { backgroundImage : `url(https://app.elemon.io/assets/images/aura/quality_${ quality }.png)` } }>
                                              <img src={ selfNftImg } />
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

export default ElemonOpeningBoxStatisticChart;
