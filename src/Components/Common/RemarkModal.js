import { useForm } from "react-hook-form";
import { Modal, ModalBody, ModalHeader, Spinner } from "reactstrap";

const RemarkModal = ({ modal, toggle, submitData, title, loadingState }) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const CreateRemark = (data) => {
        submitData(data, reset);
    }


    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>{title}</ModalHeader>
            <ModalBody>
                <form onSubmit={handleSubmit(CreateRemark)}>
                    <div className="mb-3 row align-items-center">
                        <div className="col-lg-12 my-1">
                            <label className="me-sm-2">
                                Remark
                            </label>
                            <textarea
                                {...register("remark", {
                                    required: "please enter remark",
                                })}
                                type="text"
                                className="form-control"
                                // id="fnf2"
                                placeholder="remark"
                            // readOnly="true"
                            // value={lastId}
                            />
                        </div>
                    </div>
                    <div className="form-buttons text-end">
                        <button onClick={() => toggle()} className="btn btn-secondary me-3">
                            Cancel
                        </button>

                        <button className="btn btn-primary">{loadingState ? <Spinner /> : "Submit"}</button>
                    </div>
                </form>
            </ModalBody>
        </Modal>

    )
}

export default RemarkModal;