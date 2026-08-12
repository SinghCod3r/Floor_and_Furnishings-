import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GetDataWithToken } from "../../../ApiHelper/ApiHelper";
import SuperAdminHeader from "./SuperAdminHeader";
import SuperAdminSidebar from "./SuperAdminSidebar";
import NotificationComponent from "../../../Common/NotificationComponent";

function AllNotification() {

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
        <NotificationComponent />
      </div>
    </>
  );
}

export default AllNotification;
