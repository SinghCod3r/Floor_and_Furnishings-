import { useEffect, useState } from "react";
import DateModal from "../../Common/DateModal";
import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";
import { GetDataWithToken } from "../../ApiHelper/ApiHelper";
import PaginationComponent from "../../Common/PaginationComponent";
import Loader from "../../Common/Loader";
import OrdersModal from "../../Common/OrdersModal";
import moment from "moment";
import { useInView } from "react-intersection-observer";

function CustomerLedger() {
  const [dateModal, setDateModal] = useState(false);
  const dateToggle = () => setDateModal(!dateModal);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, settotalPage] = useState(10);
  const [data, setdata] = useState([]);
  const [callApi, setCallApi] = useState(true);
  const [searchData, setSearchData] = useState('');
  const [customerId, setCustomerId] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoading2, setIsLoading2] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [customerCode, setCustomerCode] = useState('');
  const { ref: myRef, inView: visibleElement } = useInView();
  const [date, setDate] = useState({
    fromDate: '',
    toDate: '',
  });
  const modalToggle = () => setOpenModal(!openModal);

  const showLegerDetail = (data) => {
    setCustomerId(data);
    console.log('show date');
    dateToggle();
  };

  // const handlePageClick = (e, index) => {
  //   e.preventDefault();
  //   setCurrentPage(index + 1);
  //   setCallApi(true);
  //   setdata([]);
  //   setIsLoading(true);

  // };

  const handleSearch = () => {
    setCurrentPage(1);
    setCallApi(true);
    setdata([]);
    setIsLoading(true);
  }

  let fromDate = date?.fromDate ? moment(date?.fromDate, "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")?.format("YYYY-MM-DD") : '';
  let toDate = date?.toDate ? moment(date?.toDate, "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")?.format("YYYY-MM-DD") : '';

  useEffect(() => {
    if (visibleElement) {
      // currentPage<=totalPage&&setCurrentPage((prevPage) => prevPage + 1);
      // currentPage<=totalPage&&
      setIsLoading2(true);
      // setCallApi(true);
    }
    if (callApi || visibleElement) {
      GetDataWithToken(`superadmin/customer?searchText=${searchData}&page=${currentPage}&pageSize=10&fromDate=${fromDate}&toDate=${toDate}&customerCode=${customerCode}`).then(
        (response) => {
          if (response.status === true) {
            setIsLoading2(false);
            setCallApi(false);
            setdata(prevData => [...prevData, ...response?.data]);
            settotalPage(response?.data?.length > 0 && Math?.ceil(response?.data?.[0]?.TotalCount / 10));
            currentPage <= totalPage && setCurrentPage(prevPage => prevPage + 1);
            setIsLoading(false);
          }
          setIsLoading(false);
          setIsLoading2(false);
        }
      );
    }
  }, [callApi, visibleElement])

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
                      <h4 className="card-title">Customer Ledger</h4>
                    </div>
                    <div className="col-lg-7 d-flex">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search"
                        onChange={(e) => setSearchData(e.target.value)}
                      />
                      <button className="btn btn-primary ms-2 py-1" onClick={handleSearch}>Search
                      </button>
                      <button className="btn btn-primary ms-3 py-1" onClick={modalToggle}>
                        <i className="fa fa-filter"></i>
                      </button>
                      <button className="btn btn-primary ms-3 py-1" >
                        <i className="fa fa-download"></i>
                      </button>
                    </div>
                  </div>
                  <table
                    id="example4"
                    className="table card-table display mb-4 shadow-hover table-responsive-lg"
                    style={{ minWidth: "845px" }}
                  >
                    <thead>
                      <tr>

                        <th>CUSTOMER NAME</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {isLoading && <Loader />}
                      {data && data?.length == 0 ? (
                        <h3
                          style={{
                            position: "absolute",
                            left: "40%",
                            padding: "10px",
                          }}
                        >
                          No data found
                        </h3>
                      ) : data?.map((data) => <tr>
                        <td>{data?.NAME}</td>
                        <td >
                          <button className="btn btn-primary" onClick={() => showLegerDetail(data?.ACCOUNTNUM)}>
                            View
                          </button>
                        </td>
                      </tr>)}
                    </tbody>
                    {data?.length > 0 && currentPage <= totalPage && <div ref={myRef} id="scroll"></div>}
                  </table>
                </div>
              </div>
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
      <DateModal dateModal={dateModal} dateToggle={dateToggle} customerId={customerId} />
      <OrdersModal
        openModal={openModal}
        modalToggle={modalToggle}
        setCustomerCode={setCustomerCode}
        mainCallApi={setCallApi}
        setDate={setDate}
        date={date}
        ledger={'ledger'}
        setIsLoading={setIsLoading}
        setMainData={setdata}
        setCurrentPage={setCurrentPage}
      />

    </>
  );
}
export default CustomerLedger;