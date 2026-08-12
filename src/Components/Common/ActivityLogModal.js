import moment from "moment";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

export default function ActivityLogModal({ ActivityOpen, toggle, ActivityLog }) {
  return (<>
    return <Modal isOpen={ActivityOpen} toggle={toggle}>
      <ModalHeader>Activity Logs
      </ModalHeader>
      <ModalBody>
        <div className="table-responsive">
          <table
            id="example4"
            className="table card-table display mb-4 shadow-hover"
          // style={{ minWidth: "845px" }}
          >
            <thead>
              <tr>
                <th>Login Time</th>
                <th>Logout Time</th>
              </tr>
            </thead>
            <tbody>
              {ActivityLog && ActivityLog?.map((data) => <tr>
                <td>{moment(data.login_time).format(
                  "MMMM Do YYYY HH:mm:ss"
                )}</td>
                <td>
                  {moment(data.logout_time).format(
                    "MMMM Do YYYY HH:mm:ss"
                  )}
                </td>
              </tr>)}
            </tbody>
          </table>
        </div>
      </ModalBody>
    </Modal>
  </>)
}






