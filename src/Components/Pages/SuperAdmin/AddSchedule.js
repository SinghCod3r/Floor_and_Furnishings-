import { toast } from "material-react-toastify";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GetDataWithToken, PostDataWithToken } from "../../ApiHelper/ApiHelper";
import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";

function AddSchedule() {
  const navigate = useNavigate();
  const location = useLocation();
  const [AllTimeSlot, setAllTimeSlot] = useState([]);
  const [EnquiryId, setEnquiryId] = useState(null);
  const [AllUnAssignedUser, setAllUnAssignedUser] = useState([]);
  const [AssignedPerson, setAssignedPerson] = useState({});
  const [callApi, setCallApi] = useState(true);
  const [callApi2, setCallApi2] = useState(false);
  const [customerTimeSlot, setcustomerTimeSlot] = useState("");
  const [SelectedValue, setSelectedValue] = useState("");

  // const [InquiryData, setInquiryData] = useState([]);
  // const [getDate, setGetDate] = useState("");

  useEffect(() => {
    GetAssignedMeasurer();
  }, [])

  useEffect(() => {
    if (callApi) {
      console.log("first", location.state
      );
      location?.state?.schedule?.id && setCallApi2(true);
      setcustomerTimeSlot(location?.state?.schedule?.id ? location?.state?.schedule?.id : "");
      console.log("first", location.state);
      setEnquiryId(location.state.enquiryDetail?.data
        ? location.state.enquiryDetail?.data?.
          id : location.state.data);
      GetDataWithToken("superadmin/get-schedule?type=measurer").then((response) => {
        if (response.status === true) {
          setAllTimeSlot(response.data);
          setCallApi(false);
        } else {
          setCallApi(false);
        }
      });
    }

  }, [callApi, callApi2]);


  const GetAssignedMeasurer = () => {
    const submitData = {
      categories: location?.state?.enquiryDetail?.data?.category,
      storeId: location?.state?.enquiryDetail?.data?.outlet?.id,
    }
    PostDataWithToken(
      `superadmin/get-unassigned-user`,
      submitData
    ).then((response) => {
      if (response.status === true) {
        setCallApi2(false);
        setAssignedPerson({
          name: `${response?.data?.[0]?.firstName} ${response?.data?.[0]?.lastName}`,
          id: response?.data?.[0]?.id
        })
        setAllUnAssignedUser(response.data);
      } else {
        setCallApi2(false);
      }
    });
  }

  const getTimeSlot = (timeSlot) => {
    // console.log("timeSlot", timeSlot.target.value);
    setcustomerTimeSlot(timeSlot.target.value);
    setCallApi2(true);
  };

  const ConfirmSchduled = (event) => {
    event.preventDefault();
    console.log("new submit data...", event.target?.[1]?.value);
    let data;
    let apiUrl;
    if (location?.state?.type === "postpone-measurement") {
      apiUrl = "measurer/update-schedule";
      console.log("schedule id ...", location?.state)
      data = {
        id: location?.state?.enquiryDetail?.data?.enquiryschedules?.[location?.state?.enquiryDetail?.data?.enquiryschedules?.length - 1]?.id,
        status: "postponed",
        // scheduleId:"",
        remark: SelectedValue?.target?.value,
        postponeDate: moment(event?.target?.[1].value).format("YYYY-MM-DD"),
        scheduleId: customerTimeSlot,
      }
    } else {
      apiUrl = "auth/assign-schedule-enquiry";
      data = {
        schedulePersonId: AssignedPerson?.id,
        enquiryId: EnquiryId,
        ScheduleId: event?.target?.[1].value,
        date: moment(event?.target?.[0].value).format("YYYY-MM-DD"),
        // categories: location?.state?.enquiryDetail?.category,
        // storeId: location?.state?.enquiryDetail?.outlet?.id,
      };
    }

    PostDataWithToken(apiUrl, data).then((response) => {
      if (response.status === true) {
        console.log("response", response);
        toast.success(response.message);
        // response.success("Schedule Confirmed Successfully", {
        //   position: toast.POSITION.TOP_CENTER,
        // });
        navigate(-1);
      } else {
        toast.error(response?.data?.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    });
  };

  const getTimeSchedules = (event) => {
    const date = moment(event?.target?.value).format('YYYY-MM-DD');
    GetDataWithToken(`superadmin/get-unassigned-timeslot/${AssignedPerson?.id}?date=${date}`).then((response) => {
      if (response.status) {
        let newSchedules = [];
        if (moment(date).format('DD/MM/YYYY') == moment().format('DD/MM/YYYY')) {
          for (let i = 0; i < response?.data?.schedules?.length; i++) {
            let startTime = response?.data?.schedules?.[i]?.start_time;
            let startTimeMoment = moment(startTime, "HH:mm:ss");
            let currentTime = new Date();
            let currentHour = currentTime.getHours();
            let currentMinute = currentTime.getMinutes();
            // Create a moment for the current time using the current hour and minute
            let currentTimeMoment = moment(`${currentHour}:${currentMinute}:00`, "HH:mm:ss");
            // Calculate the difference in duration between current time and start time
            let duration = moment.duration(startTimeMoment.diff(currentTimeMoment));
            // Convert the duration to minutes
            let minutes = duration.asMinutes();
            // Log the result in minutes
            if (+minutes > 40) {
              newSchedules.push(response?.data?.schedules?.[i]);
            }
            console.log(`Start Time: ${startTime}, Difference: ${minutes} minutes`);
          }
          setAllTimeSlot(newSchedules);
        }
        else {
          setAllTimeSlot(response.data?.schedules);
        }
        // setAllTimeSlot(res?.data?.schedules);
      }
    });
  }

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
        <div className="content-body">
          {/*--- row ---*/}
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-12">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Schedule A Task</h4>
                  </div>
                  <div className="card-body">
                    <div className="basic-form">
                      <form onSubmit={ConfirmSchduled}>
                        <div className="row align-items-center">
                          {location?.state?.type === "postpone-measurement" && <div className="col-lg-12 my-1">
                            <label className="me-sm-2">
                              Select Reason for Postpone Measurement
                            </label>
                            <select
                              className="me-sm-2  form-control"
                              onChange={(e) => {
                                setSelectedValue(e);
                              }}
                            >
                              <option selected>Choose...</option>

                              <option value={"Manpower Shortage"}>Manpower Shortage</option>
                              <option value={"Client not available "}>
                                Client not available
                              </option>
                              <option value={"Client is not sure about the product they have selected"}>
                                Client is not sure about the product they have selected
                              </option>
                              <option value={"Site not ready"}>Site not ready</option>
                              <option value={"Selection Pending"}>Selection Pending</option>
                            </select>
                          </div>}
                          <div className="col-lg-12 my-1">
                            <label className="me-sm-2">
                              Select Date For Measurements
                            </label>
                            <input
                              type={"date"}
                              // defaultValue={location?.state?.date ? moment(location?.state?.date).format("YYYY-MM-DD") : null}

                              min={location?.state?.type === "postpone-measurement" ? moment().add(1, "days").format("YYYY-MM-DD") : moment().add(0, "days").format("YYYY-MM-DD")}
                              className="form-control"
                              onChange={getTimeSchedules}
                              required
                            // onChange={getSelectedDate}
                            />
                          </div>
                          <div className="col-lg-12 my-1">
                            <label className="me-sm-2">
                              Select Time Slot For Your Measurements
                            </label>
                            <select
                              className="me-sm-2  form-control"
                              onChange={(e) => {
                                getTimeSlot(e);
                              }}
                              required
                            >
                              <option>Choose...</option>
                              {AllTimeSlot &&
                                AllTimeSlot.map((item, index) => {
                                  return (
                                    <option selected={location?.state?.schedule?.id === item.id} value={item.id}>
                                      {item.start_time} - {item.end_time}
                                    </option>
                                  );
                                })}
                            </select>
                          </div>
                          <div className="col-lg-12 my-1">
                            <label className="me-sm-2">
                              Measurer Name
                            </label>
                            <input
                              type={"text"}
                              disabled
                              value={AssignedPerson?.name}
                              className="form-control"

                            // onChange={getSelectedDate}
                            />
                          </div>
                          {/* <div className="col-lg-12 my-1">
                            <label className="me-sm-2">
                              Select Measurer For Your Measurements
                            </label>
                            <select
                              className="me-sm-2  form-control"
                           
                            >
                              <option selected>Choose...</option>
                              {AllUnAssignedUser &&
                                AllUnAssignedUser.map((item, index) => {
                                  return (
                                    <option value={item.id}>
                                      {item.firstName} {item.lastName}
                                    </option>
                                  );
                                })}
                            </select>
                          </div> */}
                        </div>
                        <button className="btn btn-primary">Submit </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddSchedule;
