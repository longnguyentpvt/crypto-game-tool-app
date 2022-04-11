import React, {
  memo,
  useEffect,
  useState
} from "react";
import PerfectScrollbar from "react-perfect-scrollbar";

import {
  getRecentPets
} from "apis/elemon-apis";

import {
  displayPriceWithComma
} from "services/utils";
import {
  getClassImg,
  getElemonNftImg,
  getRarityImg
} from "services/elemon";

import {
  ElemonRecentListType
} from "types/enums";
import {
  ElemonNft
} from "types/service";
const NO_RECORDS = 10;

function ElemonPetRecentCard(props : {
  petInfo : ElemonNft
}) {
  const {
    petInfo
  } = props;
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
    point,
    points,
    level,
    lastPrice
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
  const power = !!point ? point : 0;
  const speed = !!points ? points[5] : 0;

  return (
    <div className="top-pet-detail">
      <div className="d-flex align-items-center">
        <div className="flex-fill">
          <div className="pet-nft-info ps-3">
            <div className="d-flex align-items-center">
              <div className="flex-column">
                <div
                  className="nft-img"
                  style={ { backgroundImage : `url(https://app.elemon.io/assets/images/aura/quality_${ quality }.png)` } }>
                  <img src={ selfNftImg } />
                </div>
                <div className="text-white text-center">{ "#" + tokenId }</div>
              </div>

              <div className="pet-class mx-1">
                <img src={ selfClassImg } />
              </div>
              <div className="pet-rarity mx-1">
                <img src={ selfRarityImg } />
              </div>
              <div className="pet-level mx-1">
                <div className="level">
                  { level }
                </div>
              </div>
              <div className="pet-value mx-1">
                <div className="d-flex flex-column align-items-center">
                  <div className="fw-bolder text-danger">
                    { displayPriceWithComma(power) }
                  </div>
                  <div>
                    <img src="https://app.elemon.io/assets/images/icon-power.png" />
                  </div>
                </div>
              </div>
              <div className="pet-value mx-1">
                <div className="d-flex flex-column align-items-center">
                  <div className="fw-bolder text-danger">
                    { speed }
                  </div>
                  <div>
                    <img src="https://app.elemon.io/assets/images/icon_speed.png" />
                  </div>
                </div>
              </div>

              <div style={ {
                marginLeft : "auto",
                marginRight : "20px"
              } }>
                <h4 className="text-warning">
                  { lastPrice + "$" }
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ElemonPetRecentListContainer() {
  const [
    soldPets,
    setSoldPets
  ] = useState<ElemonNft[]>([]);
  const [
    listedPets,
    setListedPets
  ] = useState<ElemonNft[]>([]);
  const [
    soldPage,
    setSoldPage
  ] = useState<number>(1);
  const [
    listedPage,
    setListedPage
  ] = useState<number>(1);

  const loadPets = async () : Promise<void> => {
    const listedPets = await getRecentPets(ElemonRecentListType.LISTED, 1, NO_RECORDS);
    const soldPets = await getRecentPets(ElemonRecentListType.SOLD, 1, NO_RECORDS);
    setSoldPets(soldPets);
    setListedPets(listedPets);
  };

  useEffect(() => {
    loadPets();
  }, [])

  return (
    <div className="row">
      <div className="col-12 col-md-6">
        <div className="recent-nft-section-card">
          <div className="card">
            <div className="card-body">
              <div className="card-title mb-1 row">
                <div className="col-6 h5 text-light-green text-start">
                  Recently Listed
                </div>
              </div>
              <div className="card-section-content">
                <PerfectScrollbar
                  options={ {
                    suppressScrollX : true,
                    wheelPropagation : false
                  } }>
                  {
                    !!listedPets && listedPets.length > 0 ? listedPets.map(petInfo => {
                      return (
                        <div
                          className="col-12"
                          key={ petInfo.tokenId }>
                          <ElemonPetRecentCard petInfo={ petInfo } />
                        </div>
                      );
                    }) : null
                  }
                </PerfectScrollbar>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 col-md-6">
        <div className="recent-nft-section-card">
          <div className="card">
            <div className="card-body">
              <div className="card-title mb-1 row">
                <div className="col-6 h5 text-light-green text-start">
                  Recently Sold
                </div>
              </div>
              <div className="card-section-content">
                <PerfectScrollbar
                  options={ {
                    suppressScrollX : true,
                    wheelPropagation : false
                  } }>
                  {
                    !!soldPets && soldPets.length > 0 ? soldPets.map(petInfo => {
                      return (
                        <div
                          className="col-12"
                          key={ petInfo.tokenId }>
                          <ElemonPetRecentCard petInfo={ petInfo } />
                        </div>
                      );
                    }) : null
                  }
                </PerfectScrollbar>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(ElemonPetRecentListContainer);