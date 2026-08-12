import { toast } from "material-react-toastify";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { GetDataWithToken, PostDataWithToken } from "../../ApiHelper/ApiHelper";
import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";
import { useNavigate } from "react-router-dom";

function AddNewUser() {
  const navigate = useNavigate();
  const [allRoals, setAllRoals] = useState();
  const [salesPerson, setSalesPerson] = useState(true);
  const [AllOutlets, setAllOutlets] = useState([]);

  useEffect(() => {
    GetDataWithToken("superadmin/get-roles").then((response) => {
      if (response.status === true) {
        setAllRoals(response.data);
      }
    });
    GetDataWithToken("superadmin/get-outlet").then((response) => {
      if (response.status === true) {
        setAllOutlets(response.data);
      }
    });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const CreateNewUser = (data) => {
    let formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("type", data.role);
    formData.append("phone", data.phoneNumber);
    formData.append("outletId", data.outlet_id);
    formData.append("userId", data.ic_id);
    PostDataWithToken("superadmin/create-user", formData).then((response) => {
      if (response.status === true) {
        console.log("first", response.message);
        toast.success(response.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        reset({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          role: "",
          phoneNumber: "",
          ic_id: "",
        });
        navigate(-1);
      } else {
        toast.error(response.data.message, {
          position: "top-right",
        });
      }
    });
  };
  const checkSalesPerson = (e) => {
    console.log("first", e);
    if (e === "sales-person") {
      setSalesPerson(true);
    } else {
      setSalesPerson(false);
    }
  };

  return (
    <>
      {console.debug("roles", allRoals)}
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
          {/* row */}
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-12">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Add New User</h4>
                  </div>
                  <div className="card-body">
                    <div className="basic-form">
                      <form onSubmit={handleSubmit(CreateNewUser)}>
                        <select
                          {...register("role", {
                            required: "please select role",
                          })}
                          className="form-control wide mb-3"
                        // onChange={(e) => {
                        //   checkSalesPerson(e.target.value);
                        // }}
                        >
                          <option value="">Select a Category</option>
                          {allRoals &&
                            allRoals.map((item, index) => {
                              return <option value={item}>{item}</option>;
                            })}
                        </select>
                        <span className="text-danger">
                          {errors.role && errors.role.message}
                        </span>
                        <div className="row">
                          <div className="col-lg-12">
                            <>
                              <div className="row">
                                <div className="col-lg-6">
                                  <label className="form-label">
                                    Select Outlet
                                  </label>
                                  <select
                                    {...register("outlet_id", {
                                      required: "please Enter Outlet_id",
                                      maxLength: 80,
                                    })}
                                    autocomplete="off"
                                    type="text"
                                    className="form-control input-default"
                                  >
                                    <option value="">Select Outlet</option>
                                    {AllOutlets &&
                                      AllOutlets.map((outlet, index) => (
                                        <option value={outlet.id}>
                                          {outlet.firstName}
                                        </option>
                                      ))}
                                  </select>

                                  <span className="font-danger">
                                    {errors.outlet_id &&
                                      errors.outlet_id.message}
                                  </span>
                                </div>
                                <div className="col-lg-6">
                                  <label className="form-label">Enter id</label>
                                  <input
                                    {...register("ic_id", {
                                      required: "please Enter Outlet_id",
                                      maxLength: 80,
                                    })}
                                    autocomplete="off"
                                    type="text"
                                    className="form-control input-default"
                                    type="text"
                                  />
                                  <span className="font-danger">
                                    {errors.outlet_id &&
                                      errors.outlet_id.message}
                                  </span>
                                </div>
                              </div>
                            </>
                          </div>
                        </div>

                        <div className="mb-3 row">
                          <div className="col-lg-6">
                            <label className="form-label">
                              Enter First Name
                            </label>
                            <input
                              {...register("firstName", {
                                required: "please Enter First Name",
                                maxLength: 80,
                              })}
                              autocomplete="off"
                              type="text"
                              className="form-control input-default"
                            />
                            <span className="font-danger">
                              {errors.firstName && errors.firstName.message}
                            </span>
                          </div>
                          <div className="col-lg-6">
                            <label className="form-label">
                              Enter Last Name
                            </label>
                            <input
                              {...register("lastName", {
                                required: "please Enter Last Name",
                                maxLength: 80,
                              })}
                              autocomplete="off"
                              type="text"
                              className="form-control input-default"
                            />
                            <span className="font-danger">
                              {errors.lastName && errors.lastName.message}
                            </span>
                          </div>
                        </div>
                        <div className="mb-3 row">
                          <div className="col-lg-6">
                            <label className="form-label">Enter Email</label>
                            <input
                              {...register("email", {
                                required: "please Enter Email",
                                maxLength: 80,
                              })}
                              autocomplete="off"
                              type="email"
                              className="form-control input-default"
                            />
                            <span className="font-danger">
                              {errors.email && errors.email.message}
                            </span>
                          </div>

                          <div className="col-lg-6">
                            <label className="form-label">
                              Enter Phone Number
                            </label>
                            <input
                              {...register("phoneNumber", {
                                required: "please Enter Phone Number",
                                maxLength: 80,
                                // pattern: /^[A-Za-z]+$/i,
                              })}
                              autocomplete="off"
                              type="number"
                              className="form-control input-default"
                            />
                            <span className="font-danger">
                              {errors.phoneNumber && errors.phoneNumber.message}
                            </span>
                          </div>
                        </div>
                        <div className="mb-3 row">
                          <div className="col-lg-12">
                            <label className="form-label">Enter Password</label>
                            <input
                              {...register("password", {
                                required: "please Enter Password",
                                maxLength: 80,
                              })}
                              type="password"
                              className="form-control input-default"
                            />
                            <span className="font-danger">
                              {errors.password && errors.password.message}
                            </span>
                          </div>
                        </div>
                        <div className="buttons text-end">
                          <button className="btn btn-warning  me-2"
                            type="button"
                            onClick={() => navigate(-1)}
                          >
                            Back
                          </button>
                          <button className="btn btn-primary ">Submit</button>
                        </div>
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

export default AddNewUser;
