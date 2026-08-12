import { toast } from "material-react-toastify";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { PostDataWithToken } from "../ApiHelper/ApiHelper";
import moment from "moment";

function ReAssignmesurer({ modal, toggle, id, isreassign }) {
  console.log("idddd", id);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  // const [modal, setModal] = useState(false);
  // const toggle = () => setModal(!modal);
  const [SelectedValue, setSelectedValue] = useState("");
  const [CallApi, setCallApi] = useState(true);

  const lastId = id && id[id?.length - 1]?.id;

  const CreateNewOutlet = (data) => {
    let date;
    date = isreassign === "measurement" ? { postpone_date: moment(data?.postpone_date).format("DD-MM-YYYY") } : { postponeDate: moment(data?.postponeDate).format("DD-MM-YYYY"), };
    const val = {
      id: lastId,
      status: "postponed",
      remark: SelectedValue.target.value,
      date,
    };

    PostDataWithToken("measurer/update-schedule", val).then((response) => {
      if (response.status === true) {
        console.log("first", response.message);
        toast.success(response.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        toggle();
      } else {
        toast.error(response.data.message, {
          position: "top-right",
        });
      }
    });
  };

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Postpone {isreassign === "measurement" ? "Measurement" : "Installation"}</ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(CreateNewOutlet)}>
          <div className="mb-3 row align-items-center">
            <div className="col-lg-12 my-1">
              <label className="me-sm-2">
                Select Reason for Postpone Measurement
              </label>
              <select
                className="me-sm-2  form-control"
                onChange={(e) => {
                  setSelectedValue(e);
                }}
              >
                <option selected>Choose...</option>

                <option value={"Manpower Shortage"}>Manpower Shortage</option>
                <option value={"Client not available "}>
                  Client not available
                </option>
                <option value={"Site not ready"}>Site not ready</option>
                <option value={"Selection Pending"}>Selection Pending</option>
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
            <div className="mb-3 row align-items-center">
              <label className="col-sm-12 col-form-label" htmlFor="fnf2">
                Date
              </label>
              <div className="col-sm-12">
                <input
                  {...register("postpone_date", {
                    required: "please enter date",
                  })}
                  type="date"
                  className="form-control"
                  id="fnf2"
                  placeholder="outlet Password"
                  // readOnly="true"
                  // value={lastId}
                  min={moment().add(1, "days").format("YYYY-MM-DD")}
                // minDate={new Date()}
                />
                <span className="text-danger">
                  {errors.postpone_date && errors.postpone_date.message}
                </span>
              </div>
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

export default ReAssignmesurer;
