import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";
import { Table } from "reactstrap";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetDataWithToken, serverUrl } from "../../ApiHelper/ApiHelper";
import moment from "moment";
import axios from "axios";

function CustomerLedgerDetails() {
    const location = useLocation();
    const [totalData, setTotalData] = useState();
    console.log('ddddddddddddddddd', location?.state);
    let data = location?.state?.data;
    let creditTotal = 0;
    let debitTotal = 0;

    const downloadHandler = () => {
        axios({
            url: `${serverUrl}superadmin/customer-ledger-excel?customerCode=${location?.state?.customerId}&fromDate=${location?.state?.startDate}&toDate=${location?.state?.endDate}`,
            method: "GET",
            responseType: "blob", // important
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "ledgerData.xls"); //or any other extension
            document.body.appendChild(link);
            link.click();
            // setLoadingData(false);
        });
    }

    for (let i = 0; i < data.length; i++) {
        creditTotal += +data[i]?.CreditAmount;
        // console.log(data[i]?.CreditAmount,data[i]?.DebitAmount);
        debitTotal += +data[i]?.DebitAmount;
    }
    console.log(creditTotal, debitTotal);
    useEffect(() => {
        GetDataWithToken(`superadmin/total-balance?customerCode=${location?.state?.customerId}&fromDate=${location?.state?.startDate}&toDate=${location?.state?.endDate}`)
            .then((response) => {
                if (response.status === true) {
                    setTotalData(response.data);
                }
            })
    }, []);
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
                                        <div className="col-lg-1">
                                            <button className="btn btn-primary" onClick={downloadHandler}>
                                                <span >
                                                    <i className="fa fa-download"></i>
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <Table bordered>
                                            <thead>
                                                <tr>
                                                    <div className="my-2">
                                                        OPENING BAL: INR {totalData?.OpeningBalance && totalData?.OpeningBalance?.toFixed(2)}, CURRENT BAL: INR{totalData?.BalanceAmount && totalData?.BalanceAmount?.toFixed(2)}
                                                    </div>
                                                </tr>
                                                <tr>
                                                    <th> Type </th>
                                                    <th> Posting Date </th>
                                                    <th> Doc No.</th>
                                                    <th> Debit </th>
                                                    <th> Credit</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data?.map((data) => (
                                                    <tr>
                                                        <td> {data?.Type} </td>
                                                        <td>{data?.PostingDate && moment(data?.PostingDate)?.format('DD/MM/YYYY')}
                                                        </td>
                                                        <td>{data?.DocumentCode}</td>
                                                        <td>{data?.DebitAmount && data?.DebitAmount?.toFixed(2)}</td>
                                                        <td>{data?.CreditAmount > 0 ? -data?.CreditAmount?.toFixed(2) : data?.CreditAmount?.toFixed(2)}</td>
                                                    </tr>
                                                ))}
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td>TOTAL</td>
                                                    <td>{debitTotal && debitTotal?.toFixed(2)}</td>
                                                    <td>-{creditTotal && creditTotal?.toFixed(2)}</td>
                                                </tr>
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

export default CustomerLedgerDetails;