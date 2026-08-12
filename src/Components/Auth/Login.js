import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { PostData } from "../ApiHelper/ApiHelper";
import { useNavigate } from "react-router-dom";
// import { setLoggedInUserDetails } from "../Store/Actions/userAction";
import { setLoggedInUserDetails, setUserLogin } from "../Store/Actions/UserAction";
import { useDispatch } from "react-redux";
import { toast } from "material-react-toastify";
import { getToken } from "../../firebaseInit";
import { Spinner } from "reactstrap";
import {
  DispatchTeam,
  OutletManager,
  StitchingStoreManager,
  superAdmin,
} from "../Common/RoleType";

const Login = () => {

  const navigation = useNavigate();
  const dispatch = useDispatch();
  const [isToken, setToken] = useState(false);
  const [isTokenFound, setTokenFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let token;
    async function tokenFunc() {
      token = await getToken(setTokenFound);
      if (token) {
        console.log("Token is by jitu", token);
        setToken(token);
      } else {
        //   console.log("test")
      }
      return token;
    }

    tokenFunc();
  }, [setTokenFound]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setIsLoading(true);
    console.log("errorrs", errors);
    let loginData = {
      email: data.email,
      password: data.password,
      fcm_token: isToken,
    };
    console.log(loginData);
    PostData("auth/login", loginData).then((response) => {
      if (response.status === true) {
        console.log(response);
        Cookies.set("FandFToken", response.data.accessToken);
        Cookies.set("userType", response.data.type);
        Cookies.set("userID", response.data.id);
        dispatch(setUserLogin());
        dispatch(setLoggedInUserDetails(response.data));
        setIsLoading(false);

        let getType = response.data.type;
        switch (getType) {
          case superAdmin:
            console.log("first toastt");
            toast.success(response.message, {
              position: "top-right",
            });
            navigation("/SuperAdminDashboard");
            break;
          case DispatchTeam:
            toast.success(response.message, {
              position: "top-right",
            });
            navigation("/DispatchTeamDashboard", {
              state: { data: response.data.id },
            });
            break;
          case OutletManager:
            toast.success(response.message, {
              position: "top-right",
            });
            navigation("/OutletManagerDashboard", {
              state: { data: response.data.id },
            });
            break;

          case StitchingStoreManager:
            toast.success(response.message, {
              position: "top-right",
            });
            break;

          default:
            break;
        }
      } else {
        setIsLoading(false);
        toast.error(response.data.message, {
          position: "top-right",
        });
      }
    });
  };

  return (
    <>
      <div className="authincation h-100">
        <div className="container h-100vh">
          <div className="row justify-content-center h-100 align-items-center">
            <div className="col-md-6">
              <div className="authincation-content">
                <div className="row no-gutters">
                  <div className="col-xl-12">
                    <div className="auth-form">
                      <div className="text-center mb-3">
                        <a
                          href="page-login.html"
                          className="d-inline-block mb-5"
                        >
                          <img
                            src="./images/loginLogo.png"
                            style={{ width: "200px" }}
                            alt="test"
                          />
                        </a>
                      </div>
                      <h4 className="text-center mb-4">Sign in your account</h4>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                          <label className="mb-1">
                            <strong>Email</strong>
                          </label>
                          <input
                            {...register("email", {
                              required: true,
                              maxLength: 80,
                            })}
                            type="email"
                            className="form-control"
                            placeholder="Enter your email"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="mb-1">
                            <strong>Password</strong>
                          </label>
                          <input
                            {...register("password", {
                              required: true,
                              maxLength: 80,
                            })}
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                          />
                        </div>
                        {/* <div className="mb-3">
                          <select
                            className="form-control"
                            {...register("type")}
                          >
                            <option value="">Select a Value</option>
                            <option value="super-admin">SuperAdmin</option>
                            <option value="outlet-manager">
                              OutletManager
                            </option>
                            <option value="outlet-manager">DispatchTeam</option>

                            <option value="StitchingStoreManager">
                              StitchingStoreManager
                            </option>
                          </select>
                        </div> */}

                        <div className="row d-flex justify-content-between mt-4 mb-2">
                          <div className="mb-3">
                            <div className="form-check custom-checkbox ms-1">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="basic_checkbox_1"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="basic_checkbox_1"
                              >
                                Remember Me
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="text-center">
                          <button
                            disabled={isLoading === true ? true : false}
                            type="submit"
                            className="btn btn-primary btn-block"
                          >
                            {isLoading === true ? (
                              <Spinner size="small" />
                            ) : (
                              "Login"
                            )}
                          </button>
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
};

export default Login;
