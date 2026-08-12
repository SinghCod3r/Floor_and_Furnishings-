import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { GetDataWithToken } from "../ApiHelper/ApiHelper";
import axios from 'axios';
import moment from "moment";

function DashboardFilterModal({ openModal, modalToggle,
    setMainCallApi, setDate, date, setDeliveryName,
    deliveryName, ledger, setIsLoading,
    setMainData, setCurrentPage, enquiryFilter, setSalesPersonId,
    setStoreId, setModalCallApi, manager, IcList }) {

    const [nextPage, setNextPage] = useState(0);
    const [searchValue, setSearchValue] = useState('');
    const [customerList, setCustomerList] = useState([]);
    const [deliveryNameList, setDeliveryNameList] = useState([]);
    // const [deliverNameValue, setDeliveryNameValue] = useState('');
    const [callApi, setCallApi] = useState(false);
    const [callApi2, setCallApi2] = useState(false);
    const [callApi3, setCallApi3] = useState(false);
    const [callApi4, setCallApi4] = useState(false);
    // const [customerName, setCustomerName] = useState('');
    const [dateShow, setDateShow] = useState(false);
    const toggleDate = () => setDateShow(!dateShow);
    const [salesPerson, setSalesPerson] = useState();
    const [salesPersonList, setSalesPersonList] = useState([]);
    const [storeList, setStoreList] = useState([]);
    const [storeName, setStoreName] = useState();

    const toggle = () => {
        modalToggle();
        setNextPage(0);
        setCustomerList([]);
        setSearchValue();

        // setDeliveryNameList([]);
        // setDeliveryNameValue();
        // setCustomerCode('');
        // setDate({});
        // setDeliveryName('');
    }

    const submitSearchData = () => {
        // setMainData([]);
        setCurrentPage && setCurrentPage(1);
        setIsLoading && setIsLoading(true);
        toggle();
        setMainCallApi(true);
        setModalCallApi(true);
    }

    const handleInputChange = (e) => {
        setSearchValue(e.target.value);
        setCallApi(true);
    }

    const handleInputChange2 = (e) => {
        // setDeliveryNameValue(e.target.value);
        setCallApi2(true);
    }

    // const customerListSubmitHandler = (code, name) => {
    //     setCustomerName(name);
    //     setCustomerCode(code);
    //     setNextPage(0);
    //     setCallApi2(true);
    //     // mainCallApi(true);
    //     // toggle();
    // }

    const currentDateChangeHandler = (value) => {
        let date = new Date();
        if (value == "today") {
            setDate({
                // date: date,
                fromDate: date,
                toDate: date,
            });
            setNextPage(0);
        }
        if (value == "yesterday") {
            setDate({
                fromDate: moment().subtract(1, 'days'),
                toDate: moment().subtract(1, 'days'),
            });
            setNextPage(0);
        }
        if (value == "tomorrow") {

            setDate({
                fromDate: moment().add(1, 'days'),
                toDate: moment().add(1, 'days'),
            });
            setNextPage(0);
        }
        if (value == "last7days") {
            setDate({
                fromDate: moment().add(-7, 'days'),
                toDate: date,
            });
            setNextPage(0);
        }
        if (value == "last30days") {
            setDate({
                fromDate: moment().add(-30, 'days'),
                toDate: date,
            });
            setNextPage(0);
        }
        if (value == "all") {
            setDate({
                fromDate: "",
                toDate: "",
            });
            setNextPage(0);
        }
    }

    const dateChange = (value, key) => {
        setDate({
            ...date,
            [key]: value
        });
    };

    const deliveryListSubmitHandler = (name) => {
        setDeliveryName(name);

        // setDeliveryName(name)
        //  console.log('dataaaaaaaaaaaaaaaaaa delllllllllll',deliveryName);
        setNextPage(0);
        // mainCallApi(true);
        // toggle();
    }

    const icSelectHandler = () => {
        if (IcList && IcList?.length > 0) {
            setNextPage(6);
        } else {
            setNextPage(4);
            setCallApi3(true);
        }
    }

    const dateSubmitHandler = () => {
        // mainCallApi(true);
        // toggle(); 
        setNextPage(0);
    };

    const salesPersonSubmitHandler = (id, name) => {
        setSalesPersonId(id);
        setSalesPerson(name);
        setNextPage(0);
    }

    const storeNameSubmitHandler = (data) => {
        setStoreName(`${data?.firstName}`);
        setStoreId(data?.id);
        setNextPage(0);
    }

    let dateFromArray = date?.fromDate?.toString()?.split(" ");
    let dateToArray = date?.toDate?.toString()?.split(" ");

    useEffect(() => {
        if (callApi) {
            GetDataWithToken(`superadmin/customer?searchText=${searchValue}`).then(response => {
                if (response.status === true) {
                    // console.log(response.data);
                    setCustomerList(response.data);
                    setCallApi(false);
                }
                setCallApi(false);
            })
        }

        if (callApi3) {
            GetDataWithToken(`superadmin/get-users?type=sales-person`)
                .then(response => {
                    if (response.status === true) {
                        setSalesPersonList(response.data);
                        // console.log(response.data);
                        setCallApi3(false);
                    }
                    setCallApi3(false);
                })
        }
        if (callApi4) {
            GetDataWithToken(`superadmin/get-outlet`)
                .then(response => {
                    if (response.status === true) {
                        setStoreList(response.data);
                        // console.log(response.data);
                        setCallApi4(false);
                    }
                    setCallApi4(false);
                })
        }

    }, [callApi, callApi2, callApi3, callApi4]);

    return (
        <Modal isOpen={openModal} toggle={toggle} centered>
            {nextPage == 0 && <>
                <ModalHeader>
                    Filters
                </ModalHeader>
                <ModalBody>
                    <p className="d-flex align-items-center justify-content-between">
                        <button className="btn btn-link d-block w-100 text-start" onClick={() => setNextPage(1)}>Select Date:</button>
                        <div className="d-flex text-nowrap align-items-center">
                            {date?.fromDate && `${dateFromArray?.[2]} ${dateFromArray?.[1]} ${dateFromArray?.[3]} to ${dateToArray?.[2]} ${dateToArray?.[1]} ${dateToArray?.[3]}`}
                            {date?.fromDate && <button className="btn btn-primary mx-2" onClick={() => setDate({})}>X</button>}
                        </div>
                    </p>
                    <hr></hr>
                    <>
                        <p className="d-flex align-items-center justify-content-between">
                            <button className="btn btn-link d-block w-100 text-start" onClick={icSelectHandler}>Select IC Name</button>
                            <div className="d-flex text-nowrap align-items-center">
                                {salesPerson && `${salesPerson}`}
                                {salesPerson && <button className="btn btn-primary mx-2" onClick={() => { setSalesPerson(); setSalesPersonId("") }}>X</button>}
                            </div>
                        </p>
                        <hr></hr>
                    </>

                    {/* {!manager && <p className="d-flex align-items-center justify-content-between">
                        <button className="btn btn-link d-block w-100 text-start" onClick={() => { setNextPage(5); setCallApi4(true); }}>Store Name</button>
                        <div className="d-flex text-nowrap align-items-center">
                            {storeName && `${storeName}`}
                            {storeName && <button className="btn btn-primary mx-2" onClick={() => { setStoreName(); setStoreId("") }}>X</button>}
                        </div>
                    </p>} */}
                    <div>
                        <button className="btn btn-primary ms-2"
                            onClick={submitSearchData}
                        >Search
                        </button>
                    </div>
                </ModalBody>
            </>
            }
            {nextPage == 1 && <>
                <ModalHeader>Select a date </ModalHeader>
                <ModalBody>
                    <div>
                        <p role="button" onClick={() => currentDateChangeHandler("today")}>TODAY</p>
                        <hr />
                        <p role="button" onClick={() => currentDateChangeHandler("tomorrow")}> Tomorrow</p>
                        <hr />
                        <p role="button" onClick={() => currentDateChangeHandler("yesterday")}> Yesterday</p>
                        <hr />
                        <p role="button" onClick={() => currentDateChangeHandler("last7days")}>Last 7 days</p>
                        <hr />
                        <p role="button" onClick={() => currentDateChangeHandler("last30days")}>Last 30 days </p>
                        <hr />
                        <p role="button" onClick={() => currentDateChangeHandler("all")}>All</p>
                        <hr />
                        <p role="button" onClick={toggleDate}>Custom Range</p>
                        <hr />
                    </div>
                    {dateShow && <>
                        <div>
                            <label style={{ marginRight: "5px" }}>select date from:</label>
                            <DatePicker className="form-control"
                                onChange={(value) => dateChange(value, 'fromDate')}
                                selected={date?.fromDate ? new Date(date?.fromDate) : new Date()}
                                required
                                maxDate={new Date()?.setDate(new Date()?.getDate() - 1)}
                            />
                            {console.log("date?.fromDate", date?.fromDate)}
                        </div>
                        <div style={{ margin: '6px' }}>
                            <label style={{ marginRight: "22px" }}>select date to: </label>
                            <DatePicker className="form-control d-block"

                                onChange={(value) => dateChange(value, 'toDate')}
                                selected={date?.toDate ? new Date(date?.toDate) : new Date()}
                                required
                                maxDate={new Date()}
                            />
                        </div>
                        <button className="btn  btn-primary" onClick={dateSubmitHandler}>submit</button>
                    </>}
                </ModalBody>
            </>}
            {nextPage == 2 && <>
                <ModalHeader>
                    SELECT OPTION
                </ModalHeader>
                <ModalBody>
                    <div className="d-flex mb-5">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search"
                            onChange={handleInputChange}
                        />
                    </div>
                    {/* <ul class="list-group list-group-flush">
                        {customerList?.map((data) => <li
                            class="list-group-item d-flex justify-content-between"
                            onClick={() => customerListSubmitHandler(data?.ACCOUNTNUM, data?.NAME)}
                        >{data?.NAME}</li>)}
                    </ul> */}
                </ModalBody>
            </>
            }
            {nextPage == 3 && <>
                <ModalHeader>
                    SELECT OPTION
                </ModalHeader>
                <ModalBody>
                    <div className="d-flex mb-5">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search"
                            onChange={handleInputChange2}
                        />
                        {/* <button className="btn btn-primary ms-2"
                            // onClick={submitSearchData}
                        >Search
                    </button> */}
                    </div>
                    <ul class="list-group list-group-flush">
                        {deliveryNameList?.map((data) => <li class="list-group-item d-flex justify-content-between" onClick={() => deliveryListSubmitHandler(data?.deliveryName)}>{data?.deliveryName}</li>)}
                    </ul>
                </ModalBody>
            </>
            }
            {nextPage === 4 && <>
                <ModalHeader>
                    SELECT OPTION
                </ModalHeader>
                <ModalBody>
                    <ul class="list-group list-group-flush">
                        {salesPersonList?.map((data) => <li class="list-group-item d-flex justify-content-between" onClick={() => salesPersonSubmitHandler(data?.id, `${data?.firstName} ${data?.lastName}`)}>{data?.firstName} {data?.lastName}</li>)}
                    </ul>
                </ModalBody>
            </>}
            {nextPage === 5 && <>
                <ModalHeader>
                    SELECT OPTION
                </ModalHeader>
                <ModalBody>
                    <ul class="list-group list-group-flush">
                        {storeList?.map((data) => <li class="list-group-item d-flex justify-content-between" onClick={() => storeNameSubmitHandler(data)}>{data?.firstName} {data?.lastName}</li>)}
                    </ul>
                </ModalBody>
            </>}
            {nextPage == 6 && <>
                <ModalHeader>
                    SELECT OPTION
                </ModalHeader>
                <ModalBody>
                    <div className="d-flex mb-5">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search"
                            onChange={handleInputChange2}
                        />
                        {/* <button className="btn btn-primary ms-2"
                            // onClick={submitSearchData}
                        >Search
                    </button> */}
                    </div>
                    <ul class="list-group list-group-flush">
                        {IcList?.map((data) =>
                            <li class="list-group-item d-flex justify-content-between"
                                onClick={() => { setSalesPerson(`${data?.firstName} ${data?.lastName}`); setSalesPersonId(data?.id); setNextPage(0); }}>
                                {data?.firstName} {data?.lastName}
                            </li>)}
                    </ul>
                </ModalBody>
            </>
            }
        </Modal>
    )
}
export default DashboardFilterModal;