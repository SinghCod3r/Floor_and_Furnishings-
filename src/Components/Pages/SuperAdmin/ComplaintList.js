import { useEffect, useState } from "react";
import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";
import { GetDataWithToken, PutDataWithToken } from "../../ApiHelper/ApiHelper";
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import Loader from "../../Common/Loader";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "material-react-toastify";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { setfeedbackActiveTab } from "../../Store/Actions/UserAction";
import ComplaintFeedbackComponent from "../../Common/ComplaintFeedbackComponent";

const ComplaintList = () => {
  const dispatch = useDispatch();
  const tabOpen = useSelector((store) => store?.user?.feedback_active_tab);
  const [data, setData] = useState([]);
  const [complaintDetail, setComplaintDetail] = useState([]);

  const [customerDetail, setCustomerDetail] = useState();
  const [feedbackData, setFeedbackData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [tabOpen, setTabOpen] = useState("1");
  const [modalOpen, setModalOpen] = useState(false);
  const modalTogggle = () => setModalOpen(!modalOpen);
  const navigate = useNavigate();

  const setTabValue = (value) => {
    dispatch(setfeedbackActiveTab(value));
    // setTabOpen(value);
    // tabOpen === "1" ? setInvoiceType('CREDIT_NOTE') : setInvoiceType('INVOICES');
    // setCallApi(true);
    // setInvoiceData([]);
    // setIsLoading(true);
    // setCurrentPage(1);
  };

  const completeComplaintHandler = () => {
    // console.log("cccmplaintt", complaintDetail);
    Swal.fire({
      title: "Do you want to send feedback message?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Send",
      // denyButtonText: `Don't dont send`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        PutDataWithToken(
          `superadmin/complaint-resolved/${customerDetail?.id}`
        ).then((response) => {
          if (response.status === true) {
            toast.success("Complaint completed successfully");
          } else {
            toast.error(response.message);
          }
        });
        // Swal.fire('Saved!', '', 'success')
      }
    });
  };

  const complaintDetailHandler = (data) => {
    navigate("/ComplaintDetials", {
      state: { data: data },
    });

    // setCustomerDetail(data);

    // const result = [];
    // const nameToTypeMap = {};

    // for (const item of data?.complaint_info) {
    //   const { material, type } = item;

    //   if (!nameToTypeMap[material.name]) {
    //     nameToTypeMap[material.name] = type;
    //   } else {
    //     // If the name already exists in the map, append the type
    //     nameToTypeMap[material.name] += `, ${type}`;
    //   }
    // }
    // // Create the result array based on the nameToTypeMap
    // for (const name in nameToTypeMap) {
    //   const type = nameToTypeMap[name];
    //   result.push({ name, type });
    // }
    // console.log("prev...", data.complaint_info);
    // console.log("new....", result);
    // setComplaintDetail(result);

    // modalTogggle();
  };

  useEffect(() => {
    GetDataWithToken(`superadmin/get-customer-complaints`).then((response) => {
      setData(response.data);
      setIsLoading(false);
    });
    GetDataWithToken(`customer/get-feedback`).then((response) => {
      setFeedbackData(response.data);
    });
  }, []);

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
        <ComplaintFeedbackComponent />
      </div>
      {/* <Modal isOpen={modalOpen} toggle={modalTogggle}>
        <ModalHeader>Complaints Detail</ModalHeader>
        <ModalBody>
          <div className="container">
            {complaintDetail?.map((data) => (
              <div>
                <h3>{data?.name}:</h3>
                <p className="mx-3">{data?.type}</p>
              </div>
            ))}
            <div>
              <Link
                className="btn btn-primary"
                to="/AddInstalerSchdule"
                state={customerDetail}
              >
                Assign Installer
              </Link>
              <button
                className="btn btn-primary mx-2"
                onClick={completeComplaintHandler}
              >
                Complete Complaint{" "}
              </button>
            </div>
          </div>
        </ModalBody>
      </Modal> */}
    </>
  );
};
export default ComplaintList;
