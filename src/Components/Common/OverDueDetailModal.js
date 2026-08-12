import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader, Spinner, Table } from "reactstrap";
import { GetDataWithToken } from "../ApiHelper/ApiHelper";
import moment from "moment";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import * as XLSX from 'xlsx';
import { DatePicker, DateRangePicker } from "rsuite";
import { createPortal } from 'react-dom';

function OverdueDetails({ openModal, toggle,
  rowName, columnName, tableData, isLoading, isOutlet, superAdmin }) {

  const [tableStates, setTableStates] = useState({
    fromDate: "",
    toDate: "",
    searchEnquiry: "",
    summaryData: [],
    tableHeading: []
  })

  const CommonTableHeading = [{ value: "enquiryId", label: "Enquiry No." }, { value: "enquiryDate", label: "Enquiry Date" },
  { value: "customerName", label: "Customer Name" },
  { value: "customerMobile", label: "Customer Mobile No." },
  { value: "storeName", label: "Store Name" },
  { value: "product", label: "Products" },
  { value: "icName", label: "Sales Person" },
    // { value: "currentStatus", label: "Current Status" },
  ]

  useEffect(() => {

    const newTableHeading = setTableHeadingData(columnName);
    // handleChangeState("summaryData", tableData);
    // handleChangeState("tableHeading", newTableHeading);
    // console.log("Table Dataaaa..", tableData);
    setTableStates((prev) => ({
      ...prev,
      tableHeading: newTableHeading,
      summaryData: tableData,
    }))
  }, [tableData, rowName, columnName]);

  const setTableHeadingData = (column) => {
    console.log("new estimateee..", column);
    let tableHeading = [];
    switch (column) {
      case "Measurements":
        tableHeading = [{ value: "measurerName", label: "Measurer" },
        { value: "measurementCompleteDate", label: "Measurement Complete Date" },
        { value: "measurementDays", label: "Days" },
        { value: "measurementTat", label: "tat" },
        { value: "measurementRescheduleDate", label: "measurement Reschedule Date" },
        { value: "measurementRescheduleReason", label: "measurement Reschedule Reason" },
        { value: "measurementRescheduleCount", label: "Measurement Reschedule Count" },
        ]
        break;
      case "Estimate":
        tableHeading = [{ value: "estimateCreateDate", label: "Estimate Create Date" },
        { value: "business_value", label: "Business Value" },
        { value: "estimateDays", label: "Days" },
        { value: "estimateTat", label: "tat" },
        { value: "estimateRescheduleDate", label: "Estimate Reschedule Date" },
        { value: "estimateRescheduleReason", label: "Estimate Reschedule Reason" },
        { value: "estimateRescheduleCount", label: "Estimate Reschedule Count" },
        ]
        break;
      case "Orders":
        tableHeading = [
          { value: "estimateCreateDate", label: "Estimate Create Date" },
          { value: "orderCreateDate", label: "Order Create Date" },
          { value: "orderRemarks", label: "Reschedule Remark" },
          { value: "orderRescheduleDate", label: "Reschedule Date" },
          { value: "orderRescheduleCount", label: "Reschedule Count" },
          { value: "orderDays", label: "Days" },
          { value: "orderTat", label: "tat" },

        ]
        break;
      case "QC1":
        tableHeading = [{ value: "staDate", label: "STA Recived Date" },
        { value: "qc1Date", label: "QC1 Date" },
        { value: "qc1Days", label: "Days" },
        { value: "qc1Tat", label: "tat" },

        ]
        break;
      case "QC2":
        tableHeading = [{ value: "qc1Date", label: "QC1 Date" },
        { value: "qc2Date", label: "QC2 Date" },
        { value: "qc2Days", label: "Days" },
        { value: "qc2Tat", label: "tat" },

        ]
        break;
      case "QC3":
        tableHeading = [{ value: "qc2Date", label: "QC2 Date" },
        { value: "qc3Date", label: "QC3 Date" },
        { value: "qc3Days", label: "Days" },
        { value: "qc3Tat", label: "tat" },

        ]
        break;
      case "Installation":
        tableHeading = [
          { value: "installerName", label: "Installer Name" },
          { value: "installDate", label: "Delivery/ Installation Date" },
          { value: "installationDays", label: "Days" },
          { value: "installationTat", label: "tat" },
          { value: "qc3Date", label: "QC Complete" },
          { value: "installRescheduleDate", label: "installation Reschedule Date" },
          { value: "installRescheduleReason", label: "Reason for installation reschedule" },
          { value: "installRescheduleCount", label: "installation reschedule count" },
          { value: "installCompleteDate", label: "Installation Complete Date" },
        ]
        break;
      case "Feedback":
        tableHeading = [{ value: "feedbackDate", label: "feedback Date" },

        { value: "feedbackDays", label: "Days" },
        { value: "feedbackTat", label: "tat" },

        ]
        break;
      case "complaint":
        tableHeading = [
          { value: "complaintRegisterDate", label: "Complaint Register Date" },
          { value: "complaintDate", label: "Complaint Date" },
          { value: "complaintDays", label: "Days" },
          { value: "complaintTat", label: "tat" },

        ]
        break;
      default:
        tableHeading = []
    }
    return [...CommonTableHeading, ...tableHeading];
  }

  const closeHandler = () => {
    toggle();
  };


  const closeBtn = (
    <button className="btn btn-primary" onClick={closeHandler} type="button">
      &times;
    </button>
  );

  const SetDateHandler = (data, field, type) => {
    const today = new Date();
    if (type === "measurement") {
      if (field === "orderDays") {
        // Ensure both dates are in moment format
        const date1 = moment().format("DD-MM-YYYY");
        const date2 = moment(data?.createdAt).format("DD-MM-YYYY");
        let Difference_In_Time =
          new Date().getTime() - new Date(data?.createdAt).getTime();
        let Difference_In_Days =
          Math.round
            (Difference_In_Time / (1000 * 3600 * 24));
        // const diffTime = Math.abs(date1 - date2);
        // const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        // console.log("new dateee", moment().format("DD-MM-YYYY"), moment(data?.createdAt).format("DD-MM-YYYY"), Difference_In_Days);
        return Difference_In_Days;
      }
    }

  }

  const downloadExcel = () => {
    const tableDataFormatted = tableStates?.summaryData?.map(summaryItem => {
      const formattedRow = {};
      tableStates?.tableHeading?.forEach(thead => {
        formattedRow[thead.label] = summaryItem[thead.value] || ''; // Avoid undefined values
      });
      return formattedRow;
    });

    // Add headings as the first row
    const dataWithHeadings = [
      Object.fromEntries(tableStates?.tableHeading.map((thead) => [thead.label, thead.label])), // Headings row
      ...tableDataFormatted, // Data rows
    ];
    // Create the worksheet
    const worksheet = XLSX.utils.json_to_sheet(dataWithHeadings, { skipHeader: true });
    // const worksheet = XLSX.utils.json_to_sheet(tableDataFormatted);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    console.log("workbookkk Daaata", workbook);

    // Download the Excel file
    XLSX.writeFile(workbook, `${rowName}-${columnName}.xlsx`);
  };

  const enquirySummaryFilterHandler = (value) => {
    const endDate = new Date(value?.[1]);
    const newFilteredTable = tableData?.filter((data) => {
      const createdAt = new Date(data?.createdAt);
      console.log("Created at: " + createdAt, value?.[0], value?.[1]);
      return createdAt >= new Date(value?.[0]) && createdAt < endDate;
    });
    console.log("valueeeee.....", newFilteredTable);
    // console.log(`Filtered Table`, moment(value?.[1], "DD-MM-YYYY").add(1, "days"));
    handleChangeState("summaryData", newFilteredTable)
    // setTableStates((prev) => ({
    //   ...prev,
    //   summaryData: newFilteredTable
    // }))
  }

  const handleChangeState = (key, value) => {
    setTableStates((prev) => ({
      ...prev,
      [key]: value
    }))
  }

  const resetHandler = () => {
    handleChangeState("summaryData", tableData);
  }

  const handleEnqiuryFilter = (event) => {
    const value = event.target.value;
    if (value) {
      const newFilteredTable = tableData?.filter((data) => data?.enquiryId?.toLowerCase().includes(value));
      handleChangeState("summaryData", newFilteredTable)
    } else {
      handleChangeState("summaryData", tableData)
    }

    // setTableStates((prev) => ({
    //  ...prev,
    //   summaryData: newFilteredTable
    // }))
  }

  const renderTableData = (heading, data) => {
    switch (heading.value) {

      case "enquiryId":

        return <Link
          to={superAdmin ? `/EnquiryDetials/${data?.id}` : isOutlet ? `/OutletEnquiryDetials/${data?.id}` : `/EnquiryDetials/${data?.id}`}
          state={
            {
              data: data.id,
              category: data?.products,
              icPerson: `${data?.user?.firstName} ${data?.user?.lastName}`,
            }}
        >
          {data?.enquiryId}
        </Link>

      case "currentStatus":
        return <td>{
          rowName === "Pending" && columnName === "Estimate" ? data?.status : rowName === "Overdue" ? "Overdue" : (
            data?.status ? data?.status :
              data?.enquiryschedules?.status ? data?.enquiryschedules?.status : data?.installer_tasks?.status ? data?.installer_tasks?.status : data?.order?.order_status ? data?.order?.order_status : data?.status
          )
        }</td>

      default:

        return <td>
          {data[heading.value]}
        </td>
    }
  }

  return (
    <Modal isOpen={openModal} fullscreen toggle={toggle} scrollable>
      <ModalHeader className='ms-2' close={closeBtn}>
        {columnName} {rowName}  Details
      </ModalHeader>
      <div className="d-flex justify-content-end p-2 m-2 gap-2">
        <button
          onClick={resetHandler}
          className="btn btn-primary py-2  text-white">
          <img
            height={"22px"}
            width={"20px"}
            src={`${process.env.PUBLIC_URL}/icons/refresh-svgrepo-com.svg`}
          />

        </button>
        <input type="text" className="filter-dropdown-toggle px-3 py-2"
          // onChange={(event) => EnquiryFilterHandler("fromDate", event.target.value)}
          onChange={handleEnqiuryFilter}
          placeholder="Search..."
        />
        <input type="date" className="filter-dropdown-toggle px-3 py-2 btn btn-secondary"
          onChange={(event) => handleChangeState("fromDate", event.target.value)}
        />
        <input type="date" className="filter-dropdown-toggle px-3 py-2 btn btn-secondary"
          onChange={(event) => {
            handleChangeState("toDate", event.target.value)
            enquirySummaryFilterHandler([tableStates?.fromDate, event.target.value]);
          }}
        />
        <button
          // type="button"
          // className="form-control"
          // className="btn  btn-sm"
          onClick={downloadExcel}
          className="filter-dropdown-toggle px-3 py-2 btn btn-secondary"
        >
          Download
          <span>
            <svg xmlns="http://www.w3.org/2000/svg"
              width="16" fill="#b39355" height={"16"}
              viewBox="0 0 512 512"><path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 242.7-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7 288 32zM64 352c-35.3 0-64 28.7-64 64l0 32c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-32c0-35.3-28.7-64-64-64l-101.5 0-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352 64 352zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" /></svg>
          </span>
        </button>
      </div>
      <ModalBody>

        {isLoading ?

          <div className="d-flex justify-content-center py-4">
            <Spinner />
          </div>

          : <Table bordered>
            <thead>
              <tr>

                {tableStates?.tableHeading.map((tab) => <th style={{ maxWidth: "160px", textWrap: "wrap" }}>{tab?.label}</th>)}

              </tr>
            </thead>
            <tbody>
              {tableStates?.summaryData?.map((item) => {
                return <tr>
                  {tableStates?.tableHeading?.map((thead) => <td style={{ maxWidth: "120px", textWrap: "wrap" }}>
                    {renderTableData(thead, item)}
                  </td>)}
                </tr>
              })}
            </tbody>
          </Table>}
      </ModalBody>
    </Modal>
  )
}
export default OverdueDetails;