import moment from "moment";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Modal, ModalBody, ModalHeader, Nav, NavItem, NavLink, Spinner, TabContent, TabPane } from "reactstrap";
import { GetDataWithToken, PostDataWithToken } from "../../ApiHelper/ApiHelper";
import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";

export default function ConfirmEnquiryOrder() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(1);
  // my new code starts here...
  const [enquiryStates, setEnquiryStates] = useState({
    orderData: {},
    // modalOpen: false,
  });

  useEffect(() => {
    orderDetailHandler();
  }, [])

  const orderDetailHandler = () => {
    const apiUrl = `order/get-order-item/${location?.state?.data?.orders?.[0]?.orderId}`;
    const dataFunction = (data) => {
      updateStates(setEnquiryStates, "orderData", data);
    }
    getApihandler(apiUrl, dataFunction);
  };

  const updateStates = (setState, key, value) => {
    setState((prev) => ({
      ...prev,
      [key]: value,
    }))
  }


  const getApihandler = (api, setState) => {
    GetDataWithToken(api).then(res => {
      if (res?.status == true) {
        const newData = {
          ...res?.data, rooms: res?.data?.rooms?.map((room) => {
            return ({
              ...room,
              order_items: room?.order_items?.map((order) => ({
                ...order,
                showDropdown: false,
                statusLoader: false
              }))
            })
          }
          )
        };
        console.log("newwww datatataaaa...", newData);
        setEnquiryStates(newData);
      }
    })
  }

  const toggleDropDown = (roomIndex, orderIndex, e) => {
    e.stopPropagation();
    const newData = {
      ...enquiryStates,
      rooms: enquiryStates?.rooms?.map((room, rIndex) => {
        // Only update the specific room and order index
        if (rIndex === roomIndex) {
          return {
            ...room,
            order_items: room?.order_items?.map((order, oIndex) => {
              // Toggle only the dropdown of the clicked order
              return oIndex === orderIndex
                ? {
                  ...order,
                  showDropdown: !order?.showDropdown, // Toggle the dropdown
                }
                : order;
            }),
          };
        }
        return room; // Return unchanged room if index doesn't match
      })
    };
    console.log("new n\modalDatata,...", newData);
    setEnquiryStates(newData); // Update the state
  };

  const updateStatusHandler = (orderItemId) => {
    const newData = {
      ...enquiryStates, rooms: enquiryStates?.rooms?.map((room) => {
        return ({
          ...room,
          order_items: room?.order_items?.map((order) => {
            if (orderItemId == order?.id) {
              return ({
                ...order,
                statusLoader: true
              })
            } else {
              return order;
            }
          }
          )
        })
      }
      )
    };

    setEnquiryStates(newData);
    PostDataWithToken(`quality/update-fabric-status
`, {
      fabric_status: "fabric-in-stock",
      orderItemId: orderItemId
    }).then((res) => {
      if (res.status === true) {
        orderDetailHandler();
      }
    })
  }
  return (<>
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
              <div>
                <div className="card">
                  <div className="card-body">
                    <ul class="list-group list-group-flush col-6">
                      <li class="list-group-item d-flex justify-content-between border-0 py-1"><span class="mb-0">Enquiry Id :</span><strong>{enquiryStates?.enquiry?.id}</strong></li>
                      <li class="list-group-item d-flex justify-content-between border-0 py-1"><span class="mb-0">Order Id :</span><strong> {enquiryStates?.orderId}</strong></li>
                      <li class="list-group-item d-flex justify-content-between border-0 py-1"><span class="mb-0">Client Name :</span><strong> {enquiryStates?.customer?.firstName} {enquiryStates?.customer?.lastName}</strong></li>
                      <li class="list-group-item d-flex justify-content-between border-0 py-1"><span class="mb-0">IC Name :</span><strong> {enquiryStates?.user?.firstName}  {enquiryStates?.user?.lastName}</strong></li>

                      <li class="list-group-item d-flex justify-content-between border-0 py-1"><span class="mb-0">Order date:</span><strong>{moment(enquiryStates?.orderDate).format('DD-MM-YYYY')}</strong></li>
                      <li class="list-group-item d-flex justify-content-between border-0 py-1"><span class="mb-0">Remark :</span><strong>{enquiryStates?.remark}</strong></li><li class="list-group-item d-flex justify-content-between border-0 py-1"><span class="mb-0">Order Status :</span><strong >{enquiryStates?.orderStatus}</strong></li>
                    </ul>
                  </div>
                </div>

                <h6 className="my-4">Room Details</h6>
                <Nav
                  fill
                  pills
                  className={"d-flex"}
                >
                  {enquiryStates?.rooms?.map((item, index) => < NavItem className={"d-flex me-2"}>
                    <NavLink
                      className={activeTab === index + 1 ? "active" : ""}
                      onClick={() => setActiveTab(index + 1)}
                    >
                      Room- {index + 1}
                    </NavLink>
                  </NavItem>)}
                </Nav>
                < TabContent activeTab={activeTab}>
                  {enquiryStates?.rooms?.map((item, index) => <TabPane tabId={index + 1}>
                    <div className="table-responsive">
                      <table
                        id="example4"
                        className="table card-table display mb-4 shadow-hover table-responsive-lg"
                        style={{ minWidth: "845px", textAlign: "center" }}
                      >
                        <thead>
                          <tr>
                            <th>Item Id</th>
                            <th>Item Name</th>
                            <th>Quantity/unit</th>
                            <th>Status</th>
                            <th>Exp Receiving Date</th>
                            <th>STA/PO No</th>
                            <th>
                              STA Status
                            </th>
                          </tr>
                        </thead>
                        <tbody>

                          {item?.order_items?.map((order, i) => <tr>
                            <td>{order?.productId}</td>
                            <td>{order?.product_name}</td>
                            <td>{order?.size}</td>
                            <td>
                              {order?.statusLoader ? <Spinner /> :
                                order?.fabric_status == "pending" ? <Dropdown
                                  isOpen={order?.showDropdown}
                                  toggle={(e) => toggleDropDown(index, i, e)} // Pass roomIndex and orderIndex
                                >
                                  <DropdownToggle className="py-1 px-2 badge badge-warning" caret>{order?.fabric_status}</DropdownToggle>
                                  <DropdownMenu>
                                    <DropdownItem onClick={() => {
                                      updateStatusHandler(order?.id)
                                    }}>Fabric in Stock</DropdownItem>
                                    {/* <DropdownItem>Option 2</DropdownItem> */}
                                  </DropdownMenu>
                                </Dropdown> :
                                  <span class="badge badge-success"

                                  >{order?.fabric_status}</span>}
                            </td>
                            <td>{order?.delivery_date ? moment(order?.delivery_date).format("DD-MM-YYYY") : ""}</td>

                            <td>{order?.sta_po_no}</td>
                            <td>
                              {order?.sta_status}
                            </td>
                            {/* <td>{
                              Object.keys(order?.qc_details).map(qc =>
                                <input type="checkbox" checked={order?.qc_details?.[qc]?.qcDone || false} className="me-2" s />

                              )}</td> */}
                            {/* <td><div>
                      {order?.qc_details?.map((qc) => <input type="checkbox" checked={qc?.qcDone} />)}

                    </div></td> */}
                          </tr>)}
                        </tbody>
                        {/* <tbody>

                  {enquiryStates && enquiryStates.length === 0 ? (
                    <h3
                      style={{
                        position: "absolute",
                        left: "40%",
                        padding: "10px",
                      }}
                    >
                      No enquiryStates found
                    </h3>
                  ) : (
                    enquiryStates?.rooms?.[activeTab - 1]?.map((enquiryStates, index) => (
                      <tr>
                        <>
                          <th>{enquiryStates?.enquiry?.id}</th>
                          <th>
                            {enquiryStates?.enquiry?.customer?.firstName}
                            {enquiryStates?.enquiry?.customer?.lastName}
                          </th>
                          <th>
                            {data?.enquiry?.customer?.primary_phone}
                          </th>
                          <td>
                            <span
                              className={
                                data?.enquiry?.status === "progress"
                                  ? "badge  badge-primary"
                                  : "badge badge-dark"
                              }
                            >
                              {data?.enquiry?.status}
                            </span>
                          </td>
                          <td>
                            <span
                              className={
                                data?.status === "active"
                                  ? "badge  badge-success"
                                  : "badge badge-dark"
                              }
                            >
                              {data?.status}
                            </span>
                          </td>

                          <td>
                            {data?.enquiry?.user?.firstName}{" "}
                            {data?.enquiry?.user?.lastName}
                          </td>
                        </>
                      </tr>
                    ))
                  )}
                </tbody> */}
                      </table>
                    </div>
                  </TabPane>)}

                </TabContent>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  </>)
}