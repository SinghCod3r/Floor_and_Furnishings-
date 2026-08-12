import { data } from "jquery";
import { toast } from "material-react-toastify";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GetDataWithToken, PostDataWithToken } from "../../ApiHelper/ApiHelper";
import Cookies from "js-cookie";
import { Spinner } from "reactstrap";
import OutletManagerHeader from "./OutletManagerHeader";
import OutletManagerSidebar from "./OutletManagerSidebar";

function OutletAssignInstaller() {

  const location = useLocation();
  const navigate = useNavigate();
  const [AllTimeSlot, setAllTimeSlot] = useState([]);
  const [scheduleMessage, setScheduleMessage] = useState("");
  const [EnquiryId, setEnquiryId] = useState(null);
  const [AllUnAssignedUser, setAllUnAssignedUser] = useState([]);
  const [AssignedPerson, setAssignedPerson] = useState("");
  const [InquiryData, setInquiryData] = useState([]);
  const [getDate, setGetDate] = useState("");
  const [customerTimeSlot, setcustomerTimeSlot] = useState("");
  const [CoustomerId, setCustomerId] = useState("");
  const [AllWhareHouse, setAllWhareHouse] = useState("");
  const [WareHouseId, setWareHouseId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedInstaller, setSelectedInstaller] = useState({
    name: "",
    id: "",
  })


  // console.log("loockcasafqw", location?.state?.schedule?.id);

  // useEffect(() => {
  //   if (callApi) {
  //     location?.state?.schedule?.id && setCallApi2(true);
  //     setcustomerTimeSlot(location?.state?.schedule?.id ? location?.state?.schedule?.id : "");
  //     console.log("Idddddd====>>>>>", location.state);
  //     setEnquiryId(location?.state?.enquiryId);
  //     setCoustomerId(location.state.customerId);

  //     GetDataWithToken("superadmin/get-outlet").then((response) => {
  //       if (response.status === true) {
  //         setCallApi(false);
  //         setAllWhareHouse(response.data);
  //       }
  //     });
  //     GetDataWithToken(`superadmin/get-schedule?type=installer`).then((response) => {
  //       if (response.status === true) {
  //         setCallApi(false);
  //         setAllTimeSlot(response.data);
  //       } else {
  //         setCallApi(false);
  //       }
  //     });
  //   }

  //   if (callApi2) {
  //     GetDataWithToken(
  //       `installer/get-unassign-installer/${customerTimeSlot}`
  //     ).then((response) => {
  //       if (response.status === true) {
  //         setCallApi2(false);
  //         setAllUnAssignedUser(response.data);
  //       } else {
  //         setCallApi2(false);
  //       }
  //     });
  //   }

  // }, [callApi, callApi2]);

  useEffect(() => {
    console.log('================================', location?.state);
    setEnquiryId(location?.state?.enquiryId);
    setCustomerId(location?.state?.customerId);
    getUnassignedInstaller();
  }, [])


  const getUnassignedInstaller = () => {
    const installerData = {
      categories: location?.state?.Enquiry?.category || location?.state?.category,
      storeId: Cookies.get("userID"),
      enquiryId: location?.state?.enquiryId,
    };
    PostDataWithToken("installer/get-unassign-installer", installerData).then((response) => {
      if (response?.status) {
        setSelectedInstaller({
          name: `${response?.data?.[0]?.firstName} ${response?.data?.[0]?.lastName}`,
          id: response?.data?.[0]?.id,
        });
      }
    })
  }

  const dateChangeHandler = (value) => {
    let date = moment(value).format('YYYY-MM-DD');
    let usedCategory = "";
    const fabricCategory = ["Curtains", "sheers", "Rods/tracks", "Blinds"];
    if (location?.state?.Enquiry?.category.every(category => fabricCategory.includes(category))) {
      usedCategory = "curtain";
    }
    GetInstallerSchedule(date, selectedInstaller?.id, usedCategory);
  }

  const GetInstallerSchedule = (date, installer, category) => {
    GetDataWithToken(`installer/unassign-installer-slot?date=${date}&userid=${installer}${category ? `&category=${category}` : ""}&enquiryId=${EnquiryId}`).then(response => {
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
        setAllTimeSlot(response.data?.schedules);
      }
      if (response.data?.schedules?.length === 0) {
        setScheduleMessage("Sorry no schedules available");
      } else {
        setScheduleMessage("");
      }
    })
  }

  const correctDate = () => {
    if (location?.state?.date) {
      let dateString = location?.state?.date;
      const parts = dateString.split("-"); // Split the date string by "-"
      const year = parts[2].slice(-4); // Extract the last four digits of the year

      // Create a new date string with the corrected year format
      let correctedDateString = `${parts[0]}-${parts[1]}-${year}`;
      // console.log("correctedDate dateee date te rer", correctedDateString, moment(correctedDateString, "DD-MM-YYYY").format("YYYY-MM-DD"));
      return moment(correctedDateString, "DD-MM-YYYY").format("YYYY-MM-DD");
    } else {
      return null;
    }


    // return date;
  }
  // const getAssignedPerson = (e) => {
  //   setAssignedPerson(e.target.value);
  // };
  // const getSelectedDate = (e) => {
  //   console.log("date", e.target.value);
  //   setGetDate(e.target.value);
  // };

  const getTimeSlot = (timeSlot) => {
    console.log("timeSlot", timeSlot.target.value);
    setcustomerTimeSlot(timeSlot.target.value);

  };
  // const getwareHouse = (warehouse) => {
  //   console.log("warehouse", warehouse.target.value);
  //   setWareHouseId(warehouse.target.value);
  // };

  const ConfirmSchduled = (event) => {
    setIsLoading(true);

    console.log("enquiryid", EnquiryId);
    event.preventDefault();
    let data = {
      scheduleId: +event.target?.[2]?.value,
      enquiryId: EnquiryId,
      installerId: selectedInstaller?.id,
      date: moment(event.target?.[1]?.value).format("YYYY-MM-DD"),
      warehouseId: location?.state?.Enquiry?.outlet?.id,
      // warehouseId: location?.state?.Enquiry?.warehouse_id,
      customerId: CoustomerId,
    };
    console.log("submit DAtaaaaa...", data);

    let complaintData = {
      scheduleId: +event.target?.[2]?.value,
      enquiryId: EnquiryId,
      installerId: selectedInstaller?.id,
      date: moment(event.target?.[1]?.value).format("YYYY-MM-DD"),
      // warehouseId: event.target?.[0]?.value,
      warehouseId: location?.state?.enquiry?.warehouse_id,
      customerId: CoustomerId,
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
      PostDataWithToken(`installer/assign-installer/`, data).then((response) => {
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
        <OutletManagerHeader />
        <OutletManagerSidebar />
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
                          <div className="col-lg-12 my-1">
                            <label className="me-sm-2">
                              Select Date For installation
                            </label>

                            <input
                              type={"date"}
                              // defaultValue={location?.state?.date}
                              // defaultValue={
                              //   moment(new Date(location?.state?.date)).format("YYYY-MM-DD")}
                              defaultValue={correctDate()}
                              min={moment().add(0, "days").format("YYYY-MM-DD")}
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
                            >
                              <option >Choose...</option>
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

export default OutletAssignInstaller;
