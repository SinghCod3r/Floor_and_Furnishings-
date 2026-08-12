import { useLocation } from "react-router-dom";
import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";
import moment from "moment";

const OrderBillDetail = () => {
  const location = useLocation();
  console.log('looooooooooo', location);

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
                          <strong>Enquiry No.</strong>
                          <span class="mb-0">{location?.state?.data?.enquiryId}</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between">

                          <strong>Order Date.</strong>
                          <span class="mb-0">{
                            location?.state?.OrderDate && moment(location?.state?.OrderDate)?.format('DD/MM/YYYY')

                          }
                          </span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between">

                          <strong>Sales person Contact</strong>
                          <span class="mb-0">{location?.state?.SalesPersonContact}</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between">

                          <strong>Remarks.</strong>
                          <span class="mb-0">{location?.state?.Remarks}</span>
                        </li>

                        <li class="list-group-item d-flex justify-content-between">

                          <strong>Delivery Mode</strong>
                          <span class="mb-0">{location?.state?.DeliveryMode}</span>
                        </li>
                      </ul>
                    </div>

                    <div class="col-lg-6">
                      <ul class="list-group list-group-flush">
                        <li class="list-group-item d-flex justify-content-between ">
                          <strong>Customer No.</strong>
                          <span class="mb-0">{location?.state?.data?.customerId}</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between">

                          <strong>Sales Person Name</strong>
                          <span class="mb-0">{location?.state?.SalesPersonName}</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between">

                          <strong>Sales Person Email</strong>
                          <span class="mb-0">{location?.state?.SalesPersonEmail}</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between">

                          <strong>Transport</strong>
                          <span class="mb-0">{location?.state?.Transport?.Code}</span>
                          <span class="mb-0">{location?.state?.Transport?.Name}</span>
                        </li>

                        <li class="list-group-item d-flex justify-content-between">
                          <strong>Delivery Name</strong>
                          <span class="mb-0">{location?.state?.DeliveryName}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="p-2">
                    <div className="col-lg-3">
                      <h4 className="card-title">Order Bills</h4>
                    </div>
                    <table bordered>
                      <thead>
                        <tr>
                          <th>
                            image
                          </th>
                          <th>
                            Order ID
                          </th>
                          <th>
                            remark
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {location?.state?.data?.order_bills?.map((data) =>
                          <tr>
                            <td>
                              <img src={data?.image} height={50} width={50} />

                            </td>
                            <td>
                              {data?.orderId}
                            </td>
                            <td>
                              {data?.remark}

                            </td>
                            <td>
                              {data?.QtyPending && +data?.QtyPending.toFixed(2)}
                            </td>
                            <td>
                              {data?.ShippingDate && moment(data?.ShippingDate)?.format("DD/MM/YYYY")}
                            </td>
                            <td>
                              {data?.Status}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div className="p-2">
                    <div className="col-lg-3">
                      <h4 className="card-title">Orders</h4>
                    </div>
                    <table bordered>
                      <thead>
                        <tr>
                          <th>
                            Order ID
                          </th>
                          <th>
                            Order Status
                          </th>
                          <th>
                            Order Date
                          </th>

                        </tr>
                      </thead>
                      <tbody>
                        {location?.state?.data?.orders?.map((data) =>
                          <tr>
                            <td>
                              {data?.orderId}
                            </td>
                            <td>
                              {data?.orderStatus}
                            </td>
                            <td>
                              {data?.orderDate && moment(data?.orderDate)?.format("DD/MM/YYYY")}
                            </td>
                            <td>
                              {data?.Status}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>)
};
export default OrderBillDetail;