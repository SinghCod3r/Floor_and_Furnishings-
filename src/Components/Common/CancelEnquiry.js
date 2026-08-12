import { toast } from "material-react-toastify";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { GetDataWithToken, PostDataWithToken } from "../ApiHelper/ApiHelper";

function CancelEnquiry({ modal1, toggle1, id }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [SelectedValue, setSelectedValue] = useState("");
  const [CallApi, setCallApi] = useState(true);
  const lastId = id;

  const CreateNewOutlet = (data) => {
    GetDataWithToken(
      `superadmin/cancel-enquiry/${lastId}?remark=${SelectedValue?.target?.value}`
    ).then((response) => {
      if (response.status === true) {
        console.log("response", response);
        toast.success("Enquiry Canceled Successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
        toggle1();
      }
    });
  };

  return (
    <Modal isOpen={modal1} toggle1={toggle1}>
      <ModalHeader>Why you want to cancel Enquiry
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(CreateNewOutlet)}>
          <div className="mb-3 row align-items-center">
            <div className="col-lg-12 my-1">
              <label className="me-sm-2">
                Select Reason for cancel Enquiry
              </label>
              <select
                className="me-sm-2  form-control"
                onChange={(e) => {
                  setSelectedValue(e);
                }}
              >
                <option selected>Choose...</option>

                <option value={"Testing Enquiry"}>Testing Enquiry</option>
                <option value={"Cancel from client End"}>
                  Cancel from client End
                </option>
                <option value={"Duplicate Enquiry"}>Duplicate Enquiry</option>
                <option value={" Incomplete Details"}>
                  Incomplete Details
                </option>
                <option value={"Client has approached the project team for the same product"}>
                  Client has approached the project team for the same product.
                </option>
                <option value={"Client has processed the billing through another account"}>
                  Client has processed the billing through another account.
                </option>
              </select>
            </div>
            <div className="mb-3 row align-items-center">
              <label className="col-sm-12 col-form-label" htmlFor="fnf2">
                ID
              </label>
              <div className="col-sm-12">
                <input
                  {...register("outlet_password", {
                    required: "please enter outlet password",
                  })}
                  type="text"
                  className="form-control"
                  id="fnf2"
                  placeholder="outlet Password"
                  readOnly="true"
                  value={lastId}
                />
                <span className="text-danger">
                  {errors.outlet_password && errors.outlet_password.message}
                </span>
              </div>
            </div>
          </div>
          <div className="form-buttons text-end">
            <button
              onClick={() => toggle1()}
              className="btn btn-secondary me-3"
            >
              Cancel
            </button>

            <button className="btn btn-primary">Submit</button>
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
}

export default CancelEnquiry;
