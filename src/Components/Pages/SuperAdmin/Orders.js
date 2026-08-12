import { useEffect, useState } from "react";
import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";
import Loader from "../../Common/Loader";
import PaginationComponent from "../../Common/PaginationComponent";
import {
  Nav,
  NavItem,
  NavLink,
  TabContent, TabPane
} from 'reactstrap';
import { useNavigate } from "react-router-dom";
import { GetDataWithToken } from "../../ApiHelper/ApiHelper";
import OrdersModal from "../../Common/OrdersModal";
import moment from "moment";
import { useInView } from "react-intersection-observer";


function Orders() {
  const navigate = useNavigate();
  const [tabOpen, setTabOpen] = useState("1");
  const [callApi, setCallApi] = useState(true);
  const [orderData, setOrderData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoading2, setIsLoading2] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, settotalPage] = useState(10);
  const [statusCode, setStatusCode] = useState('CONFIRMED');
  const [searchData, setSearchData] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [customerCode, setCustomerCode] = useState('');
  const [deliveryName, setDeliveryName] = useState('');
  const { ref: myRef, inView: visibleElement } = useInView();

  const [date, setDate] = useState({
    fromDate: '',
    toDate: '',
  });

  const modalToggle = () => setOpenModal(!openModal);

  // const handlePageClick = (e, index) => {
  //     e.preventDefault();
  //     setCurrentPage(index + 1);
  //     setCallApi(true);
  //     setOrderData([]);
  //     setIsLoading(true);
  // };

  const searchHandler = () => {
    setCurrentPage(1);
    setOrderData([]);
    setCallApi(true);
    setIsLoading(true);
  }

  const setTabValue = (value) => {
    setTabOpen(value);
    value === '2' ? setStatusCode('NOT-CONFIRMED') : setStatusCode('CONFIRMED');
    setCallApi(true);
    setOrderData([]);
    setIsLoading(true);
    setCurrentPage(1);
  }

  let fromDate = date?.fromDate ? moment(date?.fromDate, "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")?.format("YYYY-MM-DD") : '';
  let toDate = date?.toDate ? moment(date?.toDate, "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")?.format("YYYY-MM-DD") : '';

  useEffect(() => {
    if (visibleElement) {
      // setCallApi(true);

      setIsLoading2(true);
    }
    if (callApi || visibleElement) {
      GetDataWithToken(`superadmin/sales-orders/?page=${currentPage}&pageSize=10&statusCode=${statusCode}&customerCode=${customerCode}&fromDate=${fromDate}&toDate=${toDate}&searchText=${searchData}&deliveryName=${deliveryName}`)
        .then((response) => {
          if (response.status === true) {
            setOrderData(prevData => [...prevData, ...response?.data]);
            // setOrderData(response.data);
            setCallApi(false);
            setIsLoading(false);
            settotalPage(response?.data?.length > 0 && Math?.ceil(response?.totalCount / 10));
            currentPage <= totalPage && setCurrentPage((prevPage) => prevPage + 1);
            setIsLoading2(false);
          }
          setIsLoading(false);
          setIsLoading2(false);
        })
    }
  }, [callApi, visibleElement]);

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
                      <h4 className="card-title">ORDERS</h4>
                    </div>
                    <div className="col-lg-7 d-flex">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search"
                        onChange={(e) => setSearchData(e.target.value)}
                      />
                      <button className="btn btn-primary ms-2" onClick={searchHandler}>Search
                      </button>
                      <div className="col-lg-2 d-flex">
                        <button className="btn btn-primary ms-2" onClick={modalToggle}>
                          <i className="fa fa-filter"></i>
                        </button>
                      </div>
                    </div>

                  </div>
                  <div>
                    <Nav tabs>
                      <NavItem>
                        <NavLink
                          className={tabOpen === "1" ? "active" : ""}
                          onClick={() => setTabValue('1')}
                        >
                          CONFIRMED
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={tabOpen === "2" ? "active" : ""}
                          onClick={() => setTabValue('2')}
                        >
                          NOT-CONFIRMED
                        </NavLink>
                      </NavItem>
                    </Nav>
                    <TabContent activeTab={tabOpen}>
                      <TabPane tabId="1">
                        <div className="table-responsive">
                          <table
                            id="example4"
                            className="table card-table display mb-4 shadow-hover table-responsive-lg"
                            style={{ minWidth: "845px" }}
                          >
                            <thead>
                              <tr>

                                <th>Code</th>
                                <th>Date</th>
                                <th>Name</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {isLoading && <Loader />}

                              {orderData && orderData?.length == 0 ? (
                                <h3
                                  style={{
                                    position: "absolute",
                                    left: "40%",
                                    padding: "10px",
                                  }}
                                >
                                  No data found
                                </h3>
                              ) : orderData?.map((data, index) =>
                                <tr>

                                  <td>{data?.Code}</td>
                                  <td>{moment(data?.OrderDate)?.format("DD/MM/YYYY")}</td>
                                  <td>
                                    {data?.DeliveryName}
                                  </td>
                                  <td>
                                    <button className="btn btn-primary" onClick={() => navigate("/order-detail", {
                                      state: {
                                        orderId: data?.Code,
                                      }
                                    })}>

                                      View

                                    </button>
                                  </td>
                                </tr>)}
                            </tbody>
                          </table>
                        </div>
                      </TabPane>
                      <TabPane tabId="2">
                        <div className="table-responsive">
                          <table
                            id="example4"
                            className="table card-table display mb-4 shadow-hover table-responsive-lg"
                            style={{ minWidth: "845px" }}
                          >
                            <thead>
                              <tr>

                                <th>Code</th>
                                <th>Date</th>
                                <th>Name</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {isLoading && <Loader />}
                              {orderData && orderData?.length == 0 ? (
                                <h3
                                  style={{
                                    position: "absolute",
                                    left: "40%",
                                    padding: "10px",
                                  }}
                                >
                                  No data found
                                </h3>
                              ) : orderData?.map((data, index) =>
                                <tr>

                                  <td>{data?.Code}</td>
                                  <td>{moment(data?.OrderDate)?.format("DD/MM/YYYY")
                                    // data?.OrderDate?.split('T')?.[0]
                                  }
                                  </td>
                                  <td> {data?.DeliveryName}
                                  </td>
                                  <td>
                                    <button className="btn btn-primary" onClick={() => navigate("/order-detail", {
                                      state: {
                                        orderId: data?.Code,
                                      }
                                    })} >
                                      View
                                    </button>
                                  </td>
                                </tr>)}
                            </tbody>
                          </table>
                        </div>
                      </TabPane>
                    </TabContent>
                  </div>
                </div>
                {orderData?.length > 0 && currentPage <= totalPage && <div ref={myRef} id="scroll"></div>}

              </div>
              {isLoading2 && currentPage > 1 && <h3 style={{ textAlign: 'center' }}>Loading...</h3>}
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
      <OrdersModal
        openModal={openModal}
        modalToggle={modalToggle}
        setCustomerCode={setCustomerCode}
        customerCode={customerCode}
        mainCallApi={setCallApi}
        setDate={setDate}
        date={date}
        setDeliveryName={setDeliveryName}
        deliveryName={deliveryName}
        setIsLoading={setIsLoading}
        setMainData={setOrderData}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}
export default Orders;