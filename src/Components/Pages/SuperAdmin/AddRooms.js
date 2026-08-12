// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import { GetDataWithToken, PostDataWithToken } from "../../ApiHelper/ApiHelper";
// import SuperAdminHeader from "./Common/SuperAdminHeader";
// import SuperAdminSidebar from "./Common/SuperAdminSidebar";

// function AddRooms() {
//   const location = useLocation();
//   const [CustomerId, setCustomerId] = useState(null);
//   const [CategoryData, setCategoryData] = useState([]);
//   const [EnquiryData, setEnquiryData] = useState([]);

//   const [formValues, setformValues] = useState([
//     {
//       RoomName: "",
//       RoomWindows: "",
//       Floor: "",
//       RoomDescription: "",
//       RoomCategory: [],
//     },
//   ]);

//   useEffect(() => {
//     console.log("first", location.state);
//     setCustomerId(location.state.data);
//     PostDataWithToken(`sales/generate-enquiry/${location.state.data}`).then(
//       (response) => {
//         if (response.status === true) {
//           setEnquiryData(response.data);
//         }
//       }
//     );

//     GetDataWithToken("sales/get-materials").then((response) => {
//       if (response.status === true) {
//         setCategoryData(response.data);
//       }
//     });
//   }, []);
//   const addFormFields = () => {
//     setformValues([
//       ...formValues,
//       {
//         RoomName: "",
//         RoomWindows: "",
//         Floor: "",
//         RoomDescription: "",
//         RoomCategory: [],
//       },
//     ]);
//   };
//   const handleSelectedCategory = (i, e, roomIndex) => {
//     console.log("roomindex", roomIndex);

//     console.log("handleSelectedCategory", i, e.target.checked);

//     if (e.target.checked === true) {
//       let fromFileds = [...formValues];
//       console.log("fromfields", fromFileds);

//       let cat = fromFileds[roomIndex].RoomCategory;
//       cat.push(e.target.value);
//       fromFileds[roomIndex].RoomCategory = cat;
//       setformValues(fromFileds);
//     }
//   };
//   const handleChange = (i, e) => {
//     let formval = [...formValues];
//     formval[i][e.target.name] = e.target.value;
//     setformValues(formval);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log("formValues", formValues);
//     PostDataWithToken("");
//   };

//   return (
//     <div
//       data-typography="poppins"
//       data-theme-version="light"
//       data-layout="vertical"
//       data-nav-headerbg="color_1"
//       data-headerbg="color_1"
//       data-sidebar-style="full"
//       data-sibebarbg="color_1"
//       data-sidebar-position="fixed"
//       data-header-position="fixed"
//       data-container="wide"
//       direction="ltr"
//       data-primary="color_1"
//       id="main-wrapper"
//       className="show"
//     >
//       <SuperAdminHeader />
//       <SuperAdminSidebar />
//       {console.log("CustomerId", CustomerId)}
//       <div></div>
//       <div className="content-body">
//         {/* row */}
//         <div className="container-fluid">
//           <div className="row">
//             <div className="col-xl-12">
//               <div className="card">
//                 <div className="card-header">
//                   <h4 className="card-title">Add New Enquiry</h4>
//                   <button
//                     type="button"
//                     className="btn btn-outline-primary py-2 px-3"
//                   >
//                     Back
//                   </button>
//                 </div>
//                 <div className="card-body">
//                   <form onSubmit={handleSubmit}>
//                     {formValues.map((element, index) => (
//                       <div className="row" key={index}>
//                         <div className="col-lg-12">
//                           <h4 className=" d-block text-start bg-primary p-3 text-white">
//                             Room {index + 1} Details
//                           </h4>
//                         </div>
//                         <div className="col-lg-4 mb-4 mt-3">
//                           <div className="mb-0">
//                             <label className="text-label form-label">
//                               Room Name
//                             </label>
//                             <input
//                               type="text"
//                               className="form-control"
//                               placeholder="Please enter Room Name"
//                               name="RoomName"
//                               value={element.RoomName || ""}
//                               onChange={(e) => handleChange(index, e)}
//                             />
//                           </div>
//                         </div>
//                         <div className="col-lg-4 mb-4 mt-3">
//                           <div className="mb-0">
//                             <label className="text-label form-label">
//                               No. of window
//                             </label>
//                             <input
//                               type="number"
//                               className="form-control"
//                               placeholder="Please Enter No Of Windows"
//                               name="RoomWindows"
//                               value={element.RoomWindows || ""}
//                               onChange={(e) => handleChange(index, e)}
//                             />
//                           </div>
//                         </div>
//                         <div className="col-lg-4 mb-4 mt-3">
//                           <div className="mb-0">
//                             <label className="text-label form-label">
//                               Floor
//                             </label>
//                             <input
//                               type="number"
//                               className="form-control"
//                               placeholder="Enter Floor"
//                               name="RoomFloor"
//                               value={element.Floor || ""}
//                               onChange={(e) => handleChange(index, e)}
//                             />
//                           </div>
//                         </div>
//                         <div className="col-lg-12 mb-3">
//                           <div className="mb-0">
//                             <label className="text-label form-label">
//                               Room description
//                             </label>
//                             <textarea
//                               className="form-control"
//                               rows={4}
//                               id="aw"
//                               defaultValue={""}
//                               name="RoomDescription"
//                               value={element.RoomDescription || ""}
//                               onChange={(e) => handleChange(index, e)}
//                             />
//                           </div>
//                         </div>
//                         <div className="col-lg-12"></div>
//                         <div className="col-lg-12">
//                           <div className="d-flex form-categories">
//                             {CategoryData &&
//                               CategoryData.map((element, i) => {
//                                 return (
//                                   <div
//                                     className="form-check form-check-inline"
//                                     key={i}
//                                   >
//                                     <input
//                                       className="form-check-input"
//                                       type="checkbox"
//                                       id={element.id}
//                                       name={element.id}
//                                       value={element.id}
//                                       onChange={(e) =>
//                                         handleSelectedCategory(i, e, index)
//                                       }
//                                     />
//                                     <label
//                                       className="form-check-label"
//                                       htmlFor={element.id}
//                                     >
//                                       {element.material}
//                                     </label>
//                                   </div>
//                                 );
//                               })}
//                           </div>
//                         </div>
//                         <div className="col-lg-12">
//                           <div className="d-flex justify-content-between">
//                             <div className="addButton">
//                               <button
//                                 onClick={() => addFormFields()}
//                                 className="btn btn-primary"
//                               >
//                                 Add New Room
//                               </button>
//                             </div>
//                             <div className="SubmitButton">
//                               <button className="btn btn-primary me-2">
//                                 Back
//                               </button>
//                               <button className="btn btn-primary">
//                                 Submit
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AddRooms;
