import { toast } from "material-react-toastify";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GetDataWithToken, PutDataWithToken } from "../../ApiHelper/ApiHelper";
import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";
import { Nav, NavItem, TabContent, TabPane, NavLink } from "reactstrap";
import ReactApexChart from "react-apexcharts";

function StaffDetials() {
  const location = useLocation();
  const navigate = useNavigate();
  const [StaffDetials, setStaffDetials] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userImage, setUserImage] = useState(null);
  const [activeTab, setActiveTab] = useState(1);
  const [showPassword, setShowPassword] = useState(false)
  const getuserImage = (data) => {
    setUserImage(data.target.files[0]);
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const UserToggleBlockHandler = () => {
    const Data = {
      id: StaffDetials.user.id, is_block: !StaffDetials.user.isBlocked
    }
    PutDataWithToken("auth/block-user", Data).then((response) => {
      if (response.status === true) {
        toast.success(response.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.error(response.data.message, {
          position: "top-right",
        });
      }
    })
  }

  const [chart, setChart] = React.useState({
    series: [70, 10, 10, 10],
    options: {
      chart: {
        width: 330,
        type: 'pie',
      },
      labels: ['Fresh', 'Pending', 'Cancelled', 'Completed'],
      colors: ['#F0F0D7', '#DF6D2D', '#A31D1D', '#35de2f'],
      legend: {
        position: 'bottom',
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'top'
          }
        }
      }]
    },


  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    setUserId(location.state.data?.id);
    GetDataWithToken(`superadmin/get-user/${location.state.data.id}`).then(
      (response) => {
        if (response.status === true) {
          setStaffDetials(response.data);

          reset({
            firstName: response?.data?.user?.firstName,
            lastName: response?.data?.user?.lastName,
            email: response?.data?.user?.email,
            // password: response?.data?.user?.password,
            phone: response?.data?.user?.phone,
            userId: response?.data?.user?.userId,
          });

          setChart((prev) => ({
            ...prev,
            series: [response?.data?.freshEnquiry, response?.data?.inprogressEnquiry, response?.data?.cancelledEnquiry, response?.data?.completedEnquiry],

          }));
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
    formData.append("userId", data.userId);
    formData.append("image", userImage);

    PutDataWithToken(`superadmin/edit-user/${userId}`, formData).then(
      (response) => {
        if (response.status === true) {
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

                        {StaffDetials?.user?.image === null ? (
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
                            style={{ height: "80px", width: "90px" }}
                          />
                        )}
                      </div>
                      <div className="profile-details">
                        <div className="profile-name px-3 pt-2">
                          <h4 className="text-primary mb-0">
                            {StaffDetials?.user?.firstName}
                            {StaffDetials?.user?.lastName}
                          </h4>
                          <p>{StaffDetials?.user?.type}</p>
                        </div>
                        <div className="profile-email px-2 pt-2">
                          <h4 className="text-muted mb-0">
                            {StaffDetials?.user?.email}
                          </h4>
                          <p>Email</p>
                        </div>
                        <div className="profile-email px-2 pt-2">
                          <h4 className="text-muted mb-0">
                            {StaffDetials?.user?.phone}
                          </h4>
                          <p>Phone</p>
                        </div>
                        <div className="dropdown ms-auto">
                          <a
                            href="#"
                            className="btn btn-primary light sharp"
                            data-bs-toggle="dropdown"
                            aria-expanded="true"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              width="18px"
                              height="18px"
                              viewBox="0 0 24 24"
                              version="1.1"
                            >
                              <g
                                stroke="none"
                                strokeWidth={1}
                                fill="none"
                                fillRule="evenodd"
                              >
                                <rect x={0} y={0} width={24} height={24} />
                                <circle fill="#000000" cx={5} cy={12} r={2} />
                                <circle fill="#000000" cx={12} cy={12} r={2} />
                                <circle fill="#000000" cx={19} cy={12} r={2} />
                              </g>
                            </svg>
                          </a>
                          <ul className="dropdown-menu dropdown-menu-end">
                            {/* <li className="dropdown-item">
                              <i className="fa fa-user-circle text-primary me-2" />{" "}
                              View profile
                            </li>
                            <li className="dropdown-item">
                              <i className="fa fa-users text-primary me-2" />{" "}
                              Add to btn-close friends
                            </li>
                            <li className="dropdown-item">
                              <i className="fa fa-plus text-primary me-2" /> Add
                              to group
                            </li> */}
                            <li className="dropdown-item" onClick={UserToggleBlockHandler}>
                              <i className="fa fa-ban text-primary me-2" />{" "}
                              {StaffDetials?.user?.isblocked ? "Unblock" : "Block"}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="card profile card-body px-3 pt-3 pb-0">
                  {/* <div className="card-body"> */}
                  <div className="profile-statistics">
                    <div className="text-center">
                      <div className="row">
                        <div className="col">
                          <h3 className="m-b-0">
                            {StaffDetials?.freshEnquiry}
                          </h3>
                          <span>Fresh</span>
                        </div>
                        <div className="col">
                          <h3 className="m-b-0">
                            {StaffDetials?.inprogressEnquiry}
                          </h3>
                          <span>Pending</span>
                        </div>
                        <div className="col">
                          <h3 className="m-b-0">
                            {StaffDetials?.cancelledEnquiry}
                          </h3>
                          <span>Cancelled</span>
                        </div>
                        <div className="col">
                          <h3 className="m-b-0">
                            {StaffDetials?.completedEnquiry}{" "}
                          </h3>
                          <span>Completed</span>
                        </div>
                      </div>
                      {/* <div className="mt-4">
                          <Link
                            to={`/superadmin/enquiry-list`}
                            className="btn
                              btn-primary mb-1 me-1"
                          >
                            Schedule Enquiry
                          </Link>
                        </div> */}
                      <div>
                        <div id="chart">
                          <ReactApexChart options={chart.options} series={chart.series} type="pie" width={330} />
                        </div>
                        <div id="html-dist"></div>
                      </div>
                    </div>
                    {/* </div> */}
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
                        <Nav>
                          <NavItem>
                            <NavLink
                              onClick={() => setActiveTab(1)}
                            >
                              Total Enquirys
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              onClick={() => setActiveTab(2)}
                            >
                              About
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              onClick={() => setActiveTab(3)}
                            >
                              Edit Profile
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              onClick={() => setActiveTab(4)}
                            >
                              Login/Logout Activities
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              onClick={() => setActiveTab(5)}
                            >
                              Customers
                            </NavLink>
                          </NavItem>
                        </Nav>
                        <TabContent activeTab={activeTab}>
                          <TabPane tabId={1}>
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
                                    {StaffDetials?.Enquiry &&
                                      StaffDetials?.Enquiry.length < 0 ? (
                                      <p>No Enquiry Found</p>
                                    ) : (
                                      StaffDetials?.Enquiry?.map(
                                        (data, index) => (
                                          <tr>
                                            <>
                                              <th>{data.id}</th>
                                              <th>
                                                {data?.customer?.firstName}{" "}
                                                {data?.customer?.lastName}
                                              </th>
                                              <th>
                                                {data?.customer?.primary_phone}
                                              </th>
                                              <td>
                                                <span className="badge light badge-success">
                                                  {data?.status}
                                                </span>
                                              </td>

                                              <td>
                                                {" "}
                                                {moment(data.createdAt).format(
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
                          </TabPane>
                          <TabPane tabId={2}>
                            <div className="row profile-personal-info">
                              <h4 className="text-primary mb-4">
                                Personal Information
                              </h4>
                              <div className="col">

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
                                    {StaffDetials?.outlet?.outlet?.firstName}
                                  </div>
                                </div>
                                <div className="row mb-2">
                                  <div className="col-sm-3 col-5">
                                    <h5 className="f-w-500">
                                      Phone <span className="pull-end">:</span>
                                    </h5>
                                  </div>
                                  <div className="col-sm-9 col-7">
                                    {StaffDetials?.user?.phone}
                                  </div>
                                </div>

                              </div>
                              <div className="col">
                                <div className="row mb-2">
                                  <div className="col-sm-3 col-5">
                                    <h5 className="f-w-500">
                                      User Id <span className="pull-end">:</span>
                                    </h5>
                                  </div>
                                  <div className="col-sm-9 col-7">
                                    <span>
                                      {StaffDetials?.user?.userId}
                                    </span>
                                  </div>
                                </div>
                                <div className="row mb-2">
                                  <div className="col-sm-3 col-5">
                                    <h5 className="f-w-500">
                                      Role <span className="pull-end">:</span>
                                    </h5>
                                  </div>
                                  <div className="col-sm-9 col-7">
                                    <span>{StaffDetials?.user?.type}</span>
                                  </div>
                                </div>
                                <div className="row mb-2">
                                  <div className="col-sm-3 col-5">
                                    <h5 className="f-w-500">
                                      status <span className="pull-end">:</span>
                                    </h5>
                                  </div>
                                  <div className="col-sm-9 col-7">
                                    {StaffDetials?.user.isblocked ? "In Active" : "Active"}
                                  </div>
                                </div>
                                <div className="row mb-2">
                                  <div className="col-sm-3 col-5">
                                    <h5 className="f-w-500">
                                      Last Login <span className="pull-end">:</span>
                                    </h5>
                                  </div>
                                  <div className="col-sm-9 col-7">
                                    {moment(StaffDetials?.user?.login_time).format('DD-MM-YYYY HH:MM:SS')}
                                  </div>
                                </div>

                              </div>
                            </div>
                          </TabPane>
                          <TabPane tabId={3}>
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
                                    <div className="mb-3 col-md-6">
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
                                    <div className="mb-3 col-lg-6">
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
                                        {errors.userId &&
                                          errors.userId.message}
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
                                          required: "please Enter Email",
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
                                        {...register("password", {
                                          // required: "please Enter Last name",
                                        })}
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        className="form-control"
                                        style={{ paddingRight: "40px" }}
                                      />
                                      <i
                                        className={`bi ${showPassword ? "bi-eye" : "bi-eye-slash"}`}
                                        id="togglePassword"
                                        style={{
                                          position: "absolute",
                                          top: "75%",
                                          right: "50px",
                                          transform: "translateY(-50%)",
                                          cursor: "pointer",
                                        }}
                                        onClick={() => setShowPassword(!showPassword)}
                                      ></i>
                                      {/* <i class="bi bi-eye-slash" id="togglePassword"></i> */}
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
                          </TabPane>
                          <TabPane tabId={4}>
                            <div className="pt-3">
                              <div className="settings-form">
                                <h4 className="text-primary">
                                  Login/Logout Details
                                </h4>
                                <div className="table-responsive">
                                  <table
                                    id="example4"
                                    className="table card-table display mb-4 shadow-hover table-responsive-lg"
                                    style={{ minWidth: "845px" }}
                                  >
                                    <thead>
                                      <tr>
                                        <th>Login Time</th>
                                        <th>Logout Time</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {location?.state?.data?.activity && JSON.parse(location?.state?.data?.activity).map(
                                        (data, index) => {
                                          // const activity = JSON.parse(
                                          //   data.activity
                                          // );
                                          return (
                                            <tr key={index}>
                                              <td>
                                                {data?.login_time &&
                                                  moment(
                                                    data?.login_time
                                                  ).format("DD/MM/YYYY HH:mm")}
                                              </td>
                                              <td>
                                                {data?.logout_time &&
                                                  moment(
                                                    data?.logout_time
                                                  ).format("DD/MM/YYYY HH:mm")}
                                              </td>
                                              {/* <td>{outletManager.phone}</td>
                                        <td>{outletManager.email}</td> */}
                                              {/* <td>{outletManager?.login_time && moment(outletManager?.login_time).format("DD/MM/YYYY")}</td> */}
                                              {/* <td>{outletManager?.logout_time && moment(outletManager?.logout_time).format("DD/MM/YYYY")}</td> */}
                                            </tr>
                                          );
                                        }
                                      )}
                                      {/* {Error && <div>Error</div>} */}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </TabPane>
                          <TabPane tabId={5}>
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
                                  {StaffDetials?.Enquiry &&
                                    StaffDetials?.Enquiry.length < 0 ? (
                                    <p>No Enquiry Found</p>
                                  ) : (
                                    StaffDetials?.Enquiry?.map((data, index) => (
                                      <tr>
                                        <>
                                          <th>{data.id}</th>
                                          <th>
                                            {data?.customer?.firstName}{" "}
                                            {data?.customer?.lastName}
                                          </th>
                                          <th>{data?.customer?.primary_phone}</th>
                                          <td>
                                            <span className="badge light badge-success">
                                              {data?.status}
                                            </span>
                                          </td>

                                          <td>
                                            {" "}
                                            {moment(data.createdAt).format(
                                              "MMMM DD YYYY"
                                            )}
                                          </td>
                                          <td>
                                            <button
                                              onClick={() => {
                                                navigate(`/EnquiryDetials/${data?.id}`, {
                                                  state: { data: data.id },
                                                });
                                              }}
                                              className="btn btn-primary btn-sm"
                                            >
                                              View More
                                            </button>
                                          </td>
                                        </>
                                      </tr>
                                    ))
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </TabPane>
                        </TabContent>
                        <div className="tab-content">
                          {/* <div
                            id="my-posts"
                            className="tab-pane fade active show"
                          >
                            
                          </div> */}
                          {/* <div id="about-me" className="tab-pane fade">
                           
                          </div> */}
                          {/* <div id="profile-settings" className="tab-pane fade">
                            
                          </div> */}
                          {/* <div id="login-detail" className="tab-pane fade">
                           
                          </div> */}
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
              {/* <div className="col-lg-12">
                <div className="card">
                  <div className="card-header">
                    <h4>Customers</h4>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">

                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StaffDetials;
