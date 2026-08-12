// import { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// // import { GetDataWithToken, PostData } from "../../ApiHelper/ApiHelper";
// import { useForm } from "react-hook-form";
// import { GetData, PostData } from "../../ApiHelper/ApiHelper";
// import { toast } from "react-toastify";
// import SuperAdminHeader from "./Common/SuperAdminHeader";
// import SuperAdminSidebar from "./Common/SuperAdminSidebar";

import { Link, useLocation, useNavigate } from "react-router-dom";
// import SuperAdminHeader from "./Common/SuperAdminHeader";
// import SuperAdminSidebar from "./Common/SuperAdminSidebar";
import { GetDataWithToken, PostData, PostDataWithToken } from "../../ApiHelper/ApiHelper";
import { useEffect, useState } from "react";
import { toast } from "material-react-toastify";
import { useForm } from "react-hook-form";
import SuperAdminHeader from "../SuperAdmin/Common/SuperAdminHeader";
import SuperAdminSidebar from "../SuperAdmin/Common/SuperAdminSidebar";
import OutletManagerHeader from "./OutletManagerHeader";
import OutletManagerSidebar from "./OutletManagerSidebar";

const OutletCustomerComplaintForm = () => {
    const navigate = useNavigate(-1);
    const [selectedComplaint, setSelectedComplaint] = useState([]);
    const [timeSlotList, setTimeSlotList] = useState([]);
    const [timeSlotValue, setTimeSlotValue] = useState("");
    const [warehouseList, setWarehouseList] = useState([]);
    const location = useLocation();
    console.log("locaattee", location);
    const [callApi, setCallApi] = useState(true);
    const [installerCallApi, setInstallerCallApi] = useState(false);
    const [installerList, setInstallerList] = useState([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log("submit dataaaa...", data);
        const submitData = {
            complaint_details: selectedComplaint,
            scheduleId: timeSlotValue,
            enquiryId: location?.state?.enquiry?.id,
            status: location?.state?.enquiry?.status,
            installerId: data?.installer,
            date: data?.date,
            remark: data?.remark,
            complaintId: selectedComplaint,
            warehouseId: data?.warehouse
        };

        PostDataWithToken(`customer/make-a-complaint`, submitData).then((response) => {
            if (response.status === true) {
                toast.success("complaint filed successfully");
                navigate("/outletComplaintList");
                // navigate(-1);
            } else {
                // console.log(response);
                toast.error(response.data.message);
            }
        });
    }

    const timeSlotChangeHandler = (event) => {
        setTimeSlotValue(event.target.value);
        setInstallerCallApi(true);
    }

    useEffect(() => {
        if (callApi) {
            GetDataWithToken(`customer/get-all-warehouse`).then(response => {
                if (response.status === true) {
                    setWarehouseList(response.data);
                }
            })
        }
        if (callApi) {
            GetDataWithToken(`superadmin/get-schedule?type=installer`).then(response => {
                if (response.status === true) {
                    setCallApi(false);
                    setTimeSlotList(response.data);
                }
            })
        }
        if (installerCallApi) {
            GetDataWithToken(`installer/get-unassign-installer/${timeSlotValue}`).then(response => {
                if (response.status === true) {
                    setInstallerList(response?.data);
                    setInstallerCallApi(false);
                }
            })
        }
    }, [callApi, installerCallApi])

    return (
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
            <OutletManagerHeader />
            <OutletManagerSidebar />
            <div className="content-body">
                {/*--- row ---*/}
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title">Complaints</h4>
                                    {/* <Link to="/all-customer" className="btn btn-primary" >Add Complaint</Link> */}
                                </div>
                                <div className="card-body">
                                    <div className="basic-form p-3">
                                        <form
                                            onSubmit={handleSubmit(onSubmit)}
                                        >
                                            <div class="row align-items-center">
                                                {location?.state?.data?.map((data, index) =>
                                                    < div class="col-lg-12 my-1">
                                                        <label class="me-sm-2">Select Complaint for {data?.name}</label>
                                                        <select class="me-sm-2  form-control"
                                                            onChange={(e) => {
                                                                setSelectedComplaint((prevValue) => {

                                                                    const updatedValues = [...prevValue];
                                                                    updatedValues[index] = {
                                                                        type: e.target.value?.split("/?#/?")?.[1],
                                                                        description: e.target.value?.split("/?#/?")?.[2],
                                                                        complaintId: e.target.value?.split("/?#/?")?.[0],
                                                                        purchase_complaint: e.target.value?.split("/?#/?")?.[3],
                                                                    }; // Use index to store values in the correct position
                                                                    console.log("selected..", updatedValues);
                                                                    return updatedValues;
                                                                });
                                                            }}
                                                        >
                                                            <option>Choose...</option>
                                                            {data?.complaints?.map((data) => <option value={`${data?.id}/?#/?${data?.type}/?#/?${data?.description}/?#/?${data?.purchase_complaint === true ? "1" : "0"}`}>{data?.type}</option>)}
                                                        </select>
                                                        <div>
                                                            {data?.complaints?.map((data, index2) => data?.id == selectedComplaint[index]?.complaintId &&
                                                                <>
                                                                    <div className="mx-2">
                                                                        <div><span className="text-red">*</span>{data?.description}</div>
                                                                        <div><strong>Approx Resolve Time: </strong>{data?.tat}</div>
                                                                    </div>
                                                                </>)}
                                                        </div>
                                                    </div>
                                                )}
                                                <div class="col-lg-12 my-1">
                                                    <label class="me-sm-2">Select Date For installer</label>
                                                    <input type="date"
                                                        min={new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0]}
                                                        class="form-control"
                                                        {...register(`date`, {
                                                            required: true,
                                                            maxLength: 80,
                                                        })} /></div>
                                                <div class="col-lg-12 my-1">
                                                    <label class="me-sm-2">Select Time Slot For Your Installer</label>
                                                    <select class="me-sm-2  form-control" onChange={timeSlotChangeHandler}>
                                                        <option>Choose...</option>
                                                        {timeSlotList?.map((data) => <option value={data?.id}>{data?.start_time}-{data?.end_time}</option>)}
                                                    </select></div>
                                                <div class="col-lg-12 my-1">
                                                    <label class="me-sm-2">Remarks:</label>
                                                    <textarea
                                                        // min={new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0]}
                                                        class="form-control"
                                                        {...register(`remark`, {
                                                        })} />
                                                </div>
                                                <div className="row">
                                                    <button className="btn btn-primary">submit</button>
                                                </div>


                                                {/* <div class="col-lg-12 my-1">
                          <label class="me-sm-2">Select Time Slot For Your Installer</label>
                          <select class="me-sm-2  form-control" onChange={timeSlotChangeHandler}>
                            <option>Choose...</option>
                            {timeSlotList?.map((data) => <option value={data?.id}>{data?.start_time}-{data?.end_time}</option>)}
                          </select></div> */}
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default OutletCustomerComplaintForm;