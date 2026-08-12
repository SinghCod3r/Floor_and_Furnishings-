import { useEffect, useState } from "react";
import { GetDataWithToken, PostDataWithToken } from "../ApiHelper/ApiHelper";
import { useInView } from "react-intersection-observer";
import { useNavigate, Link } from "react-router-dom";
import moment from "moment";
import Loader from "./Loader";
import { toast } from "material-react-toastify";
import Swal from "sweetalert2";

const PaymentLinkComponent = ({ superAdmin, outletManagerStore }) => {
  const navigate = useNavigate();
  const [filterValues, setFilterValues] = useState({});
  const [filters, setFilters] = useState({});
  const [syncLoading, setSyncLoading] = useState(false);
  const [paymentHistoryData, setPaymentHistoryData] = useState([]);
  const [paymentRequestData, setPaymentRequestData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { ref: myRef, inView: visibleElement } = useInView();
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    if (visibleElement) {
      setCurrentPage((prevData => prevData + 1));
      GetPaymentHistoryData(currentPage);
    }
  }, [visibleElement, filters]);

  const GetPaymentHistoryData = (pageNo) => {
    setisLoading(true);
    GetDataWithToken(`payment/send-payment-link?pageNo=${pageNo}&pageSize=10${Object.keys(filters).length ? `&${filters?.join('&')}` : ""}`).then((response) => {
      setisLoading(false);
      if (response.status) {
        setPaymentHistoryData((prev) => [...prev, ...response.data]);
      }
    })
  }

  const updatePaymentHistoryHandler = () => {
    Swal.fire({
      title: "Do you want to sync payment to AX?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Yes",
      // denyButtonText: `Don't dont send`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        setSyncLoading(true);
        GetDataWithToken('payment/sync-payment').then((res) => {
          setSyncLoading(false);
          if (res.status) {
            toast.success(res.data.message);
            GetPaymentHistoryData(1);
          } else {
            toast.error(res.message);
          }
        })
      }
    });
  }

  const checkboxValueHandler = (event) => {
    let value = event.target.value;
    let isChecked = event.target.checked;
    if (isChecked) {
      setPaymentRequestData((prev) => [...prev, { id: value }]);
    } else {
      setPaymentRequestData((prev) => prev.filter(payment => payment.id !== value));
    }
  }

  const AddAllPaymentRequests = (event) => {
    let isChecked = event.target.checked;
    if (isChecked) {
      setPaymentRequestData(paymentHistoryData?.map((pay) => ({
        id: pay.paymentId,
      })))
    } else {
      setPaymentRequestData([]);
    }
  }

  const FilterValueHandler = (key, value) => {

    setFilterValues(prev => ({
      ...prev,
      [key]: value
    }))
    // setFilterValues((prev) => prev.map(pp => ({
    //   ...pp,
    //   [key]: value,
    // })))
  }

  const ResetHandler = () => {
    setFilterValues({});
    setCurrentPage(1);
    setFilters({});

    // GetPaymentHistoryData(1);
  }

  const filterHandler = () => {
    setCurrentPage(1);
    setPaymentHistoryData([]);
    setFilters(Object.keys(filterValues).map((key, index) => filterValues[key] ? `${key}=${filterValues[key]}` : ""));
    // setFilters((prev) => [...prev, `enquiry=${enquiryId}`]);
    // GetPaymentHistoryData(1);
  }

  return (<>
    <div className="content-body">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between">
                <h4 className="card-title">Payment Links</h4>
                <button className="btn btn-primary"
                  disabled={syncLoading}
                  onClick={updatePaymentHistoryHandler}
                >Sync Payment to AX</button>
              </div>
              <div className="d-flex gap-4 justify-content-end mt-2">
                <div class="d-flex position-relative align-items-center">
                  <span class="position-absolute" style={{ position: "absolute", top: "8px", left: "10px" }}><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path></svg></span>
                  <input
                    class="form-control "
                    placeholder="Search..."
                    name="searchData"
                    value={filterValues?.enquiry || ""}
                    onChange={(e) => {
                      FilterValueHandler("enquiry", e.target.value)
                    }}
                  />
                </div>
                <div className="d-flex align-items-center gap-2">
                  <label className="form-label text-nowrap">AX Status</label>
                  <select
                    className="form-control"
                    value={filterValues?.ax_status || ""}
                    onChange={(e) => {
                      FilterValueHandler("ax_status", e.target.value)

                    }}
                  >
                    <option value="">All</option>
                    <option value="1">Updated</option>
                    <option value="0">Not Updated</option>
                  </select>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <label>Date</label>
                  <input
                    type="date"
                    value={filterValues?.date || ""}
                    className="form-control" onChange={(e) => {
                      FilterValueHandler("date", e.target.value)
                    }} />
                </div>

                <button
                  className="btn btn-primary py-2"
                  onClick={filterHandler}
                >Filter</button>
                <button
                  className="btn btn-primary py-2"
                  onClick={ResetHandler}
                >Reset</button>

              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table
                    id="example4"
                    className="table card-table display mb-4 shadow-hover table-responsive-lg"
                    style={{ minWidth: "845px", textAlign: "center" }}
                  >
                    <thead>
                      <tr>
                        {/* <th>
                          <input type="checkbox" className="input-field"
                            onClick={AddAllPaymentRequests}
                          />
                        </th> */}
                        <th>Enq. No.</th>
                        <th>Customer ID</th>
                        <th>Payment ID</th>
                        <th>Payment Date</th>
                        <th>Paid Amount</th>
                        <th>AX status</th>
                        <th>Payment Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* {console.log("length", AllEnquiry.length)} */}

                      {isLoading && <Loader />}
                      {paymentHistoryData && paymentHistoryData.length === 0 ? (
                        <h3
                          style={{
                            position: "absolute",
                            left: "40%",
                            padding: "10px",
                          }}
                        >
                          No data found
                        </h3>
                      ) : (
                        paymentHistoryData.map((data, index) => (
                          <tr>
                            {/* <td>
                              <input type="checkbox" className="input-field"
                                value={data?.paymentId}
                                onClick={checkboxValueHandler}
                                checked={paymentRequestData.some(e => e.id === data?.paymentId)}
                              />
                            </td> */}

                            <td>
                              <Link
                                to={superAdmin ? `/ EnquiryDetials / ${data?.payment_history?.enquiry_Id} ` : outletManagerStore ? ` / OutletEnquiryDetials / ${data?.payment_history?.enquiry_Id} ` : ` / EnquiryDetials / ${data?.payment_history?.enquiry_Id} `}
                                state={{
                                  data: data?.payment_history?.enquiry_Id,
                                  category: data?.products,
                                  icPerson: `${data?.user?.firstName} ${data?.user?.lastName} `,
                                }
                                }
                                className={"enq"}>
                                {data?.payment_history?.enquiryId}
                              </Link>
                            </td>
                            <td>{data?.payment_history?.customerId}</td>
                            <td>{data?.payment_id}</td>
                            <td>{moment(data?.createdAt).format("DD-MM-YYYY hh:mm")}</td>
                            <td>₹ {data?.paid_amount}</td>
                            <td>{data?.ax_status ? "Updated" : "Not Updated"}</td>
                            <td>{data?.status}</td>

                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
                <div ref={myRef} id="scroll"></div>
                {/* <PaginationComponent
                      totalPage={totalPage}
                      currentPage={currentPage}
                      setCallApi={(val) => setCallApi(val)}
                      setCurrentPage={(val) => setCurrentPage(val)}
                      handlePageClick={handlePageClick}
                    /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  </>)
}
export default PaymentLinkComponent;