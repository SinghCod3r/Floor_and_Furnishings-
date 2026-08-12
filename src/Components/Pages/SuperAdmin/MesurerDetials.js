import { toast } from "material-react-toastify";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GetDataWithToken, PutDataWithToken } from "../../ApiHelper/ApiHelper";
import useFetch from "../../Hooks/CallBack";
import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";

function MesurerDetials() {
  const location = useLocation();
  const navigate = useNavigate();
  const [StaffDetials, setStaffDetials] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userImage, setUserImage] = useState(null);

  // const { data, Error, isLoading } = useFetch(
  //   `superadmin/get-measurer/${location.state.data}`
  // );

  const getuserImage = (data) => {
    console.log("first", data.target.files[0]);
    setUserImage(data.target.files[0]);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  useEffect(() => {
    console.log("first", location.state);
    setUserId(location.state.data);
    GetDataWithToken(`superadmin/get-measurer/${location.state.data}`).then(
      (response) => {
        if (response.status === true) {
          console.log("responce data", response.data);
          setStaffDetials(response.data);
          reset({
            firstName: response?.data?.measurer?.firstName,
            lastName: response?.data?.measurer?.lastName,
            email: response?.data?.measurer?.email,
            password: response?.data?.measurer?.password,
            phone: response?.data?.measurer?.phone,
            userId: response?.data?.measurer?.userId,
            phone: response?.data?.measurer?.phone,
          });
        }
      }
    );
  }, [""]);

  const EditUserDetials = (data) => {
    let formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("phone", data.phone);
    formData.append("image", userImage);
    formData.append("userId", data.userId);
    // console.log("formData", formData);

    PutDataWithToken(`superadmin/edit-user/${userId}`, formData).then(
      (response) => {
        if (response.status === true) {
          console.log("first", response.message);
          toast.success(response.message, {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          toast.error(response.data.message, {
            position: "top-right",
          });
        }
      }
    );
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
          <div className="container-fluid">
            {/* row */}
            <div className="row">
              <div className="col-lg-8">
                <div className="profile card card-body px-3 pt-3 pb-0">
                  <div className="profile-head">
                    <div className="photo-content">
                      <div className="cover-photo rounded" />
                    </div>
                    <div className="profile-info">
                      <div className="profile-photo">
                        {StaffDetials?.measurer?.image === null ? (
                          <img
                            src="./images/profile/profile.png"
                            className="img-fluid rounded-circle"
                            alt=""
                          />
                        ) : (
                          <img
                            src={`${StaffDetials?.user?.image}`}
                            className="img-fluid rounded-circle"
                            alt=""
                            style={{ height: "90px" }}
                          />
                        )}
                      </div>
                      <div className="profile-details">
                        <div className="profile-name px-3 pt-2">
                          <h4 className="text-primary mb-0">
                            {StaffDetials?.measurer?.firstName}{" "}
                            {StaffDetials?.measurer?.lastName}
                          </h4>
                          <p>{StaffDetials?.measurer?.type}</p>
                        </div>
                        <div className="profile-email px-2 pt-2">
                          <h4 className="text-muted mb-0">
                            {StaffDetials?.measurer?.email}
                          </h4>
                          <p>Email</p>
                        </div>
                        <div className="profile-email px-2 pt-2">
                          <h4 className="text-muted mb-0">
                            {StaffDetials?.measurer?.phone}
                          </h4>
                          <p>Phone</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4">
                <div className="row">
                  <div className="col-xl-12">
                    <div className="card">
                      <div className="card-body">
                        <div className="profile-statistics">
                          <div className="text-center">
                            <div className="row">
                              <div className="col">
                                <h3 className="m-b-0">
                                  {StaffDetials?.totalEnquiry}
                                </h3>
                                <span>Total Enquiry</span>
                              </div>
                              <div className="col">
                                <h3 className="m-b-0">
                                  {StaffDetials?.pendingEnquiry}
                                </h3>
                                <span>Pending Enquirys</span>
                              </div>
                              <div className="col">
                                <h3 className="m-b-0">
                                  {StaffDetials?.completedEnquiry}{" "}
                                </h3>
                                <span>Completed Enquirys</span>
                              </div>
                            </div>
                            <div className="mt-4">
                              <Link
                                to={`/superadmin/enquiry-list`}
                                className="btn
                            btn-primary mb-1 me-1"
                              >
                                Schedule Enquiry
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-12">
                <div className="card">
                  <div className="card-body">
                    <div className="profile-tab">
                      <div className="custom-tab-1">
                        <ul className="nav nav-tabs">
                          <li className="nav-item">
                            <a
                              href="#my-posts"
                              data-bs-toggle="tab"
                              className="nav-link active show"
                            >
                              Total Enquirys
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="#about-me"
                              data-bs-toggle="tab"
                              className="nav-link"
                            >
                              About
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="#profile-settings"
                              data-bs-toggle="tab"
                              className="nav-link"
                            >
                              Edit Profile
                            </a>
                          </li>
                        </ul>
                        <div className="tab-content">
                          <div
                            id="my-posts"
                            className="tab-pane fade active show"
                          >
                            <div className="table-responsive">
                              <div className="table-responsive">
                                <table
                                  id="example4"
                                  className="table card-table display mb-4 shadow-hover table-responsive-lg"
                                  style={{ minWidth: "845px" }}
                                >
                                  <thead>
                                    <tr>
                                      <th>E/N</th>
                                      <th>Customer Name</th>
                                      <th>Mobile.</th>

                                      <th>Status</th>
                                      <th>Date</th>
                                      <th>Action</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {/* {console.log("length", StaffDetials)} */}
                                    {StaffDetials?.enquiry &&
                                      StaffDetials?.enquiry.length < 0 ? (
                                      <p>No enquiry Found</p>
                                    ) : (
                                      StaffDetials?.enquiry?.map(
                                        (data, index) => (
                                          <tr>
                                            <>
                                              <th>{data.enquiry?.enquiryId}</th>
                                              <th>
                                                {
                                                  data?.enquiry?.customer
                                                    ?.firstName
                                                }{" "}
                                                {
                                                  data?.enquiry?.customer
                                                    ?.lastName
                                                }
                                              </th>
                                              <th>
                                                {
                                                  data?.enquiry?.customer
                                                    ?.primary_phone
                                                }
                                              </th>
                                              <td>
                                                <span className="badge light badge-success">
                                                  {data?.status}
                                                </span>
                                              </td>

                                              <td>
                                                {" "}
                                                {moment(data.date).format(
                                                  "MMMM DD YYYY"
                                                )}
                                              </td>
                                              <td>
                                                <button
                                                  onClick={() => {
                                                    navigate(
                                                      `/EnquiryDetials/${data?.id}`,
                                                      {
                                                        state: {
                                                          data: data.id,
                                                        },
                                                      }
                                                    );
                                                  }}
                                                  className="btn btn-primary btn-sm"
                                                >
                                                  View More
                                                </button>
                                              </td>
                                            </>
                                          </tr>
                                        )
                                      )
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                          <div id="about-me" className="tab-pane fade">
                            <div className="profile-personal-info">
                              <h4 className="text-primary mb-4">
                                Personal Information
                              </h4>
                              <div className="row mb-2">
                                <div className="col-sm-3 col-5">
                                  <h5 className="f-w-500">
                                    Name <span className="pull-end">:</span>
                                  </h5>
                                </div>
                                <div className="col-sm-9 col-7">
                                  <span>
                                    {StaffDetials?.user?.firstName}{" "}
                                    {StaffDetials?.user?.lastName}
                                  </span>
                                </div>
                              </div>
                              <div className="row mb-2">
                                <div className="col-sm-3 col-5">
                                  <h5 className="f-w-500">
                                    Email <span className="pull-end">:</span>
                                  </h5>
                                </div>
                                <div className="col-sm-9 col-7">
                                  <span>{StaffDetials?.user?.email}</span>
                                </div>
                              </div>
                              <div className="row mb-2">
                                <div className="col-sm-3 col-5">
                                  <h5 className="f-w-500">
                                    Outlet <span className="pull-end">:</span>
                                  </h5>
                                </div>
                                <div className="col-sm-9 col-7">
                                  <Link to={"/"}>
                                    {StaffDetials?.outlet?.outlet?.outlet_name}
                                  </Link>
                                </div>
                              </div>
                              {/* <div className="row mb-2">
                            <div className="col-sm-3 col-5">
                              <h5 className="f-w-500">
                                Age <span className="pull-end">:</span>
                              </h5>
                            </div>
                            <div className="col-sm-9 col-7">
                              <span>27</span>
                            </div>
                          </div> */}
                              {/* <div className="row mb-2">
                            <div className="col-sm-3 col-5">
                              <h5 className="f-w-500">
                                Location <span className="pull-end">:</span>
                              </h5>
                            </div>
                            <div className="col-sm-9 col-7">
                              <span>Rosemont Avenue Melbourne, Florida</span>
                            </div>
                          </div> */}
                              {/* <div className="row mb-2">
                            <div className="col-sm-3 col-5">
                              <h5 className="f-w-500">
                                Year Experience{" "}
                                <span className="pull-end">:</span>
                              </h5>
                            </div>
                            <div className="col-sm-9 col-7">
                              <span>07 Year Experiences</span>
                            </div>
                          </div> */}
                            </div>
                          </div>
                          <div id="profile-settings" className="tab-pane fade">
                            <div className="pt-3">
                              <div className="settings-form">
                                <h4 className="text-primary">
                                  Account Setting
                                </h4>
                                <form onSubmit={handleSubmit(EditUserDetials)}>
                                  <div className="row">
                                    <div className="mb-3 col-md-6">
                                      <label className="form-label">
                                        First Name
                                      </label>
                                      <input
                                        {...register("firstName", {
                                          required: "please Enter First Name",
                                        })}
                                        type="text"
                                        placeholder="First Name"
                                        className="form-control"
                                      />
                                      {errors?.firstName &&
                                        errors?.firstName.message}
                                    </div>

                                    <div className="mb-3 col-md-6">
                                      <label className="form-label">
                                        Last Name
                                      </label>
                                      <input
                                        {...register("lastName", {
                                          required: "please Enter Last name",
                                        })}
                                        type="text"
                                        placeholder="Last Name"
                                        className="form-control"
                                      />
                                      {errors.lastName &&
                                        errors.lastName.message}
                                    </div>
                                    <div className="col-md-6">
                                      <label className="form-label">
                                        Phone Number
                                      </label>
                                      <input
                                        {...register("phone", {
                                          required: "please Enter Phone Number",
                                        })}
                                        type="number"
                                        placeholder="Phone Number"
                                        className="form-control"
                                      />
                                      {errors.Phone && errors.Phone.message}
                                    </div>
                                    <div className="col-lg-6">
                                      <label className="form-label">
                                        Enter id
                                      </label>
                                      <input
                                        {...register("userId", {
                                          required: "please Enter Outlet_id",
                                          maxLength: 80,
                                        })}
                                        autocomplete="off"
                                        type="text"
                                        className="form-control input-default"
                                      />
                                      <span className="font-danger">
                                        {errors.outlet_id &&
                                          errors.outlet_id.message}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="mb-3 col-md-6">
                                      <label className="form-label">
                                        Email
                                      </label>
                                      <input
                                        {...register("email", {
                                          required: "please Enter Last name",
                                        })}
                                        type="email"
                                        placeholder="Email"
                                        className="form-control"
                                      />
                                      {errors.email && errors.email.message}
                                    </div>
                                    <div className="mb-3 col-md-6">
                                      <label className="form-label">
                                        Password
                                      </label>
                                      <input
                                        {...register("password")}
                                        type="password"
                                        placeholder="Password"
                                        className="form-control"
                                      />
                                      {errors.password &&
                                        errors.password.message}
                                    </div>
                                    {/* <div className="mb-3 col-md-12">
                                      <label className="form-label">
                                        Profile Picture
                                      </label>
                                      <input
                                        onChange={(file) => {
                                          getuserImage(file);
                                        }}
                                        type="file"
                                        name="image"
                                        className="form-control"
                                      />
                                    </div> */}
                                  </div>

                                  <button
                                    className="btn btn-primary"
                                    type="submit"
                                  >
                                    Submit
                                  </button>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Modal */}
                      <div className="modal fade" id="replyModal">
                        <div
                          className="modal-dialog modal-dialog-centered"
                          role="document"
                        >
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title">Post Reply</h5>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                              />
                            </div>
                            <div className="modal-body">
                              <form>
                                <textarea
                                  className="form-control"
                                  rows={4}
                                  defaultValue={"Message"}
                                />
                              </form>
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-danger light"
                                data-bs-dismiss="modal"
                              >
                                btn-close
                              </button>
                              <button type="button" className="btn btn-primary">
                                Reply
                              </button>
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
      </div>
    </>
  );
}

export default MesurerDetials;
