import { useLocation } from "react-router-dom";
import { GetDataWithToken } from "../../ApiHelper/ApiHelper";
import { useState, useEffect } from "react";
import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";
import {
    Nav,
    NavItem,
    NavLink,
    TabContent, TabPane, Row, Col, Table
} from 'reactstrap';
import moment from "moment";


function ItemDetails() {
    const location = useLocation();
    const [tabOpen, setTabOpen] = useState("1");
    const [tabOpen2, setTabOpen2] = useState("3");
    const [detailsData, setDetailsData] = useState();
    const [companyCode, setCompanyCode] = useState('ffg');
    const [tableData, setTableData] = useState({});
    const [callApi, setCallApi] = useState(true);
    const [callApi2, setCallApi2] = useState(false);
    const [isErrorImage, setIsErrorImage] = useState(false);
    const [alternateData, setAlternateData] = useState([]);
    const [searchData, setSearchData] = useState('');
    const [openAlternateTab, setOpenAlternateTab] = useState(false);
    const [altData, setAltData] = useState();
    const setTabValue = (value) => {
        setTabOpen(value);
    };

    const setTabValue2 = (value) => {
        setTabOpen2(value);
    };

    const submitSearchData = () => {
        setCallApi2(true);
    }


    useEffect(() => {

        if (callApi) {
            GetDataWithToken(`superadmin/stock-item-details?code=${altData ? altData : location?.state?.itemId}&companyCode=${companyCode}`).then(
                (response) => {
                    if (response.status === true) {
                        console.log('details dataaa', response?.data)
                        setDetailsData(response?.data);
                        setCallApi(false);
                    }
                    setCallApi(false);
                }
            );
        }
        if (callApi) {
            GetDataWithToken(`superadmin/stock-common-details/${altData ? altData : location?.state?.itemId}`)
                .then((response) => {
                    if (response.status === true) {
                        setTableData(response?.data);
                    }
                })
        }
        if (callApi2) {
            GetDataWithToken(`superadmin/get-alternate-items?&code=${altData ? altData : location?.state?.itemId}&productLook=${detailsData?.ProductLook}&categoryCode=${detailsData?.CategoryCode}&colorCode=${detailsData?.Color}&searchText=${searchData}`)
                .then((response) => {
                    if (response.status === true) {
                        setCallApi2(false);
                        setAlternateData(response.data);
                    }
                })
        }
    }, [callApi, callApi2]);

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
                {!openAlternateTab && <div className="content-body">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-header">
                                        <div className="col-lg-3">
                                            <h4 className="card-title">Item details</h4>
                                        </div>
                                    </div>
                                    <div class="row p-3" >
                                        <div class="col-lg-6 p-5 flex-column justify-content-center align-items-center">
                                            <div
                                            // style={{ marginLeft: '10%', marginTop: '10%' }}
                                            >
                                                <div>
                                                    {detailsData?.ITEMID && !isErrorImage && <img src=
                                                        {`http://trade.fandf.in/Images/Items/${detailsData?.ITEMID}.jpg`}
                                                        alt="no image found" onError={(e) => {
                                                            console.log('abfbababababababababababababab', e);
                                                            setIsErrorImage(true);
                                                            // e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Example_image.png'
                                                        }} width="50%" />}
                                                    {isErrorImage && <div style={{ border: "4px solid gray", borderRadius: '50%', padding: '4rem', textAlign: 'center', width: '60%' }} >
                                                        <h1 style={{ color: 'gray' }}>NO IMAGE FOUND</h1>
                                                    </div>}
                                                </div>

                                            </div>
                                            <button className="btn btn-primary my-2 mx-5" onClick={() => { setOpenAlternateTab(true); setCallApi2(true); }}>Find alternate items
                                            </button>
                                        </div>

                                        <div class="col-lg-6">
                                            <ul class="list-group list-group-flush my-2">
                                                <li>
                                                    <h1 className="card-title my-2">Macaron Ivory</h1>
                                                    <div className="my-2">
                                                        <strong>PRODUCT CODE:</strong>
                                                        <span class="mx-3">{detailsData?.ITEMID}</span>
                                                    </div>
                                                    <div className="my-2">
                                                        <strong>SEARCH NAME:</strong>
                                                        <span class="mx-2">{detailsData?.SearchName}</span>
                                                    </div >
                                                    <div className="my-2">
                                                        <strong>CURRENT STOCK:</strong>
                                                        <span class="mx-2">{detailsData?.QtyInv && +detailsData?.QtyInv?.toFixed(2)}</span>
                                                    </div>
                                                </li>
                                            </ul>
                                            <Nav tabs >
                                                <NavItem >
                                                    <NavLink
                                                        className={tabOpen === "1" ? "active" : ""}
                                                        onClick={() => {
                                                            setTabValue('1');
                                                            setCompanyCode('ffg');
                                                            setCallApi(true);
                                                        }}
                                                    >
                                                        FFG
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink
                                                        className={tabOpen === "2" ? "active" : ""}
                                                        onClick={() => {
                                                            setTabValue('2')
                                                            setCompanyCode('ffi');
                                                            setCallApi(true);
                                                        }}
                                                    >
                                                        FFI
                                                    </NavLink>
                                                </NavItem>
                                            </Nav>
                                            <TabContent activeTab={tabOpen}>
                                                <TabPane tabId="1">
                                                    <ul>
                                                        <li class="list-group-item d-flex justify-content-between">
                                                            <strong> Item family code:</strong>
                                                            <span class="mb-0">{detailsData?.ItemFamilyCode}</span>
                                                        </li>
                                                        <li class="list-group-item d-flex justify-content-between">

                                                            <strong>Reserved Qty:</strong>
                                                            <span class="mb-0">{detailsData?.QtySO && +detailsData?.QtySO?.toFixed(2)}</span>
                                                        </li>
                                                        <li class="list-group-item d-flex justify-content-between">

                                                            <strong>Current Available:</strong>
                                                            <span class="mb-0">{detailsData?.QtyFree}</span>
                                                        </li>
                                                        <li class="list-group-item d-flex justify-content-between">

                                                            <strong>Vendor Group:</strong>
                                                            <span class="mb-0">{detailsData?.VendorGroup}</span>
                                                        </li>
                                                        <li class="list-group-item d-flex justify-content-between">

                                                            <strong>Primary vendor:</strong>
                                                            <span class="mb-0">{detailsData?.VendorName}</span>
                                                        </li> <li class="list-group-item d-flex justify-content-between">

                                                            <strong>Contact No:</strong>
                                                            <span class="mb-0">{detailsData?.ContactNo}</span>
                                                        </li>
                                                        <li class="list-group-item d-flex justify-content-between">
                                                            <strong>External Item No:</strong>
                                                            <span class="mb-0">{detailsData?.ExternalItemId}</span>
                                                        </li>
                                                        <li class="list-group-item d-flex justify-content-between">

                                                            <strong>Purchase Price:</strong>
                                                            <span class="mb-0">{detailsData?.PurchasePrice && +detailsData?.PurchasePrice?.toFixed(2)}</span>
                                                        </li>
                                                        <li class="list-group-item d-flex justify-content-between">
                                                            <strong>MRP:</strong>
                                                            <span class="mb-0">{detailsData?.MRP && +detailsData?.MRP?.toFixed(2)}</span>
                                                        </li>
                                                    </ul>
                                                </TabPane>
                                                <TabPane tabId="2">
                                                    <ul>
                                                        <li class="list-group-item d-flex justify-content-between ">
                                                            <strong> Item family code:</strong>
                                                            <span class="mb-0">{detailsData?.ItemFamilyCode}</span>
                                                        </li>
                                                        <li class="list-group-item d-flex justify-content-between">

                                                            <strong>Reserved Qty:</strong>
                                                            <span class="mb-0">{detailsData?.QtySO && +detailsData?.QtySO?.toFixed(2)}</span>
                                                        </li>
                                                        <li class="list-group-item d-flex justify-content-between">

                                                            <strong>Current Available:</strong>
                                                            <span class="mb-0">0</span>
                                                        </li>
                                                        <li class="list-group-item d-flex justify-content-between">

                                                            <strong>Vendor Group:</strong>
                                                            <span class="mb-0">{detailsData?.VendorGroup}</span>
                                                        </li>
                                                        <li class="list-group-item d-flex justify-content-between">

                                                            <strong>Primary vendor:</strong>
                                                            <span class="mb-0">{detailsData?.VendorName}</span>
                                                        </li> <li class="list-group-item d-flex justify-content-between">

                                                            <strong>Contact No:</strong>
                                                            <span class="mb-0">{detailsData?.ContactNo}</span>
                                                        </li>
                                                        <li class="list-group-item d-flex justify-content-between">
                                                            <strong>External Item No:</strong>
                                                            <span class="mb-0">{detailsData?.ExternalItemId}</span>
                                                        </li>
                                                        <li class="list-group-item d-flex justify-content-between">

                                                            <strong>Purchase Price:</strong>
                                                            <span class="mb-0">{detailsData?.PurchasePrice && +detailsData?.PurchasePrice?.toFixed(2)}</span>
                                                        </li>
                                                        <li class="list-group-item d-flex justify-content-between">
                                                            <strong>MRP:</strong>
                                                            <span class="mb-0">{detailsData?.MRP && +detailsData?.MRP?.toFixed(2)}</span>
                                                        </li>
                                                    </ul>
                                                </TabPane>

                                            </TabContent>
                                            <Nav tabs className="mt-2">
                                                <NavItem>
                                                    <NavLink
                                                        className={tabOpen2 === "3" ? "active" : ""}
                                                        onClick={() => setTabValue2('3')}
                                                    >
                                                        PO DETAILS
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink
                                                        className={tabOpen2 === "4" ? "active" : ""}
                                                        onClick={() => setTabValue2('4')}
                                                    >
                                                        TECHNICAL DETAILS
                                                    </NavLink>
                                                </NavItem>
                                            </Nav>
                                            <TabContent activeTab={tabOpen2}>
                                                <TabPane tabId="3">
                                                    <ul>
                                                        <li class="list-group-item d-flex justify-content-between ">
                                                            <strong> Qty in PO:</strong>
                                                            <span class="mb-0">{detailsData?.QtyPO}</span>
                                                        </li>
                                                        <li class="list-group-item d-flex justify-content-between">

                                                            <strong>Expected:</strong>
                                                            <span class="mb-0">{detailsData?.DeliveryDate && moment(detailsData?.DeliveryDate)?.format('DD/MM/YYYY')}</span>
                                                        </li>  <li class="list-group-item d-flex justify-content-between ">
                                                            <strong> Bilty No:</strong>
                                                            <span class="mb-0">{detailsData?.BiltyNo}</span>
                                                        </li>
                                                        <li class="list-group-item d-flex justify-content-between">

                                                            <strong>Bilty Date:</strong>
                                                            <span class="mb-0">{detailsData?.BiltyDate && moment(detailsData?.BiltyDate)?.format('DD/MM/YYYY')}</span>
                                                        </li>  <li class="list-group-item d-flex justify-content-between ">
                                                            <strong> Transport:</strong>
                                                            <span class="mb-0">{detailsData?.Transport}</span>
                                                        </li>
                                                        <li class="list-group-item d-flex justify-content-between">

                                                            <strong>Status:</strong>
                                                            <span class="mb-0">{detailsData?.DeliveryStatus}</span>
                                                        </li>
                                                    </ul>
                                                </TabPane>
                                            </TabContent>
                                            <TabContent activeTab={tabOpen2}>
                                                <TabPane tabId="4">
                                                    <ul>
                                                        <li class="list-group-item d-flex justify-content-between ">
                                                            <strong>Reorder Qty:</strong>
                                                            <span class="mb-0">{detailsData?.ReorderQty}</span>
                                                        </li>
                                                        <li class="list-group-item d-flex justify-content-between">

                                                            <strong>Lead Period:</strong>
                                                            <span class="mb-0">{detailsData?.LeadPeriod}</span>
                                                        </li>
                                                        <li class="list-group-item d-flex justify-content-between ">
                                                            <strong>Repeat Vertical:</strong>
                                                            <span class="mb-0">{detailsData?.RepeatVertical}</span>
                                                        </li>
                                                        <li class="list-group-item d-flex justify-content-between">

                                                            <strong>Repeat Horizontal:</strong>
                                                            <span class="mb-0">{detailsData?.RepeatHorizontal}</span>
                                                        </li>  <li class="list-group-item d-flex justify-content-between ">
                                                            <strong> Width:</strong>
                                                            <span class="mb-0">{detailsData?.Width}</span>
                                                        </li>
                                                        <li class="list-group-item d-flex justify-content-between">

                                                            <strong>Length:</strong>
                                                            <span class="mb-0">{detailsData?.Length}</span>
                                                        </li>
                                                    </ul>
                                                </TabPane>
                                            </TabContent>

                                            {tableData?.Batches?.length > 0 && <Table className="mt-2" bordered>
                                                <thead>
                                                    <tr>
                                                        <th>Batch</th>
                                                        <th>Loc</th>
                                                        <th>Company</th>
                                                        <th>Qty</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {tableData?.Batches?.map((data) =>
                                                        <tr>
                                                            <td>{data?.Code}</td>
                                                            <td>{data?.LocId}</td>
                                                            <td>{data?.Company}</td>
                                                            <td>{data?.Qty && +data?.Qty?.toFixed(2)}</td>
                                                        </tr>)}
                                                </tbody>

                                            </Table>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
                {openAlternateTab && <div className="content-body">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-header">
                                        <div className="col-lg-4">
                                            <h4 className="card-title">Alternate items</h4>
                                        </div>
                                        <div className="col-lg-4 d-flex">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Search"
                                                onChange={(e) => setSearchData(e.target.value)}
                                            />
                                            <button className="btn btn-primary ms-2"
                                                onClick={submitSearchData}
                                            >Search
                                            </button>
                                        </div>
                                        {/* <div className="d-flex">
                                                <button className="btn btn-primary ms-2" onClick={modalToggle}>Filter
                                               </button>
                                       </div> */}
                                        {/* <div className="col-lg-2 d-flex">
                                                <button className="btn btn-primary ms-2" onClick={DownloadReportHandler}>Download
                                               </button>
                                        </div> */}
                                    </div>
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
                                            {console.log('altttttttt', alternateData)}
                                            {alternateData?.map((data) => <tr>
                                                <td>{data?.Code}</td>
                                                <td>{data?.Name}</td>
                                                <td>{data?.QtyInv}</td>
                                                <td>{data?.BatchCount}</td>
                                                <td>
                                                    <button className="btn btn-primary"
                                                        onClick={() => { setAltData(data?.Code); setCallApi(true); setOpenAlternateTab(false); }}>
                                                        View
                                                    </button>
                                                </td>
                                            </tr>)}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>}
            </div>
        </>

    )
}

export default ItemDetails;