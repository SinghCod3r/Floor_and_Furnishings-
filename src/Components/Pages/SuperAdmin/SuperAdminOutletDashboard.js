import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import { DownloadReportFunction, GetDataWithToken } from "../../ApiHelper/ApiHelper";
import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";
import EditOutletModal from "../../Common/EditOutletModal";
import moment from "moment";
import axios from "axios";
import { DatePicker, DateRangePicker } from "rsuite";
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink, Spinner, TabContent, TabPane } from "reactstrap";
import ReactApexChart from "react-apexcharts";
import Pagination from "react-js-pagination";
import EnquiryDetailModal from "../../Common/EnquiryDetailModal";
import OverdueDetails from "../../Common/OverDueDetailModal";
import DashboardFilterModal from "../../Common/DashboardFilterModal";
import DashboardComponent from "./Common/DashboardComponent";

function SuperAdminOutletDashboard() {
  const location = useLocation();

  return (
    <>
      <div
        data-typography="poppins"
        data-theme-version="light"
        data-layout="vertical"
        data-nav-headerbg="color_1"
        data-headerbg="color_1"
        data-sidebar-style="full"
        data-sibebarbg="color_1"
        data-sidebar-position="fixed"
        data-header-position="fixed"
        data-container="wide"
        direction="ltr"
        data-primary="color_1"
        id="main-wrapper"
        className="show"
      >
        <SuperAdminHeader />
        <SuperAdminSidebar />
        <DashboardComponent
          outletManagerStore={location?.state?.data}
          superAdmin={true}
        />
      </div>
    </>
  );
}

export default SuperAdminOutletDashboard;
