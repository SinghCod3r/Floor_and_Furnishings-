import { Modal, ModalBody, ModalHeader } from "reactstrap"
import { GetDataWithToken, PostDataWithToken } from "../ApiHelper/ApiHelper";
import { useState } from "react";
import Swal from "sweetalert2";
import { toast } from "material-react-toastify";
import { capitalize } from "lodash";


const PaymentLinkModal = ({ modal, toggle, PaymentLinkData, enquiryId, customerId, mainEnquiryId, enqAdvanceAmount }) => {
  const [isLoading, setIsLoading] = useState(false);

  const PaymentLinkHandler = (type) => {
    setIsLoading(true);
    if (type === "order_advance") {
      createPaymentHandler(PaymentLinkData?.data?.enquirySalesQuotation, type);
    } else if (type === "order_complete" || type === "final_payment") {
      createPaymentHandler(PaymentLinkData?.data?.customerOutstanding, type);
    } else {
      createPaymentHandler(enqAdvanceAmount, type);
    }
  }

  const createPaymentHandler = (amount, type) => {
    Swal.fire({
      title: 'Do you want to send payment link?',
      showDenyButton: true,
      confirmButtonText: 'Send',
      // denyButtonText: `Don't dont send`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        PostDataWithToken("payment/send-payment-link", {
          enquiryId: enquiryId,
          amount: amount,
          payment_type: type
        }).then((response) => {
          setIsLoading(false);
          console.log("response....", response);
          if (response?.status == true) {
            toast.success(response?.message);
            toggle();
          } else {
            toast.error(response?.data?.message);
          }
        })
      }
    })
  };

  return (<>
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle} className={"d-flex justify-content-between"} >
        <p>Payment Links</p>
      </ModalHeader>
      <ModalBody className={"px-0 py-2"}>
        {PaymentLinkData?.data?.paymentLinks?.map((item, index) => (
          <div className="d-flex flex-column">
            <div key={index} className="py-2 px-4 d-flex justify-content-between align-items-center">
              <div>
                <p>{item?.payment_type?.split("_")?.map((dd) => `${capitalize(dd)} `)}</p>
                <span>Amount - ₹{item?.payment_type === "order_advance" ? PaymentLinkData?.data?.enquirySalesQuotation : item?.payment_type === "order_complete" || item?.payment_type == "final_payment" ? PaymentLinkData?.data?.customerOutstanding : enqAdvanceAmount}</span>
              </div>

              <div>
                <button
                  disabled={!item?.enabled}
                  type="submit"
                  onClick={() => PaymentLinkHandler(item?.payment_type)}
                  className="btn btn-primary btn-block"
                >
                  Send Link
                  {/* {isLoading === true ? (
                  <Spinner size="small" />
                ) : (
                  "Login"
                )} */}
                </button>
              </div>

            </div>
          </div>
        ))}
      </ModalBody>
    </Modal >
  </>)
}

export default PaymentLinkModal;