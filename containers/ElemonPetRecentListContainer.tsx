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
import moment from "moment-timezone";
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
    lastPrice,
    timestamp
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

  let time = null;
  if (!!timestamp) {
    const timeStr = moment(timestamp).tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY HH:mm");
    time = <div className="text-center text-white">
      { timeStr }
    </div>
  }

  return (
    <div className="top-pet-detail">
      <div className="d-flex align-items-center">
        <div className="flex-fill">
          <div className="pet-nft-info ps-1">
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

              <div
                className="flex-column"
                style={ {
                  marginLeft : "auto"
                } }>
                <h4 className="text-warning text-center">
                  { lastPrice + "$" }
                </h4>
                { time }
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
    soldLoading,
    setSoldLoading
  ] = useState<boolean>(false);
  const [
    listedLoading,
    setListedLoading
  ] = useState<boolean>(false);

  const loadListedPets = async (firstLoad : boolean) : Promise<void> => {
    setListedLoading(true);
    const listedPets = await getRecentPets(ElemonRecentListType.LISTED, firstLoad, NO_RECORDS);
    setListedPets(prevPets => {
      prevPets.push(...listedPets);
      return [...prevPets];
    });
    setListedLoading(false);
  };

  const loadSoldPets = async (firstLoad : boolean) : Promise<void> => {
    setSoldLoading(true);
    const soldPets = await getRecentPets(ElemonRecentListType.SOLD, firstLoad, NO_RECORDS);
    setSoldPets(prevPets => {
      prevPets.push(...soldPets);
      return [...prevPets];
    });
    setSoldLoading(false);
  };

  useEffect(() => {
    loadListedPets(true);
    loadSoldPets(true);
  }, []);

  let loadListedText = listedPets.length > 0 && listedPets.length < 200 ? <div
    className="loading-text fw-bold"
    onClick={ () => loadListedPets(false) }>
    Load more
  </div> : null;
  if (listedLoading) {
    loadListedText = <div className="text-center text-white">
        Loading...
      </div>
  }

  let loadSoldText = soldPets.length > 0 && soldPets.length < 200 ? <div
    className="loading-text fw-bold"
    onClick={ () => loadSoldPets(false) }>
    Load more
  </div> : null;
  if (soldLoading) {
    loadSoldText = <div className="text-center text-white">
      Loading...
    </div>
  }

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
                  { loadListedText }
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
                  { loadSoldText }
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