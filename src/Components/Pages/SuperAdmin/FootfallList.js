import { useEffect, useState } from "react";
import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";
import { GetDataWithToken, serverUrl } from "../../ApiHelper/ApiHelper";
import { Link } from "react-router-dom";
import DashboardFilterModal from "../../Common/DashboardFilterModal";
import moment from "moment";
import axios from "axios";
const FootfallList = () => {
  const [clientList, setClientList] = useState([]);
  const [footfallDashboard, setFootfallDashboard] = useState({});
  const ListHeading = ["Client Name", "category", "Customer Group", "Customer Type", "Mobile Number", "Query Register", "Action"];
  const [openDateModal, setOpenDateModal] = useState(false);
  const [storeList, setStoreList] = useState([]);
  const modalDateToggle = () => { setOpenDateModal(!openDateModal) };
  const [storeName, setStoreName] = useState();
  const [storeId, setStoreId] = useState("");
  const [modalCallApi, setModalCallApi] = useState(false);
  const [salesPersonId, setSalesPersonId] = useState("");
  const [salesPerson, setSalesPerson] = useState();
  const [mainDashboardCallApi, setMainDashboardCallApi] = useState(true);
  const [date, setDate] = useState({
    fromDate: moment(new Date())?.subtract(1, 'month'),
    toDate: moment(new Date()),
  });

  useEffect(() => {
    GetDataWithToken("customer/get-client").then((response) => {
      if (response.status === true) {
        setClientList(response.data);
      }
    })
    GetDataWithToken(`superadmin/get-outlet`)
      .then(response => {
        if (response.status === true) {
          setStoreList(response.data);
          // console.log(response.data);
        }
      })
  }, [])

  useEffect(() => {
    getFootfallDashboard();
  }, [storeId])

  const downloadReportHandler = () => {
    axios({
      url: `${serverUrl}customer/walkin-report?storeId=${storeId}`,
      method: "GET",
      responseType: "blob", // important
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "FootfallReport.xls"); //or any other extension
      document.body.appendChild(link);
      link.click();
      // setLoadingData(false);
    });
  }

  const getFootfallDashboard = () => {

    let startDate = date?.fromDate?.startOf('day').format('YYYY-MM-DD HH:mm:ss');
    let endDate = date?.toDate?.endOf('day').format('YYYY-MM-DD HH:mm:ss');

    GetDataWithToken(`customer/walkin-dashboard?fromDate=${startDate}&toDate=${endDate}&storeId=${storeId}&salesPersonId=${salesPersonId}`).then((response) => {
      if (response.status === true) {
        setFootfallDashboard(response.data);
      }
    })
  }

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
        className="show"
      >
        <SuperAdminHeader />
        <SuperAdminSidebar />

        <div className="content-body">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-12">
                <div className="card">
                  <div className="card-header" >
                    <h4 className="fs-20">Footfall Dashboard</h4>
                    <div>
                      <button className="btn btn-primary" onClick={downloadReportHandler}>Download</button>
                    </div>
                  </div>
                  <div className="card-header border-0 d-flex">
                    <div>
                      <label>Select Store</label>
                      <select className="form-control" onChange={(e) => {
                        setStoreId(e.target.value);
                      }} >
                        <option value={""}>All Store</option>
                        {storeList?.map((data) =>
                          <option value={data?.id}>
                            {data?.firstName} {data?.lastName}
                          </option>)}
                      </select>
                    </div>
                    <div>
                      <button className="btn btn-primary mx-5" onClick={modalDateToggle}>Filter</button>
                    </div>



                  </div>
                  <div>
                    <ul class="list-group list-group-flush p-4">
                      <li class="list-group-item d-flex justify-content-between">
                        <strong>Total Client</strong>
                        <span>{footfallDashboard?.total_client}</span>
                      </li>
                      <li class="list-group-item d-flex justify-content-between">
                        <strong>New Customer</strong>
                        <span>{footfallDashboard?.customer_type?.new_customer}</span>
                      </li>
                      <li class="list-group-item d-flex justify-content-between">
                        <strong>Repeat Customer</strong>
                        <span>{footfallDashboard?.customer_type?.repeat_customer}</span>
                      </li>
                      <li class="list-group-item d-flex justify-content-between">
                        <strong>retail_customer</strong>
                        <span>{footfallDashboard?.customer_group?.retail_customer}</span>
                      </li><li class="list-group-item d-flex justify-content-between">
                        <strong>Int Arch Customer</strong>
                        <span>{footfallDashboard?.customer_group?.int_arch_customer}</span>
                      </li>

                      <li class="list-group-item d-flex justify-content-between">
                        <strong>Customer Followup</strong>
                        <span>{footfallDashboard?.customer_status?.customer_followUp}</span>
                      </li>
                      <li class="list-group-item d-flex justify-content-between">
                        <strong>Customer Loss</strong>
                        <span>{footfallDashboard?.customer_status?.customer_loss}</span>
                      </li>
                      <li class="list-group-item d-flex justify-content-between">
                        <strong>Customer Win</strong>
                        <span>{footfallDashboard?.customer_status?.customer_win}</span>
                      </li>
                      <li class="list-group-item d-flex justify-content-between">
                        <strong>Followup 1</strong>
                        <span>{footfallDashboard?.followUp?.followUp2}</span>
                      </li>
                      <li class="list-group-item d-flex justify-content-between">
                        <strong>Followup 2</strong>
                        <span>{footfallDashboard?.followUp?.followUp2}</span>
                      </li>
                      <li class="list-group-item d-flex justify-content-between">
                        <strong>Followup 3</strong>
                        <span>{footfallDashboard?.followUp?.followUp3}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-12">
                <div className="card">
                  <div className="card-header border-0">
                    <h4 className="fs-20">Footfall List</h4>
                    <div className="newest ms-3">
                      {/* <input type="dat
                      e" className="default-select"  /> */}
                    </div>
                  </div>
                  <div>
                    <div className="table-responsive">
                      <table
                        className="table card-table display mb-4 shadow-hover table-responsive-lg"
                        id="guestTable-all"
                      >
                        <thead>
                          <tr>
                            {ListHeading?.map((data) => <th>{data}</th>)}
                          </tr>
                        </thead>
                        <tbody>
                          {clientList?.map((data) => <tr>
                            <td>{data?.clientName}</td>
                            <td>{data?.category && JSON.parse(data?.category)?.map((data, index) => <p className="p-0 m-0">{index + 1}. {data}</p>)}</td>
                            <td>{data?.customerGroup}</td>
                            <td>{data?.customerType}</td>
                            <td>{data?.mobileNo}</td>
                            <td>{data?.query_register}</td>
                            <td><Link
                              to="/footfall-detail"
                              state={data}
                              className="btn btn-primary">View</Link
                            ></td>
                          </tr>)}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DashboardFilterModal
        openModal={openDateModal}
        modalToggle={modalDateToggle}
        date={date}
        setDate={setDate}
        setStoreName={setStoreName}
        setStoreId={setStoreId}
        storeName={storeName}
        setModalCallApi={setModalCallApi}
        // enquiryFilter="enquiryFilter"
        setSalesPersonId={setSalesPersonId}
        salesPerson={salesPerson}
        setSalesPerson={setSalesPerson}
        setMainData={setFootfallDashboard}
        // setIsLoading={setisLoading}
        setMainCallApi={getFootfallDashboard}
      // setCurrentPage={setCurrentPage}
      />
    </>
  )
}
export default FootfallList;