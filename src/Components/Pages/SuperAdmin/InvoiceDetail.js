import { useEffect, useState } from "react";
import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";
import { Table } from "reactstrap";
import { GetDataWithToken } from "../../ApiHelper/ApiHelper";
import { useLocation } from "react-router-dom";
import moment from "moment";
import axios from "axios";

function InvoiceDetails() {
    const location = useLocation();
    console.log('invoiceDetails', location);
    const [detailData, setDetailData] = useState();


    const downloadHandler = () => {
        GetDataWithToken(`superadmin/download-pdf?code=${location?.state?.data}`).then((response) => {
            // console.log('uuuuuuuuu', pdfUrl);
            axios({
                url: response?.url,
                method: "GET",
                responseType: "blob", // important
            }).then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", "invoiceData.pdf"); //or any other extension
                document.body.appendChild(link);
                link.click();
                // setLoadingData(false);
            });
        });

    }

    useEffect(() => {
        GetDataWithToken(`superadmin/get-invoice-details?invoiceId=${location?.state?.data}`).then((response) => {
            if (response.status === true) {
                setDetailData(response?.data);
            }
        })
    }, [])

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
                                            <h4 className="card-title">Invoice details</h4>
                                        </div>
                                        <div className="col-lg-1">
                                            <button className="btn btn-primary" onClick={downloadHandler}>
                                                <span >
                                                    <i className="fa fa-download"></i>
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <ul class="list-group list-group-flush">
                                                <li class="list-group-item d-flex justify-content-between ">
                                                    <strong>Invoice No:</strong>
                                                    <span class="mb-0">{detailData?.Code}</span>
                                                </li>
                                                <li class="list-group-item d-flex justify-content-between">
                                                    <strong>Invoice Date:</strong>
                                                    <span class="mb-0">{moment(detailData?.InvoiceDate)?.format('DD/MM/YYYY')}</span>
                                                </li>
                                                <li class="list-group-item d-flex justify-content-between">

                                                    <strong>Order No:</strong>
                                                    <span class="mb-0">{detailData?.OrderCode}</span>
                                                </li>
                                                <li class="list-group-item d-flex justify-content-between">

                                                    <strong>Order Date:</strong>
                                                    <span class="mb-0">{moment(detailData?.OrderDate)?.format('DD/MM/YYYY')}</span>
                                                </li>

                                                <li class="list-group-item d-flex justify-content-between">

                                                    <strong>AWB No.</strong>
                                                    <span class="mb-0">{detailData?.AwbNo}</span>
                                                </li>
                                                <li class="list-group-item d-flex justify-content-between">

                                                    <strong>Type</strong>
                                                    <span class="mb-0">{detailData?.Type}</span>
                                                </li>
                                                <li class="list-group-item d-flex justify-content-between">

                                                    <strong>Delivery Name</strong>
                                                    <span class="mb-0">{detailData?.DeliveryName}</span>
                                                </li>
                                            </ul>
                                        </div>

                                        <div class="col-lg-6">
                                            <ul class="list-group list-group-flush">
                                                <li class="list-group-item d-flex justify-content-between ">
                                                    <strong>Delivery Mode</strong>
                                                    <span class="mb-0">{detailData?.DeliveryMode}</span>
                                                </li>
                                                <li class="list-group-item d-flex justify-content-between">

                                                    <strong>Transport</strong>
                                                    <span class="mb-0">{detailData?.Transport}</span>
                                                </li>
                                                <li class="list-group-item d-flex justify-content-between">

                                                    <strong>Sales Person Name</strong>
                                                    <span class="mb-0">{detailData?.SalesPersonName}</span>
                                                </li>
                                                <li class="list-group-item d-flex justify-content-between">

                                                    <strong>Sales Person Email</strong>
                                                    <span class="mb-0">{detailData?.SalesPersonEmail?.split(';')?.map((data) => <p style={{ justifyContent: "end" }}>{data}</p>)}</span>
                                                </li>
                                                <li class="list-group-item d-flex justify-content-between">

                                                    <strong>Sales Person Contact</strong>
                                                    <span class="mb-0">{detailData?.SalesPersonContact}</span>
                                                </li>
                                                <li class="list-group-item d-flex justify-content-between">

                                                    <strong>Remarks:</strong>
                                                    <span class="mb-0">{detailData?.Remarks}</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="col-lg-3">
                                            <h4 className="card-title">items</h4>
                                        </div>
                                        <Table bordered>
                                            <thead>
                                                <tr>
                                                    <th>
                                                        item
                                                    </th>

                                                    <th>
                                                        Quantity
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {detailData?.Lines?.map((data) =>
                                                    < tr >
                                                        <td>
                                                            {data?.ItemName}
                                                        </td>
                                                        <td>
                                                            {data?.Qty && +Math?.abs(data?.Qty)?.toFixed(2)}
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </Table>
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

export default InvoiceDetails;