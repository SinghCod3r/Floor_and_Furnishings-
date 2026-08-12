import { toast } from "material-react-toastify";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GetDataWithToken } from "../../ApiHelper/ApiHelper";
import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";

function EnquiryDetials() {
  const location = useLocation();
  const navigate = useNavigate();

  const [enquiryId, setEnquiryId] = useState(null);
  const [EnquiryDetials, setEnquiryDetials] = useState({});

  useEffect(() => {
    console.log("location", location);
    setEnquiryId(location.state.data);
    GetDataWithToken(`superadmin/get-enquiry/${location.state.data}`).then(
      (response) => {
        if (response.status === true) {
          console.log("response", response.data);
          setEnquiryDetials(response);
        }
      }
    );
  }, [""]);
  const sendEmail = () => {
    GetDataWithToken(`superadmin/send-mail-customer/${enquiryId}`).then(
      (response) => {
        if (response.status === true) {
          console.log("response", response);
          toast.success("Mail Sent Successfully", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      }
    );
  };

  return (
    <>
      {console.log("enquiryId", EnquiryDetials)}
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
          {/* row */}
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-8">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">
                      Enquiry No. {EnquiryDetials?.id}
                    </h4>
                    <>
                      <button
                        onClick={() => {
                          sendEmail();
                        }}
                        className="btn btn-primary"
                      >
                        {" "}
                        Send Email
                      </button>
                      <button
                        onClick={() => {
                          navigate("/add-schedule", {
                            state: { data: enquiryId },
                          });
                        }}
                        className="btn btn-primary"
                      >
                        Schedule Enquiry
                      </button>
                    </>
                    <Link
                      to={"/edit-enquiry"}
                      className="btn btn-primary btn-xs sharp me-1"
                    >
                      <i className="fas fa-pencil-alt" />
                    </Link>
                  </div>
                  <div className="card-body">
                    <div
                      className="accordion accordion-solid-bg"
                      id="accordion-eight"
                    >
                      <div className="accordion-item">
                        <div
                          className="accordion-header rounded-lg"
                          id="accord-8One"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapse8One"
                          aria-controls="collapse8One"
                          aria-expanded="true"
                          role="button"
                        >
                          <span className="accordion-header-icon" />
                          <span className="accordion-header-text">
                            Customer Detials
                          </span>
                          <span className="accordion-header-indicator" />
                        </div>
                        <div
                          id="collapse8One"
                          className="collapse accordion__body show"
                          aria-labelledby="accord-8One"
                          data-bs-parent="#accordion-eight"
                        >
                          <div className="accordion-body-text">
                            <ul className="list-group list-group-flush">
                              <li className="list-group-item d-flex justify-content-between text-white">
                                <span className="mb-0">Customer Name :</span>
                                <strong>
                                  {EnquiryDetials?.data?.customer?.firstName}{" "}
                                  {EnquiryDetials?.data?.customer?.lastName}{" "}
                                </strong>
                              </li>
                              <li className="list-group-item d-flex justify-content-between text-white">
                                <span className="mb-0">Contact No. :</span>
                                <strong>
                                  {
                                    EnquiryDetials?.data?.customer
                                      ?.primary_phone
                                  }
                                </strong>
                              </li>
                              <li className="list-group-item d-flex justify-content-between text-white">
                                <span className="mb-0">
                                  Secondary Contact No. :
                                </span>
                                <strong>
                                  {
                                    EnquiryDetials?.data?.customer
                                      ?.secondary_phone
                                  }
                                </strong>
                              </li>
                              <li className="list-group-item d-flex justify-content-between text-white">
                                <span className="mb-0">Email :</span>
                                <strong>
                                  {
                                    EnquiryDetials?.data?.customer
                                      ?.primary_email
                                  }
                                </strong>
                              </li>
                              <li className="list-group-item d-flex justify-content-between text-white">
                                <span className="mb-0">Secondary Email :</span>
                                <strong>
                                  {
                                    EnquiryDetials?.data?.customer
                                      ?.secondary_email
                                  }
                                </strong>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="accordion-item">
                        <div
                          className="accordion-header collapsed rounded-lg"
                          id="accord-8Two"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapse8Two"
                          aria-controls="collapse8Two"
                          aria-expanded="true"
                          role="button"
                        >
                          <span className="accordion-header-icon" />
                          <span className="accordion-header-text">
                            Billing Address
                          </span>
                          <span className="accordion-header-indicator" />
                        </div>
                        <div
                          id="collapse8Two"
                          className="collapse accordion__body"
                          aria-labelledby="accord-8Two"
                          data-bs-parent="#accordion-eight"
                        >
                          <div className="accordion-body-text">
                            <ul className="list-group list-group-flush">
                              <li className="list-group-item d-flex justify-content-between text-white">
                                <span className="mb-0">Customer Name :</span>
                                <strong>
                                  {
                                    EnquiryDetials?.billingAddress
                                      ?.contactPerson
                                  }
                                </strong>
                              </li>
                              <li className="list-group-item d-flex justify-content-between text-white">
                                <span className="mb-0">Contact No. :</span>
                                <strong>
                                  {
                                    EnquiryDetials?.billingAddress
                                      ?.contactNumber
                                  }
                                </strong>
                              </li>
                              <li className="list-group-item d-flex justify-content-between text-white">
                                <span className="mb-0">State :</span>
                                <strong>
                                  {" "}
                                  {EnquiryDetials?.billingAddress?.state}
                                </strong>
                              </li>
                              <li className="list-group-item d-flex justify-content-between text-white">
                                <span className="mb-0">Pincode :</span>
                                <strong>
                                  {EnquiryDetials?.billingAddress?.pincode}
                                </strong>
                              </li>
                              <li className="list-group-item d-flex justify-content-between text-white">
                                <span className="mb-0">Address :</span>
                                <strong>
                                  {" "}
                                  {EnquiryDetials?.billingAddress?.street}
                                </strong>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="accordion-item">
                        <div
                          className="accordion-header collapsed rounded-lg"
                          id="delivery-address"
                          data-bs-toggle="collapse"
                          data-bs-target="#deliveryAddress"
                          aria-controls="deliveryAddress"
                          aria-expanded="true"
                          role="button"
                        >
                          <span className="accordion-header-icon" />
                          <span className="accordion-header-text">
                            Delivery Address
                          </span>
                          <span className="accordion-header-indicator" />
                        </div>
                        <div
                          id="deliveryAddress"
                          className="collapse accordion__body"
                          aria-labelledby="delivery-address"
                          data-bs-parent="#deliveryAddress"
                        >
                          <div className="accordion-body-text">
                            <ul className="list-group list-group-flush">
                              <li className="list-group-item d-flex justify-content-between text-white">
                                <span className="mb-0">Customer Name :</span>
                                <strong>
                                  {
                                    EnquiryDetials?.deliveryAddress
                                      ?.contactPerson
                                  }
                                </strong>
                              </li>
                              <li className="list-group-item d-flex justify-content-between text-white">
                                <span className="mb-0">Contact No. :</span>
                                <strong>
                                  {
                                    EnquiryDetials?.deliveryAddress
                                      ?.contactNumber
                                  }
                                </strong>
                              </li>
                              <li className="list-group-item d-flex justify-content-between text-white">
                                <span className="mb-0">State :</span>
                                <strong>
                                  {" "}
                                  {EnquiryDetials?.deliveryAddress?.state}
                                </strong>
                              </li>
                              <li className="list-group-item d-flex justify-content-between text-white">
                                <span className="mb-0">Pincode :</span>
                                <strong>
                                  {EnquiryDetials?.deliveryAddress?.pincode}
                                </strong>
                              </li>
                              <li className="list-group-item d-flex justify-content-between text-white">
                                <span className="mb-0">Address :</span>
                                <strong>
                                  {" "}
                                  {EnquiryDetials?.deliveryAddress?.street}
                                </strong>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="accordion-item">
                        <div
                          className="accordion-header collapsed rounded-lg"
                          id="accord-8three"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapse8three"
                          aria-controls="collapse8three"
                          aria-expanded="true"
                          role="button"
                        >
                          <span className="accordion-header-icon" />
                          <span className="accordion-header-text">Rooms</span>
                          <span className="accordion-header-indicator" />
                        </div>
                        <div
                          id="collapse8three"
                          className="collapse accordion__body"
                          aria-labelledby="accord-8three"
                          data-bs-parent="#accordion-eight"
                        >
                          <div className="accordion-body-text">
                            <div className="col-lg-12">
                              {/* <h4 className="card-title fw-bold text-white">
                              Room's
                            </h4> */}
                              <div className="basic-list-group">
                                <div className="row">
                                  <div className="col-lg-12 col-xl-12">
                                    <div
                                      className="list-group mb-4 flex-row"
                                      id="list-tab"
                                      role="tablist"
                                    >
                                      {EnquiryDetials?.data &&
                                        EnquiryDetials?.data?.rooms.map(
                                          (rooms, index) => (
                                            <a
                                              className={`list-group-item list-group-item-action text-white ${
                                                index === 0 ? "active" : ""
                                              }`}
                                              data-bs-toggle="list"
                                              href={`#list-home-${index}`}
                                              role="tab"
                                            >
                                              {rooms.roomName}
                                            </a>
                                          )
                                        )}
                                    </div>
                                  </div>
                                  <div className="col-lg-6 col-xl-12">
                                    <div
                                      className="tab-content"
                                      id="nav-tabContent1"
                                    >
                                      {EnquiryDetials?.data &&
                                        EnquiryDetials?.data?.rooms.map(
                                          (room, index) => (
                                            <div
                                              className={`tab-pane fade show ${
                                                index === 0 ? "active" : ""
                                              }`}
                                              id={`list-home-${index}`}
                                            >
                                              <div className="room-heading">
                                                <h4 className>
                                                  {room.roomDescription}
                                                </h4>
                                                <span>
                                                  Floor : {room.floor}, No. of
                                                  windows :{" "}
                                                  {room.numberOfWindow}
                                                </span>
                                              </div>
                                              {room?.selectedcurtain ===
                                              null ? null : (
                                                <>
                                                  <h5 className="text-white py-3">
                                                    Selected Curtains
                                                  </h5>
                                                  <div>
                                                    <ul className="list-group list-group-flush">
                                                      <li className="list-group-item d-flex justify-content-between text-white">
                                                        <span className="mb-0">
                                                          CURTAIN FABRIC
                                                          SELECTED :
                                                        </span>
                                                        <strong>
                                                          <button className="btn text-white">
                                                            {
                                                              room
                                                                ?.selectedcurtain
                                                                ?.fabric1
                                                                ?.fabric
                                                            }
                                                          </button>
                                                        </strong>
                                                      </li>
                                                      <li className="list-group-item d-flex justify-content-between text-white">
                                                        <span className="mb-0">
                                                          Curtain Image
                                                        </span>
                                                        {room?.material_images
                                                          .filter(
                                                            (images) =>
                                                              images.field ===
                                                              "Curtain"
                                                          )
                                                          .map((data) => {
                                                            return (
                                                              <img
                                                                src={data.image}
                                                                alt="curtain"
                                                                className="img-fluid"
                                                              />
                                                            );
                                                          })}
                                                      </li>
                                                      {/* <li className="list-group-item d-flex justify-content-between text-white">
                                                        <span className="mb-0">
                                                          BRAND. :
                                                        </span>
                                                        <strong>
                                                          {
                                                            room
                                                              ?.selectedcurtain
                                                              ?.fabric1?.book
                                                              ?.brand?.brand
                                                          }
                                                        </strong>
                                                      </li> */}
                                                      {/* <li className="list-group-item d-flex justify-content-between text-white">
                                                        <span className="mb-0">
                                                          Book. :
                                                        </span>
                                                        <strong>
                                                          {
                                                            room
                                                              ?.selectedcurtain
                                                              ?.fabric1?.book
                                                              ?.book
                                                          }
                                                        </strong>
                                                      </li> */}
                                                      <li className="list-group-item d-flex justify-content-between text-white">
                                                        <span className="mb-0">
                                                          CURTAIN STYLE :
                                                        </span>
                                                        <strong>
                                                          {
                                                            room
                                                              ?.selectedcurtain
                                                              ?.curtainstyle
                                                              ?.curtainStyle
                                                          }
                                                        </strong>
                                                      </li>

                                                      {/* <li className="list-group-item d-flex justify-content-between text-white">
                                                        <span className="mb-0">
                                                          LINIING REQUIRED :
                                                        </span>
                                                        <strong>
                                                          {
                                                            room?.selectedlining
                                                              ?.lining?.type
                                                          }{" "}
                                                        </strong>
                                                      </li> */}
                                                    </ul>
                                                  </div>
                                                </>
                                              )}
                                              {room?.selectedcurtain
                                                ?.belt_required === "Yes" ? (
                                                <>
                                                  <h5 className="text-white py-3">
                                                    Selected Belts
                                                  </h5>
                                                  <div>
                                                    <ul className="list-group list-group-flush">
                                                      <li className="list-group-item d-flex justify-content-between text-white">
                                                        <span className="mb-0">
                                                          Belt Fabric :
                                                        </span>
                                                        <strong>
                                                          {
                                                            room.selectedcurtain
                                                              .belt?.fabric
                                                          }
                                                        </strong>
                                                      </li>
                                                      {/* <li className="list-group-item d-flex justify-content-between text-white">
                                                        <span className="mb-0">
                                                          BRAND. :
                                                        </span>
                                                        <strong>
                                                          {
                                                            room
                                                              ?.selectedcurtain
                                                              ?.belt?.book
                                                              ?.brand?.brand
                                                          }
                                                        </strong>
                                                      </li> */}
                                                      {/* <li className="list-group-item d-flex justify-content-between text-white">
                                                        <span className="mb-0">
                                                          Book. :
                                                        </span>
                                                        <strong>
                                                          {
                                                            room
                                                              ?.selectedcurtain
                                                              ?.belt?.book?.book
                                                          }
                                                        </strong>
                                                      </li> */}
                                                      <li className="list-group-item d-flex justify-content-between text-white">
                                                        <span className="mb-0">
                                                          Belt Type :
                                                        </span>
                                                        <strong>
                                                          {
                                                            room
                                                              ?.selectedcurtain
                                                              ?.belt_type?.type
                                                          }
                                                        </strong>
                                                      </li>
                                                      <li className="list-group-item d-flex justify-content-between text-white">
                                                        {room?.material_images
                                                          .filter(
                                                            (images) =>
                                                              images.field ===
                                                              "Belt"
                                                          )
                                                          .map((data) => {
                                                            return (
                                                              <>
                                                                <span className="mb-0">
                                                                  Belt Image
                                                                </span>
                                                                <img
                                                                  src={
                                                                    data.image
                                                                  }
                                                                  alt="curtain"
                                                                  className="img-fluid"
                                                                />
                                                              </>
                                                            );
                                                          })}
                                                      </li>
                                                    </ul>
                                                  </div>
                                                </>
                                              ) : null}

                                              {room?.selectedcurtain
                                                ?.pelmet_required === "Yes" ? (
                                                <>
                                                  <h5 className="text-white py-3">
                                                    Selected pelmet
                                                  </h5>
                                                  <div>
                                                    <ul className="list-group list-group-flush">
                                                      <li className="list-group-item d-flex justify-content-between text-white">
                                                        <span className="mb-0">
                                                          Pelmet Fabric :
                                                        </span>
                                                        <strong>
                                                          {
                                                            room.selectedcurtain
                                                              .pelmet?.fabric
                                                          }
                                                        </strong>
                                                      </li>
                                                      {/* <li className="list-group-item d-flex justify-content-between text-white">
                                                        <span className="mb-0">
                                                          BRAND. :
                                                        </span>
                                                        <strong>
                                                          {
                                                            room
                                                              ?.selectedcurtain
                                                              ?.pelmet?.book
                                                              ?.brand?.brand
                                                          }
                                                        </strong>
                                                      </li> */}
                                                      {/* <li className="list-group-item d-flex justify-content-between text-white">
                                                        <span className="mb-0">
                                                          Book. :
                                                        </span>
                                                        <strong>
                                                          {
                                                            room
                                                              ?.selectedcurtain
                                                              ?.pelmet?.book
                                                              ?.book
                                                          }
                                                        </strong>
                                                      </li> */}
                                                      <li className="list-group-item d-flex justify-content-between text-white">
                                                        <span className="mb-0">
                                                          Pelmet Type :
                                                        </span>
                                                        <strong>
                                                          {
                                                            room
                                                              ?.selectedcurtain
                                                              ?.pelmet_type
                                                          }
                                                        </strong>
                                                      </li>

                                                      <li className="list-group-item d-flex justify-content-between text-white">
                                                        <span className="mb-0">
                                                          Pelmet Width :
                                                        </span>
                                                        <strong>
                                                          {
                                                            room
                                                              ?.selectedcurtain
                                                              ?.pelmet_width
                                                          }
                                                        </strong>
                                                      </li>
                                                      <li className="list-group-item d-flex justify-content-between text-white">
                                                        <span className="mb-0">
                                                          Pelmet Height/Drop :
                                                        </span>
                                                        <strong>
                                                          {
                                                            room
                                                              ?.selectedcurtain
                                                              ?.pelmet_drop
                                                          }
                                                        </strong>
                                                      </li>
                                                      <li className="list-group-item d-flex justify-content-between text-white">
                                                        <span className="mb-0">
                                                          Pelmet Turning :
                                                        </span>
                                                        <strong>
                                                          {room?.selectedcurtain
                                                            ?.pelmet_turning ===
                                                          true
                                                            ? "Yes"
                                                            : "No"}
                                                        </strong>
                                                      </li>
                                                      <li className="list-group-item d-flex justify-content-between text-white">
                                                        <span className="mb-0">
                                                          Pelmet LBracket
                                                          Required :
                                                        </span>
                                                        <strong>
                                                          {
                                                            room
                                                              ?.selectedcurtain
                                                              ?.pelmet_LBracket_required
                                                          }
                                                        </strong>
                                                      </li>
                                                      <li className="list-group-item d-flex justify-content-between text-white">
                                                        <span className="mb-0">
                                                          Pelmet LBracket
                                                          quantity
                                                        </span>
                                                        <strong>
                                                          {
                                                            room
                                                              ?.selectedcurtain
                                                              ?.pelmet_LBracket_quantity
                                                          }
                                                        </strong>
                                                      </li>
                                                    </ul>
                                                  </div>
                                                </>
                                              ) : null}

                                              {room?.selectedcurtain
                                                ?.border_required === "Yes" ? (
                                                <>
                                                  <h5 className="text-white py-3">
                                                    Selected Border Fabric
                                                  </h5>
                                                  <div>
                                                    <ul className="list-group list-group-flush">
                                                      <li className="list-group-item d-flex justify-content-between text-white">
                                                        <span className="mb-0">
                                                          Border Fabric :
                                                        </span>
                                                        <strong>
                                                          {
                                                            room.selectedcurtain
                                                              .border?.fabric
                                                          }
                                                        </strong>
                                                      </li>
                                                      <li className="list-group-item d-flex justify-content-between text-white">
                                                        <span className="mb-0">
                                                          BRAND. :
                                                        </span>
                                                        <strong>
                                                          {
                                                            room
                                                              ?.selectedcurtain
                                                              ?.border?.book
                                                              ?.brand?.brand
                                                          }
                                                        </strong>
                                                      </li>
                                                      <li className="list-group-item d-flex justify-content-between text-white">
                                                        <span className="mb-0">
                                                          Book. :
                                                        </span>
                                                        <strong>
                                                          {
                                                            room
                                                              ?.selectedcurtain
                                                              ?.border?.book
                                                              ?.book
                                                          }
                                                        </strong>
                                                      </li>
                                                    </ul>
                                                  </div>
                                                </>
                                              ) : null}

                                              {room?.selectedsheer ==
                                              null ? null : (
                                                <div>
                                                  <h5 className="text-white py-3">
                                                    Selected Sheers
                                                  </h5>
                                                  <ul className="list-group list-group-flush">
                                                    <li className="list-group-item d-flex justify-content-between text-white">
                                                      <span className="mb-0">
                                                        SHEER REQUIRED :
                                                      </span>
                                                      <strong>Yes</strong>
                                                    </li>
                                                    <li className="list-group-item d-flex justify-content-between text-white">
                                                      <span className="mb-0">
                                                        SHEER FABRIC SELECTED :
                                                      </span>
                                                      <strong>
                                                        {
                                                          room?.selectedsheer
                                                            ?.sheerfabric
                                                            ?.fabric
                                                        }
                                                      </strong>
                                                    </li>
                                                    <li className="list-group-item d-flex justify-content-between text-white">
                                                      <span className="mb-0">
                                                        BRAND. :
                                                      </span>
                                                      <strong>
                                                        {" "}
                                                        {
                                                          room?.selectedsheer
                                                            ?.sheerfabric?.book
                                                            ?.brand?.brand
                                                        }
                                                      </strong>
                                                    </li>
                                                    <li className="list-group-item d-flex justify-content-between text-white">
                                                      <span className="mb-0">
                                                        Book. :
                                                      </span>
                                                      <strong>
                                                        {" "}
                                                        {
                                                          room?.selectedsheer
                                                            ?.sheerfabric?.book
                                                            ?.book
                                                        }
                                                      </strong>
                                                    </li>
                                                    <li className="list-group-item d-flex justify-content-between text-white">
                                                      <span className="mb-0">
                                                        width :{" "}
                                                      </span>
                                                      <strong>
                                                        {" "}
                                                        {
                                                          room?.selectedsheer
                                                            ?.sheerfabric?.width
                                                        }
                                                      </strong>
                                                    </li>
                                                    <li className="list-group-item d-flex justify-content-between text-white">
                                                      <span className="mb-0">
                                                        repeat_horizontal:
                                                      </span>
                                                      <strong>
                                                        {
                                                          room?.selectedsheer
                                                            ?.sheerfabric
                                                            ?.repeat_horizontal
                                                        }
                                                      </strong>
                                                    </li>
                                                    <li className="list-group-item d-flex justify-content-between text-white">
                                                      <span className="mb-0">
                                                        repeat_vertical :
                                                      </span>
                                                      <strong>
                                                        {" "}
                                                        {
                                                          room?.selectedsheer
                                                            ?.sheerfabric
                                                            ?.repeat_vertical
                                                        }
                                                      </strong>
                                                    </li>
                                                    <li className="list-group-item d-flex justify-content-between text-white">
                                                      <span className="mb-0">
                                                        leadChain :
                                                      </span>
                                                      {room?.selectedsheer
                                                        ?.leadChain === true ? (
                                                        <strong>Yes</strong>
                                                      ) : (
                                                        <strong>No</strong>
                                                      )}
                                                    </li>
                                                    <li className="list-group-item d-flex justify-content-between text-white">
                                                      <span className="mb-0">
                                                        hand Hammering :
                                                      </span>
                                                      {room?.selectedsheer
                                                        ?.handHammering ===
                                                      true ? (
                                                        <strong>Yes</strong>
                                                      ) : (
                                                        <strong>No</strong>
                                                      )}
                                                    </li>
                                                    <li className="list-group-item d-flex justify-content-between text-white">
                                                      <span className="mb-0">
                                                        Sheer Style :
                                                      </span>
                                                      <strong>
                                                        {
                                                          room?.selectedsheer
                                                            ?.sheerStyle
                                                            ?.curtainStyle
                                                        }
                                                      </strong>
                                                    </li>
                                                  </ul>
                                                </div>
                                              )}
                                              {room?.selectedbelt ==
                                              null ? null : (
                                                <div>
                                                  <h5 className="text-white py-3">
                                                    Selected Belt
                                                  </h5>
                                                  <ul className="list-group list-group-flush">
                                                    <li className="list-group-item d-flex justify-content-between text-white">
                                                      <span className="mb-0">
                                                        BELT REQUIRED :
                                                      </span>
                                                      <strong>Yes</strong>
                                                    </li>
                                                    <li className="list-group-item d-flex justify-content-between text-white">
                                                      <span className="mb-0">
                                                        BELT FABRIC SELECTED :
                                                      </span>
                                                      <strong>
                                                        {
                                                          room?.selectedbelt
                                                            ?.belt?.fabric
                                                        }
                                                      </strong>
                                                    </li>
                                                    <li className="list-group-item d-flex justify-content-between text-white">
                                                      <span className="mb-0">
                                                        REPEAT :
                                                      </span>
                                                      <strong>
                                                        {" "}
                                                        {
                                                          room?.selectedbelt
                                                            ?.belt?.repeat
                                                        }
                                                      </strong>
                                                    </li>
                                                    <li className="list-group-item d-flex justify-content-between text-white">
                                                      <span className="mb-0">
                                                        Book. :
                                                      </span>
                                                      <strong>
                                                        {
                                                          room?.selectedbelt
                                                            ?.belt?.book?.book
                                                        }
                                                      </strong>
                                                    </li>
                                                    <li className="list-group-item d-flex justify-content-between text-white">
                                                      <span className="mb-0">
                                                        width :{" "}
                                                      </span>
                                                      <strong>
                                                        {" "}
                                                        {
                                                          room?.selectedbelt
                                                            ?.belt?.width
                                                        }
                                                      </strong>
                                                    </li>
                                                  </ul>
                                                </div>
                                              )}
                                              {room?.selectedborder ==
                                              null ? null : (
                                                <div>
                                                  <h5 className="text-white py-3">
                                                    Selected Border
                                                  </h5>
                                                  <ul className="list-group list-group-flush">
                                                    <li className="list-group-item d-flex justify-content-between text-white">
                                                      <span className="mb-0">
                                                        BORDER REQUIRED :
                                                      </span>
                                                      <strong>Yes</strong>
                                                    </li>
                                                    <li className="list-group-item d-flex justify-content-between text-white">
                                                      <span className="mb-0">
                                                        BORDER TYPE :
                                                      </span>
                                                      <strong>
                                                        {
                                                          room?.selectedborder
                                                            ?.border_type?.type
                                                        }
                                                      </strong>
                                                    </li>
                                                    <li className="list-group-item d-flex justify-content-between text-white">
                                                      <span className="mb-0">
                                                        Border FABRIC SELECTED :
                                                      </span>
                                                      <strong>
                                                        {
                                                          room?.selectedborder
                                                            ?.border?.brand
                                                            ?.brand
                                                        }
                                                      </strong>
                                                    </li>
                                                    <li className="list-group-item d-flex justify-content-between text-white">
                                                      <span className="mb-0">
                                                        REPEAT :
                                                      </span>
                                                      <strong>
                                                        {" "}
                                                        {
                                                          room?.selectedborder
                                                            ?.border?.repeat
                                                        }
                                                      </strong>
                                                    </li>
                                                    <li className="list-group-item d-flex justify-content-between text-white">
                                                      <span className="mb-0">
                                                        Book. :
                                                      </span>
                                                      <strong>
                                                        {
                                                          room?.selectedborder
                                                            ?.border?.book?.book
                                                        }
                                                      </strong>
                                                    </li>
                                                    <li className="list-group-item d-flex justify-content-between text-white">
                                                      <span className="mb-0">
                                                        Brand. :
                                                      </span>
                                                      <strong>
                                                        {
                                                          room?.selectedborder
                                                            ?.border?.book?.book
                                                        }
                                                      </strong>
                                                    </li>
                                                    <li className="list-group-item d-flex justify-content-between text-white">
                                                      <span className="mb-0">
                                                        width :{" "}
                                                      </span>
                                                      <strong>
                                                        {" "}
                                                        {
                                                          room?.selectedborder
                                                            ?.border?.width
                                                        }
                                                      </strong>
                                                    </li>
                                                  </ul>
                                                </div>
                                              )}
                                              {room?.selectedpattern ==
                                              null ? null : (
                                                <div>
                                                  <h5 className="text-white py-3">
                                                    Selected Pattern
                                                  </h5>
                                                  <ul className="list-group list-group-flush">
                                                    <li className="list-group-item d-flex justify-content-between text-white">
                                                      <span className="mb-0">
                                                        Curtain pattern :
                                                      </span>
                                                      <strong>
                                                        {
                                                          room?.selectedpattern
                                                            ?.curtainpattern
                                                            ?.pattern
                                                        }
                                                      </strong>
                                                    </li>
                                                    <li className="list-group-item d-flex justify-content-between text-white">
                                                      <span className="mb-0">
                                                        curtain style :
                                                      </span>
                                                      <strong>
                                                        {
                                                          room?.selectedpattern
                                                            ?.curtainstyle
                                                            ?.curtainStyle
                                                        }
                                                      </strong>
                                                    </li>
                                                    <li className="list-group-item d-flex justify-content-between text-white">
                                                      <span className="mb-0">
                                                        fabric 1 SELECTED :
                                                      </span>
                                                      <strong>
                                                        {
                                                          room?.selectedpattern
                                                            ?.fabric1?.fabric
                                                        }
                                                      </strong>
                                                    </li>
                                                    <li className="list-group-item d-flex justify-content-between text-white">
                                                      <span className="mb-0">
                                                        Width :
                                                      </span>
                                                      <strong>
                                                        {" "}
                                                        {
                                                          room?.selectedpattern
                                                            ?.fabric1?.width
                                                        }
                                                      </strong>
                                                    </li>
                                                    <li className="list-group-item d-flex justify-content-between text-white">
                                                      <span className="mb-0">
                                                        Fabric 1 Book :
                                                      </span>
                                                      <strong>
                                                        {" "}
                                                        {
                                                          room?.selectedpattern
                                                            ?.fabric1?.book
                                                            ?.book
                                                        }
                                                      </strong>
                                                    </li>
                                                    <li className="list-group-item d-flex justify-content-between text-white">
                                                      <span className="mb-0">
                                                        Fabric 1 Brand. :
                                                      </span>
                                                      <strong>
                                                        {" "}
                                                        {
                                                          room?.selectedpattern
                                                            ?.fabric1?.book
                                                            ?.brand?.brand
                                                        }
                                                      </strong>
                                                    </li>
                                                    <li className="list-group-item d-flex justify-content-between text-white">
                                                      <span className="mb-0">
                                                        Fabric 1 repeat
                                                        horizontal :{" "}
                                                      </span>
                                                      <strong>
                                                        {" "}
                                                        {
                                                          room?.selectedpattern
                                                            ?.fabric1
                                                            ?.repeat_horizontal
                                                        }
                                                      </strong>
                                                    </li>
                                                    <li className="list-group-item d-flex justify-content-between text-white">
                                                      <span className="mb-0">
                                                        Fabric 1 repeat vertical
                                                        :{" "}
                                                      </span>
                                                      <strong>
                                                        {" "}
                                                        {
                                                          room?.selectedpattern
                                                            ?.fabric1
                                                            ?.repeat_vertical
                                                        }
                                                      </strong>
                                                    </li>
                                                    <li className="list-group-item d-flex justify-content-between text-white">
                                                      <span className="mb-0">
                                                        fabric 2 SELECTED :
                                                      </span>
                                                      <strong>
                                                        {
                                                          room?.selectedpattern
                                                            ?.fabric2?.fabric
                                                        }
                                                      </strong>
                                                    </li>
                                                    <li className="list-group-item d-flex justify-content-between text-white">
                                                      <span className="mb-0">
                                                        Width :
                                                      </span>
                                                      <strong>
                                                        {" "}
                                                        {
                                                          room?.selectedpattern
                                                            ?.fabric2?.width
                                                        }
                                                      </strong>
                                                    </li>
                                                    <li className="list-group-item d-flex justify-content-between text-white">
                                                      <span className="mb-0">
                                                        Fabric 2 Book :
                                                      </span>
                                                      <strong>
                                                        {" "}
                                                        {
                                                          room?.selectedpattern
                                                            ?.fabric2?.book
                                                            ?.book
                                                        }
                                                      </strong>
                                                    </li>
                                                    <li className="list-group-item d-flex justify-content-between text-white">
                                                      <span className="mb-0">
                                                        Fabric 2 Brand. :
                                                      </span>
                                                      <strong>
                                                        {" "}
                                                        {
                                                          room?.selectedpattern
                                                            ?.fabric2?.book
                                                            ?.brand?.brand
                                                        }
                                                      </strong>
                                                    </li>
                                                    <li className="list-group-item d-flex justify-content-between text-white">
                                                      <span className="mb-0">
                                                        Fabric 2 repeat
                                                        horizontal :{" "}
                                                      </span>
                                                      <strong>
                                                        {" "}
                                                        {
                                                          room?.selectedpattern
                                                            ?.fabric2
                                                            ?.repeat_horizontal
                                                        }
                                                      </strong>
                                                    </li>
                                                    <li className="list-group-item d-flex justify-content-between text-white">
                                                      <span className="mb-0">
                                                        Fabric 2 repeat vertical
                                                        :{" "}
                                                      </span>
                                                      <strong>
                                                        {" "}
                                                        {
                                                          room?.selectedpattern
                                                            ?.fabric2
                                                            ?.repeat_vertical
                                                        }
                                                      </strong>
                                                    </li>
                                                  </ul>
                                                </div>
                                              )}

                                              {room?.room_assets?.length ===
                                              0 ? (
                                                <div className="room-heading border-top">
                                                  <h3 className>
                                                    Measurer have not filled
                                                    data yet
                                                  </h3>
                                                </div>
                                              ) : (
                                                room?.room_assets?.map(
                                                  (asset, index) => (
                                                    <>
                                                      <h3 className="text-white border-top">
                                                        window {index + 1}
                                                      </h3>
                                                      <div class="card text-white bg-white  text-black">
                                                        <div className="row">
                                                          <div className="col-lg-6">
                                                            <ul class="list-group list-group-flush">
                                                              <li class="list-group-item d-flex justify-content-between">
                                                                <span class="mb-0">
                                                                  Window Height
                                                                </span>
                                                                <strong>
                                                                  {asset.height}
                                                                  CM
                                                                </strong>
                                                              </li>
                                                              <li class="list-group-item d-flex justify-content-between">
                                                                <span class="mb-0">
                                                                  Window Width
                                                                </span>
                                                                <strong>
                                                                  {asset.width}
                                                                  CM
                                                                </strong>
                                                              </li>
                                                              <li class="list-group-item d-flex justify-content-between">
                                                                <span class="mb-0">
                                                                  Ladder Height
                                                                </span>
                                                                <strong>
                                                                  {
                                                                    asset.ladderHeight
                                                                  }
                                                                </strong>
                                                              </li>
                                                              <li class="list-group-item d-flex justify-content-between">
                                                                <span class="mb-0">
                                                                  Mount Type
                                                                </span>
                                                                <strong>
                                                                  {
                                                                    asset.mount_type
                                                                  }
                                                                </strong>
                                                              </li>
                                                              <li class="list-group-item d-flex justify-content-between">
                                                                <span class="mb-0">
                                                                  Width of Cove
                                                                </span>
                                                                <strong>
                                                                  {
                                                                    asset.widhtOfCove
                                                                  }
                                                                </strong>
                                                              </li>
                                                            </ul>
                                                          </div>
                                                          <div className="col-lg-6">
                                                            <ul class="list-group list-group-flush">
                                                              <li class="list-group-item d-flex justify-content-between">
                                                                <span class="mb-0">
                                                                  Ceiling Type
                                                                </span>
                                                                <strong>
                                                                  {
                                                                    asset
                                                                      ?.ceiling_type
                                                                      ?.type
                                                                  }
                                                                </strong>
                                                              </li>
                                                              <li class="list-group-item d-flex justify-content-between">
                                                                <span class="mb-0">
                                                                  NOTE:
                                                                </span>
                                                                <span className="font-size-10 ps-4">
                                                                  {
                                                                    asset
                                                                      ?.ceiling_type
                                                                      ?.note
                                                                  }
                                                                </span>
                                                              </li>
                                                              <li class="list-group-item d-flex justify-content-between">
                                                                <span class="mb-0">
                                                                  Wall type :
                                                                </span>
                                                                <strong>
                                                                  {asset
                                                                    ?.ceiling_type
                                                                    ?.wall_type ==
                                                                  null ? (
                                                                    <p>NUll</p>
                                                                  ) : (
                                                                    ""
                                                                  )}
                                                                </strong>
                                                              </li>
                                                              <li class="list-group-item d-flex justify-content-between">
                                                                <span class="mb-0">
                                                                  Curtain
                                                                  operation
                                                                </span>
                                                                <strong>
                                                                  {/* {asset?.curtain -
                                                                    operation?.operationType} */}
                                                                </strong>
                                                              </li>
                                                              <li class="list-group-item d-flex justify-content-between">
                                                                <span class="mb-0">
                                                                  ladder Type :
                                                                </span>
                                                                <strong>
                                                                  {
                                                                    asset
                                                                      ?.ladder
                                                                      ?.ladder
                                                                  }
                                                                </strong>
                                                              </li>
                                                              <li class="list-group-item d-flex justify-content-between">
                                                                <span class="mb-0">
                                                                  ladder Note :
                                                                </span>
                                                                <span className="font-size-10 ps-4">
                                                                  {
                                                                    asset
                                                                      ?.ladder
                                                                      ?.note
                                                                  }
                                                                </span>
                                                              </li>
                                                            </ul>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </>
                                                  )
                                                )
                                              )}
                                            </div>
                                          )
                                        )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="accordion-item">
                        <div
                          className="accordion-header collapsed rounded-lg"
                          id="accord-8Tw2o"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapse8fou2r"
                          aria-controls="collapse8four"
                          aria-expanded="true"
                          role="button"
                        >
                          <span className="accordion-header-icon" />
                          <span className="accordion-header-text">
                            Token Amount
                          </span>
                          <span className="accordion-header-indicator" />
                        </div>
                        <div
                          id="collapse8fou2r"
                          className="collapse accordion__body"
                          aria-labelledby="accord-8Tw2o"
                          data-bs-parent="#accordion-eight"
                        >
                          <div className="accordion-body-text">
                            <h5 className="text-white">
                              Token Amount Received :{" "}
                              <span className=" text-success">
                                {EnquiryDetials?.data?.amount}
                              </span>
                            </h5>
                          </div>
                        </div>
                      </div>
                      <div className="accordion-item">
                        <div
                          className="accordion-header collapsed rounded-lg"
                          id="accord-8Two"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapse8four"
                          aria-controls="collapse8four"
                          aria-expanded="true"
                          role="button"
                        >
                          <span className="accordion-header-icon" />
                          <span className="accordion-header-text">
                            Schedule Measurer
                          </span>
                          <span className="accordion-header-indicator" />
                        </div>
                        <div
                          id="collapse8four"
                          className="collapse accordion__body"
                          aria-labelledby="accord-8Two"
                          data-bs-parent="#accordion-eight"
                        >
                          <div className="accordion-body-text">
                            <ul className="list-group list-group-flush">
                              <li className="list-group-item d-flex justify-content-between text-white">
                                <span className="mb-0">Measurer Name :</span>
                                <Link to={"/"}>
                                  <h5 className="text-white">
                                    {
                                      EnquiryDetials?.EnquirySchedule?.user
                                        ?.firstName
                                    }{" "}
                                    {
                                      EnquiryDetials?.EnquirySchedule?.user
                                        ?.lastName
                                    }
                                  </h5>
                                </Link>
                              </li>
                              <li className="list-group-item d-flex justify-content-between text-white">
                                <span className="mb-0">Schedule Date :</span>
                                <strong>
                                  {moment(
                                    EnquiryDetials?.EnquirySchedule?.schedule
                                      ?.updatedAt
                                  ).format("ll")}
                                </strong>
                              </li>
                              <li className="list-group-item d-flex justify-content-between text-white">
                                <span className="mb-0">Tile SLot :</span>
                                <strong>
                                  {
                                    EnquiryDetials?.EnquirySchedule?.schedule
                                      ?.start_time
                                  }{" "}
                                  -{" "}
                                  {
                                    EnquiryDetials?.EnquirySchedule?.schedule
                                      ?.end_time
                                  }{" "}
                                </strong>
                              </li>

                              {/* <li className="list-group-item d-flex justify-content-between text-white">
                                <span className="mb-0">Status :</span>
                                <strong>
                                  <span className="badge badge-primary">
                                    Pending
                                  </span>
                                </strong>
                              </li> */}
                            </ul>
                          </div>
                        </div>
                      </div>
                      {/* <div className="accordion-item">
                      <div
                        className="accordion-header collapsed rounded-lg"
                        id="accord-8Two"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse8five"
                        aria-controls="collapse8five"
                        aria-expanded="true"
                        role="button"
                      >
                        <span className="accordion-header-icon" />
                        <span className="accordion-header-text">
                          {" "}
                          Stitching{" "}
                        </span>
                        <span className="accordion-header-indicator" />
                      </div>
                      <div
                        id="collapse8five"
                        className="collapse accordion__body"
                        aria-labelledby="accord-8Two"
                        data-bs-parent="#accordion-eight"
                      >
                        <div className="accordion-body-text">
                          <h4 className="ms-4 mb-4 fw-bold text-white">
                            Estimate Date for Complete Order - 2 June 2022
                          </h4>
                          <div className="basic-list-group">
                            <div className="row">
                              <div className="col-lg-12 col-xl-12">
                                <div
                                  className="list-group mb-4 flex-row"
                                  id="list-tab"
                                  role="tablist"
                                >
                                  <a
                                    className="list-group-item list-group-item-action text-white active"
                                    data-bs-toggle="list"
                                    href="#list-home1"
                                    role="tab"
                                  >
                                    curtains
                                  </a>
                                  <a
                                    className="list-group-item list-group-item-action text-white"
                                    data-bs-toggle="list"
                                    href="#list-profile1"
                                    role="tab"
                                  >
                                    Wallpapers
                                  </a>
                                  <a
                                    className="list-group-item list-group-item-action text-white"
                                    data-bs-toggle="list"
                                    href="#list-messages1"
                                    role="tab"
                                  >
                                    Floor
                                  </a>
                                  <a
                                    className="list-group-item list-group-item-action text-white"
                                    data-bs-toggle="list"
                                    href="#list-settings1"
                                    role="tab"
                                  >
                                    Mattress
                                  </a>
                                </div>
                              </div>
                              <div className="col-lg-6 col-xl-12">
                                <div
                                  className="tab-content"
                                  id="nav-tabContent1"
                                >
                                  <div
                                    className="tab-pane fade show active"
                                    id="list-home1"
                                  >
                                    <div className="room-heading">
                                      <h4 className>Room 1</h4>
                                      <span>Daughters Room</span>
                                    </div>
                                    <div>
                                      <ul className="list-group list-group-flush">
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            CURTAIN FABRIC SELECTED :
                                          </span>
                                          <strong>Xieriya</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">BRAND. :</span>
                                          <strong>Brands</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">Book. :</span>
                                          <strong>#tredf</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            CURTAIN STYLE :
                                          </span>
                                          <strong>EYELET</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            LINIING REQUIRED :
                                          </span>
                                          <strong>
                                            Yes (BLACKOUT,DIMOUT,LIGHT
                                            FILTERING)
                                          </strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            SHEER REQUIRED :
                                          </span>
                                          <strong>YES</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            SHEER FABRIC SELECTED :
                                          </span>
                                          <strong>EYELET</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">BRAND. :</span>
                                          <strong>Brands</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">Book. :</span>
                                          <strong>#tredf</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Assigned Tailor. :
                                          </span>
                                          <strong>
                                            Chandra Prakash Pandey
                                          </strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Total windows. :
                                          </span>
                                          <strong>3</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Total Doors. :
                                          </span>
                                          <strong>1</strong>
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="room-heading">
                                      <h4 className>Room 2</h4>
                                      <span>Guest Room</span>
                                    </div>
                                    <div>
                                      <ul className="list-group list-group-flush">
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            CURTAIN FABRIC SELECTED :
                                          </span>
                                          <strong>Xieriya</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">BRAND. :</span>
                                          <strong>Brands</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">Book. :</span>
                                          <strong>#tredf</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            CURTAIN STYLE :
                                          </span>
                                          <strong>EYELET</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            LINIING REQUIRED :
                                          </span>
                                          <strong>
                                            Yes (BLACKOUT,DIMOUT,LIGHT
                                            FILTERING)
                                          </strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            SHEER REQUIRED :
                                          </span>
                                          <strong>YES</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            SHEER FABRIC SELECTED :
                                          </span>
                                          <strong>EYELET</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">BRAND. :</span>
                                          <strong>Brands</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">Book. :</span>
                                          <strong>#tredf</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Assigned Tailor. :
                                          </span>
                                          <strong>Not Yet Assigned</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Total windows. :
                                          </span>
                                          <strong>3</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Total Doors. :
                                          </span>
                                          <strong>1</strong>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                  <div
                                    className="tab-pane fade"
                                    id="list-profile1"
                                    role="tabpanel"
                                  >
                                    <div className="room-heading">
                                      <h4 className>Room 3</h4>
                                      <span>Father's Room</span>
                                    </div>
                                    <ul className="list-group list-group-flush">
                                      <li className="list-group-item d-flex justify-content-between text-white">
                                        Room wallpaper details
                                      </li>
                                    </ul>
                                  </div>
                                  <div
                                    className="tab-pane fade"
                                    id="list-messages1"
                                  >
                                    <div className="room-heading mb-4">
                                      <h4 className>Room 4</h4>
                                      <span>Grand Mother's Room</span>
                                    </div>
                                    <h4 className="mb-4 text-white">
                                      Floor Detials
                                    </h4>
                                  </div>
                                  <div
                                    className="tab-pane fade"
                                    id="list-settings1"
                                  >
                                    <div className="room-heading mb-4">
                                      <h4 className>Room 5</h4>
                                      <span>Grand Father's Room</span>
                                    </div>
                                    <h4 className="mb-4 text-white">
                                      Mattress Detials
                                    </h4>
                                    <p />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <div
                        className="accordion-header collapsed rounded-lg"
                        id="accord-8Two11"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse8five11"
                        aria-controls="collapse8five"
                        aria-expanded="true"
                        role="button"
                      >
                        <span className="accordion-header-icon" />
                        <span className="accordion-header-text">
                          {" "}
                          QC Details{" "}
                        </span>
                        <span className="accordion-header-indicator" />
                      </div>
                      <div
                        id="collapse8five11"
                        className="collapse accordion__body"
                        aria-labelledby="accord-8Two"
                        data-bs-parent="#accordion-eight"
                      >
                        <div className="accordion-body-text">
                          <div className="basic-list-group">
                            <div className="row">
                              <div className="col-lg-12 col-xl-12">
                                <div
                                  className="list-group mb-4 flex-row"
                                  id="list-tab"
                                  role="tablist"
                                >
                                  <a
                                    className="list-group-item list-group-item-action text-white active"
                                    data-bs-toggle="list"
                                    href="#list-home12"
                                    role="tab"
                                  >
                                    curtains
                                  </a>
                                  <a
                                    className="list-group-item list-group-item-action text-white"
                                    data-bs-toggle="list"
                                    href="#list-profile12"
                                    role="tab"
                                  >
                                    Wallpapers
                                  </a>
                                  <a
                                    className="list-group-item list-group-item-action text-white"
                                    data-bs-toggle="list"
                                    href="#list-messages12"
                                    role="tab"
                                  >
                                    Floor
                                  </a>
                                  <a
                                    className="list-group-item list-group-item-action text-white"
                                    data-bs-toggle="list"
                                    href="#list-settings12"
                                    role="tab"
                                  >
                                    Mattress
                                  </a>
                                </div>
                              </div>
                              <div className="col-lg-6 col-xl-12">
                                <div
                                  className="tab-content"
                                  id="nav-tabContent1"
                                >
                                  <div
                                    className="tab-pane fade show active"
                                    id="list-home12"
                                  >
                                    <div className="room-heading">
                                      <h4 className>Room 1</h4>
                                      <span>Daughters Room</span>
                                    </div>
                                    <div>
                                      <ul className="list-group list-group-flush">
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Client Name :
                                          </span>
                                          <strong>Jitu Sharma</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            IC Name :
                                          </span>
                                          <strong>
                                            Chandra prakash padney
                                          </strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Quality Cheacker Name :
                                          </span>
                                          <strong>Akram </strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Inspection date :
                                          </span>
                                          <strong>22-june-2022</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Measurements :
                                          </span>
                                          <strong>Pass</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Design/style :
                                          </span>
                                          <strong>Pass</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Ironing :
                                          </span>
                                          <strong>Pass</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Thread on curtains :
                                          </span>
                                          <strong>Failed</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Belts Include :
                                          </span>
                                          <strong>Failed</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Channels/Rods Include :
                                          </span>
                                          <strong>Failed</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Brackets include for channels :
                                          </span>
                                          <strong>Pass</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">Weight :</span>
                                          <strong>Failed</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Led chain :
                                          </span>
                                          <strong>No</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Tpe of opening :
                                          </span>
                                          <strong>Manual</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Stitching quality :
                                          </span>
                                          <strong>average</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">Fall :</span>
                                          <strong>No</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Cut Marks :
                                          </span>
                                          <strong>Pass</strong>
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="room-heading">
                                      <h4 className>Room 2</h4>
                                      <span>Guest Room</span>
                                    </div>
                                    <div>
                                      <ul className="list-group list-group-flush">
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Client Name :
                                          </span>
                                          <strong>Jitu Sharma</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            IC Name :
                                          </span>
                                          <strong>
                                            Chandra prakash padney
                                          </strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Quality Cheacker Name :
                                          </span>
                                          <strong>Akram </strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Inspection date :
                                          </span>
                                          <strong>22-june-2022</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Measurements :
                                          </span>
                                          <strong>Pass</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Design/style :
                                          </span>
                                          <strong>Pass</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Ironing :
                                          </span>
                                          <strong>Pass</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Thread on curtains :
                                          </span>
                                          <strong>Failed</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Belts Include :
                                          </span>
                                          <strong>Failed</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Channels/Rods Include :
                                          </span>
                                          <strong>Failed</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Brackets include for channels :
                                          </span>
                                          <strong>Pass</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">Weight :</span>
                                          <strong>Failed</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Led chain :
                                          </span>
                                          <strong>No</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Tpe of opening :
                                          </span>
                                          <strong>Manual</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Stitching quality :
                                          </span>
                                          <strong>average</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">Fall :</span>
                                          <strong>No</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Cut Marks :
                                          </span>
                                          <strong>Pass</strong>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                  <div
                                    className="tab-pane fade"
                                    id="list-profile12"
                                    role="tabpanel"
                                  >
                                    <div className="room-heading">
                                      <h4 className>Room 3</h4>
                                      <span>Father's Room</span>
                                    </div>
                                    <ul className="list-group list-group-flush">
                                      <li className="list-group-item d-flex justify-content-between text-white">
                                        Room wallpaper QC details
                                      </li>
                                    </ul>
                                  </div>
                                  <div
                                    className="tab-pane fade"
                                    id="list-messages12"
                                  >
                                    <div className="room-heading mb-4">
                                      <h4 className>Room 4</h4>
                                      <span>Grand Mother's Room</span>
                                    </div>
                                    <h4 className="mb-4 text-white">
                                      Floor QC details
                                    </h4>
                                  </div>
                                  <div
                                    className="tab-pane fade"
                                    id="list-settings12"
                                  >
                                    <div className="room-heading mb-4">
                                      <h4 className>Room 5</h4>
                                      <span>Grand Father's Room</span>
                                    </div>
                                    <h4 className="mb-4 text-white">
                                      Mattress QC details
                                    </h4>
                                    <p />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <div
                        className="accordion-header collapsed rounded-lg"
                        id="accord-8Two"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse8T22wo"
                        aria-controls="collapse8Two"
                        aria-expanded="true"
                        role="button"
                      >
                        <span className="accordion-header-icon" />
                        <span className="accordion-header-text">
                          Delivery Details
                        </span>
                        <span className="accordion-header-indicator" />
                      </div>
                      <div
                        id="collapse8T22wo"
                        className="collapse accordion__body"
                        aria-labelledby="accord-8Two"
                        data-bs-parent="#accordion-eight"
                      >
                        <div className="accordion-body-text">
                          <h4 className="text-success">Delivered</h4>
                          <h4 className="text-danger">Not yet Delivered</h4>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <div
                        className="accordion-header collapsed rounded-lg"
                        id="accord-8Two11"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse8five1155"
                        aria-controls="collapse8five"
                        aria-expanded="true"
                        role="button"
                      >
                        <span className="accordion-header-icon" />
                        <span className="accordion-header-text">
                          {" "}
                          Installation Details{" "}
                        </span>
                        <span className="accordion-header-indicator" />
                      </div>
                      <div
                        id="collapse8five1155"
                        className="collapse accordion__body"
                        aria-labelledby="accord-8Two"
                        data-bs-parent="#accordion-eight"
                      >
                        <div className="accordion-body-text">
                          <div className="basic-list-group">
                            <div className="row">
                              <div className="col-lg-12 col-xl-12">
                                <div
                                  className="list-group mb-4 flex-row"
                                  id="list-tab"
                                  role="tablist"
                                >
                                  <a
                                    className="list-group-item list-group-item-action text-white active"
                                    data-bs-toggle="list"
                                    href="#list-home125"
                                    role="tab"
                                  >
                                    curtains
                                  </a>
                                  <a
                                    className="list-group-item list-group-item-action text-white"
                                    data-bs-toggle="list"
                                    href="#list-profile125"
                                    role="tab"
                                  >
                                    Wallpapers
                                  </a>
                                  <a
                                    className="list-group-item list-group-item-action text-white"
                                    data-bs-toggle="list"
                                    href="#list-messages125"
                                    role="tab"
                                  >
                                    Floor
                                  </a>
                                  <a
                                    className="list-group-item list-group-item-action text-white"
                                    data-bs-toggle="list"
                                    href="#list-settings125"
                                    role="tab"
                                  >
                                    Mattress
                                  </a>
                                </div>
                              </div>
                              <div className="col-lg-6 col-xl-12">
                                <div
                                  className="tab-content"
                                  id="nav-tabContent1"
                                >
                                  <div
                                    className="tab-pane fade show active"
                                    id="list-home125"
                                  >
                                    <div className="room-heading">
                                      <h4 className>Room 1</h4>
                                      <span>Daughters Room</span>
                                    </div>
                                    <div>
                                      <ul className="list-group list-group-flush">
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Installer Name :
                                          </span>
                                          <strong>Jitu Sharma</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Inataller ID :
                                          </span>
                                          <strong>#45tt555</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Installation date :
                                          </span>
                                          <strong>12-jan-2022</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Installation time :
                                          </span>
                                          <strong>05:35 PM</strong>
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="room-heading">
                                      <h4 className>Room 2</h4>
                                      <span>Guest Room</span>
                                    </div>
                                    <div>
                                      <ul className="list-group list-group-flush">
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Installer Name :
                                          </span>
                                          <strong>Jitu Sharma</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Inataller ID :
                                          </span>
                                          <strong>#45tt555</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Installation date :
                                          </span>
                                          <strong>12-jan-2022</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between text-white">
                                          <span className="mb-0">
                                            Installation time :
                                          </span>
                                          <strong>05:35 PM</strong>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                  <div
                                    className="tab-pane fade"
                                    id="list-profile125"
                                    role="tabpanel"
                                  >
                                    <div className="room-heading">
                                      <h4 className>Room 3</h4>
                                      <span>Father's Room</span>
                                    </div>
                                    <ul className="list-group list-group-flush">
                                      <li className="list-group-item d-flex justify-content-between text-white">
                                        Room wallpaper not installed yet
                                      </li>
                                    </ul>
                                  </div>
                                  <div
                                    className="tab-pane fade"
                                    id="list-messages125"
                                  >
                                    <div className="room-heading mb-4">
                                      <h4 className>Room 4</h4>
                                      <span>Grand Mother's Room</span>
                                    </div>
                                    <h4 className="mb-4 text-white">
                                      Floor Not installed yet
                                    </h4>
                                  </div>
                                  <div
                                    className="tab-pane fade"
                                    id="list-settings125"
                                  >
                                    <div className="room-heading mb-4">
                                      <h4 className>Room 5</h4>
                                      <span>Grand Father's Room</span>
                                    </div>
                                    <h4 className="mb-4 text-white">
                                      Not yet Installed
                                    </h4>
                                    <p />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <div
                        className="accordion-header collapsed rounded-lg"
                        id="accord-8Tw2o"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse8fou2r45"
                        aria-controls="collapse8four"
                        aria-expanded="true"
                        role="button"
                      >
                        <span className="accordion-header-icon" />
                        <span className="accordion-header-text">
                          Customer Feedback
                        </span>
                        <span className="accordion-header-indicator" />
                      </div>
                      <div
                        id="collapse8fou2r45"
                        className="collapse accordion__body"
                        aria-labelledby="accord-8Tw2o"
                        data-bs-parent="#accordion-eight"
                      >
                        <div className="accordion-body-text">
                          <h5 className="text-white">
                            Download Customer Feedback
                          </h5>
                          <a href="#" className="d-inline-block mt-4">
                            <img
                              src="./images/pdfimage.webp"
                              style={{
                                width: "80px",
                                border: "2px solid #ffffff",
                                padding: "10px",
                                borderRadius: "8px",
                              }}
                            />
                          </a>
                        </div>
                      </div>
                    </div> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4">
                <div className="card">
                  <div className="card-header border-0 pb-0">
                    <h4 className="card-title">Timeline</h4>
                  </div>
                  <div className="card-body">
                    <div
                      id="DZ_W_TimeLine"
                      className="widget-timeline dlab-scroll"
                    >
                      <ul className="timeline">
                        {EnquiryDetials?.data?.enquirystatuses &&
                          EnquiryDetials?.data?.enquirystatuses.map(
                            (item, index) => {
                              return (
                                <li>
                                  <div className="timeline-badge primary" />
                                  <a
                                    className="timeline-panel text-muted"
                                    href="#"
                                  >
                                    <span className="text-white">
                                      {moment(item.createdAt).format("LLL")}
                                    </span>
                                    <h6 className="mb-0 text-white">
                                      {item.remark} #{item.enquiryId}
                                      {/* <strong className="text-primary"></strong>. */}
                                    </h6>
                                  </a>
                                </li>
                              );
                            }
                          )}
                      </ul>
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

export default EnquiryDetials;
