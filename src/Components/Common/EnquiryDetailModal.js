import moment from "moment";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Link, useNavigate } from "react-router-dom";
import { Modal, ModalBody, ModalHeader, Spinner } from "reactstrap";
import * as XLSX from 'xlsx';
import { GetDataWithToken } from "../ApiHelper/ApiHelper";

export default function EnquiryDetailModal({ isLoading, enquiryData, toggle, openModal, setEnquiryData, outletManagerStore, superAdmin, enquiryStates }) {
  const { ref: myRef, inView: visibleElement } = useInView();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (visibleElement) {
  //     setEnquiryData((prev) => ({
  //       ...prev,
  //       enquiryPages: { ...prev?.enquiryPages, currentPage: prev?.enquiryPages.currentPage + 1 }
  //     }));
  //   }
  // }, [visibleElement])

  const closeHandler = () => {
    toggle();
    setEnquiryData((prev) => ({
      ...prev,
      enquiryDetailData: [],
    }));
  }

  const CommonTableHeading = [{ value: "enquiryId", label: "Enquiry No." }, { value: "enquiryDate", label: "Enquiry Date" },
  { value: "customerName", label: "Customer Name" },
  { value: "contactNumber", label: "Customer Mobile No." },
  // { value: "storeName", label: "Store Name" },
  { value: "product", label: "Products" },
  { value: "icName", label: "Sales Person" },
  { value: "business_value", label: "Business Value" },
    // { value: "currentStatus", label: "Current Status" },
  ]


  const closeBtn = (
    <button className="btn btn-primary" onClick={closeHandler} type="button">
      &times;
    </button>
  );

  const downloadHandler = () => {
    const tableFormattedData = enquiryData?.map((enq) => {
      const formattedRow = {};
      CommonTableHeading?.map((heading) => {
        formattedRow[heading.value] = enq[heading.value];
      })
      return formattedRow;
    });

    const worksheet = XLSX.utils.json_to_sheet(tableFormattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    XLSX.writeFile(workbook, `new-enquiry.xlsx`);
  }

  return (<Modal isOpen={openModal} fullscreen toggle={closeHandler} scrollable>
    <div className="d-flex justify-content-between align-items-center py-4 px-5 ">
      <h4>Task Details</h4>
      <div>
        <button
          onClick={downloadHandler}
          className="btn btn-primary mx-1"
        >
          Download
        </button>
        {closeBtn}
      </div>
    </div>
    {/* <ModalHeader className='ms-2' close={closeBtn}>
      Task Details
     
    </ModalHeader> */}
    <ModalBody>

      {isLoading ?

        <div className="d-flex justify-content-center py-4">
          <Spinner />
        </div>

        :
        <div className="table-responsive">
          <table
            id="example4"
            className="table card-table display mb-4 shadow-hover table-responsive-lg"
            style={{ minWidth: "845px", textAlign: "center" }}
          >
            <thead>
              <tr>
                {CommonTableHeading?.map((item) => <th>{item?.label}</th>)}

              </tr>
            </thead>
            <tbody>
              {/* {console.log("length", AllEnquiry.length)} */}

              {/* {isLoading && <Loader />} */}
              {enquiryData && enquiryData.length === 0 ? (
                <h3
                  style={{
                    position: "absolute",
                    left: "40%",
                    padding: "10px",
                  }}
                >
                  No data found
                </h3>
              ) : (
                enquiryData?.map((data, index) => {
                  return <tr>
                    {CommonTableHeading?.map((table) => {
                      switch (table?.value) {
                        case "enquiryId":
                          return <td><Link
                            to={superAdmin ? `/EnquiryDetials/${data?.id}` : outletManagerStore ? `/OutletEnquiryDetials/${data?.id}` : `/EnquiryDetials/${data?.id}`}
                            state={{
                              data: data?.id,
                              category: data?.products,
                              icPerson: `${data?.user?.firstName} ${data?.user?.lastName}`,
                            }}
                          >
                            {data[table?.value]}
                          </Link>
                          </td>
                        default:
                          return <td>{data[table?.value]}</td>

                      }

                    })}

                  </tr>
                }
                )
              )}
            </tbody>
          </table>
          <div ref={myRef} id="scroll"></div>
        </div>}
    </ModalBody>
  </Modal >
  )
}
