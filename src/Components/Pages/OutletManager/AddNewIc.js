import { toast } from "material-react-toastify";
import React from "react";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { PostDataWithToken } from "../../ApiHelper/ApiHelper";
import { SalesPerson } from "../../Common/RoleType";
import OutletManagerHeader from "./OutletManagerHeader";
import OutletManagerSidebar from "./OutletManagerSidebar";

function AddNewIc() {
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
    formData.append("type", SalesPerson);
    formData.append("phone", data.phoneNumber);
    formData.append("outletId", Cookies.get("userID"));
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
        });
      } else {
        toast.error(response.data.message, {
          position: "top-right",
        });
      }
    });
  };
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
          <div className="row">
            <div className="col-xl-12">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">Add New User</h4>
                </div>
                <div className="card-body">
                  <div className="basic-form">
                    <form onSubmit={handleSubmit(CreateNewUser)}>
                      <div className="mb-3 row">
                        <div className="col-lg-6">
                          <label className="form-label">Enter First Name</label>
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
                          <label className="form-label">Enter Last Name</label>
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
                        <button className="btn btn-warning  me-2">Back</button>
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
    </>
  );
}

export default AddNewIc;
