import NotificationComponent from "../../Common/NotificationComponent";
import OutletManagerHeader from "./OutletManagerHeader";
import OutletManagerSidebar from "./OutletManagerSidebar";

export default function OutletNotification() {
  return (<>
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
      <NotificationComponent />
    </div>
  </>)
}