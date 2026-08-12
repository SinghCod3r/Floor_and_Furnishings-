import { Modal, ModalBody, ModalHeader,Label } from "reactstrap";
import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { GetDataWithToken } from "../ApiHelper/ApiHelper";
import { useNavigate } from "react-router-dom";

function DateModal(props) {
    const navigate = useNavigate();
    const [endDate, setEndDate] = useState(new Date());
    const [startDate, setStartDate] = useState();
    

    const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    } = useForm();
    
    const submitDate = () => { 
        console.log('date from state', startDate);
        console.log('date to state end', endDate);
        GetDataWithToken(`superadmin/customer-ledger?customerCode=${props.customerId}&fromDate=${startDate}&toDate=${endDate}`)
            .then((response) => {
                if (response.status === true) {
                    props.dateToggle();
                    navigate('/customer-ledger-detail',{
                      state: {
                            data: response?.data,
                            startDate: startDate,
                            endDate: endDate,
                            customerId:props.customerId,
                      }
                    });
                 }
            }) 
        //total amount API

    }

    return (
    <Modal isOpen={props.dateModal}  toggle={props.dateToggle}>
     <ModalHeader>Select a date
     </ModalHeader>
        <ModalBody>
             <form onSubmit={handleSubmit(submitDate)}>
                 <div>
                    <Label>select date from:</Label>
                        <DatePicker className="me-sm-2  form-control"
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            maxDate={new Date().setDate(new Date().getDate() - 1)}
                        />
                 </div>      
                 <div style={{marginTop:'4px'}}>
                     <Label>select date to: </Label>
                        <DatePicker className="me-sm-2  form-control"
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                             maxDate={new Date()}
                        />             
                    </div>
                  <button className="btn  btn-primary" type="submit">submit</button>  
            </form>
         </ModalBody>
      </Modal>    
            )

}
export default DateModal;