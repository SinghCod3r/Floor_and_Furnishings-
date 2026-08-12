import moment from "moment";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { GetDataWithToken } from "../../ApiHelper/ApiHelper";
import { useDispatch } from "react-redux";
import { toast } from "material-react-toastify";
// import { setLoggedInUserDetails } from "../../Store/Actions/userAction";
import { setLoggedInUserDetails, setUserLogout } from "../../Store/Actions/UserAction";

function DispatchTeamHeader() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [AllNotification, setAllNotification] = useState([]);
  const logout = () => {
    GetDataWithToken("auth/logout/user").then((response) => {
      if (response.status === true) {
        Cookies.remove("FandFToken");
        Cookies.remove("userType");
        Cookies.remove("userID");
        localStorage.clear();
        dispatch(setUserLogout());
        navigate("/");
        toast.success(response.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    });
  };
  return (
    <>
      {/*--- Main wrapper start -----*/}

      {/*---- Nav Header Start -----*/}
      <div className="nav-header">
        <Link to={"/DispatchTeamDashboard"} className="brand-logo">
          <img
            alt="tesr"
            src="./images/f&f-logo.png"
            className="d-xl-block d-none"
            id="img_lg"
            style={{ width: "140px", padding: "11px", margin: "auto" }}
          />
          <img
            alt="test"
            src="./images/f&_smLogo.png"
            className="d-xl-none d-block"
            style={{ padding: "11px", margin: "auto", width: "70px" }}
          />
          <img
            alt="test"
            src="./images/f&_smLogo.png"
            className="d-none"
            id="img_sm"
            style={{ padding: "11px", margin: "auto", width: "85px" }}
          />
        </Link>
        {/*--- Navbar toggler ---*/}
        <div className="nav-control">
          <div className="hamburger" id="ToggleLogo">
            <span className="line" />
            <span className="line" />
            <span className="line" />
          </div>
        </div>
      </div>
      {/*----- Nav header End -----*/}
      {/*----- Header Start ----*/}
      <div className="header">
        <div className="header-content">
          <nav className="navbar navbar-expand">
            <div className="collapse navbar-collapse justify-content-between">
              <div className="nav-item d-flex align-items-center">
                <div className="input-group search-area"></div>
              </div>
              <ul className="navbar-nav header-right">
                {/* <li className="nav-item">
                  <Link to={"/Search"} className="btn btn-primary">
                    Search
                  </Link>
                </li> */}
                <li className="nav-item dropdown notification_dropdown">
                  <a
                    className="nav-link"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="19.375"
                      height={24}
                      viewBox="0 0 19.375 24"
                    >
                      <g
                        id="_006-notification"
                        data-name="006-notification"
                        transform="translate(-341.252 -61.547)"
                      >
                        <path
                          id="Path_1954"
                          data-name="Path 1954"
                          d="M349.741,65.233V62.747a1.2,1.2,0,1,1,2.4,0v2.486a8.4,8.4,0,0,1,7.2,8.314v4.517l.971,1.942a3,3,0,0,1-2.683,4.342h-5.488a1.2,1.2,0,1,1-2.4,0h-5.488a3,3,0,0,1-2.683-4.342l.971-1.942V73.547a8.4,8.4,0,0,1,7.2-8.314Zm1.2,2.314a6,6,0,0,0-6,6v4.8a1.208,1.208,0,0,1-.127.536l-1.1,2.195a.6.6,0,0,0,.538.869h13.375a.6.6,0,0,0,.536-.869l-1.1-2.195a1.206,1.206,0,0,1-.126-.536v-4.8a6,6,0,0,0-6-6Z"
                          transform="translate(0 0)"
                          fill="#ffffff"
                          fillRule="evenodd"
                        />
                      </g>
                    </svg>
                    <span className="badge light text-white bg-primary rounded-circle">
                      {AllNotification.length}
                    </span>
                  </a>
                  <div className="dropdown-menu dropdown-menu-end">
                    <div
                      id="DZ_W_Notification1"
                      className="widget-media dlab-scroll p-3 ps"
                      style={{ height: "380px", overflow: "scroll !important" }}
                    >
                      <ul className="timeline">
                        {AllNotification && AllNotification.length === 0
                          ? "No Notification Found"
                          : AllNotification.slice(0, 4).map((item, index) => {
                            return (
                              <li>
                                <div className="timeline-panel">
                                  <div className="media me-2">
                                    <img
                                      alt="test"
                                      width={50}
                                      src="./images/logo.png"
                                    />
                                  </div>
                                  <div className="media-body">
                                    <h6 className="mb-1"> {item.message}</h6>
                                    <small className="d-block">
                                      {moment(item.created_at).format("LLL")}
                                    </small>
                                  </div>
                                </div>
                              </li>
                            );
                          })}
                      </ul>
                      <div
                        className="ps__rail-x"
                        style={{ left: "0px", bottom: "0px" }}
                      >
                        <div
                          className="ps__thumb-x"
                          tabIndex={0}
                          style={{ left: "0px", width: "0px" }}
                        />
                      </div>
                      <div
                        className="ps__rail-y"
                        style={{ top: "0px", right: "0px" }}
                      >
                        <div
                          className="ps__thumb-y"
                          tabIndex={0}
                          style={{ top: "0px", height: "0px" }}
                        />
                      </div>
                    </div>
                    <Link className="all-notification" to={"/Notification"}>
                      See all notifications <i className="ti-arrow-end" />
                    </Link>
                  </div>
                </li>
                <li className="nav-item dropdown header-profile">
                  <a
                    className="nav-link"
                    href="javascript:void(0);"
                    role="button"
                    data-bs-toggle="dropdown"
                  >
                    <img src="./images/logo.png" width={20} />
                  </a>
                  <div className="dropdown-menu dropdown-menu-end">
                    <button
                      onClick={() => {
                        logout();
                      }}
                      className=" btn dropdown-item ai-icon"
                    >
                      <i className="icon-logout icons" />
                      <span className="ms-2">Logout </span>
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
      {/*----- Header End ----*/}
    </>
  );
}

export default DispatchTeamHeader;
