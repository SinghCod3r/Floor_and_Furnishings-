import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function SuperAdminSidebar() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `${process.env.PUBLIC_URL}/js/custom.min.js`;
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
      {/*----- Side bar start ----*/}
      <div className="dlabnav">
        <div className="dlabnav-scroll">
          <ul className="metismenu" id="menu">
            <li>
              <Link to={"/SuperAdminDashboard"} aria-expanded="false">
                <i className="flaticon-025-dashboard" />
                <span className="nav-text">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to={"/allOutlet"} className aria-expanded="false">
                <i className="fas fa-warehouse fw-bold" aria-hidden="true" />
                <span className="nav-text">Store</span>
              </Link>
            </li>
            {/* <li>
              <Link to={"/footfall-list"} className aria-expanded="false">
                <i className="fa fa-ship fw-bold" aria-hidden="true" />
                <span className="nav-text">Footfall</span>
              </Link>
            </li> */}
            {/* <li>
              <Link to={"/allWarehouse"} className aria-expanded="false">
                <i className="fa fa-ship fw-bold" aria-hidden="true" />
                <span className="nav-text">Warehouse</span>
              </Link>
            </li> */}
            <li>
              <Link to={"/all-customer"} className aria-expanded="false">
                <i className="icon-people icons" />
                <span className="nav-text">Customers</span>
              </Link>
            </li>
            {/* <li>
              <Link to={"/order-bill"} className aria-expanded="false">
                <i className="icon-people icons" />
                <span className="nav-text">Order Bills</span>
              </Link>
            </li> */}
            <li>
              <Link to={"/all-Enquiry"} className aria-expanded="false">
                <i className="fa fa-info-circle fw-bold" aria-hidden="true" />
                <span className="nav-text">Enquiry</span>
              </Link>
            </li>
            <li>
              <Link to={"/Payment-history"} className aria-expanded="false">
                <i className="fa fa-info-circle fw-bold" aria-hidden="true" />
                <span className="nav-text">Payment History</span>
              </Link>
            </li>
            <li>
              <Link to={"/products-list"} className aria-expanded="false">
                <i className="fa fa-info-circle fw-bold" aria-hidden="true" />
                <span className="nav-text">Products</span>
              </Link>
            </li>
            {/* <li>
              <Link to={"/Payment-links"} className aria-expanded="false">
                <i className="fa fa-info-circle fw-bold" aria-hidden="true" />
                <span className="nav-text">Payment Links</span>
              </Link>
            </li> */}
            {/* <li>
              <Link to={"/search-stock"} className aria-expanded="false">
                <i className="fa fa-search fw-bold" aria-hidden="true" />
                <span className="nav-text">search stock</span>
              </Link>
            </li> */}
            {/* <li>
              <Link to={"/orders"} className aria-expanded="false">
                <i className="fa fa-list fw-bold" aria-hidden="true" />
                <span className="nav-text">orders</span>
              </Link>
            </li> */}
            <li>
              <Link to={"/customer-requests"} className aria-expanded="false">
                <i className="fa fa-list fw-bold" aria-hidden="true" />
                <span className="nav-text">Customer Requests</span>
              </Link>
            </li>
            {/* <li>
              <Link to={"/invoices"} className aria-expanded="false">
                <i className="fa fa-table fw-bold" aria-hidden="true" />
                <span className="nav-text">invoices</span>
              </Link>
            </li> */}
            <li>
              <Link to={"/customer-ledger"} className aria-expanded="false">
                <i className="fa fa-book-open fw-bold" aria-hidden="true" />
                <span className="nav-text">customer ledger</span>
              </Link>
            </li>
            {/* <li>
              <Link to={"/searh-enquiry"} className aria-expanded="false">
                <i className="fa fa-book-open fw-bold" aria-hidden="true" />
                <span className="nav-text">Search enquiry</span>
              </Link>
            </li> */}

            <li>
              <a
                className="has-arrow"
                href="javascript:void()"
                aria-expanded="false"
              >
                <i
                  className="fas fa-exclamation fa-3x"
                  data-fa-mask="fa-comment"
                  data-fa-transform="shrink-7 up-.5"
                  aria-hidden="true"
                />
                <span className="nav-text">Complaint/Feedback</span>
              </a>
              <ul aria-expanded="false">
                <li>
                  <Link to={"/add-complaint"}>Add Complaints</Link>
                </li>
                <li>
                  <Link to={"/complaint-list"}>
                    Customer complaints and feedbacks
                  </Link>
                </li>
                {/* <li>
                  <Link to={"/all-schedule"}>All Schedules</Link>
                </li> */}
                {/* <li>
                  <Link to={"/add-schedule"}>Schedule Enquiry</Link>
                </li> */}

                {/* <li><a href="Schedule.html">Schedule a Installer</a></li>
                      <li><a href="Schedule.html">Schedule a Tailer</a></li> */}
              </ul>
            </li>
            {/* <li>
              <Link to={"/all-invoice"} className aria-expanded="false">
                <i className="flaticon-022-copy" />
                <span className="nav-text">Invoice</span>
              </Link>
            </li> */}
            <li>
              <a
                className="has-arrow"
                href="javascript:void()"
                aria-expanded="false"
              >
                <i className="fa fa-calendar" aria-hidden="true" />
                <span className="nav-text">Measurer Schedule</span>
              </a>
              <ul aria-expanded="false">
                <li>
                  <Link to={"/create-time-slot-measurer"}>Measurer Time Slot</Link>
                </li>
                {/* <li>
                  <Link to={"/Customer-requested-time-slot"}>
                    Customer requested time slot
                  </Link>
                </li> */}
                {/* <li>
                  <Link to={"/all-schedule"}>All Schedules</Link>
                </li> */}
                {/* <li>
                  <Link to={"/add-schedule"}>Schedule Enquiry</Link>
                </li> */}

                {/* <li><a href="Schedule.html">Schedule a Installer</a></li>
                      <li><a href="Schedule.html">Schedule a Tailer</a></li> */}
              </ul>
            </li>
            <li>
              <a
                className="has-arrow"
                href="javascript:void()"
                aria-expanded="false"
              >
                <i className="fa fa-calendar" aria-hidden="true" />
                <span className="nav-text">Installer Schedule</span>
              </a>
              <ul aria-expanded="false">
                <li>
                  <Link to={"/create-time-slot-installer"}>Installer Time Slot</Link>
                </li>
                {/* <li>
                  <Link to={"/Customer-requested-time-slot"}>
                    Customer requested time slot
                  </Link>
                </li> */}
                {/* <li>
                  <Link to={"/all-schedule"}>All Schedules</Link>
                </li> */}
                {/* <li>
                  <Link to={"/add-schedule"}>Schedule Enquiry</Link>
                </li> */}

                {/* <li><a href="Schedule.html">Schedule a Installer</a></li>
                      <li><a href="Schedule.html">Schedule a Tailer</a></li> */}
              </ul>
            </li>

            <li>
              <a
                className="has-arrow"
                href="javascript:void()"
                aria-expanded="false"
              >
                <i className="fa fa-address-card" aria-hidden="true" />
                <span className="nav-text">Qc Checks</span>
              </a>
              <ul aria-expanded="false">
                {/* <li>
                  <Link to={"/all-outlet-manager"}>All Outlet Manager</Link>
                </li> */}
                <li>
                  <Link to={"/AllQcChecks"}>All Qc Checks </Link>
                </li>
                <li>
                  <Link to={"/CreateQcCheck"}> New Qc Check</Link>
                </li>
              </ul>
            </li>
            <li>
              <a
                className="has-arrow"
                href="javascript:void()"
                aria-expanded="false"
              >
                <i className="fa fa-address-card" aria-hidden="true" />
                <span className="nav-text">Users</span>
              </a>
              <ul aria-expanded="false">
                <li>
                  <Link to={"/AllUserActivity"}>All User Activity</Link>
                </li>
                <li>
                  <Link to={"/all-sales-person"}>All Sales Person </Link>
                </li>
                {/* <li>
                  <Link to={"/all-dispatch"}> All Dispatch Person</Link>
                </li> */}
                <li>
                  <Link to={"/All-measurer"}> All Measurer</Link>
                </li>
                <li>
                  <Link to={"/All-stitching"}> All Stitching Manager</Link>
                </li>

                {/* <li>
                  <Link to={"/all-Tailor"}> All Tailor</Link>
                </li> */}
                {/* <li>
                  <Link to={"/All-Qc"}> All QC</Link>
                </li> */}
                <li>
                  <Link to={"/All-Installer"}> All Installer</Link>
                </li>
              </ul>
            </li>

            {/* <li>
              <Link to={"/ClamValue"} className aria-expanded="false">
                <i className="icon-shuffle icons fw-bold" />
                <span className="nav-text"> Claim Value </span>
              </Link>
            </li> */}
            {/* <li>
              <a
                href="Dispatch_Department_dashboard.html"
                className
                aria-expanded="false"
              >
                <i className="icon-social-dropbox icons fw-bold" />
                <span className="nav-text">Dispatch Manager</span>
              </a>
            </li> */}
          </ul>
        </div>
      </div>
      {/*----- Side bar End ----*/}
    </>
  );
}

export default SuperAdminSidebar;
