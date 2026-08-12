import { useEffect, useState } from "react";
import { GetDataWithToken } from "../../ApiHelper/ApiHelper";
import moment from "moment";

const DashboardSummary = () => {

    const [enquirySummaryData, setEnquirySummaryData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let todayDate = new Date();
        let fromDate = `${moment(todayDate)?.format("YYYY-MM-DD")} 00:00:00`;
        let toDate = `${moment(todayDate)?.format("YYYY-MM-DD")} 00:00:00`;
        GetTableData(`superadmin/new-dashboard?date=${moment(todayDate).format("YYYY-MM-DD")}&fromDate=${fromDate}&toDate=${toDate}`);
    }, [])

    const GetTableData = (apiLink) => {
        GetDataWithToken(apiLink).then((response) => {
            if (response?.status === true) {
                setEnquirySummaryData(response?.data);
                setIsLoading(false);
                // setMainDashboardCallApi(false)
                // console.log("Ddatatatatata", enquirySummaryData);
            } else {
                setIsLoading(false)
            }
        })
    }



    return (
        <>
            <div className="col-xl-12">
                <div className="">
                    <div className="m-3">
                        <div className="alert bg-secondary mb-3">
                            <div className="row">
                                <div className="col-xl-10">
                                    <h3 className="text-white ">Enquiry Summary</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="m-3">
                    <div className="card">
                        <div className="p-3">
                            <div className="table-responsive">
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Stages</th>
                                            <th>Scheduled</th>
                                            <th>Completed</th>
                                            <th>Pending</th>
                                            <th>Cancelled</th>
                                            <th>Overdue</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.keys(enquirySummaryData).map((category, index) => (
                                            <tr key={index}>
                                                <td>{category === "total_enquiry" ? "Total Enquiry" : category}</td>
                                                <td>{enquirySummaryData[category].scheduled}</td>
                                                <td>{enquirySummaryData[category].completed}</td>
                                                <td
                                                // style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
                                                // onClick={() => columnHandler('Pending', enquirySummaryData[category].pending, category)}
                                                >{enquirySummaryData[category].pending}</td>
                                                <td
                                                // style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
                                                // onClick={() => columnHandler('Cancelled', enquirySummaryData[category].cancelled, category)}
                                                >{enquirySummaryData[category].cancelled}</td>
                                                <td
                                                // style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
                                                // onClick={() => columnHandler('Overdue', enquirySummaryData[category].overdue, category)}
                                                >{enquirySummaryData[category].overdue}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardSummary;