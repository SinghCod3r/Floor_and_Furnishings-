import React from "react";
import { Link } from "react-router-dom";

function DispatchTeamSidebar() {
  return (
    <>
      <div className="dlabnav">
        <div className="dlabnav-scroll">
          <ul className="metismenu" id="menu">
            <li>
              <Link
                className=""
                to={"/DispatchTeamDashboard"}
                aria-expanded="false"
              >
                <i className="flaticon-025-dashboard" />
                <span className="nav-text">Dashboard</span>
              </Link>
            </li>
            <li>
              <a
                className="has-arrow"
                href="javascript:void()"
                aria-expanded="false"
              >
                <i className="fa fa-calendar" aria-hidden="true" />
                <span className="nav-text">Order</span>
              </a>
              <ul aria-expanded="false">
                <li>
                  <Link to={"/dispatch-team-all-order"}>All Orders</Link>
                </li>
                <li>
                  <a href="pending.html">Pending</a>
                </li>
                <li>
                  <a href="completed.html">Completed</a>
                </li>
                {/* <li><a href="Schedule.html">Schedule a Installer</a></li>
                      <li><a href="Schedule.html">Schedule a Tailer</a></li> */}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default DispatchTeamSidebar;
