import { useEffect, useState } from "react";
import { GetData, GetDataWithToken } from "../../ApiHelper/ApiHelper";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import OutletManagerHeader from "./OutletManagerHeader";
import OutletManagerSidebar from "./OutletManagerSidebar";

function OutletCustomerComplaintCategory() {

    const navigate = useNavigate();
    const location = useLocation();
    // console.log("locationnn...", location.state?.data);
    const [materialList, setMaterialList] = useState([]);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log("submit dataaaa...", data);
        GetData(`customer/get-complaints-category-wise?materialId=[${data?.category}]`).then((response) => {
            if (response.status === true) {
                // console.log("dataaa array", complaintData);
                navigate("/outlet-customer-complaint-form", { state: { data: response.data, enquiry: location.state?.data } });
            }
        })
    }

    useEffect(() => {
        GetDataWithToken(`customer/get-my-room?enquiryId=${location?.state?.data?.id}`).then(response => {
            {
                const uniqueMaterials = [];
                response.data?.map((data, index) => {
                    // Create an array to store unique materials 
                    {
                        data?.selectedmaterials?.forEach((item) => {
                            // Check if the material is not already in the uniqueMaterials array
                            if (!uniqueMaterials.some((uniqueItem) => uniqueItem.material.id === item?.material?.id)) {
                                uniqueMaterials.push(item);
                                console.log("uniqueeeee...", uniqueMaterials);
                            }
                        })
                    }

                    {/* Render the unique materials */ }
                    {
                        uniqueMaterials.map((uniqueItem) => (
                            <div key={uniqueItem?.material?.id}>
                                <input
                                    type="checkbox"
                                    className="form-check-input mx-2"
                                    value={uniqueItem?.material?.id}
                                    {...register(`category`, {
                                        required: true,
                                        maxLength: 80,
                                    })}
                                />
                                <label>{uniqueItem?.material?.name}</label>
                            </div>
                        ))
                    }


                })
                setMaterialList(uniqueMaterials);
            }

        })
    }, [])



    return (
        <>
            <div
                data-typography="poppins"
                data-theme-version="light"
                data-layout="horizontal"
                data-nav-headerbg="color_1"
                data-headerbg="color_1"
                data-sidebar-style="full"
                data-sibebarbg="color_1"
                data-sidebar-position="fixed"
                data-header-position="fixed"
                data-container="wide"
                direction="ltr"
                data-primary="color_1"
                className="outlet_style"
            >
                <OutletManagerHeader />
                <OutletManagerSidebar />
                <div className="content-body">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h4>Select category </h4>
                                        {/* <span onClick={() => { navigate(-1) }} style={{ cursor: "pointer" }}><i className="fas fa-arrow-left" style={{ fontSize: "20px" }}></i></span> */}
                                    </div>
                                    <div className="container-fluid">
                                        <div className="row flex-item-center">
                                            <div className="col-xl-12">
                                                <div className="p-5 mx-2">
                                                    <form onSubmit={handleSubmit(onSubmit)}>
                                                        <div className="row">
                                                            {materialList?.map((data, index) => {
                                                                return (
                                                                    <div key={data?.material?.id}>
                                                                        <input
                                                                            type="checkbox"
                                                                            className="form-check-input mx-2"
                                                                            value={data?.material?.id}
                                                                            {...register(`category`, {
                                                                                required: true,
                                                                                maxLength: 80,
                                                                            })}
                                                                        />
                                                                        <label>{data?.material?.name}</label>
                                                                    </div>
                                                                )
                                                            }
                                                            )}
                                                            {/* {materialList?.map((data, index) => {
                                console.log("matttt...", data);
                                // Use a Set to store unique material IDs
                                const uniqueMaterialIds = new Set();

                                return (
                                  <div key={index}>
                                    {data?.selectedmaterials?.map((item) => {
                                      // Check if the material ID is not already in the Set
                                      if (!uniqueMaterialIds.has(item?.material?.id)) {
                                        uniqueMaterialIds.add(item?.material?.id); // Add it to the Set
                                        return (
                                          <div key={item?.material?.id}>
                                            <input
                                              type="checkbox"
                                              className="form-check-input mx-2"
                                              value={item?.material?.id}
                                              {...register(`category`, {
                                                required: true,
                                                maxLength: 80,
                                              })}
                                            />
                                            <label>{item?.material?.name}</label>
                                          </div>
                                        );
                                      }
                                      return null; // Duplicate, so don't render it
                                    })}
                                  </div>
                                );
                              })} */}




                                                            {/* {materialList?.map((data, index) => {

                                const uniqueMaterialIds = new Set();

                                return data?.selectedmaterials?.map((data) => {
                                  if (!uniqueMaterialIds.has(data?.material?.id)) {
                                    uniqueMaterialIds.add(data?.material?.id);
                                    return (
                                      <div>
                                        <input type="checkbox"
                                          className="form-check-input mx-2"
                                          value={data?.material?.id}
                                          {...register(`category`, {
                                            required: true,
                                            maxLength: 80,
                                          })}
                                        />
                                        <label>{data?.material?.name}</label>
                                      </div>
                                    )
                                  }
                                  return null;
                                })
                              }
                              )} */}
                                                            <div>

                                                            </div>
                                                            <button className="btn btn-primary mt-4" type="submit">Next</button>
                                                        </div>
                                                    </form>
                                                </div>
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

export default OutletCustomerComplaintCategory;