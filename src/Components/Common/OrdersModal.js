import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { GetDataWithToken } from "../ApiHelper/ApiHelper";

function OrdersModal({openModal,modalToggle,setCustomerCode,customerCode,mainCallApi,setDate,date,setDeliveryName,deliveryName,ledger,setIsLoading,setMainData,setCurrentPage,enquiryFilter}) {
    const [nextPage, setNextPage] = useState(0);
    const [searchValue, setSearchValue] = useState('');
    const [customerList, setCustomerList] = useState([]);
    const [deliveryNameList,setDeliveryNameList] = useState([]);
    const [deliverNameValue, setDeliveryNameValue] = useState('');
    const [callApi, setCallApi] = useState(false);
    const [callApi2, setCallApi2] = useState(false);
    const [customerName, setCustomerName] = useState('');

    const toggle = () => {
        modalToggle();
        setNextPage(0);
        setCustomerList([]);
        setSearchValue();
        setDeliveryNameList([]);
        setDeliveryNameValue();
        // setCustomerCode('');
        // setDate({});
        // setDeliveryName('');
    }

    const submitSearchData = () => {
        setMainData([]);

       setCurrentPage && setCurrentPage(1);
        setIsLoading && setIsLoading(true);
        toggle();
        mainCallApi(true);
       
    }

    const handleInputChange = (e) => { 
        setSearchValue(e.target.value);
        setCallApi(true);
    }

    const handleInputChange2 = (e) => { 
        setDeliveryNameValue(e.target.value);
        setCallApi2(true);
    }

    const customerListSubmitHandler = (code,name) => {
        setCustomerName(name);
        setCustomerCode(code);
        setNextPage(0);
        setCallApi2(true);
        // mainCallApi(true);
        // toggle();
    }

    // let formattedDate;
    // let parsedDate;
    const dateChange = (value,key) => {
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

    const dateSubmitHandler = () => {
        // mainCallApi(true);
        // toggle(); 
        setNextPage(0);
    }

    let dateFromArray = date?.fromDate?.toString()?.split(" ");
    let dateToArray = date?.toDate?.toString()?.split(" ");

    useEffect(() => {
        if (callApi) {
            GetDataWithToken(`superadmin/customer?searchText=${searchValue}`).then(response => {
                if (response.status === true) {
                    console.log(response.data);
                    setCustomerList(response.data);
                    setCallApi(false);
                }
                setCallApi(false);
            })
        }     
        if (callApi2) {
             GetDataWithToken(`superadmin/delivery-names?customerCode=${customerCode}&searchText=${deliverNameValue}`)
                .then(response => {
                    if (response.status === true) { 
                        setDeliveryNameList(response.data);
                        console.log(response.data);
                        setCallApi2(false);
                    }
                    setCallApi2(false);
                }) 
         }  
        
     }, [callApi,callApi2]);

    return (
        <Modal isOpen={openModal} toggle={toggle} centered>
           {nextPage == 0 && <>
            <ModalHeader>
                 Filters
            </ModalHeader>
            <ModalBody>
                    <span className="ms-2" onClick={() => setNextPage(1)}>
                        
                        Select Date:
                       {date?.fromDate && `${dateFromArray?.[2]} ${dateFromArray?.[1]} ${dateFromArray?.[3]} to ${dateToArray?.[2]} ${dateToArray?.[1]} ${dateToArray?.[3]}`}
                    </span>
                     {date?.fromDate && <button className="btn btn-primary ms-2" onClick={()=>setDate({})}>X</button>}
                    <hr></hr>
                    {!enquiryFilter && <>
                        <span className="ms-2 w-50" onClick={() => { setNextPage(2); setCallApi(true) }}>Customer:{customerName}
                            {/* <button className="btn">X</button> */}
                      
                        </span>
                        {customerName && <button className="btn btn-primary ms-2" onClick={() => { setCustomerName(''); setCustomerCode('') }}>X</button>}
                     <hr></hr>    
                    </>}
                    {!ledger || !enquiryFilter &&
                        <>
                        <span className="ms-2 mb-5" onClick={() =>{ setNextPage(3); setCallApi2(true)}} >Delivery name:{deliveryName}
                        </span>
                        {deliveryName && <button className="btn btn-primary ms-2" onClick={() => { setDeliveryName('')}}>X</button> }
                        {/* <hr></hr>  */}
                     </>   
                    }
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
                     <label>select date from:</label>
                            <DatePicker className="me-sm-2  form-control"
                            
                            onChange={(value) => dateChange(value,'fromDate')}
                                selected={date?.fromDate}
                                required
                                maxDate={new Date()?.setDate(new Date()?.getDate() - 1)}
                        />
                        {console.log("date?.fromDate", date?.fromDate)}
               
                   </div>      
                   <div style={{marginTop:'4px'}}>
                     <label>select date to: </label>
                            <DatePicker className="me-sm-2  form-control"
                                
                            onChange={(value) => dateChange(value,'toDate')}
                                selected={date?.toDate}
                                required
                                maxDate={new Date()}
                            />             
                    </div>
                    <button className="btn  btn-primary" onClick={dateSubmitHandler}>submit</button>  
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
                    <ul class="list-group list-group-flush">
                        {customerList?.map((data) => <li class="list-group-item d-flex justify-content-between" onClick={()=>customerListSubmitHandler(data?.ACCOUNTNUM,data?.NAME)}>{ data?.NAME }</li>)}
                    </ul>
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
                        {deliveryNameList?.map((data) => <li class="list-group-item d-flex justify-content-between" onClick={()=>deliveryListSubmitHandler(data?.deliveryName)}>{ data?.deliveryName }</li>)}
                    </ul>
            </ModalBody>
            </>
            }
        </Modal>
    )
}
export default OrdersModal;