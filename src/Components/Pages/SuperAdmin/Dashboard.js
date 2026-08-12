import DashboardComponent from "./Common/DashboardComponent";
import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";


export default function Dashboard() {
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
      <DashboardComponent />
    </div>
  </>)
}