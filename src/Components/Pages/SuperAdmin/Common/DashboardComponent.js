import axios from "axios";
import React, { useEffect, useState } from "react";
import { DownloadReportFunction, GetDataWithToken, serverUrl } from "../../../ApiHelper/ApiHelper";
import OverdueModal from "../../../Common/OverDueModal";
// import OverdueDetails from "../../Common/OverDueDetailModal";
import moment from "moment";
import { DatePicker, DateRangePicker } from 'rsuite';
import {
  Nav,
  NavItem,
  NavLink,
  Spinner,
  TabContent,
  TabPane,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "reactstrap";
// import EnquiryDetailModal from "../../Common/EnquiryDetailModal";
import ReactApexChart from "react-apexcharts";
import { Link, useNavigate } from "react-router-dom";
import { addDays } from 'date-fns';
import Pagination from "react-js-pagination";
import DashboardFilterModal from "../../../Common/DashboardFilterModal";
import EnquiryDetailModal from "../../../Common/EnquiryDetailModal";
import OverdueDetails from "../../../Common/OverDueDetailModal";


export default function DashboardComponent({ outletManagerStore, superAdmin }) {
  const navigate = useNavigate();
  // Dynamic columns start here
  const feedbackChart = {
    options: {
      legend: {
        show: false,
      }
    },
    series: [44, 55, 41, 17, 15],
    labels: ['A', 'B', 'C', 'D', 'E']
  }
  const statusArray = [
    // { value: "inprogress", label: "In Progress" },
    { value: "fresh", label: "Fresh" },
    { value: "measurer-assigned", label: "Measurer Assigned" },
    { value: "measurement-complete", label: "Measurement Complete" },

    { value: "estimate-created", label: "Estimate Created" },
    { value: "estimate-postpone", label: "Estimate Postpone" },
    { value: "order-confirmed", label: "Order Confirmed" },
    { value: "qc-complete", label: "QC Complete" },
    { value: "installer-assigned", label: "Installer Assigned" },
    { value: "installation-started", label: "Installation Started" },
    { value: "installation-done", label: "Installation Done" },
    { value: "cancelled", label: "Cancelled" },

    { value: "completed", label: "Completed" },
  ];
  const tableHeadings = [
    { label: "Enq ID", value: "enquiryId" },
    { label: "Customer Name", value: "customerName" },
    { label: "Customer Mobile No.", value: "contactNumber" },
    { label: "Enq Date&time", value: "createdAt" },
    { label: "Business Value", value: "business_value" },
    { label: "Address", value: "address" },
    { label: "Products", value: "products" },
    // { label: "Total Amount", value: "" },
    { label: "IC Name", value: "icName" },
    { label: "Enq Status", value: "status" },
    { label: "Measurer Name", value: "measurerName" },
    { label: "Completion Date", value: "measurementDate" },
    { label: "Days", value: "measurementDays" },
    { label: "TAT", value: "measure_tat" },

    { label: "Reschedule Count", value: "re_measurement_Count" },
    { label: "Reschedule Date", value: "re_measurement_Date" },
    { label: "Reschedule Reason", value: "re_measurement_reason" },
    { label: "Estimate Date", value: "estimateDate" },
    { label: "Days", value: "estimateDays" },
    { label: "Estimate TAT", value: "estimate_tat" },
    { label: "Estimate Postpone Date", value: "estimate_postpone_date" },
    { label: "Postpone Reason", value: "estimate_postpone_reason" },
    { label: "Order date", value: "orderDate" },
    { label: "Days", value: "orderDays" },
    { label: "Order TAT", value: "order_tat" },
    { label: "STA Received Date", value: "sta_received_date" },
    { label: "QC1 Date", value: "QC_Start" },
    { label: "Days", value: "qc1Days" },
    { label: "QC1 TAT", value: "qc1_tat" },
    { label: "QC2 Date", value: "QC2_Completed" },
    { label: "Days", value: "qc2Days" },
    { label: "QC2 TAT", value: "qc2_tat" },
    { label: "QC3 Date", value: "QC_Complete" },
    { label: "Days", value: "qc3Days" },
    { label: "QC3 TAT", value: "qc3_tat" },
    { label: "Payment Date", value: "" },
    { label: "Installer Name", value: "installerName" },
    { label: "Installation Start Date", value: "installationStartDate" },
    { label: "Installation Days", value: "installationDays" },
    { label: "Installation TAT", value: "installation_tat" },
    { label: "Installation Reschedule", value: "" },
    { label: "Reschedule Reason", value: "" },
    { label: "Installation Complete Date", value: "installation_done" },
    { label: "Feedback Date", value: "feedbackDate" },
    { label: "Days", value: "feedbackDays" },
    { label: "Feedback TAT", value: "feedback_tat" },
    { label: "complaint Date", value: "complaint_date" },
    { label: "Days", value: "complaintDays" },
    { label: "Complaint TAT", value: "complaint_tat" },
    { label: "Delay Reason", value: "" },
  ];

  const [visibleColumns, setVisibleColumns] = useState(tableHeadings);

  const handleColumnToggle = (columnId) => {
    setVisibleColumns((prev) => {
      // If the column is already visible, remove it; otherwise, add it.
      if (prev.some(col => col?.label === columnId)) {
        return prev.filter(col => col?.label !== columnId);
      } else {
        // Find the original column definition to maintain the order.
        const columnToAdd = tableHeadings.find(col => col?.label === columnId);
        if (columnToAdd) {
          // Insert the column in its original position.
          return tableHeadings
            .filter(col => prev.some(visibleCol => visibleCol?.label === col.label) || col.label === columnId);
        }
        return prev;
      }
    });
  };
  const [overdueDetailData, setOverdueDetailData] = useState({
    tableData: [],
    isLoading: false
  })
  // Dynamic columns ends here
  const [filterAccordianopen, setfilterAccordianopen] = useState(1);
  const [filterGraphAccordianopen, setfilterGraphAccordianopen] = useState(1);

  const filterGraphAccordiantoggle = (id) => {
    if (filterGraphAccordianopen === id) {
      setfilterGraphAccordianopen();
    } else {
      setfilterGraphAccordianopen(id);
    }
  };

  const filterAccordiantoggle = (id) => {
    if (filterAccordianopen === id) {
      setfilterAccordianopen();
    } else {
      setfilterAccordianopen(id);
    }
  };

  const [sortFilterDropdownOpen, setSortFilterDropdownOpen] = useState(false);
  const toggleSortFilterDropdown = () => setSortFilterDropdownOpen((prevState) => !prevState);


  const [graphFilterDropdownOpen, setGraphFilterDropdownOpen] = useState(false);
  const toggleGraphFilterDropdown = () => setGraphFilterDropdownOpen((prevState) => !prevState);

  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const toggleFilterDropdown = () => setFilterDropdownOpen((prevState) => !prevState);

  const [columnDropdownOpen, setColumnDropdownOpen] = useState(false);
  const toggleColumnDropdown = () => setColumnDropdownOpen((prevState) => !prevState);
  const [callApi, setCallApi] = useState(false);

  const [dashboarChart1, setdashboarChart1] = useState({
    options: {
      chart: {
        id: "basic-bar-chart",
        toolbar: {
          show: true, // Ensure the toolbar is visible
          tools: {
            download: true, // Show download option
            selection: true, // Allow selection
            zoom: true, // Enable zoom
            zoomin: true, // Enable zoom in
            zoomout: true, // Enable zoom out
            pan: true, // Enable panning
            reset: true, // Enable reset zoom
          },
        },
        events: {
          dataPointSelection: (event, chartContext, config) => {
            // console.log(config.w.config?.xaxis?.categories[config?.dataPointIndex], config.w.config?.series[config?.seriesIndex]?.name);
            console.log(
              "start date from graph", config
            )
            let columnDataName = columnStatusHandler(config.w.config?.xaxis?.categories[config?.dataPointIndex])
            setColumnName(columnDataName);
            let rowDataName = rowStatusHandler(config.w.config?.series[config?.seriesIndex]?.name);
            setRowName(rowDataName);
            setCallApi(true);
            toggleMainEnquirySummary2();

            // console.log(chartContext);
          }
        }
      },
      xaxis: {
        categories: ["Measurements", "Estimate", "Sales Order", "STA", "QC1", "QC2", "QC3", "Installation", "Feedback", "Complaint"],
      },
      colors: ['#A30003', '#C58C00', '#4CB140']
    },
    series: [
      {
        name: "Overdue",
        data: [],
      },
      {
        name: "Pending",
        data: [],
      },
      {
        name: "Complete",
        data: [],
      },

    ],

  });

  useEffect(() => {
    getEnquiryDetailsData(columnName, rowName, enquiryStates?.chartStartDate, enquiryStates?.chartEndDate);
  }, [callApi])

  const [enquiryStates, setEnquiryStates] = useState({
    openEnquiryModal: false,
    enquiryData: [],
    enquiryDetailData: [],
    enquiryDownloadLink: null,
    tableLoader: false,
    AllEnquiryPagination: {},
    AllSalesPersonList: [],
    AllStoreList: [],
    selectedStatus: "",
    selectedStore: outletManagerStore ? outletManagerStore : "",
    selectedStoreName: "",
    selectedSalesPerson: "",
    selectedSalesPersonName: "",
    startDate: "",
    endDate: "",
    searchEnquiryValue: "",
    selectedChartStoreId: outletManagerStore ? outletManagerStore : "",
    selectedChartStoreName: "",
    selectedChartSalesPersonId: "",
    selectedChartSalesPersonName: "",
    chartStartDate: moment().format('YYYY-MM-DD'),
    enquiryTableStatusLabel: "",
    enquiryTableStatusValue: "",
    chartEndDate: moment().format("YYYY-MM-DD"),
    tableLoading: true,
    enquiryPages: {},
    enquiryModalUrl: "",
  });
  const [dashboardTab, setDashboardTab] = useState(1);
  const [AllDashboardData, setAllDashboardData] = useState(1);
  // const [AllDashboardData, setAllDashboardData] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const DashboardTabs = [
    {
      title: "All",
      tabId: 1,
    },
    // {
    //   title: "New",
    //   tabId: 2,
    // },
    // {
    //   title: "Pending",
    //   tabId: 3,
    // },
    // {
    //   title: "Overdue",
    //   tabId: 4,
    // },
    // {
    //   title: "Completed",
    //   tabId: 5,
    // },
    // {
    //   title: "Cancelled",
    //   tabId: 6,
    // },
  ];

  const [openModal, setOpenModal] = useState(false);
  const toggle = () => setOpenModal(!openModal);

  // const [openEnquiryModal, setOpenEnquiryModal] = useState(false);
  const Enquirytoggle = () =>
    setEnquiryStates((prev) => ({
      ...prev,
      openEnquiryModal: !prev?.openEnquiryModal,
    }));

  const [openModal2, setOpenModal2] = useState(false);
  const toggle2 = () => setOpenModal2(!openModal2);

  const [rowName, setRowName] = useState();
  const [columnName, setColumnName] = useState();

  const [callApi1, setCallApi1] = useState(false);
  const [callApi2, setCallApi2] = useState(false);
  const [callApi3, setCallApi3] = useState(false);
  const [modalCallApi, setModalCallApi] = useState(false);
  const [mainDashboardCallApi, setMainDashboardCallApi] = useState(true);
  const [openDateModal, setOpenDateModal] = useState(false);
  const modalDateToggle = () => {
    setOpenDateModal(!openDateModal);
  };
  const [salesPersonId, setSalesPersonId] = useState("");
  const [salesPerson, setSalesPerson] = useState();
  const [storeName, setStoreName] = useState();
  const [storeId, setStoreId] = useState(outletManagerStore ? outletManagerStore : "");

  // main dashboard states start here
  const [openMainEnquirySummaryModal, setOpenMainEnquirySummaryModal] =
    useState(false);
  const toggleMainEnquirySummary = () =>
    setOpenMainEnquirySummaryModal(!openMainEnquirySummaryModal);

  const [openMainEnquirySummaryModal2, setOpenMainEnquirySummaryModal2] =
    useState(false);

  const toggleMainEnquirySummary2 = () =>
    setOpenMainEnquirySummaryModal2(!openMainEnquirySummaryModal2);

  const [openDashboardDateModal, setOpenDashboardDateModal] = useState(false);
  const modalDashboardDateToggle = () => {
    setOpenDashboardDateModal(!openDashboardDateModal);
  };

  const [dashboardSalesPersonId, setDashboardSalesPersonId] = useState("");
  const [dashboardSalesPerson, setDashboardSalesPerson] = useState();
  const [dashboardStoreName, setDashboardStoreName] = useState();
  const [dashboardStoreId, setDashboardStoreId] = useState(outletManagerStore ? outletManagerStore : "");

  const [mainDashboardCallApi2, setMainDashboardCallApi2] = useState(true);

  const [mainDashboarddate, setMainDashboardDate] = useState({
    fromDate: "",
    toDate: "",
  });

  // ends here

  const [LoadingData, setLoadingData] = useState(false);
  const [enquirySummaryData, setEnquirySummaryData] = useState([]);
  const [enquirySummaryMainData, setEnquirySummaryMainData] = useState([]);
  const [storeList, setStoreList] = useState([]);

  let todayDate = moment(new Date()).format("YYYY-MM-DD");
  let yesterdayDate = moment().subtract(1, "day").format("YYYY-MM-DD");
  let tomorrowDate = moment().add(1, "day").format("YYYY-MM-DD");

  const [date, setDate] = useState({
    fromDate: new Date(),
    toDate: new Date(),
  });

  const rowStatusHandler = (data) => {
    switch (data) {
      case "Complete":
        return "Completed"
      default: return data
    }
  }

  const columnStatusHandler = (data) => {
    switch (data) {
      case "Sales Order":
        return "Orders"
      default: return data
    }
  }

  const columnHandler = (row, value, column) => {
    // console.log("rooowww...... valuee........ ", row, value, column)
    if (value > 0) {
      // if (column == "Estimate") {
      //   setCallApi(true);
      //   toggle2();
      //   setColumnName("Measurements");
      //   setRowName(row);
      // } else {
      setCallApi(true);
      toggle2();
      setColumnName(column);
      setRowName(row);
      // }
    }
  };

  const columnHandler2 = (name) => {
    if (name === "pendingComplaint") {
      setCallApi1(true);
      toggle2();
    } else if (name === "feedback") {
      setCallApi2(true);
      toggle2();
    } else if (name === "wcr") {
      setCallApi3(true);
      toggle2();
    }

    // setColumnName(column);
    // setRowName(row);
  };

  useEffect(() => {
    let fromDate = mainDashboarddate?.fromDate
      ? `${moment(mainDashboarddate?.fromDate)?.format("YYYY-MM-DD")} 00:00:00`
      : ``;

    let toDate = mainDashboarddate?.toDate
      ? `${moment(mainDashboarddate?.toDate)?.format("YYYY-MM-DD")} 00:00:00`
      : ``;

    GetDataWithToken(
      `superadmin/dashboard?fromDate=${fromDate}&toDate=${toDate}&salesId=${dashboardSalesPersonId}&storeId=${dashboardStoreId}`
    ).then((response) => {
      if (response.status === true) {
        setAllDashboardData(response.data);
        setMainDashboardCallApi2(false);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    });
  }, [mainDashboardCallApi2]);

  useEffect(() => {

    let apiLink = `superadmin/new-dashboard?date=${enquiryStates?.chartStartDate}&salesId=${enquiryStates?.selectedChartSalesPersonId}&storeId=${enquiryStates?.selectedChartStoreId}`;

    GetDataWithToken(apiLink).then((response) => {
      if (response?.status === true) {
        let OverDueData = [response?.data?.Measurements?.overdue || 0, response?.data?.Estimate?.overdue || 0, response?.data?.Orders?.overdue || 0, response?.data?.QC1?.overdue || 0, response?.data?.QC2?.overdue || 0, response?.data?.QC3?.overdue || 0,
        response?.data?.Installations?.overdue || 0,
        response?.data?.Feedbacks?.overdue || 0, response?.data?.Complaint?.overdue || 0];

        let pendingData = [response?.data?.Measurements?.pending || 0, response?.data?.Estimate?.pending || 0, response?.data?.Orders?.pending || 0, response?.data?.QC1?.pending || 0, response?.data?.QC2?.pending || 0, response?.data?.QC3?.pending || 0,
        response?.data?.Installations?.pending || 0, response?.data?.Feedbacks?.pending || 0, response?.data?.Complaint?.pending || 0];

        let CompletedData = [response?.data?.Measurements?.completed || 0, response?.data?.Estimate?.completed || 0, response?.data?.Orders?.completed || 0, response?.data?.QC1?.completed || 0, response?.data?.QC2?.completed || 0, response?.data?.QC3?.completed || 0,
        response?.data?.Installations?.completed || 0, response?.data?.Feedbacks?.completed || 0, response?.data?.Complaint?.completed || 0];

        let cancelledData = [response?.data?.Measurements?.cancelled || 0, response?.data?.Estimate?.cancelled || 0, 0, 0, 0, 0, 0];

        let postponeData = [response?.data?.Measurements?.postpone || 0, response?.data?.Estimate?.postpone || 0, response?.data?.Orders?.postpone || 0, 0, 0, 0, response?.data?.Installations?.postpone || 0];

        setEnquirySummaryData(response?.data);

        setdashboarChart1({
          options: {
            chart: {
              id: "basic-bar-chart",
              toolbar: {
                show: true, // Ensure the toolbar is visible
                tools: {
                  download: false, // Show download option
                  selection: true, // Allow selection
                  zoom: true, // Enable zoom
                  zoomin: true, // Enable zoom in
                  zoomout: true, // Enable zoom out
                  pan: true, // Enable panning
                  reset: true, // Enable reset zoom
                },
              },
            },
            xaxis: {
              categories: ["Measurements", "Estimate", "Sales Order", "QC1", "QC2", "QC3", "Installation", "Feedback", "Complaint"],
            },
            colors: ['#e86a02', "#dbbb02", '#4CB140', '#a6750c', '#b80202']
          },
          series: [
            {
              name: "Overdue",
              data: OverDueData,
            },
            {
              name: "Pending",
              data: pendingData,
            },
            {
              name: "Complete",
              data: CompletedData,
            }, {
              name: "Postponed",
              data: postponeData,
            }, {
              name: "Cancelled",
              data: cancelledData,
            }
          ],

        })
        // setIsLoading(false);
        // setMainDashboardCallApi(false);
        // console.log("Ddatatatatata", enquirySummaryData);

      } else {
        // setIsLoading(false);
      }
    });
    // getChartData();

  }, [enquiryStates?.chartStartDate, enquiryStates?.chartEndDate, enquiryStates?.selectedChartSalesPersonId, enquiryStates?.selectedChartStoreId,
  ])

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
          Math.round(Difference_In_Time / (1000 * 3600 * 24));
        // const diffTime = Math.abs(date1 - date2);
        // const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        // console.log("new dateee", moment().format("DD-MM-YYYY"), moment(data?.createdAt).format("DD-MM-YYYY"), Difference_In_Days);
        return Difference_In_Days;
      }
    }

  }

  const getEnquiryDetailsData = (col, row, startDate, endDate) => {
    let apiLink;
    console.log("enqury from to date", startDate, endDate);
    let fromDate = enquiryStates?.chartStartDate ? `${moment(enquiryStates?.chartStartDate)?.format("YYYY-MM-DD")} 00:00:00` : ``;
    let toDate = enquiryStates?.chartEndDate ? `${moment(enquiryStates?.chartEndDate)?.format("YYYY-MM-DD")} 00:00:00` : ``;

    apiLink = `superadmin/get-enquiry-summary-details?RowName=${col}&ColumnName=${row}&date=${enquiryStates?.chartStartDate}&storeId=${enquiryStates?.selectedChartStoreId}&salesId=${enquiryStates?.selectedChartSalesPersonId}`;

    setIsLoading(true);
    setOverdueDetailData(prev => ({
      ...prev,
      isLoading: true,
    }))
    GetDataWithToken(apiLink)
      .then((response) => {

        setOverdueDetailData(prev => ({
          ...prev,
          isLoading: false,
        }));
        if (response.status === true) {

          setOverdueDetailData(prev => ({
            ...prev,
            tableData: response?.data?.map((enqDet) => ({
              ...enqDet,
              storeName: `${enqDet?.store?.firstName}`,
              enquiryDate: enqDet.createdAt && moment(enqDet.createdAt).format("DD-MM-YYYY hh:mm:ss"),

              customerName: `${enqDet?.customer?.firstName || ''} ${enqDet?.customer?.lastName || ''}`,
              customerMobile: enqDet?.customer?.primary_phone,
              product: Array.isArray(enqDet?.products)
                ? enqDet?.products?.join(' ')  // If it's an array, join it with spaces
                : enqDet?.products?.split(',').join(' ') || enqDet?.Category_Name,
              icName: `${enqDet?.user?.firstName || ''} ${enqDet?.user?.lastName || ''}`,
              measurerName: `${enqDet?.enquiryschedules?.user?.firstName || ''} ${enqDet?.enquiryschedules?.user?.lastName || ''}`,
              measurementCompleteDate: rowName == 'Completed' ? moment(enqDet?.enquiryschedules?.updatedAt).format('DD-MM-YYYY') : "",
              measurementDays: tatAndDaysCalculator(enqDet?.createdAt, rowName == 'Completed' ? enqDet?.enquiryschedules?.updatedAt : new Date(), "measurementDays"),
              days: SetDateHandler(enqDet, "orderDays", "measurement") || '',
              measurementTat: tatAndDaysCalculator(enqDet?.createdAt, rowName == 'Completed' ? enqDet?.enquiryschedules?.updatedAt : new Date(), "measure_tat"),
              measurementRescheduleDate: enqDet?.enquiryschedules?.postpone_date && `${enqDet?.enquiryschedules?.postpone_date}(${enqDet?.enquiryschedules?.schedule?.start_time}-${enqDet?.enquiryschedules?.schedule?.end_time})`,
              measurementRescheduleReason: enqDet?.reschedule_remark,
              measurementRescheduleCount: enqDet?.reschedule_count,
              estimateCreateDate: enqDet?.estimate_createdAt && moment(enqDet?.estimate_createdAt).format('DD-MM-YYYY'),
              estimateDays: tatAndDaysCalculator(enqDet?.enquiryschedules?.updatedAt, rowName == 'Completed' ? enqDet?.estimate_createdAt : new Date(), "measurementDays"),
              estimateTat: tatAndDaysCalculator(enqDet?.enquiryschedules?.updatedAt, rowName == 'Completed' ? enqDet?.estimate_createdAt : new Date(), "estimate_tat"),
              estimateRescheduleDate: enqDet?.estimate_postpone_date && `${moment(enqDet?.estimate_postpone_date).format('DD-MM-YYYY')}`,
              estimateRescheduleCount: enqDet?.reschedule_count,
              estimateRescheduleReason: enqDet?.reschedule_remark,
              orderCreateDate: enqDet?.order?.order_date && moment(enqDet?.order?.order_date).format('DD-MM-YYYY'),
              orderRemarks: enqDet?.reschedule_remark,
              orderDays: tatAndDaysCalculator(enqDet?.estimate_createdAt, rowName == 'Completed' ? enqDet?.order?.order_date : new Date(), "measurementDays"),
              orderRescheduleDate: enqDet?.estimate_postpone_date && moment(enqDet?.estimate_postpone_date).format("DD-MM-YYYY"),
              orderRescheduleCount: enqDet?.reschedule_count,
              orderTat: tatAndDaysCalculator(enqDet?.estimate_createdAt, rowName == 'Completed' ? enqDet?.order?.order_date : new Date(), "order_tat"),
              staDate: enqDet?.order?.sta_received_date && moment(enqDet?.order?.sta_received_date).format('DD-MM-YYYY'),
              qc1Date: enqDet?.order?.qc1_complete_date && moment(enqDet?.order?.qc1_complete_date).format('DD-MM-YYYY'),
              qc1Days: tatAndDaysCalculator(enqDet?.order?.sta_received_date, rowName == 'Completed' ? enqDet?.order?.qc1_complete_date : new Date(), "qc1Days"),
              qc1Tat: tatAndDaysCalculator(enqDet?.order?.sta_received_date, rowName == 'Completed' ? enqDet?.order?.qc1_complete_date : new Date(), "qc1_tat"),
              qc2Date: enqDet?.order?.qc2_complete_date && moment(enqDet?.order?.qc2_complete_date).format('DD-MM-YYYY'),
              qc2Days: tatAndDaysCalculator(enqDet?.order?.qc1_complete_date, rowName == 'Completed' ? enqDet?.order?.qc2_complete_date : new Date(), "measurementDays"),
              qc2Tat: tatAndDaysCalculator(enqDet?.order?.qc1_complete_date, rowName == 'Completed' ? enqDet?.order?.qc2_complete_date : new Date(), "qc2_tat"),

              qc3Date: enqDet?.order?.qc3_complete_date && moment(enqDet?.order?.qc3_complete_date).format('DD-MM-YYYY'),
              qc3Days: tatAndDaysCalculator(enqDet?.order?.qc2_complete_date, rowName == 'Completed' ? enqDet?.order?.qc3_complete_date : new Date(), "measurementDays"),
              qc3Tat: tatAndDaysCalculator(enqDet?.order?.qc2_complete_date, rowName == 'Completed' ? enqDet?.order?.qc3_complete_date : new Date(), "qc3_tat"),
              installerName: `${enqDet?.installer_tasks
                ?.installer?.firstName || ""} ${enqDet?.installer_tasks
                  ?.installer?.lastName || ""}`,
              installDate: enqDet?.installer_tasks
                ?.date && moment(enqDet?.installer_tasks
                  ?.date).format('DD-MM-YYYY'),

              installationDays: tatAndDaysCalculator(enqDet?.installer_tasks?.createdAt, rowName == 'Completed' ? enqDet?.installer_tasks
                ?.installer?.installation_done : new Date(), "measurementDays"),

              installationTat: tatAndDaysCalculator(enqDet?.installer_tasks
                ?.createdAt, rowName == 'Completed' ? enqDet?.installer_tasks
                  ?.installer?.installation_done : new Date(), "installation_tat"),
              installRescheduleDate: enqDet?.installer_tasks?.postponeDate &&
                `${enqDet?.installer_tasks?.postponeDate}(${enqDet?.installer_tasks?.schedule?.start_time}-${enqDet?.installer_tasks?.schedule?.end_time})`,
              installRescheduleReason: "",
              installRescheduleCount: "",
              installCompleteDate: enqDet?.installer_tasks?.installation_done && moment(enqDet?.installer_tasks?.installation_done).format('DD-MM-YYYY'),
              installRescheduleReason: enqDet?.reschedule_remark,
              installRescheduleCount: enqDet?.reschedule_count,

              feedbackDate: enqDet?.feedback?.createdAt && moment(enqDet?.feedback?.createdAt).format('DD-MM-YYYY'),
              feedbackDays: tatAndDaysCalculator(enqDet?.updatedAt, rowName == 'Completed' ? enqDet?.feedback
                ?.createdAt : new Date(), "measurementDays"),
              feedbackTat: tatAndDaysCalculator(enqDet?.updatedAt, rowName == 'Completed' ? enqDet?.feedback
                ?.createdAt : new Date(), "feedback_tat"),
              complaintRegisterDate: "",
              complaintDate: "",
              complaintDays: "",
              complaintTat: "",
            })),
          }))
          setCallApi(false);
          console.log("hellooo.......")

        }
      }
      )

  }


  const GetStorwiseAllEnquiryDetail = (url, dwnUrl, wcr) => {
    setLoadingData(true);
    Enquirytoggle();
    axios({
      url: url,
      method: "GET",
      // responseType: "blob", // important
    }).then((response) => {
      console.log(response?.data?.data);
      setEnquiryStates((prev) => ({
        ...prev,
        enquiryData: response?.data?.data,
        enquiryDownloadLink: dwnUrl,
      }));

      // setEnquiryData(response?.data?.data);
      // console.log
      // const url = window.URL.createObjectURL(new Blob([response.data]));
      // const link = document.createElement("a");
      // link.href = url;
      // link.setAttribute("download", "file.xls"); //or any other extension
      // document.body.appendChild(link);
      // link.click();
      setLoadingData(false);
    });
  };

  useEffect(() => {
    if (outletManagerStore) {
      setStoreId(outletManagerStore);
      setDashboardStoreId(outletManagerStore);
      setEnquiryStates((prev) => ({
        ...prev,
        selectedChartStoreId: outletManagerStore,
        selectedStore: outletManagerStore,
      }))
    }
    GetSalesPerson("", outletManagerStore ? outletManagerStore : "");
    getStoreList();
  }, [])

  useEffect(() => {
    GetAllEnquiry(1);
  }, [enquiryStates?.selectedSalesPerson, enquiryStates?.selectedStore,
  enquiryStates?.startDate, enquiryStates?.endDate, enquiryStates?.searchEnquiryValue, enquiryStates?.enquiryTableStatusValue
  ]);

  const getStoreList = () => {
    GetDataWithToken(`superadmin/get-outlet`)
      .then(response => {
        if (response.status === true) {
          setEnquiryStates((prev) => ({
            ...prev,
            AllStoreList: response?.data,
          }));
        }
      })
  }

  const GetSalesPerson = (value = "", storeId = "") => {
    let searchValue = value ? `&search=${value}` : "";
    GetDataWithToken(`superadmin/get-users?type=sales-person&storeId=${storeId}${searchValue}`)
      .then(response => {
        if (response.status === true) {
          setEnquiryStates(prev => ({
            ...prev,
            AllSalesPersonList: response.data,
          }))
        }
      })
  }

  const DownloadReportHandler = (url) => {
    setLoadingData(true);
    axios({
      url: url,
      method: "GET",
      responseType: "blob", // important
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "file.xls"); //or any other extension
      document.body.appendChild(link);
      link.click();
      setLoadingData(false);
    });
  };

  const momentDateHandler = (value) => {
    if (value) {
      return moment(value).format('MMMM Do YYYY, h:mm:ss a');
    } else {
      return '';
    }
  }

  const responseSetHandler = (item, label) => {
    const startTime = item.createdAt;
    const endTime = item.enquiryschedules.length > 0 ? item.enquiryschedules[item.enquiryschedules.length - 1].updatedAt : item.updatedAt;
    const installationStartTime = item.installer_tasks.length > 0 ? new Date(`${item.installer_tasks[item.installer_tasks.length - 1].date}`) : null;
    const installationEndTime = item.installer_tasks.length > 0 ? item.installer_tasks[item.installer_tasks.length - 1].installation_done : null;
    const order_date = item?.orders?.length > 0 ? item?.orders[0]?.createdAt : null;
    const sta_received_date = item.orders.length > 0 ? item.orders[0].sta_received_date : null;
    const qc1_complete_date = item.orders.length > 0 ? item.orders[0].QC_Start : null;
    const qc2_complete_date = item.orders.length > 0 ? item.orders[0].QC2_Completed : null;
    const qc3_complete_date = item.orders.length > 0 ? item.orders[0].QC_Complete : null;
    const feedback_date = item.feedback ? item.feedback.createdAt : null

    const complaint_date = item.complaint_tasks.length && item.complaint_tasks.length > 0 ? item.complaint_tasks[item.complaint_tasks.length - 1].date : null;

    let complaint_daysDiff = "";
    if (complaint_date && feedback_date) {
      const timeDiff = new Date(complaint_date).getTime() - new Date(feedback_date).getTime();
      complaint_daysDiff = timeDiff / (1000 * 3600 * 24).toFixed(0); // complaint dayssss....
    }

    let installation_daysDiff = "";
    let installation_hours;
    if (installationEndTime && installationStartTime) {
      const timeDiff = new Date(installationEndTime).getTime() - new Date(installationStartTime).getTime();
      installation_daysDiff = timeDiff / (1000 * 3600 * 24).toFixed(0); // installation daysss...
      // installation_hours = (installation_daysDiff * 24).toFixed(0);
    }

    let feedback_daysDiff = "";
    if (installationEndTime && feedback_date) {
      const timeDiff = new Date(installationEndTime).getTime() - new Date(feedback_date).getTime();
      feedback_daysDiff = timeDiff / (1000 * 3600 * 24).toFixed(0); //feed back daysss...
    }

    let orders_daysDiff = "";
    let orders_hours = "";
    if (order_date && item?.estimate_createdAt) {
      const timeDiff = new Date(order_date).getTime() - new Date(item?.estimate_createdAt).getTime();
      orders_daysDiff = timeDiff / (1000 * 3600 * 24).toFixed(0); // order days.....
      orders_hours = (orders_daysDiff * 24).toFixed(0);
    }

    let estimate_daysDiff = "";
    let estimate_hours;
    if (endTime) {
      const endDate = item?.estimate_createdAt ? item?.estimate_createdAt : new Date();
      const timeDiff = new Date(endDate).getTime() - new Date(endTime).getTime();
      estimate_daysDiff = timeDiff / (1000 * 3600 * 24).toFixed(0); //estimate daysss...
      estimate_hours = (estimate_daysDiff * 24).toFixed(0);
    }

    let qc1_daysDiff = "";
    if (sta_received_date && qc1_complete_date) {
      const timeDiff = new Date(sta_received_date).getTime() - new Date(qc1_complete_date).getTime();
      qc1_daysDiff = timeDiff / (1000 * 3600 * 24).toFixed(0); // qc1 dayss....
    }

    let qc2_daysDiff = "";
    if (qc2_complete_date && qc1_complete_date) {
      const timeDiff = new Date(qc2_complete_date).getTime() - new Date(qc1_complete_date).getTime();
      qc2_daysDiff = timeDiff / (1000 * 3600 * 24).toFixed(0); // qc2 days..../,
    }

    let qc3_daysDiff = "";
    if (qc2_complete_date && qc3_complete_date) {
      const timeDiff = new Date(qc3_complete_date).getTime() - new Date(qc2_complete_date).getTime();
      qc3_daysDiff = timeDiff / (1000 * 3600 * 24).toFixed(0); // qc3 daysss...
    }

    const timeDiff = new Date(endTime).getTime() - new Date(startTime).getTime();
    let daysDiff = timeDiff / (1000 * 3600 * 24).toFixed(0); // mearsuers dayss...
    let hours = (daysDiff * 24).toFixed(0);


    switch (label) {
      case "measurementDays":
        return daysDiff ? parseInt(daysDiff) : "";
      case "measure_tat":
        return daysDiff > 1 ? "OUT TAT" : "IN TAT";
      case "installationDays":
        return installation_daysDiff ? parseInt(installation_daysDiff) : "";
      case "installation_tat":
        return installation_daysDiff > 1 ? "OUT TAT" : "IN TAT";
      case "estimateDays":
        return estimate_daysDiff ? parseInt(estimate_daysDiff) : "";
      case "estimate_tat":
        return estimate_daysDiff > 2 ? "OUT TAT" : "IN TAT";
      case "orderDays":
        return orders_daysDiff ? parseInt(orders_daysDiff) : "";
      case "order_tat":
        return orders_daysDiff > 2 ? "OUT TAT" : "IN TAT";
      case "qc1Days":
        return qc1_daysDiff ? parseInt(qc1_daysDiff) : "";
      case "qc1_tat":
        return qc1_daysDiff > 1 ? "OUT TAT" : "IN TAT";
      case "qc2Days":
        return qc2_daysDiff ? parseInt(qc2_daysDiff) : "";
      case "qc2_tat":
        return qc2_daysDiff > 3 ? "OUT TAT" : "IN TAT";
      case "qc3Days":
        return qc3_daysDiff ? parseInt(qc3_daysDiff) : "";
      case "qc3_tat":
        return qc3_daysDiff > 1 ? "OUT TAT" : "IN TAT";
      case "feedbackDays":
        return feedback_daysDiff ? parseInt(feedback_daysDiff) : "";
      case "feedback_tat":
        return feedback_daysDiff > 3 ? "OUT TAT" : "IN TAT";
      case "complaintDays":
        return complaint_daysDiff ? parseInt(complaint_daysDiff) : "";
      case "complaint_tat":
        return complaint_daysDiff > 1 ? "OUT TAT" : "IN TAT";
      default:
        return "";
    }


  }

  const tatAndDaysCalculator = (startDate, endDate, label, item) => {
    const startTime = startDate;
    // const startTime = item.createdAt;
    const endTime = endDate;
    // const endTime = item.enquiryschedules.length > 0 ? item.enquiryschedules[item.enquiryschedules.length - 1].updatedAt : item.updatedAt;
    const installationStartTime = item?.installer_tasks.length > 0 ? new Date(`${item?.installer_tasks[item?.installer_tasks?.length - 1]?.date}`) : null;
    const installationEndTime = item?.installer_tasks?.length > 0 ? item?.installer_tasks[item?.installer_tasks?.length - 1]?.installation_done : null;

    const order_date = item?.orders?.length > 0 ? item?.orders[0]?.createdAt : null;

    const sta_received_date = item?.orders?.length > 0 ? item?.orders[0]?.sta_received_date : null;
    const qc1_complete_date = item?.orders?.length > 0 ? item?.orders[0]?.QC_Start : null;
    const qc2_complete_date = item?.orders?.length > 0 ? item?.orders[0]?.QC2_Completed : null;
    const qc3_complete_date = item?.orders?.length > 0 ? item?.orders[0]?.QC_Complete : null;
    const feedback_date = item?.feedback ? item?.feedback?.createdAt : null

    const complaint_date = item?.complaint_tasks?.length && item?.complaint_tasks?.length > 0 ? item?.complaint_tasks[item?.complaint_tasks?.length - 1]?.date : null;

    let complaint_daysDiff = "";
    if (complaint_date && feedback_date) {
      const timeDiff = new Date(complaint_date).getTime() - new Date(feedback_date).getTime();
      complaint_daysDiff = timeDiff / (1000 * 3600 * 24).toFixed(0); // complaint dayssss....
    }

    let installation_daysDiff = "";
    let installation_hours;
    if (installationEndTime && installationStartTime) {
      const timeDiff = new Date(installationEndTime).getTime() - new Date(installationStartTime).getTime();
      installation_daysDiff = timeDiff / (1000 * 3600 * 24).toFixed(0); // installation daysss...
      // installation_hours = (installation_daysDiff * 24).toFixed(0);
    }

    let feedback_daysDiff = "";
    if (installationEndTime && feedback_date) {
      const timeDiff = new Date(installationEndTime).getTime() - new Date(feedback_date).getTime();
      feedback_daysDiff = timeDiff / (1000 * 3600 * 24).toFixed(0); //feed back daysss...
    }

    let orders_daysDiff = "";
    let orders_hours = "";
    if (order_date && item?.estimate_createdAt) {
      const timeDiff = new Date(order_date).getTime() - new Date(item?.estimate_createdAt).getTime();
      orders_daysDiff = timeDiff / (1000 * 3600 * 24).toFixed(0); // order days.....
      orders_hours = (orders_daysDiff * 24).toFixed(0);
    }

    let estimate_daysDiff = "";
    let estimate_hours;
    if (endTime) {
      // const endDate = item?.estimate_createdAt ? item?.estimate_createdAt : new Date();
      const timeDiff = new Date(endDate).getTime() - new Date(endTime).getTime();
      estimate_daysDiff = timeDiff / (1000 * 3600 * 24).toFixed(0); //estimate daysss...
      estimate_hours = (estimate_daysDiff * 24).toFixed(0);
    }

    let qc1_daysDiff = "";
    if (startDate && endDate) {
      const timeDiff = new Date(endDate).getTime() - new Date(startDate).getTime();
      qc1_daysDiff = timeDiff / (1000 * 3600 * 24).toFixed(0); // qc1 dayss....
    }

    let qc2_daysDiff = "";
    if (qc2_complete_date && qc1_complete_date) {
      const timeDiff = new Date(qc2_complete_date).getTime() - new Date(qc1_complete_date).getTime();
      qc2_daysDiff = timeDiff / (1000 * 3600 * 24).toFixed(0); // qc2 days....
    }

    let qc3_daysDiff = "";
    if (qc2_complete_date && qc3_complete_date) {
      const timeDiff = new Date(qc3_complete_date).getTime() - new Date(qc2_complete_date).getTime();
      qc3_daysDiff = timeDiff / (1000 * 3600 * 24).toFixed(0); // qc3 daysss...
    }

    const timeDiff = new Date(endTime).getTime() - new Date(startTime).getTime();
    let daysDiff = timeDiff / (1000 * 3600 * 24).toFixed(0); // mearsuers dayss...
    let hours = (daysDiff * 24).toFixed(0);

    switch (label) {
      case "measurementDays":
        return daysDiff ? parseInt(daysDiff) : "";
      case "measure_tat":
        return daysDiff > 1 ? "OUT TAT" : "IN TAT";
      case "installationDays":
        return daysDiff ? parseInt(daysDiff) : "";
      case "installation_tat":
        return daysDiff > 1 ? "OUT TAT" : "IN TAT";
      case "estimateDays":
        return estimate_daysDiff ? parseInt(estimate_daysDiff) : "";
      case "estimate_tat":
        return daysDiff > 2 ? "OUT TAT" : "IN TAT";
      case "orderDays":
        return orders_daysDiff ? parseInt(orders_daysDiff) : "";
      case "order_tat":
        return daysDiff > 2 ? "OUT TAT" : "IN TAT";
      case "qc1Days":
        console.log("qc1 Dayss diff", qc1_daysDiff)
        return qc1_daysDiff ? parseInt(qc1_daysDiff) : "";
      case "qc1_tat":
        console.log("qc1 tattt diff", daysDiff)
        return qc1_daysDiff > 1 ? "OUT TAT" : "IN TAT";
      case "qc2Days":
        return qc2_daysDiff ? parseInt(qc2_daysDiff) : "";
      case "qc2_tat":
        return daysDiff > 3 ? "OUT TAT" : "IN TAT";
      case "qc3Days":
        return qc3_daysDiff ? parseInt(qc3_daysDiff) : "";
      case "qc3_tat":
        return daysDiff > 1 ? "OUT TAT" : "IN TAT";
      case "feedbackDays":
        return feedback_daysDiff ? parseInt(feedback_daysDiff) : "";
      case "feedback_tat":
        return daysDiff > 3 ? "OUT TAT" : "IN TAT";
      case "complaintDays":
        return complaint_daysDiff ? parseInt(complaint_daysDiff) : "";
      case "complaint_tat":
        return daysDiff > 1 ? "OUT TAT" : "IN TAT";
      default:
        return "";
    }

  }

  const GetAllEnquiry = (pageNo, filters) => {
    // const API=
    setEnquiryStates((prev) => ({
      ...prev,
      enquiryData: [],
      tableLoading: true,
      // AllEnquiryPagination: response?.pagination
      // enquiryDownloadLink: dwnUrl,
    }))
    const filter = filters ? filters : "";
    GetDataWithToken(`superadmin/storewise-all-enquiry?page=${pageNo}&limit=10&fromDate=${enquiryStates?.startDate}&toDate=${enquiryStates?.endDate}&salesId=${enquiryStates?.selectedSalesPerson}&search=${enquiryStates?.searchEnquiryValue}&storeId=${enquiryStates?.selectedStore}${filter}&status=${enquiryStates?.enquiryTableStatusValue}`).then((response) => {
      if (response.status) {
        const newData = response?.data?.map(data => ({
          ...data,
          address: data?.landmark ? `${data.landmark} ${data?.city},${data?.state},${data?.pincode}` : `${data.address} ${data?.city},${data?.state},${data?.pincode}`,
          // address: data?.landmark || data?.address,
          measure_tat: responseSetHandler(data, "measure_tat"),
          products: data?.products?.map((data) => `${data}`),
          feedbackDate: momentDateHandler(data?.feedback?.createdAt),
          estimateDays: responseSetHandler(data, "estimateDays"),
          orderDays: responseSetHandler(data, "orderDays"),
          order_tat: responseSetHandler(data, "order_tat"),
          qc1Days: responseSetHandler(data, "qc1Days"),
          qc2Days: responseSetHandler(data, "qc2Days"),
          qc3Days: responseSetHandler(data, "qc3Days"),
          qc1_tat: responseSetHandler(data, "qc1_tat"),
          qc2_tat: responseSetHandler(data, "qc2_tat"),
          qc3_tat: responseSetHandler(data, "qc3_tat"),


          feedback_tat: responseSetHandler(data, "feedback_tat"),
          feedbackDays: responseSetHandler(data, "feedbackDays"),
          complaintDays: responseSetHandler(data, "complaintDays"),
          complaint_tat: responseSetHandler(data, "complaint_tat"),
          complaintDays: responseSetHandler(data, "estimate_tat"),
          installation_tat: responseSetHandler(data, "installation_tat"),
          // feedbackDate: moment(data?.feedback?.createdAt).format('MMMM Do YYYY, h:mm:ss a'),

          installation_done: momentDateHandler(data?.installer_tasks[data?.installer_tasks?.length - 1]?.installation_done),
          installationStartDate: momentDateHandler(data?.installer_tasks[data?.installer_tasks?.length - 1]?.createdAt),
          installationDays: responseSetHandler(data, "installationDays"),
          installerName: data?.installer_tasks?.length > 0 ? `${data?.installer_tasks[data?.installer_tasks?.length - 1]?.installer?.firstName} ${data?.installer_tasks[data?.installer_tasks?.length - 1]?.installer?.lastName}` : "",
          QC_Start: momentDateHandler(data?.orders?.[0]?.QC_Start),
          QC_Complete: momentDateHandler(data?.orders?.[0]?.QC_Complete),
          QC2_Completed: momentDateHandler(data?.orders?.[0]?.QC2_Completed),
          orderDate: momentDateHandler(data?.orders?.[0]?.orderDate),
          sta_received_date: momentDateHandler(data?.orders?.[0]?.sta_received_date),
          estimate_postpone_date: data?.estimate_postpone_date && momentDateHandler(data?.estimate_postpone_date),
          measurementDays: responseSetHandler(data, "measurementDays"),
          estimateDate: data?.estimate_createdAt && moment(data?.estimate_createdAt).format("DD-MM-YYYY"),
          re_measurement_Count: data.enquiryschedules.length == 0 ? "" : data.enquiryschedules.reduce((count, element) => element.status === "postponed" ? count + 1 : count, 0),
          re_measurement_Date: data.enquiryschedules.reduce((count, element) => element.status === "postponed" ? count + 1 : count, 0) > 0 && moment(data?.enquiryschedules?.date).format("DD-MM-YYYY"),
          re_measurement_reason: data?.enquiryschedules[data?.enquiryschedules?.length - 1]?.remark,
          measurementDate: data?.enquiryschedules[data?.enquiryschedules?.length - 1]?.status === "completed" ? momentDateHandler(data?.enquiryschedules[data?.enquiryschedules?.length - 1]?.updatedAt) : "",
          customerName: `${data?.customer?.firstName} ${data?.customer?.lastName}`,
          icName: `${data?.user?.firstName} ${data?.user?.lastName}`,
          measurerName: data?.enquiryschedules?.length > 0 ? `${data?.enquiryschedules[data?.enquiryschedules?.length - 1]?.user?.firstName} ${data?.enquiryschedules[data?.enquiryschedules?.length - 1]?.user?.lastName}` : ""
        }));
        setEnquiryStates((prev) => ({
          ...prev,
          enquiryData: newData,
          AllEnquiryPagination: response?.pagination,
          tableLoading: false,
          // enquiryDownloadLink: dwnUrl,
        }))
      }
    })
  }

  const visibleColumnCheckHandler = (header) => {
    return visibleColumns.some(col => col?.label === header);
  };

  const handlePangeChange = (data) => {
    console.log("pagination Dataaa///..", data);
    setEnquiryStates((prev) => ({
      ...prev,
      AllEnquiryPagination: {
        ...prev?.AllEnquiryPagination,
        currentPage: data,
        // pageSize: data.rowsPerPage
      }
    }))
    GetAllEnquiry(data);
  }

  const filterClickHandler = (value, key, value1, key1) => {
    console.log("new datatataa", value, key, key1, value1);
    setEnquiryStates((prev) => ({
      ...prev,
      [key]: value || "",
      [key1]: value1 || "",
    }));
    // GetAllEnquiry(1);
    setGraphFilterDropdownOpen(false);
    setFilterDropdownOpen(false);
    if (key == "selectedChartStoreId" || key == "selectedStore") {
      GetSalesPerson("", value);
    }
  }

  const downloadHandler = () => {
    const ApiUrl = `api/v1/superadmin/storewise-total?page=${enquiryStates?.AllEnquiryPagination?.currentPage}&limit=10&fromDate=${enquiryStates?.startDate}&toDate=${enquiryStates?.endDate}&salesId=${enquiryStates?.selectedSalesPerson}&storeId=${enquiryStates?.selectedStore}&status=${enquiryStates?.enquiryTableStatusValue}`
    DownloadReportFunction(ApiUrl, setLoadingData, "Enquiry");
  }

  const formatNumber = (num) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(2) + 'B';
    } else if (num >= 1000000) {
      return (num / 1000000).toFixed(2) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(2) + 'K';
    } else {
      return num;
    }
  };

  const searchEnquiryHandler = (event) => {
    // console.log("new search query...", );
    let value = event.target?.searchData?.value;
    setEnquiryStates((prev) => ({
      ...prev,
      searchEnquiryValue: value,
      currentPage: 1,
    }));
  }

  useEffect(() => {
    EnquiryListHandler();
  }, [enquiryStates?.enquiryPages?.currentPage])

  const EnquiryListHandler = (status = "") => {
    let enqUrl = `superadmin/storewise-all-enquiry?page=${enquiryStates?.enquiryPages?.currentPage || 1}&limit=10&fromDate=&toDate=&salesId=${outletManagerStore || ""}&search=&storeId=&status=${status}`
    GetDataWithToken(enqUrl).then((response) => {
      if (response.status == true) {
        const tableData = response?.data?.map((item) => ({
          ...item,
          enquiryDate: moment(item?.createdAt).format('DD-MM-YYYY'),
          customerName: `${item?.customer?.firstName} ${item?.customer?.lastName}`,
          product: item?.products?.map((pro) => `${pro},`),
          icName: `${item?.user?.firstName} ${item?.user?.lastName}`
        }))

        setEnquiryStates((prev) => ({
          ...prev,
          enquiryDetailData: tableData,
          enquiryPages: response?.pagination
          // searchEnquiryValue: value,
          // currentPage: 1,
        }));
      }
    })
  };

  const feedbackOverdueHandler = () => {
    let columnDataName = columnStatusHandler("Feedback");
    setColumnName(columnDataName);
    let rowDataName = rowStatusHandler("Overdue");
    setRowName(rowDataName);
    setCallApi(true);
    toggleMainEnquirySummary2();
  }

  return (
    <>

      <div className="content-body">
        {/*--- row ---*/}
        <div className="container-fluid">
          {LoadingData ? (
            <div className="text-center">
              <Spinner />
              <p>Downloading Please Wait...</p>
            </div>
          ) : (
            <div className="dashboard">
              <div className="dash-head mb-4">
                {/* <span>Welcome to</span> */}
                <h3 className="">{outletManagerStore ? "Outlet Manager" : "Super admin"} Dashboard</h3>
              </div>
              <div className="row">

                <div class="col-xl-2 col-md-6 col-6 p-2"
                // onClick={() => {
                //   Enquirytoggle();
                //   setEnquiryStates((prev) => ({
                //     ...prev,
                //     enquiryModalUrl: `superadmin/storewise-all-enquiry?page=1&limit=10&fromDate=&toDate=&salesId=${outletManagerStore || ""}&search=&storeId=`
                //   }))
                //   EnquiryListHandler('');
                // }}
                ><div class="card booking cursor-pointer" >
                    <div class="card-body">
                      <div class="booking-status h-100 justify-content-between d-flex flex-column align-items-center">
                        <div class="d-flex gap-1 w-100 align-items-center justify-content-between">
                          <span>
                            <img src={`${process.env.PUBLIC_URL}/images/totalEnquiry.svg`} />
                          </span>
                          <h2 class="mb-0 font-w600">
                            {AllDashboardData?.totalEnquiry?.enquiry}</h2>
                        </div>
                        <div class="">
                          <p class="mb-0 text-wrap">Total Enquiry</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-xl-2 col-md-6 col-6 p-2"><div class="card booking cursor-pointer" >
                  <div class="card-body">
                    <div class="booking-status h-100 justify-content-between d-flex flex-column align-items-center">
                      <div class="d-flex gap-1 w-100 align-items-center justify-content-between">
                        <span>
                          <img src={`${process.env.PUBLIC_URL}/images/businessValue.svg`} />
                        </span>
                        <h2 class="mb-0 font-w600">
                          {formatNumber(AllDashboardData?.totalEnquiry?.business_value || 0)}</h2>
                      </div>
                      <div class="">
                        <p class="mb-0 text-wrap">Business Value</p>
                      </div>
                    </div>
                  </div>
                </div>
                </div>

                <div
                  className="col-xl-2 col-md-6 col-6 p-2"
                  // onClick={() =>
                  //   GetStorwiseAllEnquiryDetail(
                  //     AllDashboardData?.measurementPending?.view_url,
                  //     AllDashboardData?.measurementPending?.url
                  //   )
                  // }
                  onClick={() => {
                    Enquirytoggle();
                    EnquiryListHandler("fresh");
                  }}
                ><div class="card booking cursor-pointer" >
                    <div class="card-body">
                      <div class="booking-status h-100 justify-content-between d-flex flex-column align-items-center">
                        <div class="d-flex gap-1 w-100 align-items-center justify-content-between">
                          <span>
                            <img src={`${process.env.PUBLIC_URL}/images/newEnquiry.svg`} />
                          </span>
                          <h2 class="mb-0 font-w600">
                            {AllDashboardData?.totalEnquiry?.new_enquiry}</h2>
                        </div>
                        <div class="">
                          <p class="mb-0 text-wrap">New Enquiry</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-xl-2 col-md-6 col-6 p-2"><div class="card booking cursor-pointer" >
                  <div class="card-body">
                    <div class="booking-status h-100 justify-content-between d-flex flex-column align-items-center">
                      <div class="d-flex gap-1 w-100 align-items-center justify-content-between">
                        <span>
                          <img src={`${process.env.PUBLIC_URL}/images/completeEnquiry.svg`} />
                        </span>
                        <h2 class="mb-0 font-w600">
                          {AllDashboardData?.completedEnquiry?.enquiry}</h2>
                      </div>
                      <div class="">
                        <p class="mb-0 text-wrap">Complete Enq.</p>
                      </div>
                    </div>
                  </div>
                </div>
                </div>

                <div class="col-xl-2 col-md-6 col-6 p-2"><div class="card booking cursor-pointer" >
                  <div class="card-body">
                    <div class="booking-status h-100 justify-content-between d-flex flex-column align-items-center">
                      <div class="d-flex gap-1 w-100 align-items-center justify-content-between">
                        <span>
                          <img src={`${process.env.PUBLIC_URL}/images/cancelEn.svg`} />
                        </span>
                        <h2 class="mb-0 font-w600">
                          {AllDashboardData?.cancelledEnquiry?.enquiry}</h2>
                      </div>
                      <div class="">
                        <p class="mb-0 text-wrap">Cancel Enquiry</p>
                      </div>
                    </div>
                  </div>
                </div>
                </div>

                <div class="col-xl-2 col-md-6 col-6 p-2">
                  <div
                    class="card booking cursor-pointer"

                  >
                    <div class="card-body">
                      <div class="booking-status h-100 justify-content-between d-flex flex-column align-items-center">

                        <div class="d-flex gap-1 w-100 align-items-center justify-content-between">
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              version="1.1"
                              width="512" height="512" x="0" y="0" viewBox="0 0 512 512" class=""><g><path d="M436.998 430.258h33.824a5 5 0 0 0 5-5V12.5a5 5 0 0 0-5-5H139.004a5 5 0 0 0-5 5v33.824" style={{ strokeWidth: "15", strokeLinecap: "round", strokeLinejoin: "round", strokeMiterlimit: "10" }} fill="none" stroke="#000000" stroke-width="15" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" data-original="#000000" class=""></path><path d="M436.998 352V51.324a5 5 0 0 0-5-5H100.179a5 5 0 0 0-5 5V151M201.797 469.083h230.201a5 5 0 0 0 5-5V387M95.179 186v136.89M152.939 285.214h21.243M198.685 285.214h21.244M245.182 285.214h134.057M288.162 326.598H170.027M276.788 367.981h-64.874M288.162 409.365h-65.997c.006.437.033.869.033 1.307" style={{ strokeWidth: 15, strokeLinecap: "round", strokeLinejoin: "round", strokeMiterlimit: "10" }} fill="none" stroke="#000000" stroke-width="15" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" data-original="#000000" class=""></path><circle cx="349.924" cy="367.981" r="44.703" style={{ strokeWidth: 15, strokeLinecap: "round", strokeLinejoin: "round", strokeMiterlimit: "10" }} fill="none" stroke="#000000" stroke-width="15" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" data-original="#000000" class=""></circle><path d="m364.066 353.84-28.283 28.283M335.783 353.84l28.283 28.283M152.939 106.042h106.79M152.939 147.426h84.044M152.939 188.809h71.533M152.939 230.193h226.3M308.427 86.744l-45.205 78.298c-6.099 10.564 1.525 23.768 13.722 23.768h90.41c12.198 0 19.821-13.204 13.722-23.768l-45.205-78.298c-6.098-10.564-21.345-10.564-27.444 0zM322.149 111.622v26.158M322.149 161.22v3.412M36.177 428.172c8.199 43.455 46.353 76.328 92.192 76.328 51.82 0 93.828-42.008 93.828-93.828s-42.008-93.828-93.828-93.828c-45.839 0-83.993 32.873-92.192 76.328" style={{ strokeWidth: 15, strokeLinecap: "round", strokeLinejoin: "round", strokeMiterlimit: "10" }} fill="none" stroke="#000000" stroke-width="15" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" data-original="#000000" class=""></path><path d="M92.654 448.808c0-19.725 15.99-35.715 35.715-35.715s35.715 15.99 35.715 35.715M103.55 368.903v10.896M153.188 379.799v-10.896" style={{ strokeWidth: 15, strokeLinecap: "round", strokeLinejoin: "round", strokeMiterlimit: "10" }}
                                fill="none" stroke="#000000" stroke-width="15" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" data-original="#000000" class=""></path></g>
                            </svg>
                          </span>
                          <h2 class="mb-0 font-w600">
                            {AllDashboardData?.totalComplaints?.enquiry}</h2>
                          <div className="border border-2 p-2" onClick={() => DownloadReportFunction(null, setLoadingData, "Complaints", AllDashboardData?.totalComplaints?.url)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" fill="#b39355" height="16" viewBox="0 0 512 512"><path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 242.7-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7 288 32zM64 352c-35.3 0-64 28.7-64 64l0 32c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-32c0-35.3-28.7-64-64-64l-101.5 0-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352 64 352zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"></path></svg>
                          </div>
                        </div>
                        <div class="">
                          <p class="mb-0 text-wrap">Total Complaint</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="col-xl-2 col-md-6 col-6 p-2"
                  onClick={() => feedbackOverdueHandler()}
                >
                  <div
                    class="card booking cursor-pointer"

                  >
                    <div class="card-body">
                      <div class="booking-status h-100 justify-content-between d-flex flex-column align-items-center">

                        <div class="d-flex gap-1 w-100 align-items-center justify-content-between">
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              version="1.1"
                              width="51" height="51" x="0" y="0" viewBox="0 0 512 512" class=""><g><path d="M436.998 430.258h33.824a5 5 0 0 0 5-5V12.5a5 5 0 0 0-5-5H139.004a5 5 0 0 0-5 5v33.824" style={{ strokeWidth: "15", strokeLinecap: "round", strokeLinejoin: "round", strokeMiterlimit: "10" }} fill="none" stroke="#000000" stroke-width="15" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" data-original="#000000" class=""></path><path d="M436.998 352V51.324a5 5 0 0 0-5-5H100.179a5 5 0 0 0-5 5V151M201.797 469.083h230.201a5 5 0 0 0 5-5V387M95.179 186v136.89M152.939 285.214h21.243M198.685 285.214h21.244M245.182 285.214h134.057M288.162 326.598H170.027M276.788 367.981h-64.874M288.162 409.365h-65.997c.006.437.033.869.033 1.307" style={{ strokeWidth: 15, strokeLinecap: "round", strokeLinejoin: "round", strokeMiterlimit: "10" }} fill="none" stroke="#000000" stroke-width="15" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" data-original="#000000" class=""></path><circle cx="349.924" cy="367.981" r="44.703" style={{ strokeWidth: 15, strokeLinecap: "round", strokeLinejoin: "round", strokeMiterlimit: "10" }} fill="none" stroke="#000000" stroke-width="15" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" data-original="#000000" class=""></circle><path d="m364.066 353.84-28.283 28.283M335.783 353.84l28.283 28.283M152.939 106.042h106.79M152.939 147.426h84.044M152.939 188.809h71.533M152.939 230.193h226.3M308.427 86.744l-45.205 78.298c-6.099 10.564 1.525 23.768 13.722 23.768h90.41c12.198 0 19.821-13.204 13.722-23.768l-45.205-78.298c-6.098-10.564-21.345-10.564-27.444 0zM322.149 111.622v26.158M322.149 161.22v3.412M36.177 428.172c8.199 43.455 46.353 76.328 92.192 76.328 51.82 0 93.828-42.008 93.828-93.828s-42.008-93.828-93.828-93.828c-45.839 0-83.993 32.873-92.192 76.328" style={{ strokeWidth: 15, strokeLinecap: "round", strokeLinejoin: "round", strokeMiterlimit: "10" }} fill="none" stroke="#000000" stroke-width="15" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" data-original="#000000" class=""></path><path d="M92.654 448.808c0-19.725 15.99-35.715 35.715-35.715s35.715 15.99 35.715 35.715M103.55 368.903v10.896M153.188 379.799v-10.896" style={{ strokeWidth: 15, strokeLinecap: "round", strokeLinejoin: "round", strokeMiterlimit: "10" }}
                                fill="none" stroke="#000000" stroke-width="15" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" data-original="#000000" class=""></path></g>
                            </svg>
                          </span>
                          <h2 class="mb-0 font-w600">
                            {AllDashboardData?.feedback?.enquiry}</h2>
                        </div>
                        <div class="">
                          <p class="mb-0 text-wrap">Overdue Feedbacks</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* -------------------------------- */}
                <div class="col-xl-2 col-md-6 col-6 p-2">
                  <div
                    class="card booking cursor-pointer"

                  >
                    <div class="card-body">
                      <div class="booking-status h-100 justify-content-between d-flex flex-column align-items-center">

                        <div class="d-flex gap-1 w-100 align-items-center justify-content-between">
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              version="1.1"
                              width="512" height="512" x="0" y="0" viewBox="0 0 512 512" class=""><g><path d="M436.998 430.258h33.824a5 5 0 0 0 5-5V12.5a5 5 0 0 0-5-5H139.004a5 5 0 0 0-5 5v33.824" style={{ strokeWidth: "15", strokeLinecap: "round", strokeLinejoin: "round", strokeMiterlimit: "10" }} fill="none" stroke="#000000" stroke-width="15" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" data-original="#000000" class=""></path><path d="M436.998 352V51.324a5 5 0 0 0-5-5H100.179a5 5 0 0 0-5 5V151M201.797 469.083h230.201a5 5 0 0 0 5-5V387M95.179 186v136.89M152.939 285.214h21.243M198.685 285.214h21.244M245.182 285.214h134.057M288.162 326.598H170.027M276.788 367.981h-64.874M288.162 409.365h-65.997c.006.437.033.869.033 1.307" style={{ strokeWidth: 15, strokeLinecap: "round", strokeLinejoin: "round", strokeMiterlimit: "10" }} fill="none" stroke="#000000" stroke-width="15" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" data-original="#000000" class=""></path><circle cx="349.924" cy="367.981" r="44.703" style={{ strokeWidth: 15, strokeLinecap: "round", strokeLinejoin: "round", strokeMiterlimit: "10" }} fill="none" stroke="#000000" stroke-width="15" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" data-original="#000000" class=""></circle><path d="m364.066 353.84-28.283 28.283M335.783 353.84l28.283 28.283M152.939 106.042h106.79M152.939 147.426h84.044M152.939 188.809h71.533M152.939 230.193h226.3M308.427 86.744l-45.205 78.298c-6.099 10.564 1.525 23.768 13.722 23.768h90.41c12.198 0 19.821-13.204 13.722-23.768l-45.205-78.298c-6.098-10.564-21.345-10.564-27.444 0zM322.149 111.622v26.158M322.149 161.22v3.412M36.177 428.172c8.199 43.455 46.353 76.328 92.192 76.328 51.82 0 93.828-42.008 93.828-93.828s-42.008-93.828-93.828-93.828c-45.839 0-83.993 32.873-92.192 76.328" style={{ strokeWidth: 15, strokeLinecap: "round", strokeLinejoin: "round", strokeMiterlimit: "10" }} fill="none" stroke="#000000" stroke-width="15" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" data-original="#000000" class=""></path><path d="M92.654 448.808c0-19.725 15.99-35.715 35.715-35.715s35.715 15.99 35.715 35.715M103.55 368.903v10.896M153.188 379.799v-10.896" style={{ strokeWidth: 15, strokeLinecap: "round", strokeLinejoin: "round", strokeMiterlimit: "10" }}
                                fill="none" stroke="#000000" stroke-width="15" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" data-original="#000000" class=""></path></g>
                            </svg>
                          </span>
                          <h2 class="mb-0 font-w600">
                            {AllDashboardData?.pending_order?.order}</h2>
                          <div className="border border-2 p-2" onClick={() => DownloadReportFunction(null, setLoadingData, "Pending-Order", AllDashboardData?.pending_order?.url)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" fill="#b39355" height="16" viewBox="0 0 512 512"><path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 242.7-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7 288 32zM64 352c-35.3 0-64 28.7-64 64l0 32c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-32c0-35.3-28.7-64-64-64l-101.5 0-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352 64 352zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"></path></svg>
                          </div>
                        </div>
                        <div class="">
                          <p class="mb-0 text-wrap">Pending Order Report</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ---------------------------------- */}
                <div className="col-xl-3 col-sm-6 d-none">
                  <div
                    style={{ cursor: "pointer" }}
                    className="card booking"
                    onClick={() =>
                      GetStorwiseAllEnquiryDetail(
                        AllDashboardData?.feedback?.view_url,
                        AllDashboardData?.feedback?.url
                      )
                    }
                  >
                    <div className="card-body">
                      <div className="booking-status d-flex align-items-start">
                        <span>
                          <img alt="" src="./images/qFollowup.svg" />
                        </span>
                        <div className="ms-4">
                          <p className="mb-0">Customer Feedback</p>
                          <h2 className="mb-0 font-w600">
                            {AllDashboardData?.feedback?.enquiry}
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-6 d-none">
                  <div
                    style={{ cursor: "pointer" }}
                    className="card booking"
                    onClick={() =>
                      GetStorwiseAllEnquiryDetail(
                        AllDashboardData?.estimateShared?.view_url,
                        AllDashboardData?.estimateShared?.url
                      )
                    }
                  >
                    <div className="card-body">
                      <div className="booking-status d-flex align-items-center">
                        <span>
                          <img alt="" src={`${process.env.PUBLIC_URL}/images/delivery.svg`} />
                        </span>
                        <div className="ms-4">
                          <h2 className="mb-0 font-w600">
                            {AllDashboardData?.estimateShared?.enquiry}
                          </h2>
                          <p className="mb-0">Pending Share Estimates</p>
                          {/* <button
                                    onClick={() => DownloadReportHandler(AllDashboardData?.estimateShared?.url)}
                                    className="btn btn-primary"
                                  >
                                    Download
                                  </button> */}
                          {/* <button
                                    onClick={() => columnHandler("MEASUREMENT", AllDashboardData.estimateShared?.enquiry, "Closed")}
                                    className="btn btn-primary mt-2"
                                  >
                                    View
                                  </button> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-6 d-none">
                  <div
                    style={{ cursor: "pointer" }}
                    className="card booking"
                    onClick={() =>
                      GetStorwiseAllEnquiryDetail(
                        AllDashboardData?.QC1_Complete?.view_url,
                        AllDashboardData?.QC1_Complete?.url
                      )
                    }
                  >
                    <div className="card-body">
                      <div className="booking-status d-flex align-items-center">
                        <span>
                          <img alt="" src={`${process.env.PUBLIC_URL}/images/purchase_order.svg`} />
                        </span>
                        <div className="ms-4">
                          <h2 className="mb-0 font-w600">
                            {AllDashboardData?.QC1_Complete?.enquiry}
                          </h2>
                          <p className="mb-0">Material in Production</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-6 d-none">
                  <div
                    style={{ cursor: "pointer" }}
                    className="card booking"
                    onClick={() =>
                      GetStorwiseAllEnquiryDetail(
                        AllDashboardData?.QC2_Complete?.view_url,
                        AllDashboardData?.QC2_Complete?.url
                      )
                    }
                  >
                    <div className="card-body">
                      <div className="booking-status d-flex align-items-center">
                        <span>
                          <img alt="" src={`${process.env.PUBLIC_URL}/images/purchase_order.svg`} />
                        </span>
                        <div className="ms-4">
                          <h2 className="mb-0 font-w600">
                            {AllDashboardData?.QC2_Complete?.enquiry}
                          </h2>
                          <p className="mb-0">QC Done</p>
                          {/* <button
                                    onClick={() => DownloadReportHandler(AllDashboardData?.QC2_Complete?.url)}
                                    className="btn btn-primary"
                                  >
                                    Download
                                  </button> */}
                          {/* <button
                                    onClick={() => columnHandler("ORDER", AllDashboardData.QC2_Complete?.enquiry, "QC2")}
                                    className="btn btn-primary mt-2"
                                  >
                                    View
                                  </button> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-6 d-none">
                  <div
                    style={{ cursor: "pointer" }}
                    className="card booking"
                    onClick={() =>
                      GetStorwiseAllEnquiryDetail(
                        AllDashboardData?.qcComplete?.view_url,
                        AllDashboardData?.qcComplete?.url
                      )
                    }
                  >
                    <div className="card-body text-align-center">
                      <div className="booking-status d-flex align-items-center">
                        <span>
                          <img alt="" src={`${process.env.PUBLIC_URL}/images/measurement.svg`} />
                        </span>
                        <div className="ms-4">
                          <h2 className="mb-0 font-w600">
                            {AllDashboardData?.qcComplete?.enquiry}
                          </h2>
                          <p className="mb-0">Ready to Delivery</p>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-6 d-none">
                  <div
                    style={{ cursor: "pointer" }}
                    className="card booking"
                    onClick={() =>
                      GetStorwiseAllEnquiryDetail(
                        AllDashboardData?.totalComplaints?.view_url,
                        AllDashboardData?.totalComplaints?.url
                      )
                    }
                  >
                    <div className="card-body">
                      <div className="booking-status d-flex align-items-center">
                        <span>
                          <img alt="" src={`${process.env.PUBLIC_URL}/images/qFollowup.svg`} />
                        </span>
                        <div className="ms-4">
                          <h2 className="mb-0 font-w600">
                            {AllDashboardData?.totalComplaints?.enquiry}
                          </h2>
                          <p className="mb-0">Pending Complaints</p>
                          {/* <button
                                    onClick={() => DownloadReportHandler(AllDashboardData?.totalComplaints?.url)}
                                    className="btn btn-primary"
                                  >
                                    Download
                                  </button> */}
                          {/* <button
                                    onClick={() => columnHandler2("pendingComplaint")}
                                    className="btn btn-primary mt-2"
                                  >
                                    View
                                  </button> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-6 d-none">
                  <div
                    style={{ cursor: "pointer" }}
                    className="card booking"
                    onClick={() =>
                      GetStorwiseAllEnquiryDetail(
                        AllDashboardData?.wcr?.view_url,
                        AllDashboardData?.wcr?.url,
                        true
                      )
                    }
                  >
                    <div className="card-body">
                      <div className="booking-status d-flex align-items-center">
                        <span>
                          <img alt="" src={`${process.env.PUBLIC_URL}/images/qFollowup.svg`} />
                        </span>
                        <div className="ms-4">
                          <h2 className="mb-0 font-w600">
                            {AllDashboardData?.wcr?.enquiry}
                          </h2>
                          <p className="mb-0">WCR</p>
                          {/* <button
                                    onClick={() => DownloadReportHandler(AllDashboardData?.wcr?.url)}
                                    className="btn btn-primary"
                                  >
                                    Download
                                  </button> */}
                          {/* <button
                                    onClick={() => columnHandler2("wcr")}
                                    // onClick={() => columnHandler("INSTALLATION",AllDashboardData.measurementPending?.enquiry,"Closed")}
                                    className="btn btn-primary mt-2"
                                  >
                                    View
                                  </button> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-6 d-none">
                  <div
                    style={{ cursor: "pointer" }}
                    className="card booking"
                    onClick={() =>
                      GetStorwiseAllEnquiryDetail(
                        AllDashboardData?.cancelledEnquiry?.view_url,
                        AllDashboardData?.cancelledEnquiry?.url
                      )
                    }
                  >
                    <div className="card-body">
                      <div className="booking-status d-flex align-items-center">
                        <span>
                          <img alt="" src={`${process.env.PUBLIC_URL}/images/qFollowup.svg`} />
                        </span>
                        <div className="ms-4">
                          <h2 className="mb-0 font-w600">
                            {AllDashboardData?.cancelledEnquiry?.enquiry}
                          </h2>
                          <p className="mb-0">Cancelled Enquiries</p>
                          {/* <button
                                    onClick={() => DownloadReportHandler(AllDashboardData?.cancelledEnquiry?.url)}
                                    className="btn btn-primary"
                                  >
                                    Download
                                  </button> */}
                          {/* <button
                                    onClick={() => columnHandler2("wcr")}
                                    // onClick={() => columnHandler("INSTALLATION",AllDashboardData.measurementPending?.enquiry,"Closed")}
                                    className="btn btn-primary mt-2"
                                  >
                                    View
                                  </button> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-1">
                    <div>
                      <DatePicker
                        value={
                          enquiryStates?.chartStartDate ? new Date(enquiryStates.chartStartDate) : null}

                        onChange={(value) => {
                          console.log(value);
                          filterClickHandler(value ? moment(value).format("YYYY-MM-DD") : "",
                            "chartStartDate"
                          );
                        }}
                        cleanable={false}
                      />
                    </div>
                    <Dropdown isOpen={graphFilterDropdownOpen} toggle={toggleGraphFilterDropdown}
                    >
                      <DropdownToggle
                        className="filter-dropdown-toggle px-3 py-2 "
                      >
                        <span className="" ><svg
                          height={"16px"} width={"16px"}
                          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#a58144" d="M3.9 54.9C10.5 40.9 24.5 32 40 32l432 0c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9 320 448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6l0-79.1L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z" /></svg></span> Filter</DropdownToggle>
                      <DropdownMenu className="filter-dropdown">
                        <Accordion open={filterGraphAccordianopen} toggle={filterGraphAccordiantoggle}>
                          {!outletManagerStore && <AccordionItem>
                            <AccordionHeader className={"py-1 dash-accordion-header"} targetId="1">Store
                              {enquiryStates?.selectedChartStoreName && <span className="ms-3">
                                <strong>{enquiryStates?.selectedChartStoreName}</strong>
                                <span onClick={() => filterClickHandler("",
                                  "selectedChartStoreId", "", "selectedChartStoreName")}>X</span>
                              </span>}
                            </AccordionHeader>
                            <AccordionBody accordionId="1">
                              <div className="d-flex flex-column">
                                <ul
                                  class="list-group"
                                  style={{ height: "200px", overflow: "auto" }}
                                >
                                  {/* <li class="list-group-item py-2"><input type="text" className="form-control" placeholder="search..." /></li> */}
                                  {enquiryStates?.AllStoreList?.map(item => <li

                                    class="list-group-item cursor-pointer"
                                    onClick={() => filterClickHandler(item?.id,
                                      "selectedChartStoreId", `${item?.firstName}`, "selectedChartStoreName")}
                                  >{item?.firstName}</li>)}
                                </ul>
                              </div>
                            </AccordionBody>
                          </AccordionItem>}
                          <AccordionItem>
                            <AccordionHeader
                              className={"py-1 dash-accordion-header"}
                              targetId="2">Sales Person
                              {enquiryStates?.selectedChartSalesPersonName && <span className="ms-3">
                                <strong>{enquiryStates?.selectedChartSalesPersonName}</strong>
                                <span onClick={() => filterClickHandler("", "selectedChartSalesPersonId",
                                  "", "selectedChartSalesPersonName")}>X</span>
                              </span>}
                            </AccordionHeader>
                            <AccordionBody accordionId="2">
                              <div className="d-flex flex-column">

                                <input type="text"
                                  className="form-control mb-2" placeholder="search..."
                                  onChange={(e) => {
                                    setEnquiryStates(prev => ({
                                      ...prev,
                                      AllSalesPersonList: [],
                                    }));
                                    GetSalesPerson(e?.target?.value, enquiryStates?.selectedChartStoreId)
                                  }}
                                />
                                <ul class="list-group"
                                  style={{ height: "200px", overflow: "auto" }}
                                >
                                  {enquiryStates?.AllSalesPersonList?.map(item => <li
                                    class="list-group-item cursor-pointer"
                                    onClick={() => filterClickHandler(item?.id, "selectedChartSalesPersonId",
                                      `${item?.firstName} ${item?.lastName}`, "selectedChartSalesPersonName")}
                                  >{item?.firstName} {item?.lastName}</li>)}
                                </ul>
                              </div>
                            </AccordionBody>
                          </AccordionItem>

                        </Accordion>

                      </DropdownMenu>
                    </Dropdown>
                  </div>
                  <ReactApexChart
                    className="mb-4"
                    options={dashboarChart1?.options}
                    series={dashboarChart1?.series}
                    type="bar"
                    width="100%"
                    height={350}
                  />
                </div>
              </div>
              {/* tabs start  */}

              <div className="card">
                <div className="card-body px-1 mx-3">
                  <div className="d-flex justify-content-between align">
                    <div class="d-flex col-sm-4 position-relative">
                      <span className="position-absolute"
                        style={{ position: 'absolute', top: "6px", left: "10px" }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg"
                          width="14" height={"14"}
                          viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" /></svg>
                      </span>
                      <form
                        onSubmit={(event) => {
                          event.preventDefault();
                          searchEnquiryHandler(event);
                        }}
                        className="d-flex"
                      >
                        <input className="form-control"
                          placeholder="Search..."
                          name="searchData"
                        // onChange={searchEnquiryHandler}

                        />
                        <button
                          className="filter-dropdown-toggle px-3 py-2 btn btn-secondary ms-2"
                        >Search</button>
                      </form>
                    </div>
                    <div className="dropdown">
                      <button
                        // type="button"
                        // className="form-control"
                        // className="btn  btn-sm"
                        onClick={downloadHandler}
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
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between ">
                    <div>
                      <DateRangePicker
                        onChange={(value) => {
                          console.log(value);
                          filterClickHandler(value?.[0] ? moment(value?.[0]).format("YYYY-MM-DD") : "", "startDate", value?.[1] ? moment(value?.[1]).format("YYYY-MM-DD") : "", "endDate");
                        }}
                      />
                    </div>
                    <div className="d-flex gap-2">
                      <>
                        <select
                          class="filter-dropdown-toggle"
                          onClick={(event) => filterClickHandler(event?.target?.value?.split('###')?.[0] || "", "enquiryTableStatusLabel",
                            event?.target?.value?.split('###')?.[1] || "", "enquiryTableStatusValue")}>
                          <option value="">All</option>
                          {statusArray?.map((item) => <option
                            class="list-group-item cursor-pointer"
                            value={`${item?.label}###${item?.value}`}
                          >{item?.label}</option>)}
                        </select>
                      </>

                      <>
                        <Dropdown isOpen={columnDropdownOpen} toggle={toggleColumnDropdown}>
                          <DropdownToggle className="filter-dropdown-toggle px-3 py-2">
                            <span>
                              <svg width={"16px"} height={"16px"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path fill="#a68244" d="M0 96C0 60.7 28.7 32 64 32l384 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zm64 64l0 256 160 0 0-256L64 160zm384 0l-160 0 0 256 160 0 0-256z" />
                              </svg>
                            </span> Manage Columns
                          </DropdownToggle>
                          <DropdownMenu end={true}> {/* Adjusted width for 4 columns */}
                            <table>
                              <tbody>
                                {tableHeadings.map((header, index) => (
                                  index % 4 === 0 && (
                                    <tr key={index}>
                                      <td>
                                        <div className="form-check">
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value={tableHeadings[index]?.label}
                                            checked={visibleColumnCheckHandler(tableHeadings[index]?.label)}
                                            id={`tableheadfilter${index + 1}`}
                                            onChange={() => handleColumnToggle(tableHeadings[index]?.label)}
                                          />
                                          <label
                                            style={{ whiteSpace: "nowrap" }}
                                            className="form-check-label" htmlFor={`tableheadfilter${index + 1}`}>
                                            {tableHeadings[index]?.label}
                                          </label>
                                        </div>
                                      </td>
                                      {tableHeadings[index + 1] && (
                                        <td>
                                          <div className="form-check">
                                            <input
                                              className="form-check-input"
                                              type="checkbox"
                                              value={tableHeadings[index + 1]?.label}
                                              checked={visibleColumnCheckHandler(tableHeadings[index + 1]?.label)}
                                              id={`tableheadfilter${index + 2}`}
                                              onChange={() => handleColumnToggle(tableHeadings[index + 1]?.label)}
                                            />
                                            <label
                                              style={{ whiteSpace: "nowrap" }}
                                              className="form-check-label" htmlFor={`tableheadfilter${index + 2}`}>
                                              {tableHeadings[index + 1]?.label}
                                            </label>
                                          </div>
                                        </td>
                                      )}
                                      {tableHeadings[index + 2] && (
                                        <td>
                                          <div className="form-check">
                                            <input
                                              className="form-check-input"
                                              type="checkbox"
                                              value={tableHeadings[index + 2]?.label}
                                              checked={visibleColumnCheckHandler(tableHeadings[index + 2]?.label)}
                                              id={`tableheadfilter${index + 3}`}
                                              onChange={() => handleColumnToggle(tableHeadings[index + 2]?.label)}
                                            />
                                            <label
                                              style={{ whiteSpace: "nowrap" }}
                                              className="form-check-label" htmlFor={`tableheadfilter${index + 3}`}>
                                              {tableHeadings[index + 2]?.label}
                                            </label>
                                          </div>
                                        </td>
                                      )}
                                      {tableHeadings[index + 3] && (
                                        <td>
                                          <div className="form-check">
                                            <input
                                              className="form-check-input"
                                              type="checkbox"
                                              value={tableHeadings[index + 3]?.label}
                                              checked={visibleColumnCheckHandler(tableHeadings[index + 3]?.label)}
                                              id={`tableheadfilter${index + 4}`}
                                              onChange={() => handleColumnToggle(tableHeadings[index + 3]?.label)}
                                            />
                                            <label
                                              style={{ whiteSpace: "nowrap" }}
                                              className="form-check-label" htmlFor={`tableheadfilter${index + 4}`}>
                                              {tableHeadings[index + 3]?.label}
                                            </label>
                                          </div>
                                        </td>
                                      )}
                                    </tr>
                                  )
                                ))}
                              </tbody>
                            </table>
                          </DropdownMenu>
                        </Dropdown>
                      </>
                      <>
                        <Dropdown isOpen={filterDropdownOpen} toggle={toggleFilterDropdown}
                        // direction={direction}
                        >
                          <DropdownToggle
                            className="filter-dropdown-toggle px-3 py-2 "
                          >
                            <span className="" ><svg
                              height={"16px"} width={"16px"}
                              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#a58144" d="M3.9 54.9C10.5 40.9 24.5 32 40 32l432 0c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9 320 448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6l0-79.1L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z" /></svg></span> Filter</DropdownToggle>
                          <DropdownMenu className="filter-dropdown">
                            {<Accordion open={filterAccordianopen} toggle={filterAccordiantoggle}>
                              {!outletManagerStore && <AccordionItem>
                                <AccordionHeader className={"py-1 dash-accordion-header"} targetId="1">Store
                                  {enquiryStates?.selectedStoreName && <span className="ms-3">
                                    <strong>{enquiryStates?.selectedStoreName}</strong>
                                    <span onClick={() => filterClickHandler("",
                                      "selectedStore", "", "selectedStoreName")}>X</span>
                                  </span>}
                                </AccordionHeader>
                                <AccordionBody accordionId="1">
                                  <div className="d-flex flex-column">
                                    <ul
                                      class="list-group"
                                      style={{ height: "200px", overflow: "auto" }}
                                    >
                                      {/* <li class="list-group-item py-2"><input type="text" className="form-control" placeholder="search..." /></li> */}
                                      {enquiryStates?.AllStoreList?.map(item => <li
                                        // class="list-group-item py-2"
                                        class="list-group-item cursor-pointer"
                                        onClick={() => filterClickHandler(item?.id,
                                          "selectedStore", `${item?.firstName}`, "selectedStoreName")}
                                      >{item?.firstName}</li>)}
                                    </ul>
                                  </div>
                                </AccordionBody>
                              </AccordionItem>}
                              <AccordionItem>
                                <AccordionHeader
                                  className={"py-1 dash-accordion-header"}
                                  targetId="2">Sales Person
                                  {enquiryStates?.selectedSalesPersonName && <span className="ms-3">
                                    <strong>{enquiryStates?.selectedSalesPersonName}</strong>
                                    <span onClick={() => filterClickHandler("", "selectedSalesPerson",
                                      "", "selectedSalesPersonName")}>X</span>
                                  </span>}
                                </AccordionHeader>
                                <AccordionBody accordionId="2">
                                  <div className="d-flex flex-column">

                                    <input type="text" className="form-control mb-2" placeholder="search..."
                                      onChange={(e) => {
                                        setEnquiryStates(prev => ({
                                          ...prev,
                                          AllSalesPersonList: [],
                                        }));
                                        GetSalesPerson(e?.target?.value, enquiryStates?.selectedStore)
                                      }}
                                    />
                                    <ul class="list-group"
                                      style={{ height: "200px", overflow: "auto" }}
                                    >
                                      {enquiryStates?.AllSalesPersonList?.map(item => <li
                                        class="list-group-item cursor-pointer"
                                        onClick={() => filterClickHandler(item?.id, "selectedSalesPerson",
                                          `${item?.firstName} ${item?.lastName}`, "selectedSalesPersonName")}
                                      >{item?.firstName} {item?.lastName}</li>)}
                                    </ul>
                                  </div>
                                </AccordionBody>
                              </AccordionItem>
                            </Accordion>}
                            {/* <DropdownItem header>Header</DropdownItem>
                                  <DropdownItem>Some Action</DropdownItem>
                                  <DropdownItem>Foo Action</DropdownItem>
                                  <DropdownItem>Bar Action</DropdownItem>
                                  <DropdownItem>Quo Action</DropdownItem> */}
                          </DropdownMenu>
                        </Dropdown>
                      </>
                    </div>

                    {/* <DateRangePicker
                            onChange={item => setDateRange([item?.selection])}
                            showSelectionPreview={true}
                            moveRangeOnFirstSelection={false}
                            months={2}
                            ranges={DateRange}
                            direction="horizontal"
                            preventSnapRefocus={true}
                            calendarFocus="backwards"
                          /> */}
                  </div>
                  <div>

                  </div>
                  <div
                    style={{ minWidth: "845px", textAlign: "center", border: "1px solid #e8e8e8", borderRadius: "5px" }}
                    className="table-responsive mt-5"
                  >
                    <table
                      id="example4"
                      className="table card-table display mb-4  table-responsive-lg"
                      style={{ minWidth: "845px", textAlign: "center" }}
                    >
                      <thead>
                        <tr>
                          {visibleColumns.map((column, index) => (
                            <th key={index}
                              className={column?.label == "Enq ID" ? "bg-white enq-wrapper" : column?.label == "Customer Name" ? "bg-white cn-wrapper" : ""}
                            >
                              {column?.label == "Enq ID" || column?.label == "Customer Name" ? <div className={column?.label == "Enq ID" ? "enq" : "cn"}>
                                {column?.label}
                              </div> :

                                column?.label
                              }
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {/* {console.log("length", AllEnquiry.length)} */}
                        {!enquiryStates.tableLoader &&
                          (enquiryStates?.enquiryData && enquiryStates?.enquiryData.length > 0 ?
                            <>
                              {enquiryStates?.enquiryData.map((item, key) => (
                                <tr key={key}>
                                  {visibleColumns.map((column, idx) => (
                                    column.label == "Enq ID" || column.label == "Customer Name" ? <td
                                      className={column?.label == "Enq ID" ? "bg-white enq-wrapper" : column?.label == "Customer Name" ? "bg-white cn-wrapper" : ""}
                                    >
                                      {column.label == "Enq ID" && <Link
                                        to={superAdmin ? `/EnquiryDetials/${item?.id}` : outletManagerStore ? `/OutletEnquiryDetials/${item?.id}` : `/EnquiryDetials/${item?.id}`}
                                        state={{
                                          data: item?.id,
                                          category: item?.products,
                                          icPerson: `${item?.user?.firstName} ${item?.user?.lastName}`,
                                        }
                                        }
                                        className={"enq"}>
                                        {item[column.value]}
                                      </Link>}
                                      {column.label == "Customer Name" && <Link
                                        to={superAdmin ? `/EnquiryDetials/${item?.id}` : outletManagerStore ? "/OutletCustomerDetials" : "/customer-detials"}
                                        state={{
                                          data: item?.customer.id,
                                        }}
                                        className={"cn"}>
                                        {item[column.value]}
                                      </Link>}
                                    </td>
                                      :
                                      <td key={idx}>{

                                        column?.value == 'createdAt' ? moment(item?.createdAt).format('MMMM Do YYYY, h:mm:ss a') :

                                          item[column.value]}</td>
                                  ))}
                                </tr>
                              ))}
                            </> :
                            <tr >

                              <td colSpan={6}>
                                {enquiryStates?.tableLoading ?
                                  <Spinner /> : "No Data Found"
                                }
                              </td>
                            </tr>
                          )}
                      </tbody>
                    </table>
                  </div>
                  <div className="d-flex justify-content-between mt-3">
                    <div>

                    </div>
                    <Pagination
                      className="custom-pagination"
                      activePage={enquiryStates?.AllEnquiryPagination?.currentPage}
                      itemsCountPerPage={10}
                      totalItemsCount={enquiryStates?.AllEnquiryPagination?.total}
                      pageRangeDisplayed={5}
                      onChange={(data) => handlePangeChange(data)}
                    // onChange={this.handlePageChange.bind(this)}
                    />
                  </div>
                </div>
              </div>


              {/* tabs end  */}

              {/* <div className="row">
                  <div className="card">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="col-lg-4 my-4">
                        <label>Select Store</label>
                        <select
                          className="form-control"
                          onChange={(e) => {
                            setStoreId(e.target.value);
                            setMainDashboardCallApi(true);
                          }}
                        >
                          <option value={""}>All Store</option>
                          {storeList?.map((data) => (
                            <option value={data?.id}>
                              {data?.firstName} {data?.lastName}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-xl-2">
                        <button
                          className="btn btn-primary mx-5"
                          onClick={modalDateToggle}
                        >
                          Filter
                        </button>
                      </div>
                    </div>
                    <div className="col-xl-12">
                      {isLoading ? (
                        <div className="d-flex justify-content-center py-4">
                          <Spinner />
                        </div>
                      ) : (
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
                            {Object.keys(enquirySummaryData).map(
                              (category, index) => (
                                <tr key={index}>
                                  <td>
                                    {category === "total_enquiry"
                                      ? "Total Enquiry"
                                      : category}
                                  </td>
                                  <td
                                    style={{
                                      cursor: "pointer",
                                      color: "blue",
                                      textDecoration: "underline",
                                    }}
                                    onClick={() =>
                                      columnHandler(
                                        "Schedule",
                                        enquirySummaryData[category].scheduled,
                                        category
                                      )
                                    }
                                  >
                                    {enquirySummaryData[category].scheduled}
                                  </td>
                                  <td
                                    style={{
                                      cursor: "pointer",
                                      color: "blue",
                                      textDecoration: "underline",
                                    }}
                                    onClick={() =>
                                      columnHandler(
                                        "Completed",
                                        enquirySummaryData[category].completed,
                                        category
                                      )
                                    }
                                  >
                                    {enquirySummaryData[category].completed}
                                  </td>
                                  <td
                                    style={{
                                      cursor: "pointer",
                                      color: "blue",
                                      textDecoration: "underline",
                                    }}
                                    onClick={() =>
                                      columnHandler(
                                        "Pending",
                                        enquirySummaryData[category].pending,
                                        category
                                      )
                                    }
                                  >
                                    {enquirySummaryData[category].pending}
                                  </td>
                                  <td
                                    style={{
                                      cursor: "pointer",
                                      color: "blue",
                                      textDecoration: "underline",
                                    }}
                                    onClick={() =>
                                      columnHandler(
                                        "Cancelled",
                                        enquirySummaryData[category].cancelled,
                                        category
                                      )
                                    }
                                  >
                                    {enquirySummaryData[category].cancelled}
                                  </td>
                                  <td
                                    style={{
                                      cursor: "pointer",
                                      color: "blue",
                                      textDecoration: "underline",
                                    }}
                                    onClick={() =>
                                      columnHandler(
                                        "Overdue",
                                        enquirySummaryData[category].overdue,
                                        category
                                      )
                                    }
                                  >
                                    {enquirySummaryData[category].overdue}
                                  </td>
                                </tr>
                              )
                            )}

                            {enquirySummaryData?.map((data) =>
                            <tr>
                              <td>{data?.name}</td>
                              <td onClick={() => columnHandler('Overdue', data?.Overdue, data?.name)}>{data?.Overdue}</td>
                              <td onClick={() => columnHandler('Pending', data?.Pending, data?.name)}>{data?.Pending}</td>
                              <td onClick={() => columnHandler('Today', data?.Today, data?.name)}>{data?.Today}</td>
                              <td onClick={() => columnHandler('Closed', data?.Closed, data?.name)}>{data?.Closed}</td>
                              <td onClick={() => columnHandler('Cancelled', data?.Cancelled, data?.name)}>{data?.Cancelled}</td>
                              <td onClick={() => columnHandler('Varient', data?.Varient, data?.name)}>{data?.Varient}</td>
                            </tr>
                          )}
                          </tbody>
                        </table>
                      )}
                    </div>
                  </div>
                </div> */}
              {/* <div className="row">
                  <div className="card">
                    <div className="row">
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="col-lg-4 my-4">
                          <label>Select Store</label>
                          <select
                            className="form-control"
                            onChange={(e) => {
                              setDashboardStoreId(e.target.value);
                              setMainDashboardCallApi2(true);
                            }}
                          >
                            <option value={""}>All Store</option>
                            {storeList?.map((data) => (
                              <option value={data?.id}>
                                {data?.firstName} {data?.lastName}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-xl-2">
                          <button
                            className="btn btn-primary mx-5"
                            onClick={modalDashboardDateToggle}
                          >
                            Filter
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
              {/* <div className="row">
                  <div className="card">
                    <div className="col-xl-12">
                      <div className="row">
                        <div className="col-xl-12">
                          <div className="row">
                            <div className="col-xl-12">
                              <div className="card">
                                <div className="card-header border-0 flex-wrap">
                                  <h4 className="fs-20">
                                    Purchase and selling
                                  </h4>
                                  <div className="card-action coin-tabs">
                                    <ul className="nav nav-tabs" role="tablist">
                                      <li className="nav-item">
                                        <a
                                          className="nav-link"
                                          data-bs-toggle="tab"
                                          href="#Daily1"
                                          role="tab"
                                        >
                                          Daily
                                        </a>
                                      </li>
                                      <li className="nav-item">
                                        <a
                                          className="nav-link"
                                          data-bs-toggle="tab"
                                          href="#weekly1"
                                          role="tab"
                                        >
                                          Weekly
                                        </a>
                                      </li>
                                      <li className="nav-item">
                                        <a
                                          className="nav-link active"
                                          data-bs-toggle="tab"
                                          href="#monthly1"
                                          role="tab"
                                        >
                                          Monthly
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                                <div className="card-body pb-0">
                                  <div className="d-flex flex-wrap">
                                    <span className="me-sm-5 me-0 font-w500">
                                      <svg
                                        className="me-1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={13}
                                        height={13}
                                        viewBox="0 0 13 13"
                                      >
                                        <rect
                                          width={13}
                                          height={13}
                                          fill="#B39355"
                                        ></rect>
                                      </svg>
                                      Purchase
                                    </span>
                                    <span className="fs-16 font-w600 me-4">
                                      23,451
                                      <small className="text-success fs-12 font-w400">
                                        +0.4%
                                      </small>
                                    </span>
                                    <span className="me-sm-5 ms-0 font-w500">
                                      <svg
                                        className="me-1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={13}
                                        height={13}
                                        viewBox="0 0 13 13"
                                      >
                                        <rect
                                          width={13}
                                          height={13}
                                          fill="#B39355"
                                        ></rect>
                                      </svg>
                                      Sales
                                    </span>
                                    <span className="fs-16 font-w600">
                                      20,441
                                    </span>
                                  </div>
                                  <div className="tab-content">
                                    <div
                                      className="tab-pane fade show active"
                                      id="Daily1"
                                    >
                                      <div id="chartBar" className="chartBar" />
                                    </div>
                                    <div className="tab-pane fade" id="weekly1">
                                      <div
                                        id="chartBar1"
                                        className="chartBar"
                                      />
                                    </div>
                                    <div
                                      className="tab-pane fade"
                                      id="monthly1"
                                    >
                                      <div
                                        id="chartBar2"
                                        className="chartBar"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
            </div>
          )}
        </div>
      </div>
      <OverdueDetails
        openModal={openMainEnquirySummaryModal2}
        toggle={toggleMainEnquirySummary2}
        responseSetHandler={responseSetHandler}
        storeId={dashboardStoreId}
        columnName={columnName}
        rowName={rowName}
        tableData={overdueDetailData?.tableData}
        isLoading={overdueDetailData?.isLoading}
        date={mainDashboarddate}
        salesPersonId={dashboardSalesPersonId}
        isOutlet={outletManagerStore}
        superAdmin={superAdmin}
      />
      <EnquiryDetailModal
        toggle={Enquirytoggle}
        openModal={enquiryStates?.openEnquiryModal}
        enquiryData={enquiryStates?.enquiryDetailData}
        enquiryStates={enquiryStates}
        setEnquiryData={setEnquiryStates}
        isLoading={LoadingData}
        DownloadReportHandler={DownloadReportHandler}
        downloadLink={enquiryStates?.enquiryDownloadLink}
        outletManagerStore={outletManagerStore}
        superAdmin={superAdmin}
      />
    </>
  );
}

