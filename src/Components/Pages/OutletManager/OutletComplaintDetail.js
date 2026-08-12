import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { PostDataWithToken, PutDataWithToken } from "../../ApiHelper/ApiHelper";
import { toast } from "material-react-toastify";
import RemarkModal from "../../Common/RemarkModal";
import OutletManagerHeader from "./OutletManagerHeader";
import OutletManagerSidebar from "./OutletManagerSidebar";

function OutletComplaintDetail() {

    const location = useLocation();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    console.log("location", location.state.data);
    const [CustomerDetials, setCustomerDetials] = useState({});
    const [openRemarkModal, setOpenRemarkModal] = useState(false);

    const [openRemarkModal2, setOpenRemarkModal2] = useState(false);

    const modalToggle = () => {
        setOpenRemarkModal(!openRemarkModal);
    };

    const modalToggle2 = () => {
        setOpenRemarkModal2(!openRemarkModal2);
    };


    useEffect(() => {
        setCustomerDetials(location.state?.data);
        console.log("setCustomerDetials", location.state);
    }, []);

    const submitComplaintApi = (data, resetData) => {
        setIsLoading(true);
        PutDataWithToken(`superadmin/complaint-resolved/${location?.state?.data?.id}`, { remark: data.remark }).then((response) => {
            if (response.status === true) {
                setCustomerDetials({ ...CustomerDetials, remark: response?.data?.remark })
                toast.success("Complaint completed successfully");
                modalToggle();
                resetData();
                setIsLoading(false);
            } else {
                resetData();
                toast.error(response.message);
                setIsLoading(false);
            }
        })
    }

    const submitRemarkApi = (data, resetData) => {
        setIsLoading(true);
        PostDataWithToken(`customer/add-complaint-remark`, { complaint_id: location?.state?.data?.id, remark: data.remark }).then((response) => {
            if (response.status === true) {
                setIsLoading(false);
                toast.success("Remark completed successfully");
                setCustomerDetials({ ...CustomerDetials, remark: response?.data?.remark })
                modalToggle2();
                resetData();
            } else {
                setIsLoading(false);
                toast.error(response.message);
                resetData();
            }
        })
    }

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
                <div className="content-body">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="card overflow-hidden">
                                    <div className="row m-0">
                                        <div className="col-xl-12 p-0">
                                            <div className="card-body">
                                                <div className="guest-profile">
                                                    <div className="d-flex">
                                                        <img src="./images/user.png" alt="" />
                                                        <div>
                                                            <h2 className="font-w600 ">
                                                                {CustomerDetials?.enquiry?.customer?.firstName}
                                                                {CustomerDetials?.enquiry?.customer?.lastName}
                                                            </h2>
                                                            <span className="text-secondary">
                                                                ID #{CustomerDetials?.enquiry?.customer?.id}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        {/* <button
                        className="btn btn-primary"
                        onClick={() => {
                          navigate("/addRooms", {
                            state: { data: CustomerDetials?.id },
                          });
                        }}
                      >
                        Add New Enquiry
                      </button> */}
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-lg-3">
                                                            <div className="mt-4 check-status">
                                                                <span className="d-block mb-2">
                                                                    Primary Email
                                                                </span>
                                                                <span className="font-w500 fs-16">
                                                                    {CustomerDetials?.enquiry?.customer?.primary_email}
                                                                </span>
                                                            </div>
                                                            <div className="mt-4 check-status">
                                                                <span className="d-block mb-2">
                                                                    Secondary Email
                                                                </span>
                                                                <span className="font-w500 fs-16">
                                                                    {CustomerDetials?.enquiry?.customer?.secondary_email}
                                                                </span>
                                                            </div>
                                                            <div className="mt-4 check-status">
                                                                <span className="d-block mb-2">
                                                                    Installer Name
                                                                </span>
                                                                <span className="font-w500 fs-16">
                                                                    {CustomerDetials?.INSTALLER?.firstName}  {CustomerDetials?.INSTALLER?.lastName}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-3">
                                                            <div className="mt-4">
                                                                <span className="d-block mb-2">Phone Number</span>
                                                                <span className="font-w500 fs-16">
                                                                    {CustomerDetials?.enquiry?.customer?.primary_phone}
                                                                </span>
                                                            </div>
                                                            <div className="mt-4">
                                                                <span className="d-block mb-2">
                                                                    Secondary Phone Number
                                                                </span>
                                                                <span className="font-w500 fs-16">
                                                                    {CustomerDetials?.enquiry?.customer?.secondary_phone}
                                                                </span>
                                                            </div>
                                                            <div className="mt-4">
                                                                <span className="d-block mb-2">
                                                                    Store
                                                                </span>
                                                                <span className="font-w500 fs-16">
                                                                    {CustomerDetials?.store?.firstName}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4">
                                                            <div className="mt-4">
                                                                <span className="d-block mb-2">Address</span>
                                                                <span className="font-w500 fs-16">
                                                                    {CustomerDetials?.enquiry?.address}
                                                                </span>
                                                            </div>
                                                            <div className="mt-4">
                                                                <span className="d-block mb-2">
                                                                    Company name and GST
                                                                </span>
                                                                <span className="font-w500 fs-16">
                                                                    {CustomerDetials?.enquiry?.customer?.companyName} :{" "}
                                                                    {CustomerDetials?.enquiry?.customer?.GST}
                                                                </span>
                                                            </div>
                                                            <div className="mt-4">
                                                                <span className="d-block mb-2">
                                                                    IC Name
                                                                </span>
                                                                <span className="font-w500 fs-16">
                                                                    {CustomerDetials?.enquiry?.user?.firstName} {CustomerDetials?.enquiry?.user?.lastName}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-12">
                                <div className="card">
                                    <div className="card-header border-0 d-flex justify-content-between" >
                                        <h4 className="fs-20">Complaint Detials</h4>
                                        <div>
                                            {/* {CustomerDetials?.status !== "completed" && <Link className="btn btn-primary me-1" to="/outlet-assign-installer"
                                                state={{ ...CustomerDetials, category: location?.state?.data?.enquiry?.products }}>Assign Installer</Link>} */}
                                            <button type="button" onClick={modalToggle2} className="btn btn-primary me-1">
                                                Add Remark
                                            </button>
                                            {/* {CustomerDetials?.status !== "completed" && <button type="button" onClick={modalToggle} className="btn btn-primary">
                                                Complete Complaint
                                            </button>} */}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6 ps-5">
                                            <div className="mt-4 check-status">
                                                <span className="mb-2">Enquiry ID:</span>
                                                <span className="font-w500 fs-16 ms-5">
                                                    {CustomerDetials?.enquiry?.id}
                                                </span>
                                            </div>
                                            <div className="mt-4 check-status">
                                                <span className="mb-2">Enquiry Address:</span>
                                                <span className="font-w500 fs-16 ms-5">
                                                    {CustomerDetials?.enquiry?.address}
                                                </span>
                                            </div>
                                            <div className="mt-4 check-status">
                                                <span className="mb-2">Admin Remark:</span>
                                                <span className="font-w500 fs-16 ms-5">
                                                    {CustomerDetials?.enquiry?.admin_remark}
                                                </span>
                                            </div>
                                            <div className="mt-4 check-status">
                                                <span className="mb-2">Comment:</span>
                                                <span className="font-w500 fs-16 ms-5">
                                                    {CustomerDetials?.enquiry?.comment}
                                                </span>
                                            </div>
                                            <div className="mt-4 check-status">
                                                <span className="mb-2">Amount:</span>
                                                <span className="font-w500 fs-16 ms-5">
                                                    {CustomerDetials?.enquiry?.amount}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 ps-5">
                                            <div className="mt-4 check-status">
                                                <span className="mb-2">Expected Delivery Date :</span>
                                                <span className="font-w500 fs-16 ms-5">
                                                    {CustomerDetials?.enquiry?.expected_delivery_date}
                                                </span>
                                            </div>
                                            <div className="mt-4 check-status">
                                                <span className="mb-2">Expected Installation Date:</span>
                                                <span className="font-w500 fs-16 ms-5">
                                                    {CustomerDetials?.enquiry?.expected_installation_date}
                                                </span>
                                            </div>
                                            <div className="mt-4 check-status">
                                                <span className="mb-2">Cartage :</span>
                                                <span className="font-w500 fs-16 ms-5">
                                                    {CustomerDetials?.enquiry?.cartage}
                                                </span>
                                            </div>
                                            <div className="mt-4 check-status d-flex">
                                                <span className="mb-2">Remark:</span>
                                                <span className="font-w500 fs-16 ms-5 table-responsive" style={{ height: "150px", width: "100%", overflowY: "auto" }}>
                                                    {CustomerDetials?.remark &&
                                                        JSON?.parse(CustomerDetials?.remark)?.map((item, index) =>
                                                            <span className="d-block" >{`${index + 1}.`} {item}</span>
                                                        )}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="table-responsive">
                                        <table
                                            id="example4"
                                            className="table card-table display mb-4 shadow-hover"
                                            style={{ minWidth: "845px", textAlign: "center" }}
                                        >
                                            <thead>
                                                <tr>
                                                    <th>Complaint ID</th>
                                                    <th>Complaint Type</th>
                                                    <th>Material</th>
                                                    <th>Complaint Description</th>
                                                    {/* <th>Action</th> */}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {CustomerDetials?.complaint_info?.map((item, index) =>
                                                    < tr >
                                                        <td>
                                                            {item?.complaintId}
                                                        </td>
                                                        <td>
                                                            {item?.type}
                                                        </td>
                                                        <td>{item?.material?.name}</td>
                                                        <td class="d-flex justify-content-center">
                                                            <div className="table-responsive" style={{ height: "60px", width: "400px", overflowY: "auto" }}>
                                                                {item?.description}
                                                            </div>
                                                        </td>
                                                        {/* <td>
                           
                          </td> */}
                                                    </tr>)}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <RemarkModal modal={openRemarkModal} title="Add a Complaint" toggle={modalToggle} submitData={submitComplaintApi} loadingState={isLoading} />
            <RemarkModal modal={openRemarkModal2} toggle={modalToggle2} title="Add a Remark" submitData={submitRemarkApi} loadingState={isLoading} />
        </>
    );
}

export default OutletComplaintDetail;
