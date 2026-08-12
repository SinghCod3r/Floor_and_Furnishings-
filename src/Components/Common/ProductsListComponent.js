import { useEffect, useState } from "react";
import { GetDataWithToken, PostDataWithToken } from "../ApiHelper/ApiHelper";
import { useInView } from "react-intersection-observer";
import { useNavigate, Link } from "react-router-dom";
import moment from "moment";
import Loader from "./Loader";
import { toast } from "material-react-toastify";
import Swal from "sweetalert2";
import AddProductModal from "./AddProductModal";

const ProductListComponent = ({ superAdmin, outletManagerStore }) => {
  const [openModal, setOpenModal] = useState(false);
  const toggle = () => setOpenModal(!openModal);
  const [filterValues, setFilterValues] = useState({});
  const [filters, setFilters] = useState({});
  const [ProductListData, setProductListData] = useState([]);
  const [pages, setPages] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { ref: myRef, inView: visibleElement } = useInView();
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    if (visibleElement) {
      setCurrentPage((prevData => prevData + 1));
      GetProductListData(currentPage);
    }
  }, [visibleElement, filters]);

  const GetProductListData = (pageNo) => {
    setisLoading(true);
    GetDataWithToken(`superAdmin/get-items?pageNo=${pageNo}&pageSize=10${Object.keys(filters).length ? `&${filters?.join('&')}` : ""}`).then((response) => {
      setisLoading(false);
      if (response.status) {
        setProductListData((prev) => [...prev, ...response.data]);
        setPages(response.pageInfo);
      }
    })
  }

  const FilterValueHandler = (key, value) => {

    setFilterValues(prev => ({
      ...prev,
      [key]: value
    }))
    // setFilterValues((prev) => prev.map(pp => ({
    //   ...pp,
    //   [key]: value,
    // })))
  }

  const ResetHandler = () => {
    setProductListData([]);
    setFilterValues({});
    setCurrentPage(1);
    setFilters({});

    // GetProductListData(1);
  }

  const filterHandler = () => {
    setCurrentPage(1);
    setProductListData([]);
    setFilters(Object.keys(filterValues).map((key, index) => filterValues[key] ? `${key}=${filterValues[key]}` : ""));
    // setFilters((prev) => [...prev, `enquiry=${enquiryId}`]);
    // GetProductListData(1);
  }

  return (<>
    <div className="content-body">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between">
                <h4 className="card-title">Product List</h4>
                <button
                  onClick={toggle}
                  className="btn btn-primary"

                >Add Items</button>
              </div>
              <div className="d-flex gap-4 justify-content-between mt-2 align-items-center">
                <div className="d-flex gap-1">
                  <h6>Total Items - {pages?.count}</h6>
                </div>
                <div className="d-flex gap-4">
                  <div class="d-flex position-relative align-items-center">
                    <span class="position-absolute" style={{ position: "absolute", top: "8px", left: "10px" }}><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path></svg></span>
                    <input
                      class="form-control "
                      placeholder="Search..."
                      name="searchData"
                      value={filterValues?.item || ""}
                      onChange={(e) => {
                        FilterValueHandler("item", e.target.value)
                      }}
                    />
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <label className="form-label text-nowrap">Status</label>
                    <select
                      className="form-control"
                      value={filterValues?.is_blocked || ""}
                      onChange={(e) => {
                        FilterValueHandler("is_blocked", e.target.value)

                      }}
                    >
                      <option value="">All</option>
                      <option value="0">Active</option>
                      <option value="1">Disabled</option>
                    </select>
                  </div>
                  <button
                    className="btn btn-primary py-2"
                    onClick={filterHandler}
                  >Filter</button>
                  <button
                    className="btn btn-primary py-2"
                    onClick={ResetHandler}
                  >Reset</button>
                </div>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table
                    id="example4"
                    className="table card-table display mb-4 shadow-hover table-responsive-lg"
                    style={{ minWidth: "845px", textAlign: "center" }}
                  >
                    <thead>
                      <tr>
                        {/* <th>
                          <input type="checkbox" className="input-field"
                            onClick={AddAllPaymentRequests}
                          />
                        </th> */}
                        <th>Fabric Name</th>
                        <th>category</th>
                        <th>Item Group</th>
                        <th>Item Id</th>
                        <th>Price</th>
                        <th>Sales Price</th>
                        <th>Brand Name</th>
                        <th>Book Name</th>
                        <th>Repeat Horizontal</th>
                        <th>Repeat Vertical</th>
                        <th>Tax</th>
                        <th>Width</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* {console.log("length", AllEnquiry.length)} */}

                      {isLoading && <Loader />}
                      {ProductListData && ProductListData.length === 0 ? (
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
                        ProductListData.map((data, index) => (
                          <tr>
                            <td className="position-relative">
                              <p className="text-ellipsis text-ellipse2">
                                {data?.fabric}
                              </p>
                            </td>
                            <td>{data?.category}</td>
                            <td>{data?.item_group}</td>
                            <td>{data?.item_id}</td>
                            <td>₹ {data?.price}</td>
                            <td>{data?.sales_price ? `₹ ${data?.sales_price}` : 0} </td>
                            <td>{data?.brand_name}</td>
                            <td>{data?.book_name}</td>
                            <td>{data?.repeat_horizontal}</td>
                            <td>{data?.repeat_vertical}</td>
                            <td>{data?.tax && parseFloat(data?.tax)}</td>
                            <td>{data?.width}</td>
                            <td>{data?.is_blocked ? "Blocked" : "Active"}</td>
                            <td>{data?.status}</td>

                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
                <div ref={myRef} id="scroll"></div>
                {/* <PaginationComponent
                      totalPage={totalPage}
                      currentPage={currentPage}
                      setCallApi={(val) => setCallApi(val)}
                      setCurrentPage={(val) => setCurrentPage(val)}
                      handlePageClick={handlePageClick}
                    /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
    <AddProductModal
      modalOpen={openModal}
      toggle={toggle}
    />
  </>)
}
export default ProductListComponent;