import { useForm } from "react-hook-form";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { GetDataWithToken, PostDataWithToken } from "../ApiHelper/ApiHelper";
import { useLocation } from "react-router-dom";
import { toast } from "material-react-toastify";

const AddProductModal = ({ modalOpen, toggle }) => {
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const closeHandler = () => {
    toggle();
    reset();
  }

  const submitHandler = (data) => {
    GetDataWithToken(`superadmin/add-item?itemId=${data?.itemId}`).then((response) => {
      if (response.status === true) {
        toast.success("product added successfully");
        toggle();
        reset();
      } else {
        console.log(response);
        toast.error(response?.data?.message);
      }
    })
  }

  return <Modal isOpen={modalOpen} toggle={closeHandler}>
    <ModalHeader>Add Product
    </ModalHeader>
    <ModalBody>
      <form
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className="mb-3 row align-items-center">
          <div className="col-lg-12 my-1">
            <input className="form-control"
              placeholder="Item Id"
              {...register("itemId", {
                required: "please enter item ID",
              })} />
            <p className="text-danger">{errors?.itemId?.message}</p>
            {/* <button className="btn btn-primary">submit</button> */}
          </div>

        </div>
        <div className="form-buttons text-end">
          <button
            onClick={toggle}
            type="button"
            className="btn btn-secondary me-3"
          >
            Cancel
          </button>
          <button className="btn btn-primary">Submit</button>
        </div>
      </form>
    </ModalBody>
  </Modal>
    ;
}
export default AddProductModal;