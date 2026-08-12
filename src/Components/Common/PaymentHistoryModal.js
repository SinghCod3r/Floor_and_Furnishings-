import { capitalize } from "lodash";
import moment from "moment";
import { useState } from "react";
import { Accordion, AccordionBody, AccordionHeader, Modal, ModalBody, ModalHeader } from "reactstrap";

const PaymentHistoryModal = ({ modal, toggle, PaymentHistoryArray }) => {
  const [expandedRow, setExpandedRow] = useState(null);

  const toggleRow = (index) => {
    setExpandedRow((prev) => (prev === index ? null : index));
  };

  return (<Modal isOpen={modal} toggle={toggle} size="xl">
    <ModalHeader toggle={toggle} className={"d-flex justify-content-between"} >
      <p>Payment History</p>
    </ModalHeader>
    <ModalBody className={"p-0"}>
      <div className="d-flex justify-content-end px-4">
        <h4> {`Total Paid - ₹ ${PaymentHistoryArray?.reduce(
          (total, item) =>
            total +
            (item.payments?.reduce((innerTotal, payment) => innerTotal + (payment.paid_amount || 0), 0) || 0),
          0
        )
          }`}
        </h4>

      </div>
      <div className="table-responsive px-4">
        <table className="table table-striped px-2">
          <thead>
            <tr>
              <th>Amount</th>
              <th>Payment ID</th>
              <th>Payment Type</th>
              <th>Payment Request Type</th>
              <th>Payment Status</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {PaymentHistoryArray &&
              PaymentHistoryArray.map((item, index) => (
                <>
                  <tr>
                    <td>₹{item?.amount}</td>
                    <td>{item?.paymentId}</td>
                    <td>{item?.payment_type && item?.payment_type?.split("_")?.map(pay => `${capitalize(pay)} `)}</td>
                    <td>{moment(item?.createdAt).format("DD-MM-YYYY hh:mm")}</td>
                    <td>{item?.status}</td>
                    <td>
                      <button
                        className="btn px-2 py-1"
                        onClick={() => toggleRow(index)}
                      >
                        {expandedRow === index ? 'Hide Details' : 'View Details'}
                      </button>
                    </td>
                  </tr>
                  {expandedRow === index && (
                    <tr>
                      <td colSpan="4">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>Paid Amount</th>
                              <th>Payment ID</th>

                              <th>Method</th>
                              <th>Payment Date</th>
                              <th>Status</th>
                              <th>AX Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {item?.payments?.map((pay, payIndex) => (
                              <tr key={payIndex}>
                                <td>₹{pay?.paid_amount}</td>
                                <td>{pay?.payment_id}</td>
                                <td>{pay?.method}</td>
                                <td>{moment(+pay?.created_at * 1000)?.format("DD-MM-YYYY hh:mm")}</td>
                                <td>{pay?.status}</td>
                                <td>{pay?.ax_status ? 'Updated' : 'Not Updated'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  )}
                </>
              ))}
          </tbody>
        </table>
      </div>
    </ModalBody>
  </Modal>)
}
export default PaymentHistoryModal;