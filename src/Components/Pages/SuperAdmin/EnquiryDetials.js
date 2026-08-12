// import { toast } from "material-react-toastify";
// import moment from "moment";
// import React, { useEffect, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { Button, Offcanvas, OffcanvasBody, OffcanvasHeader } from "reactstrap";
// import { GetDataWithToken, PostDataWithToken } from "../../ApiHelper/ApiHelper";
// import { confirm } from "../../Common/ConfirmModal";
import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";
// import EnquiryCustom from "./Common/EnquiryCustom";
// import ReAssignmesurer from "../../Common/ReAssignmesurer";
// import WcrModal from "../../Common/WcrModal";
// import AdminRemarkModal from "../../Common/AdminRemarkModal";
// import Swal from "sweetalert2";
// import CompleteEnquiry from "../../Common/CompleteEnquiry";
// import { isArray } from "lodash";
// import ConfirmOrderModal from "../../Common/ConfirmOrderModal";
// import EnquiryDetailSkeleton from "../../Common/EnquiryDetailSkeleton";

import EnquiryDetailComponent from "../../Common/EnquiryDetailComponent";


export default function EnquiryDetials() {
  return (<>
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
      <EnquiryDetailComponent />
    </div>
  </>)
}