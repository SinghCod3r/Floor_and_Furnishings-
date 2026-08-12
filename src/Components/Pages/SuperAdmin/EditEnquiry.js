import React from "react";
import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";

function EditEnquiry() {
  return (
    <>
      <SuperAdminHeader />
      <SuperAdminSidebar />

      <div className="content-body">
        {/*--- row ---*/}
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-12">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">Edit Enquiry Detials</h4>
                  <button
                    type="button"
                    className="btn btn-outline-primary py-2 px-3"
                  >
                    Back
                  </button>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-12">
                      <p className="badge badge-secondary rounded-0 fs-4 d-block text-start">
                        Customer Details :
                      </p>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">
                          Enquiry Type
                        </label>
                        <select
                          className="me-sm-2 default-select form-control wide"
                          id="inlineFormCustomSelect1"
                        >
                          <option selected="">Select Enquiry Type...</option>
                          <option value={1}>GST</option>
                          <option value={2}>Personal Lnv</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">
                          Customer Name
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">
                          Contact No.
                        </label>
                        <input type="number" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">
                          Secondary Contact No.
                        </label>
                        <input type="number" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">Email</label>
                        <input type="email" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">State</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">Pincode</label>
                        <input type="number" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">GST No.</label>
                        <input type="number" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">
                          Company Name
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-12 mb-3">
                      <div className="mb-0">
                        <label className="text-label form-label">Address</label>
                        <textarea
                          className="form-control"
                          rows={4}
                          id="comment"
                          defaultValue={""}
                        />
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="row mt-5">
                    <div className="col-12">
                      <p className="badge badge-secondary rounded-0 fs-4 d-block text-start">
                        Billing Address :
                      </p>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">
                          Customer Name
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">
                          Contact No.
                        </label>
                        <input type="number" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">
                          Secondary Contact No.
                        </label>
                        <input type="number" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">Email</label>
                        <input type="email" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">State</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">Pincode</label>
                        <input type="number" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-12 mb-3">
                      <div className="mb-0">
                        <label className="text-label form-label">Address</label>
                        <textarea
                          className="form-control"
                          rows={4}
                          id="comment"
                          defaultValue={""}
                        />
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="row mt-5">
                    <div className="col-12">
                      <p className="badge badge-secondary rounded-0 fs-4 d-block text-start">
                        Delivery Address :
                      </p>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">
                          Customer Name
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">
                          Contact No.
                        </label>
                        <input type="number" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">
                          Secondary Contact No.
                        </label>
                        <input type="number" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">Email</label>
                        <input type="email" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">State</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">Pincode</label>
                        <input type="number" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-12 mb-3">
                      <div className="mb-0">
                        <label className="text-label form-label">Address</label>
                        <textarea
                          className="form-control"
                          rows={4}
                          id="comment"
                          defaultValue={""}
                        />
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="row mt-5 align-items-center">
                    <div className="col-12 mb-4">
                      <p className="badge badge-secondary rounded-0 fs-4 d-block text-start">
                        Material Category and Room Details :
                      </p>
                    </div>
                    <div className="col-lg-2 mb-2">
                      <div className="form-check custom-checkbox mb-3">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="qq"
                        />
                        <label className="form-check-label" htmlFor="qq">
                          Curtains
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-2 mb-2">
                      <div className="form-check custom-checkbox mb-3">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="ww"
                        />
                        <label className="form-check-label" htmlFor="ww">
                          Sheers
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-2 mb-2">
                      <div className="form-check custom-checkbox mb-3">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="ee"
                        />
                        <label className="form-check-label" htmlFor="ee">
                          Wallpapers
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-2 mb-2">
                      <div className="form-check custom-checkbox mb-3">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="rr"
                        />
                        <label className="form-check-label" htmlFor="rr">
                          Mattress
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-2 mb-2">
                      <div className="form-check custom-checkbox mb-3">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="rrr"
                        />
                        <label className="form-check-label" htmlFor="rrr">
                          Wooden flooring
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-2 mb-2">
                      <div className="form-check custom-checkbox mb-3">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="tt"
                        />
                        <label className="form-check-label" htmlFor="tt">
                          Roda/tracks
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-2 mb-2">
                      <div className="form-check custom-checkbox mb-3">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="yy"
                        />
                        <label className="form-check-label" htmlFor="yy">
                          Tie backs
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-2 mb-2">
                      <div className="form-check custom-checkbox mb-3">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="uu"
                        />
                        <label className="form-check-label" htmlFor="uu">
                          Blinds
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-2 mb-2">
                      <div className="form-check custom-checkbox mb-3">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="uuu"
                        />
                        <label className="form-check-label" htmlFor="uuu">
                          Rugs
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-2 mb-2">
                      <div className="form-check custom-checkbox mb-3">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="ii"
                        />
                        <label className="form-check-label" htmlFor="ii">
                          Upholstery
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-2 mb-2">
                      <div className="form-check custom-checkbox mb-3">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="iri"
                        />
                        <label className="form-check-label" htmlFor="iri">
                          Other
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">
                          Room Name
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">
                          No. of window
                        </label>
                        <input type="number" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">
                          No. of Door
                        </label>
                        <input type="number" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-12 mb-3">
                      <div className="mb-0">
                        <label className="text-label form-label">
                          Room description
                        </label>
                        <textarea
                          className="form-control"
                          rows={4}
                          id="aw"
                          defaultValue={""}
                        />
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="row mt-5 align-items-center">
                    <div className="col-12 mb-4">
                      <p className="badge badge-secondary rounded-0 fs-4 d-block text-start">
                        Curtain Styles :
                      </p>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">
                          Curtain fabric
                        </label>
                        <select
                          className="me-sm-2 default-select form-control wide"
                          id="inlineFormCustomSelect"
                        >
                          <option selected="">Choose curtain fabric...</option>
                          <option value={1}>Fabric 1</option>
                          <option value={2}>Fabric 2</option>
                          <option value={3}>Fabric 3</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">Width</label>
                        <input type="number" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">
                          Repeat (H)
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">
                          Repeat (V)
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">Brand</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">Book</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">
                          Curtain Style
                        </label>
                        <select
                          className="me-sm-2 default-select form-control wide"
                          id="inlineFormCustomSelect"
                        >
                          <option selected="">Choose curtain Style.....</option>
                          <option>3 Pleat</option>
                          <option>Pencil Pleat</option>
                          <option>Eyelet</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="form-check custom-checkbox">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="iww"
                        />
                        <label className="form-check-label" htmlFor="iww">
                          Weights Required
                        </label>
                      </div>
                      <div className="form-check custom-checkbox">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="iiq"
                        />
                        <label className="form-check-label" htmlFor="iiq">
                          Hand Hamming Required
                        </label>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="row mt-5 align-items-center">
                    <div className="col-12 mb-4">
                      <p className="badge badge-secondary rounded-0 fs-4 d-block text-start">
                        Lining fabric Section :
                      </p>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="form-check custom-checkbox mb-3">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="iqiq"
                        />
                        <label className="form-check-label" htmlFor="iqiq">
                          Lining Required
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">
                          Lining Style
                        </label>
                        <select
                          className="me-sm-2 default-select form-control wide"
                          id="inlineFormCustomSelect"
                        >
                          <option selected="">Choose curtain Style.....</option>
                          <option value={1}>Black out</option>
                          <option value={2}>Dimout</option>
                          <option value={3}>Light Filtering</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">Width</label>
                        <input type="number" className="form-control" />
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="row mt-5 align-items-center">
                    <div className="col-12 mb-4">
                      <p className="badge badge-secondary rounded-0 fs-4 d-block text-start">
                        Sheer fabric selection :
                      </p>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">
                          Sheer fabric
                        </label>
                        <select
                          className="me-sm-2 default-select form-control wide"
                          id="inlineFormCustomSelect"
                        >
                          <option selected="">Choose curtain fabric...</option>
                          <option value={1}>Sheer Fabric 1</option>
                          <option value={2}>Sheer Fabric 2</option>
                          <option value={3}>Sheer Fabric 3</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">Width</label>
                        <input type="number" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">
                          Repeat (H)
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">
                          Repeat (V)
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">Brand</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">Book</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="form-check custom-checkbox mb-3">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="iww1"
                        />
                        <label className="form-check-label" htmlFor="iww1">
                          Led Chain Required
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="form-check custom-checkbox mb-3">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="iiq1"
                        />
                        <label className="form-check-label" htmlFor="iiq1">
                          Bracket Required
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">
                          Bracket type
                        </label>
                        <select
                          className="me-sm-2 default-select form-control wide"
                          id="inlineFormCustomSelect"
                        >
                          <option selected="">Choose bracket type.....</option>
                          <option value={1}>Signle</option>
                          <option value={2}>Bouble</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="form-check custom-checkbox mb-3">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="iww12"
                        />
                        <label className="form-check-label" htmlFor="iww12">
                          Hand Hamming Required
                        </label>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="row mt-5 align-items-center">
                    <div className="col-12 mb-4">
                      <p className="badge badge-secondary rounded-0 fs-4 d-block text-start">
                        Hardware information :
                      </p>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="form-check custom-checkbox mb-3">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="iw2w1"
                        />
                        <label className="form-check-label" htmlFor="iw2w1">
                          Track Required
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="form-check custom-checkbox mb-3">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="iw2w12"
                        />
                        <label className="form-check-label" htmlFor="iw2w12">
                          Manual
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="form-check custom-checkbox mb-3">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="iw2w122"
                        />
                        <label className="form-check-label" htmlFor="iw2w122">
                          Motorised
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">
                          Motor function
                        </label>
                        <select
                          className="me-sm-2 default-select form-control wide"
                          id="inlineFormCustomSelect"
                        >
                          <option selected="">
                            Choose function type .....
                          </option>
                          <option value={1}>Remote Operated</option>
                          <option value={2}>Mobile Operated</option>
                          <option value={3}>Automation</option>
                          <option value={3}>Alexa Operated</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">
                          Motor Type
                        </label>
                        <select
                          className="me-sm-2 default-select form-control wide"
                          id="inlineFormCustomSelect"
                        >
                          <option selected="">Choose Motor type .....</option>
                          <option value={1}>Option 1</option>
                          <option value={2}>Option 2</option>
                          <option value={3}>Option 3</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">
                          Motor operation
                        </label>
                        <select
                          className="me-sm-2 default-select form-control wide"
                          id="inlineFormCustomSelect"
                        >
                          <option selected="">
                            Choose Motor operation .....
                          </option>
                          <option value={1}>Left operated 1</option>
                          <option value={2}>Right operated</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="form-check custom-checkbox mb-3">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="iw21w122"
                        />
                        <label className="form-check-label" htmlFor="iw21w122">
                          Over Lapper Required
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="form-check custom-checkbox mb-3">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="iw21w1222"
                        />
                        <label className="form-check-label" htmlFor="iw21w1222">
                          Bracket Required
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">
                          Bracket Type
                        </label>
                        <select
                          className="me-sm-2 default-select form-control wide"
                          id="inlineFormCustomSelect"
                        >
                          <option selected="">Choose Bracket type .....</option>
                          <option value={1}>Long</option>
                          <option value={2}>Small</option>
                          <option value={2}>Bouble bracket</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">
                          Size request
                        </label>
                        <select
                          className="me-sm-2 default-select form-control wide"
                          id="inlineFormCustomSelect"
                        >
                          <option selected="">Choose size type .....</option>
                          <option value={1}>2x4</option>
                          <option value={2}>2x2</option>
                          <option value={2}>6x4</option>
                          <option value={2}>9x4</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">
                          Screw Required
                        </label>
                        <select
                          className="me-sm-2 default-select form-control wide"
                          id="inlineFormCustomSelect"
                        >
                          <option selected="">Choose screw size .....</option>
                          <option value={1}>1.5in</option>
                          <option value={1}>2in</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="form-check custom-checkbox mb-3">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="iw21w12221"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="iw21w12221"
                        >
                          Rod Required
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">
                          Rod type
                        </label>
                        <select
                          className="me-sm-2 default-select form-control wide"
                          id="inlineFormCustomSelect"
                        >
                          <option selected="">Choose ros type.....</option>
                          <option value={1}>Brass</option>
                          <option value={1}>Copper</option>
                          <option value={1}>SS</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="form-check custom-checkbox mb-3">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="vv"
                        />
                        <label className="form-check-label" htmlFor="vv">
                          Extra Rings Required
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">
                          No of rings
                        </label>
                        <input type="number" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">
                          Extra Bracket
                        </label>
                        <input type="number" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="form-check custom-checkbox mb-3">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="v1v"
                        />
                        <label className=" form-check-label" htmlFor="v1v">
                          Tie Knobs Required
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">
                          Tie Knob Material
                        </label>
                        <select
                          className="me-sm-2 default-select form-control wide"
                          id="inlineFormCustomSelect"
                        >
                          <option selected="">
                            Choose Tie Knob Material.....
                          </option>
                          <option value={1}>Brass</option>
                          <option value={1}>Copper</option>
                          <option value={1}>SS</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="row mt-5 align-items-center">
                    <div className="col-12 mb-4">
                      <p className="badge badge-secondary rounded-0 fs-4 d-block text-start">
                        Belt fabric selection :
                      </p>
                    </div>
                    <div className="col-lg-12 mb-4">
                      <div className="form-check custom-checkbox mb-3">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="qre"
                        />
                        <label className="form-check-label" htmlFor="qre">
                          Same as curtain fabric
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">
                          Belt fabric
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">Brand</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">Book</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">Width</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">
                          Repeat (H)
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">
                          Repeat (V)
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">
                          Belt Type
                        </label>
                        <select
                          className="me-sm-2 default-select form-control wide"
                          id="inlineFormCustomSelect"
                        >
                          <option selected="">Choose Belt type .....</option>
                          <option value={1}>Velcro</option>
                          <option value={2}>Tie Hook</option>
                          <option value={2}>Velcro + Tie Hook</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="row mt-5 align-items-center">
                    <div className="col-12 mb-4">
                      <p className="badge badge-secondary rounded-0 fs-4 d-block text-start">
                        Pelmet fabric selection :
                      </p>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="form-check custom-checkbox mb-3">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="vf"
                        />
                        <label className="form-check-label" htmlFor="vf">
                          Pelmet required
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">
                          Pelmet type
                        </label>
                        <select
                          className="me-sm-2 default-select form-control wide"
                          id="inlineFormCustomSelect"
                        >
                          <option selected="">Choose Pelmet type .....</option>
                          <option value={1}>Hard</option>
                          <option value={2}>Soft</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">Width</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">Drop</label>
                        <input type="number" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">
                          Pelmet fabric
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">
                          Repeat (H)
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">
                          Repeat (V)
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">Brand</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">Book</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="row mt-5 align-items-center">
                    <div className="col-12 mb-4">
                      <p className="badge badge-secondary rounded-0 fs-4 d-block text-start">
                        Border information :
                      </p>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="form-check custom-checkbox mb-3">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="vf1"
                        />
                        <label className="form-check-label" htmlFor="vf1">
                          Border required
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">
                          Borter type
                        </label>
                        <select
                          className="me-sm-2 default-select form-control wide"
                          id="inlineFormCustomSelect"
                        >
                          <option selected="">Choose border type .....</option>
                          <option value={1}>type 1</option>
                          <option value={1}>type 2</option>
                          <option value={1}>type 3</option>
                          <option value={1}>type 4</option>
                          <option value={1}>type 5</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">Width</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">
                          Border fabric
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">
                          Repeat (H)
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">
                          Repeat (V)
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">Brand</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">Book</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="row mt-5 align-items-center">
                    <div className="col-12 mb-4">
                      <p className="badge badge-secondary rounded-0 fs-4 d-block text-start">
                        Customize Curtains information:
                      </p>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">
                          Select Customize option
                        </label>
                        <select
                          className="me-sm-2 default-select form-control wide"
                          id="inlineFormCustomSelect"
                        >
                          <option selected="">
                            Choose Customize option .....
                          </option>
                          <option value={1}>Alternativ Pannels</option>
                          <option value={1}>Half of fabric</option>
                          <option value={1}>Only 1 panel of fabric</option>
                          <option value={1}>Only possible of center</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">Width</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">
                          Selected fabric
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">
                          Repeat (H)
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">
                          Repeat (V)
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">Brand</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <div className="mb-0">
                        <label className="text-label form-label">Book</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-footer text-end">
                  <button type="button" className="btn btn-success">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditEnquiry;
