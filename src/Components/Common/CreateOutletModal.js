import { toast } from "material-react-toastify";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { PostDataWithToken } from "../ApiHelper/ApiHelper";

function CreateOutletModal({ modal, toggle, getOutletHandler }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  // const [modal, setModal] = useState(false);
  // const toggle = () => setModal(!modal);
  const [CallApi, setCallApi] = useState(true);

  const CreateNewOutlet = (data) => {
    let formData = new FormData();
    formData.append("type", "outlet");
    formData.append("firstName", data.outlet_name);
    formData.append("email", data.outlet_email);
    formData.append("password", data.outlet_password);
    formData.append("phone", data.outlet_mobile_no);
    formData.append("street", data.street);
    formData.append("state", data.State);
    formData.append("pincode", data.Pincode);
    formData.append("city", data.city);
    formData.append("userId", data.outlet_id);

    PostDataWithToken("superadmin/create-user", formData).then((response) => {
      if (response.status === true) {
        console.log("first", response.message);
        toast.success(response.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        getOutletHandler();
        reset({
          outlet_name: "",
          outlet_email: "",
          outlet_password: "",
          password: "",
          outlet_mobile_no: "",
          outlet_address: "",
          outlet_id: "",
        });
        toggle();
        setCallApi(true);
      } else {
        toast.error(response.data.message, {
          position: "top-right",
        });
      }
    });
  };

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Add New Outlet</ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(CreateNewOutlet)}>
          <div className="mb-3 row align-items-center">
            <label className="col-sm-3 col-form-label" htmlFor="fnf">
              Name
            </label>
            <div className="col-sm-9">
              <input
                {...register("outlet_name", {
                  required: "please enter outlet name",
                })}
                type="text"
                className="form-control"
                id="fnf"
                placeholder="outlet name"
              />
              <span className="text-danger">
                {errors.outlet_name && errors.outlet_name.message}
              </span>
            </div>
          </div>
          <div className="mb-3 row align-items-center">
            <label className="col-sm-3 col-form-label" htmlFor="idfn">
              ID
            </label>
            <div className="col-sm-9">
              <input
                {...register("outlet_id", {
                  required: "please enter outlet ID",
                })}
                type="text"
                className="form-control"
                id="idfn"
                placeholder="outlet ID"
              />
              <span className="text-danger">
                {errors.outlet_name && errors.outlet_name.message}
              </span>
            </div>
          </div>
          <div className="mb-3 row align-items-center">
            <label className="col-sm-3 col-form-label" htmlFor="comment">
              street
            </label>
            <div className="col-lg-9">
              <input
                {...register("street", {
                  required: "please enter outlet Street",
                })}
                className="form-control"
                id="comment"
                placeholder="outlet Street"
                defaultValue={""}
              />
              <span className="text-danger">
                {errors.street && errors.street.message}
              </span>
            </div>
          </div>
          <div className="mb-3 row align-items-center">
            <label className="col-sm-3 col-form-label" htmlFor="city">
              City
            </label>
            <div className="col-lg-9">
              <input
                {...register("city", {
                  required: "please enter outlet city",
                })}
                className="form-control"
                id="city"
                placeholder="outlet city"
                defaultValue={""}
              />
              <span className="text-danger">
                {errors.city && errors.city.message}
              </span>
            </div>
          </div>
          <div className="mb-3 row align-items-center">
            <label className="col-sm-3 col-form-label" htmlFor="State">
              State
            </label>
            <div className="col-lg-9">
              <input
                {...register("State", {
                  required: "please enter outlet State",
                })}
                className="form-control"
                id="State"
                placeholder="outlet State"
                defaultValue={""}
              />
              <span className="text-danger">
                {errors.State && errors.State.message}
              </span>
            </div>
          </div>
          <div className="mb-3 row align-items-center">
            <label className="col-sm-3 col-form-label" htmlFor="Pincode">
              Pincode
            </label>
            <div className="col-lg-9">
              <input
                {...register("Pincode", {
                  required: "please enter outlet Pincode",
                })}
                className="form-control"
                id="Pincode"
                placeholder="outlet Pincode"
                defaultValue={""}
              />
              <span className="text-danger">
                {errors.Pincode && errors.Pincode.message}
              </span>
            </div>
          </div>

          <div className="mb-3 row align-items-center">
            <label className="col-sm-3 col-form-label" htmlFor="fnf1">
              Mobile No.
            </label>
            <div className="col-sm-9">
              <input
                {...register("outlet_mobile_no", {
                  required: "please enter outlet mobile no.",
                })}
                type="number"
                className="form-control"
                id="fnf1"
                placeholder="outlet mobile number"
              />
              <span className="text-danger">
                {errors.outlet_mobile_no && errors.outlet_mobile_no.message}
              </span>
            </div>
          </div>
          <div className="mb-3 row align-items-center">
            <label className="col-sm-3 col-form-label" htmlFor="fnf2">
              Email
            </label>
            <div className="col-sm-9">
              <input
                {...register("outlet_email", {
                  required: "please enter outlet email",
                })}
                type="email"
                className="form-control"
                id="fnf2"
                placeholder="outlet email"
              />
              <span className="text-danger">
                {errors.outlet_email && errors.outlet_email.message}
              </span>
            </div>
          </div>
          <div className="mb-3 row align-items-center">
            <label className="col-sm-3 col-form-label" htmlFor="fnf2">
              Outlet Password
            </label>
            <div className="col-sm-9">
              <input
                {...register("outlet_password", {
                  required: "please enter outlet password",
                })}
                type="password"
                className="form-control"
                id="fnf2"
                placeholder="outlet Password"
              />
              <span className="text-danger">
                {errors.outlet_password && errors.outlet_password.message}
              </span>
            </div>
          </div>
          <div className="form-buttons text-end">
            <button onClick={() => toggle()} className="btn btn-secondary me-3">
              Cancel
            </button>

            <button className="btn btn-primary">Submit</button>
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
}

export default CreateOutletModal;
