import { data } from "jquery";
import { toast } from "material-react-toastify";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GetDataWithToken, PostDataWithToken } from "../../ApiHelper/ApiHelper";
import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";
import { Spinner } from "reactstrap";

function AddInstalerSchdule() {
  const location = useLocation();
  const navigate = useNavigate();
  const [AllTimeSlot, setAllTimeSlot] = useState([]);
  const [scheduleMessage, setScheduleMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedInstaller, setSelectedInstaller] = useState({
    name: "",
    id: "",
  });
  const [selectedDate, setSelectedDate] = useState(moment().add(1, 'days').format('YYYY-MM-DD'));
  const [SelectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    getUnassignedInstaller(selectedDate);
  }, [selectedDate])


  const getUnassignedInstaller = (date) => {
    const installerData = {
      categories: location?.state?.Enquiry?.category || location?.state?.category,
      storeId: location?.state?.Enquiry?.outlet?.id || location?.state?.outlet?.id,
      enquiryId: location?.state?.enquiryId,
      date: date,
    };
    PostDataWithToken("installer/get-unassign-installer", installerData).then((response) => {
      if (response?.status) {
        setSelectedInstaller({
          name: `${response?.data?.[0]?.firstName} ${response?.data?.[0]?.lastName}`,
          id: response?.data?.[0]?.id,
        });
        GetInstallerSchedule(date, response?.data?.[0]?.id);
      }
    })
  }

  const dateChangeHandler = (value) => {
    let date = moment(value).format('YYYY-MM-DD');
    setSelectedDate(date);
  }

  const GetInstallerSchedule = (date, installer) => {
    let usedCategory = "";
    const fabricCategory = ["Curtains", "sheers", "Rods/tracks", "Blinds"];
    if (location?.state?.Enquiry?.category.every(category => fabricCategory.includes(category))) {
      usedCategory = "curtain";
    }
    GetDataWithToken(`installer/unassign-installer-slot?date=${date}&userid=${installer}${usedCategory ? `&category=${usedCategory}` : ""}&enquiryId=${location?.state?.enquiryId}`).then(response => {
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
      } else {
        setAllTimeSlot(response?.data?.schedules);
      }

      if (response.data?.schedules?.length === 0) {
        setScheduleMessage("Sorry no schedules available");
      } else {
        setScheduleMessage("");
      }
    })
  }

  const getTimeSlot = (timeSlot) => {
    console.log("timeSlot", timeSlot.target.value);
  };


  const ConfirmSchduled = (event) => {
    setIsLoading(true);
    event.preventDefault();
    let data;
    let apiUrl = "";
    if (location?.state?.type == "postpone-installer") {
      apiUrl = "installer/update-schedule";
      let arrayIndex = location?.state?.Enquiry?.installer_tasks?.length - 1;
      data = {
        id: location?.state?.Enquiry?.installer_tasks?.[arrayIndex]?.id,
        status: "postponed",
        remark: SelectedValue?.target?.value,
        installerId: selectedInstaller?.id,
        postponeDate: moment(event.target?.[2]?.value).format("YYYY-MM-DD"),
        scheduleId: +event.target?.[3]?.value,
      }
    } else {
      apiUrl = `installer/assign-installer/`;
      data = {
        scheduleId: +event.target?.[2]?.value,
        enquiryId: location?.state?.enquiryId,
        installerId: selectedInstaller?.id,
        date: moment(event.target?.[1]?.value).format("YYYY-MM-DD"),
        warehouseId: location?.state?.Enquiry?.outlet?.id,
        // warehouseId: location?.state?.Enquiry?.warehouse_id,
        customerId: location?.state?.customerId,
      };
    }

    console.log("submit DAtaaaaa...", data);

    let complaintData = {
      scheduleId: +event.target?.[2]?.value,
      enquiryId: location?.state?.EnquiryId,
      installerId: selectedInstaller?.id,
      date: moment(event.target?.[1]?.value).format("YYYY-MM-DD"),
      // warehouseId: event.target?.[0]?.value,
      warehouseId: location?.state?.enquiry?.warehouse_id,
      customerId: location?.state?.customerId,
      complaintId: location?.state?.id,
    };

    location?.state?.complaint_info?.length > 0 ?
      PostDataWithToken(`customer/assign-installer`, complaintData).then((response) => {
        if (response.status === true) {
          navigate(-1);
          setIsLoading(false);
          toast.success(response.message);
        } else {
          setIsLoading(false);
          toast.error(response?.data?.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      })
      :
      PostDataWithToken(apiUrl, data).then((response) => {
        if (response.status === true) {
          console.log("response", response);
          setIsLoading(false);
          toast.success(response.message);
          // response.success("Schedule Confirmed Successfully", {
          //   position: toast.POSITION.TOP_CENTER,
          // });
          navigate(-1);
        } else {
          setIsLoading(false);
          toast.error(response?.data?.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      });
  };
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
                          <div className="col-lg-12 my-1">
                            <label className="me-sm-2">Select Warehouse</label>
                            {/* <input
                              type={"date"}
                              min={moment().add(1, "days").format("YYYY-MM-DD")}
                              className="form-control"
                              onChange={getSelectedDate}
                            /> */}
                            <input
                              type={"text"}
                              // min={moment().add(1, "days").format("YYYY-MM-DD")}
                              value={location?.state?.enquiry?.warehouse_name || location?.state?.Enquiry?.warehouse_name
                              }
                              disabled
                              className="form-control"
                            // onChange={getSelectedDate}
                            />

                            {/* <select
                              className="me-sm-2  form-control"
                           
                            >
                              <option selected>Choose...</option>
                              {AllWhareHouse &&
                                AllWhareHouse.map((item, index) => {
                                  return (
                                    <option value={item.id}>
                                      {item.firstName}
                                    </option>
                                  );
                                })}
                            </select> */}
                          </div>
                          {location?.state?.type == "postpone-installer" && <div className="col-lg-12 my-1">
                            <label className="me-sm-2">
                              Select Reason for Postponing Installer
                            </label>
                            <select
                              className="me-sm-2  form-control"
                              onChange={(e) => {
                                setSelectedValue(e);
                              }}
                              required
                            >
                              <option value={""} selected>Choose...</option>
                              <option value={"Manpower Shortage"}>
                                Manpower Shortage
                              </option>
                              <option value={" Material not ready"}>
                                Material not ready
                              </option>
                              <option value={"Material delay from warehouse"}>
                                Material delay from warehouse
                              </option>
                              <option value={"Site not ready"}>Site not ready</option>
                              <option value={"Client not available "}>
                                Client not available
                              </option>
                              <option value={"Payment outstanding "}>
                                Payment outstanding
                              </option>
                              <option value={"Partial work Done at site"}>
                                Partial work Done at site
                              </option>
                              <option value={"Only Hardware installation"}>
                                Only Hardware installation
                              </option>
                              <option value={"Upholstery work is going on at site"}>
                                Upholstery work is going on at site
                              </option>
                              <option value={"Wooden plank not installed"}>
                                Wooden plank not installed
                              </option>
                            </select>
                          </div>}
                          <div className="col-lg-12 my-1">
                            <label className="me-sm-2">
                              Select Date For installation
                            </label>

                            <input
                              type={"date"}
                              // value = {new Date(moment(new Date(selectedDate)).format("YYYY-MM-DD"))}
                              value={selectedDate}
                              // defaultValue={
                              //   moment(new Date(location?.state?.date)).format("YYYY-MM-DD")}
                              // defaultValue={correctDate()}
                              min={location?.state?.type == "postpone-installer" ? moment().add(1, "days").format("YYYY-MM-DD") : moment().add(1, "days").format("YYYY-MM-DD")}
                              className="form-control"
                              onChange={(event) => dateChangeHandler(event?.target.value)}
                            // onChange={getSelectedDate}
                            />
                          </div>
                          <div className="col-lg-12 my-1">
                            <label className="me-sm-2">
                              Select Time Slot For Your installation
                            </label>
                            <select
                              className="me-sm-2  form-control"

                              onChange={(e) => {
                                getTimeSlot(e);
                              }}
                              required
                            >
                              <option value="">Choose...</option>
                              {AllTimeSlot &&
                                AllTimeSlot.map((item, index) => {
                                  return (
                                    <option selected={location?.state?.schedule?.id === item.id} value={item.id} >
                                      {item.start_time} - {item.end_time}
                                    </option>
                                  );
                                })}
                            </select>
                            <p className="text-danger">{scheduleMessage}</p>
                          </div>
                          <div className="col-lg-12 my-1">
                            <label className="me-sm-2">
                              Select installer For installation
                            </label>

                            <input
                              type={"text"}
                              // min={moment().add(1, "days").format("YYYY-MM-DD")}         
                              value={selectedInstaller?.name
                              }
                              disabled
                              className="form-control"
                            // onChange={getSelectedDate}
                            />


                            {/* <select
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
                            </select> */}
                          </div>
                        </div>
                        <button disabled={isLoading}
                          className="btn btn-primary">
                          {isLoading ? <Spinner /> : "Submit"}
                        </button>
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

export default AddInstalerSchdule;
