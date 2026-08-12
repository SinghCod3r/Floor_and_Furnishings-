import { useEffect, useState } from "react";
import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";
import { DeleteDataWithToken, GetDataWithToken } from "../../ApiHelper/ApiHelper";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Modal,
  ModalBody,
  ModalHeader,
} from 'reactstrap';
import { useNavigate } from "react-router-dom";
import { toast } from "material-react-toastify";

const AddComplaint = () => {
  const [materialList, setMaterialList] = useState([]);
  const navigate = useNavigate();
  const [open, setOpen] = useState('1');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectvalue, setSelectValue] = useState(1);
  const [selectedMaterial, setSelectedMaterial] = useState();
  const modalToggle = () => setModalOpen(!modalOpen);
  const [callApi, setCallApi] = useState(false);
  const [complaintList, setComplaintList] = useState([]);

  const openAccordionHandler = (id) => {
    setSelectedMaterial(id);
    setCallApi(true);
  }
  const deleteHandler = (id) => {
    DeleteDataWithToken(`superadmin/delete-complaint/${id}`).then((response) => {
      if (response.status === true) {
        toast.success("complaint deleted successfully");
        setCallApi(true);
      } else {
        toast.error("cannot delete please try again");
      }
    })
  }
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  }

  useEffect(() => {
    GetDataWithToken(`sales/get-materials`).then((response) => {
      setMaterialList(response.data);
      console.log(response.data);
    })
  }, [])

  useEffect(() => {
    if (callApi) {
      GetDataWithToken(`superadmin/get-complaints/${selectedMaterial}`).then((response) => {
        if (response.status == true) {
          setCallApi(false);
          setComplaintList(response.data);
        }
      })
    }
  }, [callApi])

  return (
    <>
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
                    <div className="col-xl-6">
                      <h4 className="card-title">Add Complaints</h4>
                    </div>
                    <div className="col-xl-3">
                      <button className="btn btn-primary" onClick={modalToggle}>Add</button>
                    </div>

                  </div>

                  <div class="card-body">

                    <Accordion
                      className="accordion accordion-start-indicator"
                      open={open} toggle={toggle}>
                      {materialList?.map((data, index) =>
                        <>
                          <div className="addordian-item my-2">


                            <AccordionHeader

                              // className="border-none"
                              // id={`accord-5One${index}`}
                              // data-bs-toggle="collapse"
                              // data-bs-target="#collapse5One"
                              // aria-controls="collapse5One"
                              // aria-expanded="true"
                              targetId={index + 1}
                              // role="button"
                              onClick={() => openAccordionHandler(data?.id)}
                            >
                              <h4>{data?.material}</h4>
                              {/* <span class="accordion-header-indicator text-dark"></span> */}
                            </AccordionHeader>
                            <AccordionBody
                              accordionId={index + 1}
                            >
                              <div class="accordion-body-text">
                                <div class="card">
                                  <div class="card-body">
                                    <div class="table-responsive">
                                      {complaintList?.length === 0 ?
                                        <h4 style={{ textAlign: "center" }}>No Data found</h4> : <table class="table table-bordered table-responsive-sm">
                                          <thead>
                                            <tr>
                                              <th>Complaint Type</th>
                                              <th>Descriptions</th>
                                              <th>Action</th>
                                            </tr>
                                          </thead>

                                          {complaintList.map((data) =>
                                            < tr >
                                              <td>{data?.type}</td>
                                              <td>{data?.description}</td>
                                              <td>
                                                <div className="d-flex">
                                                  {/* <button class="btn btn-danger bg-primary">
                                              <i className="fa fa-edit"></i>
                                            </button> */}
                                                  {/* <button
                                                class="btn btn-danger bg-danger ms-2"
                                                title="Block"
                                              >
                                                <i className="fa fa-ban"></i>
                                              </button> */}
                                                  <button
                                                    class="btn btn-danger bg-danger ms-2"
                                                    title="Delete"
                                                    onClick={() => deleteHandler(data?.id)}
                                                  >
                                                    <i className="fa fa-trash"></i>
                                                  </button>
                                                </div>
                                              </td>
                                            </tr>
                                          )}
                                        </table>}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </AccordionBody>

                          </div>
                        </>
                      )}
                    </Accordion>

                    {/* <div
                    class="accordion accordion-start-indicator"
                    id="accordion-five"
                  >
                    {/* {console.log("AllQcCheck", AllQcCheck)} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={modalOpen} centered toggle={modalToggle}>
        <ModalHeader>
          Add Complaint Desription
        </ModalHeader>
        <ModalBody>
          <div>
            <select className="form-control" onChange={(e) => setSelectValue(e.target.value)} >
              {materialList?.map((data) => <option value={data?.id}>{data?.material}</option>)}
            </select>
            <button className="btn btn-primary mt-4"
              onClick={() => navigate("/add-complaint-desription",
                { state: { category: selectvalue } })}>submit</button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
export default AddComplaint;