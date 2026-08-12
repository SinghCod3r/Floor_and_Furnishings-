import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "reactstrap";
import { useForm } from "react-hook-form";
import { toast } from "material-react-toastify";
import { GetData, PostData } from "../../ApiHelper/ApiHelper";

const CustomerLogin = () => {
  const navigation = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setIsLoading(true);
    console.log("errorrs", errors);
    let loginData = {

    };
    console.log(loginData);

    GetData(`customer/get-my-enquiry?phone=${data?.mobile}`).then((response) => {
      if (response.status === true) {
        toast.success("Logged in successfully");
        navigation("/customer-Enquiries", { state: { data: response.data } });
        // console.log(response);
        // Cookies.set("FandFToken", response.data.accessToken);
        // Cookies.set("userType", response.data.type);
        // Cookies.set("userID", response.data.id);
        // dispatch(setLoggedInUserDetails(response.data));
        setIsLoading(false);
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
                          href="#"
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
                      <form
                        onSubmit={handleSubmit(onSubmit)}
                      >
                        <div className="mb-3">
                          <label className="mb-1">
                            <strong>Mobile No.</strong>
                          </label>
                          <input
                            {...register("mobile", {
                              required: true,
                              maxLength: 80,
                            })}
                            type="number"
                            className="form-control"
                            placeholder="Enter your Mobile No."
                          />
                        </div>
                        {/* <div className="mb-3">
                          <label className="mb-1">
                            <strong>Password</strong>
                          </label>
                          <input
                            // {...register("password", {
                            //   required: true,
                            //   maxLength: 80,
                            // })}
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                          />
                        </div> */}
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

                        {/* <div className="row d-flex justify-content-between mt-4 mb-2">
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
                        </div> */}
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
  )
}
export default CustomerLogin;