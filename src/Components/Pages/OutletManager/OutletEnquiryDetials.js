// import { toast } from "material-react-toastify";
// import moment from "moment";
// import React, { useEffect, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { GetDataWithToken, PostDataWithToken } from "../../ApiHelper/ApiHelper";
// import { confirm } from "../../Common/ConfirmModal";
import OutletManagerHeader from "./OutletManagerHeader";
import OutletManagerSidebar from "./OutletManagerSidebar";
// import EnquiryCustom from "../SuperAdmin/Common/EnquiryCustom";
// import Swal from "sweetalert2";
// import AdminRemarkModal from "../../Common/AdminRemarkModal";
// import ReAssignmesurer from "../../Common/ReAssignmesurer";
// import WcrModal from "../../Common/WcrModal";

import EnquiryDetailComponent from "../../Common/EnquiryDetailComponent";

function EnquiryDetials() {
  return (
    <>
      <div
        data-typography="poppins"
        data-theme-version="light"
        data-layout="horizontal"
        data-nav-headerbg="color_1"
        data-headerbg="color_1"
        data-sidebar-style="full"
        data-sibebarbg="color_1"
        data-sidebar-position="fixed"
        data-header-position="fixed"
        data-container="wide"
        direction="ltr"
        data-primary="color_1"
        className="outlet_style"
      >
        <OutletManagerHeader />
        <OutletManagerSidebar />
        <EnquiryDetailComponent outletManager={true} />
      </div>
    </>
  );
}

export default EnquiryDetials;
