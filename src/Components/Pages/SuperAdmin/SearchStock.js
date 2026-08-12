import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";
import { GetDataWithToken, serverUrl } from "../../ApiHelper/ApiHelper";
import PaginationComponent from "../../Common/PaginationComponent";
import Loader from "../../Common/Loader";
import SearchStockModal from "../../Common/SearchStockModal";
import { useInView } from 'react-intersection-observer';
import {
  Nav,
  NavItem,
  NavLink,
  TabContent, TabPane
} from 'reactstrap';
import _ from "lodash";
import axios from "axios";


function SearchStock() {

  const { ref: myRef, inView: visibleElement } = useInView();
  // const [visibleElement1, setVisibleElement1] = useState();
  // setVisibleElement1(visibleElement);
  const navigate = useNavigate();
  const [tabOpen, setTabOpen] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPage, settotalPage] = useState(1);
  const [data, setdata] = useState([]);
  const [callApi, setCallApi] = useState(true);
  const [searchData, setSearchData] = useState('');
  const [searchBrandData, setSearchBrandData] = useState('');
  const [searchCollectionData, setSearchCollectionData] = useState('');
  const [searchStockModalOpen, setSearchStockModalOpen] = useState(false);
  const [catagoryData, setCategoryData] = useState([]);
  const [categoryCode, setCategoryCode] = useState('FABRIC');
  const [isLoading2, setIsLoading2] = useState(false);
  const modalToggle = () => setSearchStockModalOpen(!searchStockModalOpen);


  const setTabValue = (value, code) => {
    setTabOpen(value);
    setCategoryCode(code);
    setCallApi(true);
    setIsLoading(true);
    setdata([]);
    setCurrentPage(1);
  }

  // const handlePageClick = (e, index) => {
  //   e.preventDefault();
  //   setCurrentPage(index + 1);
  //   setCallApi(true);
  //   setIsLoading(true);
  //   setdata([]);
  // };

  const handleInputChange = (e) => {
    setSearchData(e.target.value);
  }

  const submitSearchData = () => {
    setCurrentPage(1);
    setdata([]);
    setIsLoading(true);
    setCallApi(true);
  }

  const DownloadReportHandler = () => {
    // setLoadingData(true);

    // http://203.115.102.6:6696/api/v1/superadmin/items-excel
    axios({
      url: `${serverUrl}superadmin/items-excel?name=${searchData}&brandCode=${searchBrandData}&categoryCode=${categoryCode}&collectionCode=${searchCollectionData}`,
      method: "GET",
      responseType: "blob", // important
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "file.xls"); //or any other extension
      document.body.appendChild(link);
      link.click();
      // setLoadingData(false);
    });
  };





  useEffect(() => {

    if (visibleElement) {
      // setCallApi(true);
      setIsLoading2(true);
    }
    if (callApi || visibleElement) {
      GetDataWithToken(`superadmin/stock-item-list?name=${searchData}&brandCode=${searchBrandData}&page=${currentPage}&pageSize=10&categoryCode=${categoryCode}&collectionCode=${searchCollectionData}`).then(
        (response) => {
          if (response.status === true) {
            setCallApi(false);
            setdata(prevData => [...prevData, ...response?.data]);
            // setdata([...response?.data]);
            settotalPage(response?.total && Math?.ceil(response?.total / 10));
            currentPage <= totalPage && setCurrentPage((prevPage) => prevPage + 1);
            setIsLoading(false);
            setIsLoading2(false);
          }
          setIsLoading(false);
          setIsLoading2(false);
        }
      );
    }
    if (callApi) {
      GetDataWithToken('superadmin/get-category').then(response => {
        if (response.status === true) {
          setCategoryData(response.data);
        }
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
                    <div>
                      <h4 className="card-title">Search stock</h4>
                    </div>
                    <div className="d-flex col-lg-6 no-wrap ">
                      <div className="col-lg-8 d-flex mx-2 ">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search"
                          onChange={handleInputChange}
                        />
                        <button className="btn btn-primary ms-2" onClick={submitSearchData}>Search
                        </button>
                      </div>
                      <div className="d-flex">
                        <button className="btn btn-primary p-3 " onClick={modalToggle}>
                          <span >
                            <i className="fa fa-filter"></i>
                          </span>

                        </button>
                      </div>
                      <div className="col-lg-2 d-flex ms-2">
                        <button className="btn btn-primary p-3" onClick={DownloadReportHandler}>
                          <span >
                            <i className="fa fa-download"></i>
                          </span>
                        </button>
                      </div>
                    </div>

                  </div>
                  <div className="mt-2">
                    <Nav tabs>
                      {catagoryData?.map((data, index) =>
                        <NavItem>
                          <NavLink
                            className={tabOpen === index + 1 ? "active" : ""}
                            onClick={() => setTabValue(index + 1, data?.CODE)}
                          >
                            {data?.NAME}
                          </NavLink>
                        </NavItem>
                      )}
                    </Nav>
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
                    ) :
                      (< TabContent activeTab={tabOpen}>
                        <TabPane tabId={tabOpen}>
                          <div className="table-responsive">
                            <table
                              className="table card-table display mb-4 shadow-hover table-responsive-lg"
                              style={{ minWidth: "845px" }}
                            >
                              <thead>
                                <tr>

                                  <th>Code</th>
                                  <th>Name</th>
                                  <th>Qty inv</th>
                                  <th>Pieces</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {data?.map((data, index) => (
                                  <tr>
                                    <td>{data?.ITEMID}</td>
                                    <td>{data?.Name}</td>
                                    <td>{data?.QtyInv && +data?.QtyInv.toFixed(2)}</td>
                                    <td>{data?.BatchCount > 0 ? data?.BatchCount : 0}</td>
                                    <td>
                                      <button className="btn btn-primary" onClick={() => navigate("/search-item-detail", {
                                        state: {
                                          itemId: data?.ITEMID,
                                          brandCode: data?.brandCode

                                        }
                                      })}>
                                        View
                                      </button>
                                    </td>

                                  </tr>
                                ))}
                              </tbody>
                            </table >

                            {/* <Loader />  */}
                          </div>
                        </TabPane>
                      </TabContent>)}
                  </div>
                  {data?.length > 0 && currentPage <= totalPage && <div ref={myRef} id="scroll"></div>}
                </div>
              </div>
            </div>

            {isLoading2 && currentPage > 1 && <h3 style={{ textAlign: 'center' }} >Loading...</h3>}
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
      <SearchStockModal
        modalToggle={modalToggle}
        modalOpen={searchStockModalOpen}
        setSearchBrandData={setSearchBrandData}
        searchBrandData={searchBrandData}
        mainSetCallApi={setCallApi}
        setSearchCollectionData={setSearchCollectionData}
        searchCollectionData={searchCollectionData}
        categoryCode={categoryCode}
        setIsLoading={setIsLoading}
        setMainData={setdata}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}
export default SearchStock;