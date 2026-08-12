import { useEffect, useState } from "react";
import { GetData, GetDataWithToken, PostData } from "../../ApiHelper/ApiHelper";
import { useForm } from "react-hook-form";
import { toast } from "material-react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const CustomerAssignMeasurer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scheduleList, setScheduleList] = useState([]);
  const [callApi, setCallApi] = useState(true);
  const [callApi2, setCallApi2] = useState(false);
  const [timeSlotValue, setTimeSlotValue] = useState();
  const [measurerList, setMeasurerList] = useState([]);
  console.log("loooo...", location);
  const timeSlotChangeHandler = (e) => {
    setTimeSlotValue(e.target.value);
    setCallApi2(true);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {

    const submitData = {
      ScheduleId: timeSlotValue,
      date: data?.date,
      enquiryId: location.state.EnquiryDetials.id,
      schedulePersonId: data?.measurer
    };
    console.log("submit dataaaa...", submitData);
    PostData(`auth/assign-schedule-enquiry`, submitData).then(response => {
      if (response.status === true) {
        toast.success("Measurer assigned successfully");
        navigate(-1);
      } else {
        toast.error(response.data.message);
      }
    })

  }

  useEffect(() => {
    if (callApi) {
      GetData("superadmin/get-schedule?type=measurer").then(response => {
        setScheduleList(response.data);
        setCallApi(false)
      })
    }
    if (callApi2) {
      GetData(`superadmin/get-unassigned-user/${timeSlotValue}`).then(response => {
        setMeasurerList(response.data);
        setCallApi2(false);
      })
    }
  }, [callApi, callApi2])

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
                              <div class="col-lg-12 my-1">
                                <label class="me-sm-2">Select Date For Measurement</label>
                                <input type="date"
                                  min={new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0]}
                                  class="form-control" name="date"
                                  {...register(`date`, {
                                    required: true,
                                    maxLength: 80,
                                  })}
                                />
                              </div>
                              <div class="col-lg-12 my-1">
                                <label class="me-sm-2">Select Time Slot For Your measurer</label>
                                <select class="me-sm-2  form-control" onChange={timeSlotChangeHandler}>
                                  <option>Choose...</option>
                                  {scheduleList?.map((data) => <option value={data?.id}>{data?.start_time}-{data?.end_time}</option>)}
                                </select></div>
                              <div class="col-lg-12 my-1"><label class="me-sm-2">Select Measurer</label>
                                <select class="me-sm-2  form-control"  {...register(`measurer`, {
                                  required: true,
                                  maxLength: 80,
                                })}>
                                  <option>Choose...</option>
                                  {measurerList.map((data) => <option value={data?.id}>{data?.firstName} {data?.lastName}</option>)}
                                </select></div>
                            </div>
                            <button class="btn btn-primary my-4" type="submit">submit</button>
                          </form>
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
    </div>
  )
}
export default CustomerAssignMeasurer;