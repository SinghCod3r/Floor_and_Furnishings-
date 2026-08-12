import { toast } from "material-react-toastify";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { PostDataWithToken } from "../../../ApiHelper/ApiHelper";
// import { PostDataWithToken } from "../ApiHelper/ApiHelper";

function CreateWareHouseModal({ modal, toggle }) {
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
    let values = {
      name: data.name,
      location: data.Address,
      latitude: data.latitude,
      longitude: data.longitude,
      warehouseId: data.outlet_mobile_no,
    };

    PostDataWithToken("superadmin/create-warehouse", values).then(
      (response) => {
        if (response.status === true) {
          // console.log("first", response.message);
          toast.success(response.message, {
            position: toast.POSITION.TOP_CENTER,
          });
          reset({
            name: "",
            location: "",
            latitude: "",
            longitude: "",
            warehouseId: "",
          });
          toggle();
          setCallApi(true);
        } else {
          toast.error(response.data.message, {
            position: "top-right",
          });
        }
      }
    );
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
                {...register("name", {
                  required: "please enter name",
                })}
                type="text"
                className="form-control"
                id="fnf"
                placeholder="WareHouse name"
              />
              <span className="text-danger">
                {errors.name && errors.name.message}
              </span>
            </div>
          </div>
          <div className="mb-3 row align-items-center">
            <label className="col-sm-3 col-form-label" htmlFor="comment">
              Address
            </label>
            <div className="col-lg-9">
              <input
                {...register("Address", {
                  required: "please enter Address",
                })}
                className="form-control"
                id="comment"
                placeholder="WareHouse Address"
                defaultValue={""}
              />
              <span className="text-danger">
                {errors.street && errors.street.message}
              </span>
            </div>
          </div>
          <div className="mb-3 row align-items-center">
            <label className="col-sm-3 col-form-label" htmlFor="latitude">
              latitude
            </label>
            <div className="col-lg-9">
              <input
                {...register("latitude", {
                  required: "please enter latitude",
                })}
                className="form-control"
                id="city"
                placeholder="latitude"
                defaultValue={""}
              />
              <span className="text-danger">
                {errors.city && errors.city.message}
              </span>
            </div>
          </div>
          <div className="mb-3 row align-items-center">
            <label className="col-sm-3 col-form-label" htmlFor="longitude">
              longitude
            </label>
            <div className="col-lg-9">
              <input
                {...register("longitude", {
                  required: "please enter longitude",
                })}
                className="form-control"
                id="State"
                placeholder="longitude"
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
              warehouse Id
            </label>
            <div className="col-sm-9">
              <input
                {...register("outlet_mobile_no", {
                  required: "please enter ID",
                })}
                type="text"
                className="form-control"
                id="fnf1"
                placeholder="Warehouse Id "
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

export default CreateWareHouseModal;
