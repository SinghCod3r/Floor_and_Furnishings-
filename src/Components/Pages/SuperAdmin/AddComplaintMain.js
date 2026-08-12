import { useEffect, useState } from "react";
import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";
import { GetDataWithToken, PostDataWithToken } from "../../ApiHelper/ApiHelper";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Modal,
  ModalBody,
  ModalHeader,
} from 'reactstrap';
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "material-react-toastify";

const AddComplaintMain = () => {
  const location = useLocation();
  const navigate = useNavigate();
  console.log("useLocation: ", location.state.category);
  const [inputFields, setInputFields] = useState([{ id: 1, value1: '', value2: '', value3: '' }]);
  const nextId = inputFields.length + 1;

  const handleAddField = () => {
    setInputFields([...inputFields, { id: nextId, value1: '', value2: '', value: "" }]);
  };

  const handleInputChange = (id, field, newValue) => {
    const updatedFields = inputFields.map((fieldObj) => {
      if (fieldObj.id === id) {
        return { ...fieldObj, [field]: newValue };
      }
      return fieldObj;
    });
    setInputFields(updatedFields);
    console.log("input", inputFields)
  };

  const handleRemoveField = (id) => {
    const updatedFields = inputFields.filter((fieldObj) => fieldObj.id !== id);
    setInputFields(updatedFields);
  };

  const submitHandler = () => {
    const submitData = inputFields.map((obj) => ({
      type: obj.value1,
      description: obj.value2,
      tat: obj.value3,
      materialId: location.state.category,
    }));

    PostDataWithToken("superadmin/create-complaints", { data: submitData }).then((response) => {
      if (response.status === true) {
        toast.success(response.message);
        navigate(-1);
      } else {
        toast.error("unable to add complaint please try again");
      }
    })



    console.log(submitData);
  }

  // const location = useLocation();
  // // const [materialList, setMaterialList] = useState([]);
  // const [inputType, setInputType] = useState('');
  //  const [inputDescription, setInputDescription] = useState([]);
  //  const [addHandler, setAddHandler] = useState([1]);
  // const [valueHandler, setValueHandler] = useState(''); 
  // console.log();
  // const handleDescription = (event) => {
  //   setValueHandler(event.target.value);
  //  }

  // const addValueHandler = () => {
  //   let formdata = [...inputDescription, {
  //     type: inputType,
  //     description: valueHandler,
  //     materialId: location.state.category
  //   }];
  //   setInputDescription([...formdata]);
  //   setAddHandler(prevData => [...prevData, prevData + 1]);
  //   console.log(inputDescription);
  // };

  // const submitHandler = () => {

  //    setInputDescription(prevData => [...prevData, { 
  //         type:inputType,
  //           description: valueHandler,
  //         materialId:location.state.category, 
  //    }]);
  //   // PostDataWithToken('superadmin/create-complaints', inputDescription).then((response) => { 
  //   //   if (response.status === true) {
  //   //     toast.success("Successfully created");
  //   //   }
  //   // })
  //   console.log(inputDescription);
  // }

  // useEffect(() => {
  //     GetDataWithToken(`sales/get-materials`).then((response) => {
  //         setMaterialList(response.data);
  //     })
  // },[])
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
                  </div>

                  <div class="card-body">
                    <div>
                      <div className="col-xl-12">
                        <div className="row">
                          {inputFields.map((field) => (
                            <div key={field.id}>
                              <div className="row mb-4">
                                <div className="col-xl-10">
                                  <input
                                    type="text"
                                    placeholder="Type..."
                                    className="form-control mb-2"
                                    value={field.value1}
                                    onChange={(e) => handleInputChange(field.id, 'value1', e.target.value)}
                                  />
                                  <input
                                    type="text"
                                    placeholder="Description..."
                                    className="form-control"
                                    value={field.value2}
                                    onChange={(e) => handleInputChange(field.id, 'value2', e.target.value)}
                                  />
                                  <input
                                    type="text"
                                    placeholder="TAT..."
                                    className="form-control my-2"
                                    value={field.value3}
                                    onChange={(e) => handleInputChange(field.id, 'value3', e.target.value)}
                                  />
                                </div>
                                <div className="col-xl-2 mt-4">
                                  <button onClick={() => handleRemoveField(field.id)} class="btn btn-danger bg-danger ms-2"> <i className="fa fa-trash"></i></button>
                                </div>
                              </div>
                            </div>
                          ))}
                          <button onClick={handleAddField} className="btn btn-primary">Add Field</button>
                          <button className="btn btn-primary mt-3" onClick={submitHandler}>
                            Submit
                          </button>
                        </div>
                      </div>

                      <div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default AddComplaintMain;