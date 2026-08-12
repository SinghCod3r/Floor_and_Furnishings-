import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import { setLoggedInUserDetails } from "../../../Store/Actions/userAction";
import { setLoggedInUserDetails, setUserLogout } from "../../../Store/Actions/UserAction";
import Cookies from "js-cookie";
import { GetDataWithToken } from "../../../ApiHelper/ApiHelper";
import { toast } from "material-react-toastify";
import moment from "moment";
import { confirm } from "../../../Common/ConfirmModal";

function SuperAdminHeader() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [AllNotification, setAllNotification] = useState();



  const logout = async () => {
    if (await confirm("Are you sure you want to logout?")) {
      GetDataWithToken("auth/logout/user").then((response) => {
        if (response.status === true) {
          Cookies.remove("FandFToken");
          Cookies.remove("userType");
          Cookies.remove("userID");
          dispatch(setUserLogout());
          localStorage.clear();
          // localStorage.removeItem("appState");

          // dispatch(setLoggedInUserDetails({}));
          navigate("/");
          toast.success(response.message, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });
    }
  };

  // const logout = () => {
  //   GetDataWithToken("auth/logout").then((response) => {
  //     if
  //     (response.status === true) {
  //
  //     }
  //   )}

  const notificationLength = (data) => {
    let newData;
    if (data >= 1000) {
      newData = data / 1000;
      return `${parseInt(newData)}K`;
    } else {
      return data;
    }
  }

  useEffect(() => {
    GetDataWithToken("superadmin/get-notification/", "").then((response) => {
      if (response.status === true) {
        setAllNotification(response?.data);
        // console.log("first", response.data);
      }
    });
    // console.log("first useEffect");
  }, []);

  return (
    <>
      {/* my demo color */}
      {/* background: linear-gradient(to left, rgb(18 2 100) , rgb(155 0 59 / 95%)); */}
      {/*--- Main wrapper start -----*/}

      {/*---- Nav Header Start -----*/}
      <div className="nav-header">
        <Link to={"/SuperAdminDashboard"} className="brand-logo">
          {/* <img
            alt="tesr"
            src={`${process.env.PUBLIC_URL}/images/image.png`}
            className="d-xl-block d-none"
            id="img_lg"
            style={{ width: "232px", padding: "11px", margin: "auto" }}
          />
          <img
            alt="test"
            src={`${process.env.PUBLIC_URL}/images/image.png`}
            className="d-xl-none d-block"
            style={{ padding: "11px", margin: "auto", width: "70px" }}
          /> */}
          <img
            alt="test"
            src={`${process.env.PUBLIC_URL}/images/image.png`}
            className=""
            id="img_sm"
            style={{ padding: "11px", margin: "auto", width: "200px" }}
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
                <li className="nav-item d-none">
                  <Link to={"/Search"} className="btn">
                    Search
                  </Link>
                </li>
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
                          fill="#AD8435"
                          fillRule="evenodd"
                        />
                      </g>
                    </svg>
                    <span className="badge light text-white bg-primary rounded-circle">
                      {AllNotification?.count}
                    </span>
                  </a>
                  <div className="dropdown-menu dropdown-menu-end">
                    <div
                      id="DZ_W_Notification1"
                      className="widget-media dlab-scroll p-3 ps"
                      style={{ height: "380px", overflow: "scroll !important" }}
                    >
                      <ul className="timeline">
                        {AllNotification && AllNotification?.rows?.length === 0
                          ? "No Notification Found"
                          : AllNotification?.rows?.slice(0, 4).map((item, index) => {
                            return (
                              <li>
                                <div className="timeline-panel">
                                  <div className="media me-2">
                                    <img
                                      alt="test"
                                      width={50}
                                      src={`${process.env.PUBLIC_URL}/images/logo.png`}
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
                  <Link
                    className="nav-link"
                    to="javascript:void(0);"
                    role="button"
                    data-bs-toggle="dropdown"
                  >
                    {/* <img src="./images/logo.png" width={20} /> */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.1"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      width="20"
                      height="20"
                      x="0"
                      y="0"
                      viewBox="0 0 6.35 6.35"
                      style={{ enableBackground: "new 0 0 512 512" }}
                      xmlSpace="preserve"
                      class=""
                    >
                      <g>
                        <path
                          d="M3.172.53a.265.266 0 0 0-.262.268v2.127a.265.266 0 0 0 .53 0V.798A.265.266 0 0 0 3.172.53zm1.544.532a.265.266 0 0 0-.026 0 .265.266 0 0 0-.147.47c.459.391.749.973.749 1.626 0 1.18-.944 2.131-2.116 2.131A2.12 2.12 0 0 1 1.06 3.16c0-.65.286-1.228.74-1.62a.265.266 0 1 0-.344-.404A2.667 2.667 0 0 0 .53 3.158a2.66 2.66 0 0 0 2.647 2.663 2.657 2.657 0 0 0 2.645-2.663c0-.812-.363-1.542-.936-2.03a.265.266 0 0 0-.17-.066z"
                          fill="#AD8435"
                          opacity="1"
                          data-original="#AD8435"
                          class=""
                        ></path>
                      </g>
                    </svg>
                  </Link>
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

export default SuperAdminHeader;
