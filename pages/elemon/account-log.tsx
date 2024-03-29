import { NextPage } from "next";
import Head from "next/head";
import {
  ChangeEvent,
  ReactElement,
  useEffect,
  useRef,
  useState
} from "react";
import moment from "moment-timezone";

import {
  getElemonWallets,
  getWalletLogs
} from "../../apis/elemon-apis";
import { displayPriceWithComma } from "../../services/utils";

import MainHeader from "../../components/MainHeader";
import GamingContentBorder from "../../components/GamingContentBorder";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsRotate,
  faFileArrowDown,
  faArrowLeft,
  faClipboardList
} from "@fortawesome/free-solid-svg-icons";

import {
  DefaultMenu,
  RouteId
} from "../../data/route";
import { ElemonLogActionType } from "../../types/enums";
import Modal from "../../components/Modal";

enum LogView {
  LOGIN,
  WALLETS,
  LOGS
}

const ElemonAccountLog : NextPage = () => {
  const [
    username,
    setUsername
  ] = useState<string>("");
  const [
    logWallet,
    setLogWallet
  ] = useState<string>("");
  const [
    view,
    setView
  ] = useState<LogView>(LogView.LOGIN);

  const [
    wallets,
    setWallets
  ] = useState<{
    walletAddress : string,
    accountUsername : string,
    expirationDatetime : Date,
    logExpirationDatetime : Date,
    elemonName : string,
    level : number,
    power : number,
    energy : number,
    noClaimedIdles : number,
    noElcoin : number,
    pveChapter : string,
    lastClaimedIdleDateTime : Date,
    lastClaimedIdleElcoin : number,
    lastPveChapter : string,
    lastPveElcoin : number,
    lastPveDateTime : Date,
    lastPvpPower : number,
    lastPvpElcoin : number,
    lastPvpDateTime : Date,
    lastHealedDateTime : Date,
    lastHealedElcoin : string,
    pveQuestClaimed : number,
    pvpQuestClaimed : number
  }[]>([]);

  const [
    walletLogs,
    setWalletLogs
  ] = useState<{
    logId : number,
    walletAddress : string,
    actionDateTime : string,
    actionType : ElemonLogActionType,
    earnElcoin : number,
    logData : string,
    accPower : number,
    accLevel : number
  }[]>([]);

  const [
    exportType,
    setExportType,
  ] = useState<string | undefined>(undefined);

  const usernameInputRef = useRef<HTMLInputElement | null>(null);
  const logTypeInputRef = useRef<HTMLSelectElement | null>(null);
  const onLoading = useRef<boolean>(false);

  const login = () => {
    const val = usernameInputRef.current?.value;
    !!val && setUsername(val);

    if (!!usernameInputRef.current) {
      usernameInputRef.current.value = "";
    }
  };

  const goToLogs = (wallet : string) => {
    setLogWallet(wallet);
    setView(LogView.LOGS);
  };

  const openToExportDetailLogs = (wallet : string) => {
    const from = moment().tz("Asia/Ho_Chi_Minh").subtract(7, "day").endOf("day").toISOString();
    const to = moment().tz("Asia/Ho_Chi_Minh").endOf("day").toISOString();

    const linkUrl = `https://www.cryptogametool.com/apis/elemon/account/logs/export?wallet=${ wallet }&from=${ from }&to=${ to }`;
    window.open(linkUrl);
  };

  const logout = () => {
    switch (view) {
      case LogView.LOGS:
        setLogWallet("");
        break;
      case LogView.WALLETS:
        setUsername("");
        break;
    }

    setView(currentView => (--currentView));
  };

  const loadElemonWallets = async (account? : string) : Promise<void> => {
    if (onLoading.current) {
      return;
    }
    onLoading.current = true;

    setWallets([]);
    let accountId = !!account ? account : username;
    const rp = await getElemonWallets(accountId);
    setWallets(rp);

    onLoading.current = false;
  };

  const loadWalletLog = async (wallet? : string) : Promise<void> => {
    if (onLoading.current) {
      return;
    }
    onLoading.current = true;

    setWalletLogs([]);
    let walletAddr = !!wallet ? wallet : logWallet;

    const now = moment().endOf("day");
    const start = moment(now).subtract(24, "hour").startOf("day");

    let logTypeValue = logTypeInputRef.current?.value;
    let actionType : ElemonLogActionType | null = null;
    if (!!logTypeValue) {
      actionType = logTypeValue as ElemonLogActionType;
    }

    const rp = await getWalletLogs(null, walletAddr, actionType, start.toISOString(), now.toISOString());
    const records = rp.reverse();
    setWalletLogs(records);

    onLoading.current = false;
  };

  const refreshPage = async () : Promise<void> => {
    switch (view) {
      case LogView.LOGS:
        loadWalletLog();
        break;
      case LogView.WALLETS:
        loadElemonWallets();
        break;
    }
  };

  const onLogTypeInputChange = () => {
    loadWalletLog();
  };

  const openExportModal = () => {
    setExportType("AccountInfo");
  };

  const closeExportModal = () => {
    setExportType(undefined);
  };

  const onExportTypeChange = (e : ChangeEvent<HTMLSelectElement>) => {
    setExportType(e.target?.value);
  };

  const doExportFile = () => {
    let linkUrl = "";
    switch (exportType) {
      case "AccountInfo":
        linkUrl = `https://www.cryptogametool.com/apis/elemon/account/export?username=${ username }`;
        break;
      case "AccountLogs":
        const from = moment().tz("Asia/Ho_Chi_Minh").subtract(7, "day").endOf("day").toISOString();
        const to = moment().tz("Asia/Ho_Chi_Minh").endOf("day").toISOString();
        linkUrl = `https://www.cryptogametool.com/apis/elemon/account/logs/export?accountId=${ username }&from=${ from }&to=${ to }`;
        break;
    }

    !!linkUrl && window.open(linkUrl);
    closeExportModal();
  };

  useEffect(() => {
    if (!!logWallet) {
      loadWalletLog(logWallet);
      setView(LogView.LOGS);
    } else if (!!username) {
      loadElemonWallets(username);
      setView(LogView.WALLETS);
    }
  }, [
    logWallet,
    username
  ]);

  return (
    <div id="main-app">
      <Head>
        <title>Elemon Tool - Account Activity Logs on Crypto Game Tool</title>
        <meta
          name="description"
          content="Activity Log Tool records all activities of your Elemon Account including PVE, PVP, Idle Claim and Stamina Heal." />
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

      <div id="elemon-log-page">
        <MainHeader
          menuList={ DefaultMenu } />

        <div className="main-app-body">
          <div className="container">
            <div className="pt-5 pb-5">
              <div className="app-body-heading text-center">
                <h1 className="h2 fw-bold">Elemon Account Logs</h1>
                <h2 className="h5 fw-normal">
                  The log tools help Elemon Tool members to track and analysis their account's activities which
                  registered to
                  Farm Tool.
                </h2>
              </div>

              <div className="mt-5">
                {
                  view === LogView.LOGIN ? (
                    <GamingContentBorder
                      name="Login"
                      subDescription="Crypto Game Tool">
                      <>
                        <div className="d-flex flex-column">
                          <div className="mb-3">
                            <div className="h3">Are you member of EMP and Elemon Tool?</div>
                          </div>
                          <div className="mb-3">
                            <input
                              type="text"
                              className="form-control form-control-lg"
                              maxLength={ 200 }
                              ref={ usernameInputRef }
                              placeholder="Please enter your Elemon Tool Username" />
                          </div>
                          <div>
                            <button
                              onClick={ login }
                              type="button"
                              className="btn btn-game">
                              LOGIN
                            </button>
                          </div>
                        </div>
                      </>
                    </GamingContentBorder>
                  ) : null
                }
                {
                  view === LogView.WALLETS ? (
                    <div className="container p-md-0">
                      <div className="row g-4">
                        {
                          wallets.map(wallet => {
                            let {
                              walletAddress,
                              elemonName,
                              level,
                              power,
                              energy,
                              noClaimedIdles,
                              noElcoin,
                              pveChapter,
                              lastClaimedIdleDateTime,
                              lastClaimedIdleElcoin,
                              lastPveChapter,
                              lastPveElcoin,
                              lastPveDateTime,
                              lastPvpPower,
                              lastPvpElcoin,
                              lastPvpDateTime,
                              lastHealedDateTime,
                              lastHealedElcoin,
                              pveQuestClaimed,
                              pvpQuestClaimed
                            } = wallet;

                            const lastClaimedIdleTimeStr = !!lastClaimedIdleDateTime ? moment(lastClaimedIdleDateTime).fromNow() : "";

                            let pveTimeStr = "",
                              pveStatus = "";
                            if (!!lastPveDateTime) {
                              pveTimeStr = moment(lastPveDateTime).fromNow();
                              pveStatus = lastPveElcoin >= 0 ? "Win" : (lastPveElcoin === -1 ? "Lost" : "Failed");

                              if (lastPveElcoin < 0) {
                                lastPveElcoin = 0;
                              }
                            }

                            let pvpTimeStr = "",
                              pvpStatus = "";
                            if (!!lastPvpDateTime) {
                              pvpTimeStr = moment(lastPvpDateTime).fromNow();
                              pvpStatus = lastPvpElcoin >= 0 ? "Win" : (lastPvpElcoin === -1 ? "Lost" : "Failed");

                              if (lastPvpElcoin < 0) {
                                lastPvpElcoin = 0;
                              }
                            }

                            let lastHealedTimeStr = "";
                            if (!!lastHealedDateTime) {
                              lastHealedTimeStr = moment(lastHealedDateTime).fromNow();
                            }

                            return (
                              <div
                                key={ walletAddress }
                                className="col-12">
                                <div className="wallet-card">
                                  <div className="py-3 px-3">
                                    <div className="d-flex flex-column flex-md-row align-items-md-center">
                                      <div
                                        className="flex-fill"
                                        style={ { minWidth : "0" } }>
                                        <div>
                                          <div className="row g-1">
                                            <div className="col-12 col-xl-3">
                                              <div className="card-info-col">
                                                <div className="label fw-bold">
                                                  Wallet
                                                </div>
                                                <div className="val text-truncate text-light-green">
                                                  { walletAddress }
                                                </div>
                                              </div>
                                            </div>
                                            <div className="col-12 col-xl-2">
                                              <div className="card-info-col">
                                                <div className="label fw-bold">
                                                  Name
                                                </div>
                                                <div className="val text-truncate">
                                                  { elemonName }
                                                </div>
                                              </div>
                                            </div>
                                            <div className="col-3 col-xl-1">
                                              <div className="card-info-col">
                                                <div className="label fw-bold">
                                                  Level
                                                </div>
                                                <div className="val">
                                                  { !!level ? level : "N/A" }
                                                </div>
                                              </div>
                                            </div>
                                            <div className="col-3 col-xl-1">
                                              <div className="card-info-col">
                                                <div className="label fw-bold">
                                                  Power
                                                </div>
                                                <div className="val">
                                                  { !!power ? displayPriceWithComma(power) : "N/A" }
                                                </div>
                                              </div>
                                            </div>
                                            <div className="col-3 col-xl-1">
                                              <div className="card-info-col">
                                                <div className="label fw-bold">
                                                  Energy
                                                </div>
                                                <div className="val">
                                                  { energy !== undefined && energy !== null ? energy : "N/A" }
                                                </div>
                                              </div>
                                            </div>
                                            <div className="col-3 col-xl-1">
                                              <div className="card-info-col">
                                                <div className="label fw-bold">
                                                  Elcoin
                                                </div>
                                                <div className="val text-yellow">
                                                  { !!noElcoin ? displayPriceWithComma(noElcoin, 2) : "N/A" }
                                                </div>
                                              </div>
                                            </div>
                                            <div className="col-3 col-xl-1">
                                              <div className="card-info-col">
                                                <div className="label fw-bold">
                                                  No. Idles
                                                </div>
                                                <div className="val">
                                                  { !!noClaimedIdles ? noClaimedIdles : "N/A" }
                                                </div>
                                              </div>
                                            </div>
                                            <div className="col-4 col-xl-1">
                                              <div className="card-info-col">
                                                <div className="label fw-bold">
                                                  Current PVE
                                                </div>
                                                <div className="val">
                                                  { !!pveChapter ? pveChapter : "N/A" }
                                                </div>
                                              </div>
                                            </div>
                                            <div className="col-4 col-xl-1">
                                              <div className="card-info-col">
                                                <div className="label fw-bold">
                                                  Daily Quest
                                                </div>
                                                <div className="val text-danger">
                                                  { pveQuestClaimed && pvpQuestClaimed ? "Claimed" : "Not Claimed" }
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="mt-2">
                                            <div className="row g-1">
                                              <div className="col-12 col-xl-3">
                                                <div className="card-info-col">
                                                  <div className="label fw-bold">
                                                    Last Claimed Idle
                                                  </div>
                                                  <div className="val">
                                                    {
                                                      !!lastClaimedIdleDateTime ? (
                                                        <>
                                                          <span className="text-yellow">{ lastClaimedIdleElcoin } elcoin</span>
                                                          { " " } - { lastClaimedIdleTimeStr }
                                                        </>
                                                      ) : "N/A"
                                                    }
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="col-12 col-xl-3">
                                                <div className="card-info-col">
                                                  <div className="label fw-bold">
                                                    Last PVE
                                                  </div>
                                                  <div className="val">
                                                    {
                                                      !!pveTimeStr ? (
                                                        <>
                                                          <span className="text-yellow">{ pveStatus } - { lastPveElcoin } elcoin</span>
                                                          { " " } - { pveTimeStr }
                                                        </>
                                                      ) : "No Records"
                                                    }
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="col-12 col-xl-3">
                                                <div className="card-info-col">
                                                  <div className="label fw-bold">
                                                    Last PVP
                                                  </div>
                                                  <div className="val">
                                                    {
                                                      !!pvpTimeStr ? (
                                                        <>
                                                          <span className="text-yellow">{ pvpStatus } - { lastPvpElcoin } elcoin</span>
                                                          { " " } - { pvpTimeStr }
                                                        </>
                                                      ) : "No Records"
                                                    }
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="col-12 col-xl-3">
                                                <div className="card-info-col">
                                                  <div className="label fw-bold">
                                                    Last Healed Stamina
                                                  </div>
                                                  <div className="val">
                                                    {
                                                      !!lastHealedTimeStr ? (
                                                        <>
                                                          <span className="text-yellow">{ lastHealedTimeStr }</span>
                                                        </>
                                                      ) : "No Records"
                                                    }
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="card-ctrls">
                                        <div className="d-flex flex-row flex-md-column">
                                          <div className="pt-2 pt-md-0">
                                            <FontAwesomeIcon
                                              onClick={ () => goToLogs(walletAddress) }
                                              className="card-ctrl-icon"
                                              icon={ faClipboardList } />
                                          </div>
                                          <div className="pt-3 ps-3 ps-md-0">
                                            <FontAwesomeIcon
                                              onClick={ () => openToExportDetailLogs(walletAddress) }
                                              className="card-ctrl-icon"
                                              icon={ faFileArrowDown } />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        }
                      </div>
                    </div>
                  ) : null
                }

                {
                  view === LogView.LOGS ? (
                    <div className="container p-md-0">
                      <div className="row g-4">
                        {
                          walletLogs.map(log => {
                            const {
                              logId,
                              walletAddress,
                              actionDateTime,
                              actionType,
                              logData,
                              earnElcoin,
                              accPower,
                              accLevel
                            } = log;

                            const actionTimeStr = moment(actionDateTime).format("DD/MM/YYYY HH:mm");

                            let actionTypeName = "";
                            let detailLog : ReactElement = <></>;

                            switch (actionType) {
                              case ElemonLogActionType.IDLE_CLAIM: {
                                actionTypeName = "Idle Claim";
                                detailLog = <>{ earnElcoin }</>;
                                break;
                              }
                              case ElemonLogActionType.PVE_FIGHT: {
                                const logDetail : {
                                  chapter : string
                                } = JSON.parse(logData);
                                actionTypeName = "PVE - " + logDetail.chapter;
                                detailLog = <>{ earnElcoin }</>;
                                break;

                              }
                              case ElemonLogActionType.PVP_FIGHT: {
                                const logDetail : {
                                  power : number
                                } = JSON.parse(logData);
                                actionTypeName = "PVP - " + displayPriceWithComma(logDetail.power);
                                detailLog = <>{ earnElcoin }</>;
                                break;

                              }
                              case ElemonLogActionType.NFT_HEAL: {
                                const logDetail : Record<string, number> = JSON.parse(logData);
                                actionTypeName = "Stamina Heal";

                                const nftIds = Object.keys(logDetail);
                                const detailElemons : ReactElement[] = nftIds.map(nftId => (
                                  <div key={ nftId }>
                                    { nftId } - { logDetail[nftId] }
                                  </div>
                                ));

                                detailLog = <>{ detailElemons }</>;
                                break;
                              }
                            }


                            return (
                              <div
                                key={ logId }
                                className="col-12">
                                <div className="wallet-card">
                                  <div className="py-3 px-3">
                                    <div className="row g-1">
                                      <div className="col-12 col-xl-4">
                                        <div className="card-info-col">
                                          <div className="label fw-bold">
                                            Wallet
                                          </div>
                                          <div className="val text-truncate text-light-green">
                                            { walletAddress }
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-12 col-xl-2">
                                        <div className="card-info-col">
                                          <div className="label fw-bold">
                                            Time
                                          </div>
                                          <div className="val text-truncate">
                                            { actionTimeStr }
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-6 col-xl-1">
                                        <div className="card-info-col">
                                          <div className="label fw-bold">
                                            Level
                                          </div>
                                          <div className="val text-truncate text-danger">
                                            { !!accLevel ? accLevel : "N/A" }
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-6 col-xl-1">
                                        <div className="card-info-col">
                                          <div className="label fw-bold">
                                            Power
                                          </div>
                                          <div className="val text-truncate text-danger">
                                            { !!accPower ? displayPriceWithComma(accPower) : "N/A" }
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-12 col-xl-2">
                                        <div className="card-info-col">
                                          <div className="label fw-bold">
                                            Action
                                          </div>
                                          <div className="val text-truncate text-danger">
                                            { actionTypeName }
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-12 col-xl-2">
                                        <div className="card-info-col">
                                          <div className="label fw-bold">
                                            Elcoin
                                          </div>
                                          <div className="val text-truncate  text-yellow">
                                            { detailLog }
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        }

                      </div>
                    </div>
                  ) : null
                }
              </div>
            </div>
          </div>

          {
            view !== LogView.LOGIN ? (
              <div className="bottom-navigation">
                <div className="container bottom-navigation-container">
                  <div className="h-100 d-flex align-items-center justify-content-between">
                    <div
                      className="navigation-btn"
                      onClick={ logout }>
                      <div className="d-flex align-items-center">
                        <FontAwesomeIcon
                          className="btn-icon"
                          icon={ faArrowLeft } />
                        <span className="ps-2 fw-bold h5">
                          { view === LogView.WALLETS ? "Logout" : "Back To Wallets" }
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="ctrls">
                        <div className="d-flex align-items-center">
                          {
                            view === LogView.WALLETS ? (
                              <div>
                                <div
                                  className="px-2 ctrl-btn"
                                  onClick={ openExportModal }>
                                  <FontAwesomeIcon
                                    className="ctrl-icon"
                                    icon={ faFileArrowDown } />
                                </div>
                              </div>
                            ) : null
                          }
                          {
                            view === LogView.LOGS ? (
                              <div>
                                <select
                                  onChange={ onLogTypeInputChange }
                                  ref={ logTypeInputRef }
                                  className="form-select action-type-select">
                                  <option value="">All Action</option>
                                  <option value={ ElemonLogActionType.IDLE_CLAIM }>Idle Claim</option>
                                  <option value={ ElemonLogActionType.PVE_FIGHT }>PVE Fight</option>
                                  <option value={ ElemonLogActionType.PVP_FIGHT }>PVP Fight</option>
                                  <option value={ ElemonLogActionType.NFT_HEAL }>Stamina Heal</option>
                                </select>
                              </div>
                            ) : null
                          }
                          <div>
                            <div
                              className="px-2 ctrl-btn"
                              onClick={ refreshPage }>
                              <FontAwesomeIcon
                                className="ctrl-icon"
                                icon={ faArrowsRotate } />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null
          }
        </div>
      </div>

      <Modal show={ !!exportType }>
        <div className="p-4">
          <div className="border-bottom h5 pb-2 mb-4">
            Export
          </div>

          <div>
            <div className="mb-2">
              Which type do you want to export?
            </div>
            <div className="mb-3">
              <select
                className="form-select"
                value={ exportType }
                onChange={ onExportTypeChange }>
                <option value="AccountInfo">All Account Info</option>
                <option value="AccountLogs">All Logs</option>
              </select>
            </div>
            <div>
              <div className="d-flex justify-content-end">
                <div>
                  <button
                    className="btn btn-secondary"
                    onClick={ doExportFile }>
                    Export
                  </button>
                </div>
                <div className="ps-2">
                  <button
                    className="btn btn-light-gray-4"
                    onClick={ closeExportModal }>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ElemonAccountLog;
