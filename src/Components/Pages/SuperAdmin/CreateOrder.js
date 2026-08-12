import { toast } from "material-react-toastify";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GetDataWithToken, PostDataWithToken } from "../../ApiHelper/ApiHelper";
import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";

function CreateOrder({ routes }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [WareHouseId, setWareHouseId] = useState("");
  const [EnquiryId, setEnquiryId] = useState(null);
  const [CoustomerId, setCoustomerId] = useState("");
  const [AllWhareHouse, setAllWhareHouse] = useState([]);
  const [orderId, setOrderId] = useState();

  useEffect(() => {
    console.log("Enquiryrrr", location?.state);
    setEnquiryId(location.state.enquiryId);
    setCoustomerId(location.state.customerId);
    GetDataWithToken("superadmin/get-users?type=Stitching-store-manager").then(
      (response) => {
        if (response.status === true) {
          setAllWhareHouse(response.data);
        }
      }
    );
  }, [""]);

  const getwareHouse = (warehouse) => {
    console.log("warehouse", warehouse.target.value);
    setWareHouseId(warehouse.target.value);
  };

  const ConfirmSchduled = (event) => {
    console.log("enquiryid", EnquiryId);
    event.preventDefault();
    let data = {
      enquiryId: location?.state?.enquiryId,
      userId: WareHouseId,
      customerId: CoustomerId,
      orderDate: new Date().toISOString().split('T')?.[0],
      orderId: orderId,
    };
    console.log("dataaaa", data);
    PostDataWithToken(`order/create-order`, data).then((response) => {
      if (response.status === true) {
        console.log("response", response);
        toast.success(response.message);
        navigate(-1);
        // response.success("Schedule Confirmed Successfully", {
        //   position: toast.POSITION.TOP_CENTER,
        // });
      } else {
        toast.error(response?.data?.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    });
  };

  return (
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
                  <h4 className="card-title">Schedule A Task</h4>
                </div>
                <div className="card-body">
                  <div className="basic-form">
                    <form onSubmit={ConfirmSchduled}>
                      <div className="row align-items-center">
                        <div className="col-lg-12 my-1">
                          <label className="me-sm-2">Select Warehouse</label>
                          {/* <input
                        type={"date"}
                        min={moment().add(1, "days").format("YYYY-MM-DD")}
                        className="form-control"
                        onChange={getSelectedDate}
                      /> */}
                          <select
                            className="me-sm-2  form-control"
                            required
                            disabled
                            onChange={(e) => {
                              getwareHouse(e);
                            }}

                          >
                            <option selected>Choose...</option>
                            {AllWhareHouse &&
                              AllWhareHouse.map((item, index) => {
                                return (
                                  <option value={item.id} selected={item?.id == 51}>
                                    {item.firstName}
                                  </option>
                                );
                              })}
                          </select>
                          <input type="text" className="me-sm-2 form-control my-2" placeholder="Order ID" min={6} required onChange={(e) => setOrderId(e.target.value)} />
                        </div>
                      </div>
                      <button className="btn btn-primary">Submit </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateOrder;
