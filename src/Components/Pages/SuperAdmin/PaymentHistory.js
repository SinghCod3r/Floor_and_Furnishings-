import PaymentHistoryComponent from "../../Common/paymentHistoryComponent";
import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";

const PaymentHistory = () => {
  return (<div
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
    className="show">
    <SuperAdminHeader />
    <SuperAdminSidebar />
    <PaymentHistoryComponent />
  </div>
  )
}
export default PaymentHistory;