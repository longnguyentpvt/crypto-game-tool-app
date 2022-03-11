import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faBars
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

import {
  RouteId
} from "../data/route";
import {
  MainHeaderMenuItem
} from "../types/service";

function MainHeader(props: {
  activeMenu? : RouteId,
  menuList : MainHeaderMenuItem[]
}) {
  const [
    mobileActive,
    setMobileActive
  ] = useState<boolean>(false);

  const {
    activeMenu,
    menuList
  } = props;

  return (
    <>
      <header className="d-flex align-items-center">
        <div className="container">
          <div className="d-flex align-items-center">
            <div>
              <div className="main-logo">
                <a
                  className="text-inherit"
                  href="/">
                  <div className="d-flex align-items-center">
                    <img
                      src="/assets/images/main-logo.png"
                      alt="GameFi Tool Main Logo" />

                    <div className="ps-2 h4 fw-bolder">
                      CryptoGameTool
                    </div>
                  </div>
                </a>
              </div>
            </div>

            <div className="flex-fill">
              <div className="center-menu">
                <div className="d-flex justify-content-end">
                  <div
                    className="menu-mobile-icon d-xl-none"
                    onClick={ () => setMobileActive((prevState : boolean) => !prevState) }>
                    <FontAwesomeIcon icon={ faBars } />
                  </div>
                </div>

                <div className={ `menu-list position-fixed ${ mobileActive ? "active" : "" }` }>
                  <div className="menu-list-bar">
                    <div className="menu-heading mb-3">
                      <div className="d-flex align-items-center justify-content-between px-5">
                        <div className="h4 text-white fw-bolder">
                          Menu
                        </div>

                        <div>
                          <div
                            className="close-btn"
                            onClick={ () => setMobileActive((prevState : boolean) => !prevState) }>
                            <FontAwesomeIcon icon={ faXmark } />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex flex-column flex-xl-row justify-content-end">
                      {
                        menuList.map((item : MainHeaderMenuItem) => {
                          const {
                            id,
                            url,
                            name
                          } = item;

                          const active = id === activeMenu;

                          return (
                            <div
                              key={ id }
                              className={ `menu-item px-3 ${ active ? "active" : "" }` }>
                              <div className="d-flex align-items-center">
                                <div>
                                  <div className="circle-icon" />
                                </div>

                                <a
                                  className="fw-bold h5 ps-3"
                                  href={ url }>
                                  { name }
                                </a>
                              </div>
                            </div>
                          )
                        })
                      }

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default MainHeader;
