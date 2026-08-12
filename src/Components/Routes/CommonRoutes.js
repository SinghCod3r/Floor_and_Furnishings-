import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../Auth/Login";
import DispatchTeamDashboard from "../Pages/DispatchTeam/DispatchTeamDashboard";
import OutletMangerDashboard from "../Pages/OutletManager/OutletMangerDashboard";
import StitchingStoreManagerDashboard from "../Pages/StitchingStoreManager/StitchingStoreManagerDashboard";
import Dashboard from "../Pages/SuperAdmin/Dashboard";

import {
  DispatchTeam,
  OutletManager,
  StitchingStoreManager,
  superAdmin,
} from "../Common/RoleType";
import SuperAdminTestPage from "../Pages/SuperAdmin/SuperAdminTestPage";
import AllOutlet from "../Pages/SuperAdmin/AllOutlet";
import EnquiryDetials from "../Pages/SuperAdmin/EnquiryDetials";
import SuperAdminOutletDashboard from "../Pages/SuperAdmin/SuperAdminOutletDashboard";
import AllCustomer from "../Pages/SuperAdmin/AllCustomer";
import CustomerDetials from "../Pages/SuperAdmin/CustomerDetials";
import AllEnquiry from "../Pages/SuperAdmin/AllEnquiry";
import AllInvoice from "../Pages/SuperAdmin/AllInvoice";
import AllSchedule from "../Pages/SuperAdmin/AllSchedule";
import AddSchedule from "../Pages/SuperAdmin/AddSchedule";
import AllOutletManager from "../Pages/SuperAdmin/AllOutletManager";
import AllSalesPerson from "../Pages/SuperAdmin/AllSalesPerson";
import AllDispatch from "../Pages/SuperAdmin/AllDispatch";
import AllStiching from "../Pages/SuperAdmin/AllStiching";
import AllMeasurer from "../Pages/SuperAdmin/AllMeasurer";
import AllTailor from "../Pages/SuperAdmin/AllTailor";
import AllQc from "../Pages/SuperAdmin/AllQc";
import AllInstaller from "../Pages/SuperAdmin/AllInstaller";
import AddNewUser from "../Pages/SuperAdmin/AddNewUser";
import DataTablebasic from "../Pages/SuperAdmin/Common/DataTablebasic";
import Error from "../Common/Error";
import { useSelector } from "react-redux";
import Search from "../Pages/SuperAdmin/Search";
import StaffDetials from "../Pages/SuperAdmin/StaffDetials";
import CreateTimeSlot from "../Pages/SuperAdmin/CreateTimeSlotMeasurer";
import CustomerRequestedTimeSlot from "../Pages/SuperAdmin/CustomerRequestedTimeSlot";
import CustomerSchedule from "../Pages/Customer/CustomerSchedule";
import EditEnquiry from "../Pages/SuperAdmin/EditEnquiry";
import OutletCustomers from "../Pages/OutletManager/OutletCustomers";
import OutletEnquiry from "../Pages/OutletManager/OutletEnquiry";
import OutletIcs from "../Pages/OutletManager/OutletIcs";
import AddNewIc from "../Pages/OutletManager/AddNewIc";
import OutletEnquiryDetials from "../Pages/OutletManager/OutletEnquiryDetials";
import OutletCustomerDetials from "../Pages/OutletManager/OutletCustomerDetials";
import OutletStaffDetials from "../Pages/OutletManager/OutletStaffDetials";
import AllNotification from "../Pages/SuperAdmin/Common/AllNotification";
import OutletSearch from "../Pages/OutletManager/OutletSearch";
import DispatchTeamProductDesc from "../Pages/DispatchTeam/DispatchTeamProductDesc";
import DispatchTeamProductConfirmation from "../Pages/DispatchTeam/DispatchTeamProductConfirmation";
import DispatchTeamAllOrders from "../Pages/DispatchTeam/DispatchTeamAllOrders";

import CreateNewQcCheck from "../Pages/SuperAdmin/CreateNewQcCheck";
import AllQcChecks from "../Pages/SuperAdmin/AllQcChecks";
import AddNewEnquiry from "../Pages/SuperAdmin/AddNewEnquiry";
import AddRooms from "../Pages/SuperAdmin/AddRooms";
import MesurerDetials from "../Pages/SuperAdmin/MesurerDetials";
import { AllWarehouse } from "../Pages/SuperAdmin/Warehouse/AllWarehouse";
import AddInstalerSchdule from "../Pages/SuperAdmin/AddInstalerSchdule";
import InstallerDetials from "../Pages/SuperAdmin/InstallerDetials";
import CreateOrder from "../Pages/SuperAdmin/CreateOrder";
import ViewEstimate from "../Pages/SuperAdmin/ViewEstimate";
import ClamValue from "../Pages/SuperAdmin/ClamValue";
import CustomerDetialsGetValue from "../Pages/SuperAdmin/CustomerDetialsGetValue";
import EnquiryProductList from "../Pages/SuperAdmin/EnquiryProductList";
import SearchStock from "../Pages/SuperAdmin/SearchStock";
import Orders from "../Pages/SuperAdmin/Orders";
import Invoices from "../Pages/SuperAdmin/Invoices";
import InvoiceDetails from "../Pages/SuperAdmin/InvoiceDetail";
import CustomerLedger from "../Pages/SuperAdmin/CustomerLedger";
import OrderDetails from "../Pages/SuperAdmin/OrderDetails";
import ItemDetails from "../Pages/SuperAdmin/ItemDetails";
import CustomerLedgerDetails from "../Pages/SuperAdmin/CustomerLedgerDetails";
import SearchEnquiry from "../Pages/SuperAdmin/SearchEnquiry";
import CreateTimeSlotMeasurer from "../Pages/SuperAdmin/CreateTimeSlotMeasurer";
import CreateTimeSlotInstaller from "../Pages/SuperAdmin/CreateTimeSlotInstaller";
import ComplaintList from "../Pages/SuperAdmin/ComplaintList";
import AddComplaint from "../Pages/SuperAdmin/AddComplaint";
import AddComplaintMain from "../Pages/SuperAdmin/AddComplaintMain";
import CustomerLogin from "../Pages/Customer/CustomerLogin";
import CustomerEnquiryList from "../Pages/Customer/CustomerEnquiryList";
import CustomerSelectOption from "../Pages/Customer/CustomerSelectOption";
import CustomerComplaintCategory from "../Pages/Customer/CustomerComplaintCategory";
import CustomerComplaintForm from "../Pages/Customer/CustomerComplaintForm";
import CustomerStatusDetail from "../Pages/Customer/CustomerStatusDetail";
import CustomerAssignMeasurer from "../Pages/Customer/CustomerAssignMeasurer";
import CustomerAssignInstaller from "../Pages/Customer/CustomerAssignInstaller";
import CustomerFeedback from "../Pages/Customer/CustomerFeedback";
import CustomerComplaintDetail from "../Pages/SuperAdmin/CustomerComplaintDetails";
import CustomerViewEstimate from "../Pages/Customer/CustomerViewEstimate";
import CustomerRequests from "../Pages/SuperAdmin/CustomerRequests";
import ComplaintDetials from "../Pages/SuperAdmin/ComplaintDetials";
import AllUserActivity from "../Pages/SuperAdmin/AllUserActivity";
import OutletViewAsstimate from "../Pages/OutletManager/OutletViewAsstimate";
import OutletComplaintList from "../Pages/OutletManager/outletComplaint";
import OutletComplaintDetail from "../Pages/OutletManager/OutletComplaintDetail";
import OutletCustomerComplaintCategory from "../Pages/OutletManager/OutletCustomerComplaintCategory";
import OutletCustomerComplaintForm from "../Pages/OutletManager/OutletCustomerComplaintForm";
import DashboardSummary from "../Pages/SuperAdmin/DashboardSummary";
import FootfallList from "../Pages/SuperAdmin/FootfallList";
import FootfallDetail from "../Pages/SuperAdmin/FootfallDetail";
import OutletFootfallList from "../Pages/OutletManager/OutletFootfall";
import OutletFootfallDetail from "../Pages/OutletManager/OutletFootfallDetail";
import OrderBill from "../Pages/SuperAdmin/OrderBill";
import OrderBillDetail from "../Pages/SuperAdmin/OrderBillDetail";
import ConfirmEnquiryOrder from "../Pages/SuperAdmin/ConfirmEnquiryOrder";
import OutletAssignInstaller from "../Pages/OutletManager/OutletAssignInstaller";
import OutletNotification from "../Pages/OutletManager/OutletNotification";
import PaymentHistory from "../Pages/SuperAdmin/PaymentHistory";
import PaymentLinks from "../Pages/SuperAdmin/PaymentLinks";
import ProductsList from "../Pages/SuperAdmin/ProductsList";

const CommonRoutes = () => {
  // const [type, setType] = useState({});
  const userDetails = useSelector((store) => store?.user?.userDetails?.type);

  // useEffect(() => {
  //   setType(userDetails);
  // }, [userDetails]);
  return (
    <BrowserRouter
      basename={process.env.PUBLIC_URL}
    >
      <Routes>
        <Route path="/" element={<Login />} />
        {userDetails === superAdmin || userDetails === OutletManager ? (
          <Route path="ViewEstimate" element={<ViewEstimate />} />
        ) : ""}
        {userDetails === superAdmin && (
          <>
            <Route path="/footfall-detail" element={<FootfallDetail />} />
            <Route path="/products-list" element={<ProductsList />} />
            <Route path="/customer-requests" element={<CustomerRequests />} />
            <Route path="/footfall-list" element={<FootfallList />} />
            <Route path="/payment-history" element={<PaymentHistory />} />
            {/* <Route path="/Payment-links" element={<PaymentLinks />} /> */}
            <Route
              path="/customer-feedback&complaint-detail"
              element={<CustomerComplaintDetail />}
            />
            <Route
              path="add-complaint-desription"
              element={<AddComplaintMain />}
            />
            <Route path="/complaint-list" element={<ComplaintList />} />
            <Route path="add-complaint" element={<AddComplaint />} />
            <Route path="/searh-enquiry" element={<SearchEnquiry />} />
            <Route
              path="/customer-ledger-detail"
              element={<CustomerLedgerDetails />}
            />
            <Route path="/invoice-detail" element={<InvoiceDetails />} />
            <Route path="/search-item-detail" element={<ItemDetails />} />
            <Route path="/order-detail" element={<OrderDetails />} />
            <Route path="/customer-ledger" element={<CustomerLedger />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/search-stock" element={<SearchStock />} />
            <Route path="/SuperAdminDashboard" element={<Dashboard />} />
            <Route
              path="/SuperAdmintestpage"
              element={<SuperAdminTestPage />}
            />
            <Route path="allOutlet" element={<AllOutlet />} />
            <Route path="/EnquiryDetials/:EnquiryParamId" element={<EnquiryDetials />} />
            <Route
              path="OutletDashboard"
              element={<SuperAdminOutletDashboard />}
            />
            <Route path="all-customer" element={<AllCustomer />} />
            <Route path="customer-detials" element={<CustomerDetials />} />
            <Route path="all-Enquiry" element={<AllEnquiry />} />
            <Route path="all-invoice" element={<AllInvoice />} />
            <Route path="add-schedule" element={<AddSchedule />} />
            <Route path="all-outlet-manager" element={<AllOutletManager />} />
            <Route path="all-sales-person" element={<AllSalesPerson />} />
            <Route path="all-dispatch" element={<AllDispatch />} />
            <Route path="All-stitching" element={<AllStiching />} />
            <Route path="All-measurer" element={<AllMeasurer />} />
            <Route path="all-Tailor" element={<AllTailor />} />
            <Route path="All-Qc" element={<AllQc />} />
            <Route path="All-Installer" element={<AllInstaller />} />
            <Route path="Add-new-user" element={<AddNewUser />} />
            <Route path="datatable" element={<DataTablebasic />} />
            <Route path="all-schedule" element={<AllSchedule />} />
            <Route path="Search" element={<Search />} />
            <Route path="Staff-detials" element={<StaffDetials />} />
            <Route path="Measurer-detials" element={<MesurerDetials />} />
            <Route
              path="create-time-slot-measurer"
              element={<CreateTimeSlotMeasurer />}
            />
            <Route
              path="create-time-slot-installer"
              element={<CreateTimeSlotInstaller />}
            />
            <Route
              path="Customer-requested-time-slot"
              element={<CustomerRequestedTimeSlot />}
            />
            <Route path="edit-enquiry" element={<EditEnquiry />} />
            <Route path="Notification" element={<AllNotification />} />
            <Route path="CreateQcCheck" element={<CreateNewQcCheck />} />
            <Route path="AllQcChecks" element={<AllQcChecks />} />
            <Route path="addNewEnquiry" element={<AddNewEnquiry />} />
            <Route path="AddRooms" element={<AddRooms />} />
            <Route path="Allwarehouse" element={<AllWarehouse />} />
            <Route path="AddInstalerSchdule" element={<AddInstalerSchdule />} />
            <Route path="InstallerDetials" element={<InstallerDetials />} />
            <Route path="CreateOrder" element={<CreateOrder />} />

            <Route path="ClamValue" element={<ClamValue />} />
            <Route
              path="CustomerDetialsGetValues"
              element={<CustomerDetialsGetValue />}
            />
            <Route path="EnquiryProductList" element={<EnquiryProductList />} />
            <Route path="ComplaintDetials" element={<ComplaintDetials />} />
            <Route path="AllUserActivity" element={<AllUserActivity />} />
            <Route path="/order-bill" element={<OrderBill />} />
            <Route path="/order-bill-detail" element={<OrderBillDetail />} />
            <Route path="/confirm-enquiry-order" element={<ConfirmEnquiryOrder />} />
          </>
        )}

        {userDetails === DispatchTeam && (
          <>
            <Route
              path="/DispatchTeamDashboard"
              element={<DispatchTeamDashboard />}
            />
            <Route
              path="/DispatchTeamProductDescription"
              element={<DispatchTeamProductDesc />}
            />
            <Route
              path="DispatchTeam-product-confirmation"
              element={<DispatchTeamProductConfirmation />}
            />
            <Route
              path="dispatch-team-all-order"
              element={<DispatchTeamAllOrders />}
            />
          </>
        )}

        {userDetails === OutletManager && (
          <>
            <Route path="/outlet-footfall-list" element={<OutletFootfallList />} />
            <Route path="/outlet-notification" element={<OutletNotification />} />
            <Route path="/outlet-assign-installer" element={<OutletAssignInstaller />} />
            <Route path="/outlet-footfall-detail" element={<OutletFootfallDetail />} />
            <Route
              path="/outletComplaintDetail"
              element={<OutletComplaintDetail />}
            />
            <Route
              path="/outlet-customer-complaint-form"
              element={<OutletCustomerComplaintForm />}
            />
            <Route
              path="/outlet-customer-complaint-category"
              element={<OutletCustomerComplaintCategory />}
            />
            <Route
              path="/outletComplaintList"
              element={<OutletComplaintList />}
            />
            <Route
              path="/OutletManagerDashboard"
              element={<OutletMangerDashboard />}
            />
            <Route path="outletCustomers" element={<OutletCustomers />} />
            <Route path="outletEnquiry" element={<OutletEnquiry />} />
            <Route path="outletIcs" element={<OutletIcs />} />
            <Route path="addNewIcs" element={<AddNewIc />} />
            <Route
              path="OutletEnquiryDetials/:EnquiryParamId"
              element={<OutletEnquiryDetials />}
            />
            <Route
              path="/OutletCustomerDetials"
              element={<OutletCustomerDetials />}
            />
            <Route path="OutletStaffDetials" element={<OutletStaffDetials />} />
            <Route path="OutletSearch" element={<OutletSearch />} />
            <Route path="outletAsstimate" element={<OutletViewAsstimate />} />
          </>
        )}

        {userDetails === StitchingStoreManager && (
          <>
            <Route
              path="/StitchingStoreManagerDashboard"
              element={<StitchingStoreManagerDashboard />}
            />
          </>
        )}

        <Route path="*" element={<Error />} />

        <Route
          path="customer-assign-Installer"
          element={<CustomerAssignInstaller />}
        />
        <Route
          path="customer-assign-mearurer"
          element={<CustomerAssignMeasurer />}
        />
        <Route
          path="customer-status-detail"
          element={<CustomerStatusDetail />}
        />
        <Route path="customer-schedule/:url" element={<CustomerSchedule />} />
        <Route
          path="/customer-view-estimate"
          element={<CustomerViewEstimate />}
        />
        <Route path="customer-login" element={<CustomerLogin />} />
        <Route path="customer-Enquiries" element={<CustomerEnquiryList />} />
        <Route path="customer-options" element={<CustomerSelectOption />} />
        <Route
          path="customer-complaint-category"
          element={<CustomerComplaintCategory />}
        />
        <Route
          path="customer-complaint-form"
          element={<CustomerComplaintForm />}
        />
        <Route path="customer-feedback" element={<CustomerFeedback />} />
        <Route path="/dashboard-summary" element={<DashboardSummary />} />
      </Routes>
    </BrowserRouter>
  );
};

export default CommonRoutes;
