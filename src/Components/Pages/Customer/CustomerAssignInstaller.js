import { useEffect, useState } from "react";
import { GetData, GetDataWithToken, PostData } from "../../ApiHelper/ApiHelper";
import { useForm } from "react-hook-form";
import { toast } from "material-react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

const CustomerAssignInstaller = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [scheduleList, setScheduleList] = useState([]);
    const [callApi, setCallApi] = useState(true);
    const [callApi2, setCallApi2] = useState(false);
    const [timeSlotValue, setTimeSlotValue] = useState();
    const [installerList, setInstallerList] = useState([]);
    // const [wareHouseList, setWareHouseList] = useState([]);


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log("submit dataaaa...", data);
        const submitData = {
            customerId: location?.state.data.customer.id,
            ScheduleId: timeSlotValue,
            date: data?.date,
            enquiryId: location.state.data.id,
            installerId: data?.installer,
            warehouseId: data.warehouse
        }
        PostData(`installer/assign-installer/`, submitData).then(response => {
            if (response.status === true) {
                toast.success("Installer assigned successfully");
                navigate(-1);
            } else {
                toast.error(response.data.message);
            }
        })

    }

    useEffect(() => {
        GetInstallerDataHandler();
    }, [timeSlotValue])

    const GetInstallerDataHandler = () => {

        GetDataWithToken(`superadmin/get-schedule?type=installer/${timeSlotValue ||
            moment().add(1, 'days')}`).then(response => {
                setScheduleList(response.data);
                GetData(`superadmin / get - unassigned - user / ${timeSlotValue} `).then(response => {
                    setInstallerList(response.data);
                })
            })
    }

    const timeSlotChangeHandler = (e) => {
        setTimeSlotValue(e.target.value);
    };

    return (
        <div className="authincation h-100">
            <div className="container h-100vh">
                <div className="row justify-content-center h-100 align-items-center">
                    <div className="col-xl-6">
                        <div className="authincation-content">
                            <div className="row no-gutters">
                                <div className="col-xl-12">
                                    <div className="card-header">
                                        <h4>Schedule a task</h4>
                                        <span onClick={() => { navigate(-1) }} style={{ cursor: "pointer" }}><i className="fas fa-arrow-left" style={{ fontSize: "20px" }}></i></span>
                                    </div>
                                    <div className="container-fluid">
                                        <div className="row flex-item-center">
                                            <div className="col-xl-12">
                                                <div class="basic-form">
                                                    <form onSubmit={handleSubmit(onSubmit)}>
                                                        <div class="row align-items-center">
                                                            {/* <div class="col-lg-12 my-1">
                                                                <label class="me-sm-2">Select Warehouse</label>
                                                                <select class="me-sm-2  form-control"  {...register(`warehouse`, {
                                                                    required: true,

                                                                })}>
                                                                    <option>Choose...</option>
                                                                    {wareHouseList?.map((data) => <option value={data?.id}>{data?.firstName}</option>)}
                                                                </select></div> */}
                                                            <div class="col-lg-12 my-1">
                                                                <label class="me-sm-2">Select Date For Installation</label>
                                                                <input type="date" min="2023-09-13" class="form-control" name="date"
                                                                    {...register(`date`, {
                                                                        required: true,
                                                                        maxLength: 80,
                                                                    })}
                                                                />
                                                            </div>
                                                            <div class="col-lg-12 my-1">
                                                                <label class="me-sm-2">Select Time Slot For Your Installer</label>
                                                                <select class="me-sm-2  form-control" onChange={timeSlotChangeHandler}>
                                                                    <option>Choose...</option>
                                                                    {scheduleList?.map((data) => <option value={data?.id}>{data?.start_time}-{data?.end_time}</option>)}
                                                                </select></div>
                                                            <div class="col-lg-12 my-1"><label class="me-sm-2">Select Installer</label>
                                                                <select class="me-sm-2  form-control"  {...register(`installer`, {
                                                                    required: true,
                                                                    maxLength: 80,
                                                                })}>
                                                                    <option>Choose...</option>
                                                                    {installerList.map((data) => <option value={data?.id}>{data?.firstName} {data?.lastName}</option>)}
                                                                </select></div>
                                                        </div>
                                                        <button class="btn btn-primary my-4">submit</button></form></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CustomerAssignInstaller;