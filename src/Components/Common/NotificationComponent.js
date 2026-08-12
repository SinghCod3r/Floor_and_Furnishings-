import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetDataWithToken } from "../ApiHelper/ApiHelper";
import moment from "moment";
import { useInView } from "react-intersection-observer";
import Loader from "./Loader";

export default function NotificationComponent() {
  const navigate = useNavigate();
  const [AllNotification, setAllNotification] = useState([]);
  const [callApi, setCallApi] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const { ref: myRef, inView: visibleElement } = useInView();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (visibleElement || callApi) {
      setCurrentPage((prevData => prevData + 1));
      setIsLoading(true);
      GetDataWithToken(`superadmin/get-notification?pageSize=10&pageNo=${currentPage}`).then((response) => {
        setIsLoading(false);
        if (response.status === true) {
          setAllNotification((prev) => [...prev, ...response?.data?.rows]);
          console.log("first", response.data);
        }
      });
      console.log("i fire once");
      setCallApi(false);
    }
  }, [callApi, visibleElement]);
  return (<>
    <div className="content-body">
      {/* row */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">All Notification</h4>
              </div>
              <div className="card-body">
                {AllNotification && AllNotification.length === 0
                  ? "No Notification Found"
                  : AllNotification.map((item, index) => {
                    return (
                      <a
                        onClick={() => {
                          navigate(`/EnquiryDetials/${item?.enquiry?.id}`, {
                            state: { data: item?.enquiry?.id },
                          });
                        }}
                      >
                        <div className="media border-bottom pb-2 m-3">
                          <div className="media-img">
                            <img
                              src="./images/logo.png"
                              alt="user"
                              className="img-fluid"
                              style={{
                                height: "50px",
                                width: "50px",
                                borderRadius: "10px",
                              }}
                            />
                          </div>
                          <div className="media-body ps-3 pt-2 ">
                            <h5>{item?.message}</h5>
                            <span>
                              {moment(item?.createdAt).format("LLL")}
                            </span>
                          </div>
                        </div>
                      </a>
                    );
                  })}
                {isLoading && <Loader />}
                {!isLoading && <div ref={myRef} id="scroll"></div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  </>)
}