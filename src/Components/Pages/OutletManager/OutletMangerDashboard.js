import Cookies from "js-cookie";
import OutletManagerHeader from "./OutletManagerHeader";
import OutletManagerSidebar from "./OutletManagerSidebar";

import DashboardComponent from "../SuperAdmin/Common/DashboardComponent";

function OutletMangerDashboard() {
  const storeId = Cookies.get("userID");

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
        <DashboardComponent
          outletManagerStore={storeId}
        />
      </div >

    </>
  );
}

export default OutletMangerDashboard;
