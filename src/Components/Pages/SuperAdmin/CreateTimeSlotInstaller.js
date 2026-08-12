import _ from "lodash";
import { toast } from "material-react-toastify";
import React, { useEffect, useState } from "react";
import { Toast } from "reactstrap";
import { GetDataWithToken, PostDataWithToken } from "../../ApiHelper/ApiHelper";
import { Measurer } from "../../Common/RoleType";
import UsePostCallBack from "../../Hooks/UsePostCallBack";
import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";
import { useLocation } from "react-router-dom";

function CreateTimeSlotInstaller() {
  const location = useLocation();
  //   let scheduleType;
  //     if (location.pathname === '/create-time-slot-measurer') {
  //     scheduleType = "measurer";
  //   } else if (location.pathname === '/create-time-slot-installer') {
  //     scheduleType = "installer";
  //   }
  const [formValues, setformValues] = useState([{ Stime: "", Etime: "", type: "installer" }]);
  const [callApi, setCallApi] = useState(true);
  const handleChange = (i, e) => {
    let formval = [...formValues];
    formval[i][e.target.name] = e.target.value;
    setformValues(formval);
  };
  console.log("locccccc", location);
  const addFormFields = () => {
    setformValues([...formValues, { Stime: "", Etime: "" }]);
  };

  const removeFormFields = (remIndex) => {
    // console.log("index", index);
    setformValues((prev) => prev.filter((item, index) => index !== remIndex && item));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    PostDataWithToken(`superadmin/create-schedule/`, formValues).then(
      (response) => {
        if (response.status === true) {
          toast.success(response.message, {
            position: toast.POSITION.TOP_CENTER,
          });
          setformValues([{ Stime: "", Etime: "" }]);
          setCallApi(true);
        } else {
          toast.error(response.data.message);
        }
      }
    );
  };
  const [AllTimeSlot, setAllTimeSlot] = useState([]);
  // const [MeasurerTimeSlot, setMeasurerTimeSlot] = useState([]);
  useEffect(() => {
    GetDataWithToken(`superadmin/get-schedule?type=installer`).then((response) => {
      setAllTimeSlot(response.data);
      setCallApi(false);
    });
  }, [callApi]);

  // useEffect(() => {
  //   GetDataWithToken(`superadmin/get-schedule/`).then((response) => {
  //     setMeasurerTimeSlot(response.data);
  //   });
  // }, [""]);

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
                    <h4 className="card-title">Add Time Slot</h4>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-7">
                        <div className="basic-form">
                          <form onSubmit={handleSubmit}>
                            <div className="row">
                              <div className="col-lg-10">
                                {formValues.map((element, index) => (
                                  <div className="form-inline row" key={index}>
                                    <div className="col-lg-4 align-self-center">
                                      <label>Start Time</label>
                                      <input
                                        className="form-control input-default"
                                        type="time"
                                        name="Stime"
                                        value={element.Stime || ""}
                                        onChange={(e) => handleChange(index, e)}
                                      />
                                    </div>
                                    <div className="col-lg-4 align-self-center">
                                      <label>End Time</label>
                                      <input
                                        className="form-control input-default"
                                        type="time"
                                        name="Etime"
                                        value={element.Etime || ""}
                                        onChange={(e) => handleChange(index, e)}
                                      />
                                    </div>
                                    <div className="col-lg-4 d-flex align-items-end">
                                      {index ? (
                                        <button
                                          type="button"
                                          className="btn btn-primary remove me-2 py-2 px-4"
                                          onClick={(e) =>
                                            // console.log("index", { index })
                                            removeFormFields(index)
                                          }
                                        >
                                          Remove
                                        </button>
                                      ) : null}


                                    </div>
                                  </div>
                                ))}
                              </div>

                              <div className="col-lg-2 d-flex align-items-end">
                                <button
                                  className="btn btn-danger add py-2 px-4"
                                  type="button"
                                  onClick={() => addFormFields()}
                                >
                                  Add
                                </button>
                              </div>
                            </div>


                            <div className="button-section mt-4 align-self-center">
                              <button className="btn btn-primary" type="submit">
                                Submit
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                      <div className="col-lg-5">
                        <div className="table-responsive">
                          <table
                            id="example4"
                            className="table card-table display mb-4 shadow-hover"
                          >
                            <thead>
                              <tr>
                                <th>Installer id</th>
                                <th>Time Slots</th>
                              </tr>
                            </thead>
                            <tbody>
                              {AllTimeSlot &&
                                AllTimeSlot.length > 0 &&
                                AllTimeSlot.map((item, i) => {
                                  return (
                                    <tr key={i}>
                                      <td>{item.id}</td>
                                      <td>
                                        {item.start_time} - {item.end_time}{" "}
                                      </td>
                                    </tr>
                                  );
                                })}
                            </tbody>
                          </table>
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
    </>
  );
}

export default CreateTimeSlotInstaller;
