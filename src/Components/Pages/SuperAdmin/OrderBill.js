import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Loader from "../../Common/Loader";
import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";
import { GetDataWithToken } from "../../ApiHelper/ApiHelper";
import { useNavigate } from "react-router-dom";

const OrderBill = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [OrderData, setOrderData] = useState([]);
  const [totalPage, settotalPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { ref: myRef, inView: visibleElement } = useInView();
  useEffect(() => {
    if (visibleElement) {
      // setCallApi(true);
      // setIsLoading2(true);
    }
    setIsLoading(true);
    // if (visibleElement) {
    GetDataWithToken(`order/get-order-bills?searchData=1&pageSize=10&pageNumber=${currentPage}
      `)
      .then((response) => {
        if (response.status === true) {
          settotalPage(response?.data?.length > 0 && Math?.ceil(response?.total / 10));

          // setCallApi(false);
          setOrderData(prevData => [...prevData, ...response.data?.rows]);
          currentPage <= totalPage && setCurrentPage((prevPage) => prevPage + 1);
          console.log('currennnntttttt', currentPage)
          setIsLoading(false);
          // setIsLoading2(false);
        }
        // setIsLoading2(false);
        setIsLoading(false);
      })
    // }
  }, [visibleElement])

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
      className="show">
      <SuperAdminHeader />
      <SuperAdminSidebar />
      <div className="content-body">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <div className="col-lg-3">
                    <h4 className="card-title">Orders</h4>
                  </div>
                  {/* <div className="col-lg-7 d-flex">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search"
                    onChange={(e) => {
                      setSearchData(e.target.value);
                    }}
                    />

                    <button className="btn btn-primary ms-2" onClick={searchDataHandler}
                    >Search
                    </button>
                    <div className="col-lg-2 d-flex">
                      <button className="btn btn-primary ms-2"

                      onClick={modalToggle}
                      >
                        <i className="fa fa-filter"></i>
                      </button>


                    </div>
                  </div> */}

                </div>
                <div className="mt-2">
                  <div className="table-responsive">
                    <table
                      id="example4"
                      className="table card-table display mb-4 shadow-hover table-responsive-lg"
                      style={{ minWidth: "845px" }}
                    >
                      <thead>
                        <tr>
                          <th>Customer ID</th>
                          <th>Enquiry ID</th>
                          <th>Order Bills</th>
                          <th>Orders</th>


                        </tr>
                      </thead>
                      <tbody>
                        {isLoading && <Loader />}
                        {OrderData && OrderData?.length == 0 ? (
                          <h3
                            style={{
                              position: "absolute",
                              left: "40%",
                              padding: "10px",
                            }}
                          >
                            No data found
                          </h3>
                        ) : OrderData?.map((data, index) =>
                          < tr >
                            <td>{data?.customerId}</td>
                            {/* <td>{
                                  moment(data?.InvoiceDate)?.format("DD/MM/YYYY")

                                }</td> */}
                            <td>{data?.enquiryId}</td>
                            <td>{data?.order_bills?.length}</td>
                            <td>{data?.orders?.length}</td>
                            <td>
                              <button className="btn btn-primary"
                                onClick={() => {
                                  navigate("/order-bill-detail", {
                                    state: {
                                      data: data
                                    }
                                  })
                                }}
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
                {OrderData?.length > 0 && currentPage <= totalPage && <div ref={myRef} id="scroll"></div>}
                {isLoading && currentPage > 1 && <h3 style={{ textAlign: 'center' }}>Loading...</h3>}
              </div>
            </div>


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
  </>)
};

export default OrderBill;