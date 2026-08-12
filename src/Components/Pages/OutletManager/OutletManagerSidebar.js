import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function OutletManagerSidebar() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "js/custom.min.js";

    script.async = true;
    setTimeout(() => {
      script.onload = () => scriptLoaded();
    }, 1500);

    document.body.appendChild(script);
  }, []);
  const scriptLoaded = () => {
    window.Travl();
  };

  return (
    <>
      <div className="dlabnav">
        <div className="dlabnav-scroll">
          <ul className="metismenu" id="menu">
            <li>
              <Link
                className=""
                to={"/OutletManagerDashboard"}
                aria-expanded="false"
              >
                <i className="flaticon-025-dashboard" />
                <span className="nav-text">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to={"/outletCustomers"} className="" aria-expanded="false">
                <i className="icon-people icons" />
                <span className="nav-text">Customers</span>
              </Link>
            </li>
            <li>
              <Link to={"/outletComplaintList"} className="" aria-expanded="false">
                <i className="icon-people icons" />
                <span className="nav-text">Complaints</span>
              </Link>
            </li>
            <li>
              <Link to={"/outletEnquiry"} className="" aria-expanded="false">
                <i className="fa fa-info-circle fw-bold" aria-hidden="true" />
                <span className="nav-text">Enquiry</span>
              </Link>
            </li>

            <li>
              <a className="has-arrow" href="#" aria-expanded="false">
                <i className="fa fa-calendar" aria-hidden="true" />
                <span className="nav-text">Ic's</span>
              </a>
              <ul aria-expanded="false">
                <li>
                  <Link to={"/outletIcs"}>All Ic's</Link>
                </li>
                <li>
                  <Link to={"/addNewIcs"}>Add New Ic's</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to={"/outlet-footfall-list"} className="" aria-expanded="false">
                <i className="icon-people icons" />
                <span className="nav-text">Footfall</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default OutletManagerSidebar;
