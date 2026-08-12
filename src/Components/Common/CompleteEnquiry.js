import { toast } from "material-react-toastify";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { GetDataWithToken, PostDataWithToken } from "../ApiHelper/ApiHelper";

function CompleteEnquiry({ modal1, toggle1, id, enquiryId }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const [SelectedValue, setSelectedValue] = useState("");
    const [installerList, setInstallerList] = useState([]);
    const [CallApi, setCallApi] = useState(true);
    const lastId = id;

    useEffect(() => {
        GetDataWithToken(`superadmin/get-users?type=installer`).then((response) => {
            if (response.status === true) {
                setInstallerList(response.data)
            }
        })
    }, []);

    const CreateNewOutlet = (data) => {
        PostDataWithToken(
            `superadmin/enquiry-completed`,
            { remark: data.remark, enquiryId: data?.enquiryId, installerId: data?.installer_id }
        ).then((response) => {
            if (response.status === true) {
                console.log("response", response);
                toast.success("Enquiry Completed Successfully", {
                    position: toast.POSITION.TOP_CENTER,
                });
                toggle1();
            } else {
                toast.error(response.message);
            }
        });
    };

    return (
        <Modal isOpen={modal1} toggle1={toggle1}>
            <ModalHeader>Why you want to complete Enquiry
            </ModalHeader>
            <ModalBody>
                <form onSubmit={handleSubmit(CreateNewOutlet)}>
                    <div className="mb-3 row align-items-center">
                        {/* <div className="col-lg-12 my-1">
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
                            </select>
                        </div> */}
                        <div className="mb-3 row align-items-center">
                            <label className="col-sm-12 col-form-label" htmlFor="fnf2">
                                Remark
                            </label>
                            <div className="col-sm-12">
                                <textarea
                                    {...register("remark", {
                                        required: "please enter value",
                                    })}
                                    type="text"
                                    className="form-control"
                                    id="fnfremark"
                                    placeholder="remark..."
                                // readOnly="true"
                                // value={lastId}
                                />
                                <span className="text-danger">
                                    {errors.remark && errors.remark.message}
                                </span>
                            </div>
                        </div>
                        <div className="mb-3 row align-items-center">
                            <label className="col-sm-12 col-form-label" htmlFor="fnf2">
                                ID
                            </label>

                            <div className="col-sm-12">
                                <input
                                    {...register("enquiryId", {
                                        required: "please enter enquiry Id",
                                    })}
                                    type="text"
                                    className="form-control"
                                    id="fnf2"
                                    placeholder="id..."
                                    readOnly="true"
                                    value={enquiryId}
                                />
                                <span className="text-danger">
                                    {errors.enquiryId && errors.enquiryId.message}
                                </span>
                            </div>
                        </div>
                        <div className="mb-3 row align-items-center">
                            <label className="col-sm-12 col-form-label" htmlFor="fnf2">
                                installer
                            </label>

                            <div className="col-sm-12">
                                <select
                                    className="form-control"
                                    {...register("installer_id", {
                                        required: "please enter installer",
                                    })}
                                >
                                    <option value={null}>choose...</option>
                                    {installerList?.map((data) => <option value={data?.id}>{data?.firstName} {data?.lastName}</option>)}
                                </select>
                                <span className="text-danger">
                                    {errors.installer_id && errors.installer_id.message}
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

export default CompleteEnquiry;
