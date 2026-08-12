import { useEffect, useState } from "react";
import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";
import { Table } from "reactstrap";
import { GetDataWithToken } from "../../ApiHelper/ApiHelper";
import { useLocation } from "react-router-dom";
import moment from "moment";

function OrderDetails() {
    const location = useLocation();
    console.log('looooooooooo', location);
    const [orderData, setOrderData] = useState();
    useEffect(() => {
        GetDataWithToken(`superadmin/sales-order-details/${location?.state?.orderId}`)
            .then((response) => {
                setOrderData(response.data);
            })
    },[]);
    
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
                                             <h4 className="card-title">Order details</h4>
                                        </div>
                                    </div> 
                                    <div class="row">
                                        <div class="col-lg-6">
                                        <ul class="list-group list-group-flush">
                                                <li class="list-group-item d-flex justify-content-between ">                                          
                                                    <strong>Order No.</strong>
                                                    <span class="mb-0">{ orderData?.Code  }</span>
                                                </li>
                                            <li class="list-group-item d-flex justify-content-between">
                                                    
                                                    <strong>Order Date.</strong>
                                                    <span class="mb-0">{
                                                        orderData?.OrderDate&& moment( orderData?.OrderDate)?.format('DD/MM/YYYY')
                                                            
                                                    }
                                                    </span>
                                            </li>
                                            <li class="list-group-item d-flex justify-content-between">
                                                   
                                                    <strong>Sales person Contact</strong>
                                                    <span class="mb-0">{ orderData?.SalesPersonContact }</span>
                                                </li>
                                                <li class="list-group-item d-flex justify-content-between">
                                                    
                                                    <strong>Remarks.</strong>
                                                    <span class="mb-0">{ orderData?.Remarks }</span>
                                            </li>
                                                
                                               <li class="list-group-item d-flex justify-content-between">
                                                    
                                                    <strong>Delivery Mode</strong>
                                                    <span class="mb-0">{ orderData?.DeliveryMode }</span>
                                            </li>
                                            </ul>
                                        </div>
                                        
                                        <div class="col-lg-6">
                                        <ul class="list-group list-group-flush">
                                                <li class="list-group-item d-flex justify-content-between ">                                          
                                                    <strong>Customer No.</strong>
                                                    <span class="mb-0">{ orderData?.CustomerCode }</span>
                                                </li>
                                            <li class="list-group-item d-flex justify-content-between">
                                                    
                                                    <strong>Sales Person Name</strong>
                                                    <span class="mb-0">{ orderData?.SalesPersonName }</span>
                                            </li>
                                            <li class="list-group-item d-flex justify-content-between">
                                                   
                                                    <strong>Sales Person Email</strong>
                                                    <span class="mb-0">{ orderData?.SalesPersonEmail }</span>
                                                </li>
                                                <li class="list-group-item d-flex justify-content-between">
                                                    
                                                    <strong>Transport</strong>
                                                    <span class="mb-0">{orderData?.Transport?.Code}</span>
                                                    <span class="mb-0">{orderData?.Transport?.Name}</span>
                                            </li>
                                                
                                               <li class="list-group-item d-flex justify-content-between">                                                 
                                                    <strong>Delivery Name</strong>
                                                    <span class="mb-0">{ orderData?.DeliveryName }</span>
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
                                               ordered
                                            </th>
                                            <th>
                                               pending
                                            </th>
                                            <th>
                                               Shipping date
                                                    </th>
                                                    <th>
                                              status
                                            </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                         {orderData?.Lines?.map((data) =>
                                           < tr >
                                            <td>
                                              {data?.ItemName}
                                            </td>
                                            <td>
                                                     {data?.Qty&&+data?.Qty?.toFixed(2)}
                                                     
                                            </td>
                                            <td>
                                               {data?.QtyPending && +data?.QtyPending.toFixed(2)}
                                            </td>
                                            <td>
                                               {data?.ShippingDate&&moment(data?.ShippingDate)?.format("DD/MM/YYYY")}
                                             </td>
                                            <td>
                                                {data?.Status}
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

export default OrderDetails;