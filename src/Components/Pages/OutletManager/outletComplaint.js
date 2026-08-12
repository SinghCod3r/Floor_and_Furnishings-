
import { GetDataWithToken, PostDataWithToken, PutDataWithToken } from "../../ApiHelper/ApiHelper";
import { SalesPerson } from "../../Common/RoleType";
import OutletManagerHeader from "./OutletManagerHeader";
import OutletManagerSidebar from "./OutletManagerSidebar";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import Loader from "../../Common/Loader";
import { useInView } from "react-intersection-observer";
import ComplaintFeedbackComponent from "../../Common/ComplaintFeedbackComponent";

function OutletComplaintList() {
  return <div
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
    <ComplaintFeedbackComponent
      storeId={Cookies.get("userID")}
    />
  </div>
}

export default OutletComplaintList;
