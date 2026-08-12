import { toast } from "material-react-toastify";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { GetDataWithToken, PostData } from "../../ApiHelper/ApiHelper";
import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";

function CreateNewQcCheck() {
  const navigate = useNavigate();
  const [AllMaterial, setAllMaterial] = useState([]);
  const [AllQcData, setAllQcCheck] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  useEffect(() => {
    GetDataWithToken("sales/get-materials").then((response) => {
      if (response.status === true) {
        console.log("first", response.data);
        setAllMaterial(response.data);
      } else {
        toast.error(response.data.message, {
          position: "top-right",
        });
      }
    });

    GetDataWithToken("quality/get/").then((response) => {
      if (response.status === true) {
        console.log("first", response.data);
        setAllQcCheck(response.data);
      } else {
        toast.error(response.data.message, {
          position: "top-right",
        });
      }
    });
  }, []);

  const CreateNewQcCheck = (data) => {
    console.log("data", data);
    let values = {
      checks: data.checkName,
      description: data.description,
      quality_check_type: data.qcType,
      product_type: data.productType,
    };
    PostData("quality/create", values).then((response) => {
      if (response.status === true) {
        console.log("first", response.message);
        toast.success(response.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        reset({
          checkName: "",
          description: "",
          qcType: "",
          productType: "",
        });
        // navigate("/superadmin/qc-checks");
      } else {
        toast.error(response.data.message, {
          position: "top-right",
        });
      }
    });
  };

  return (
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
                  <h4 className="card-title">Add New Qc Checks</h4>
                </div>
                <div className="card-body">
                  <div className="basic-form">
                    <form onSubmit={handleSubmit(CreateNewQcCheck)}>
                      <div>
                        <label>QC Type</label>
                        <select
                          {...register("qcType", {
                            required: "please select Qc Type",
                          })}
                          className="form-control wide mb-3"
                        >
                          <option value={""}>Select a Qc Type</option>
                          {AllQcData &&
                            AllQcData.map((item, index) => {
                              return (
                                <option key={index} value={item.id}>
                                  {item.quality_check_type}
                                </option>
                              );
                            })}
                        </select>
                        <span className="text-danger">
                          {errors.qcType && errors.qcType.message}
                        </span>
                      </div>
                      <div>
                        <label>Product Type</label>
                        <select
                          {...register("productType", {
                            required: "please select Product Type",
                          })}
                          className="form-control wide mb-3"
                        >
                          <option value="">Select a Product Type</option>
                          {AllMaterial &&
                            AllMaterial.length > 0 &&
                            AllMaterial.map((data, index) => {
                              return (
                                <option key={index} value={data.id}>
                                  {data.material}
                                </option>
                              );
                            })}
                        </select>
                        <span className="text-danger">
                          {errors.productType && errors.productType.message}
                        </span>
                      </div>

                      <div>
                        <label>Checks Name </label>
                        <input
                          {...register("checkName", {
                            required: "please add Checks",
                          })}
                          type="text"
                          className="form-control"
                        />
                      </div>
                      <span className="text-danger">
                        {errors.checkName && errors.checkName.message}
                      </span>

                      <div>
                        <label>Check Description </label>
                        <input
                          {...register("description", {
                            required: "please add description",
                          })}
                          type="text"
                          className="form-control"
                        />
                      </div>
                      <span className="text-danger">
                        {errors.description && errors.description.message}
                      </span>

                      <div className="buttons text-end mt-4">
                        <button
                          onClick={() => navigate(-1)}
                          className="btn btn-warning btn-sm me-2"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          className="btn btn-primary btn-sm"
                        >
                          Submit
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
  );
}

export default CreateNewQcCheck;
