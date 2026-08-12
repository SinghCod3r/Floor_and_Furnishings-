import { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";
import { GetDataWithToken } from "../../ApiHelper/ApiHelper";
import OutletManagerHeader from "./OutletManagerHeader";
import OutletManagerSidebar from "./OutletManagerSidebar";

const OutletFootfallDetail = () => {
    const [footfallDetail, setFootfallDetail] = useState({});
    const location = useLocation();
    const excludeFields = ['id', 'createdby', 'updatedAt', "createdby", "createdAt", "createdon", "deletedAt"];
    console.log("dafatatata", location?.state?.id);

    useEffect(() => {
        GetDataWithToken(`customer/get-client/${location?.state?.id}`).then((response) => {
            if (response?.status === true) {
                setFootfallDetail(response?.data);
            }
        })
    }, [])

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
                className="show"
            >
                <OutletManagerHeader />
                <OutletManagerSidebar />

                <div className="content-body" id="printableArea">
                    {/* row */}
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-xl-11">
                                <div className="card">

                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="heading">
                                                    <h3 className="">Client Footfall Details</h3>
                                                </div>
                                                <ul className="list-group list-group-flush">
                                                    <li class="col-12 d-flex flex-wrap">
                                                        {footfallDetail && Object?.keys(footfallDetail)
                                                            .filter(key => !excludeFields?.includes(key))
                                                            .map((key, index) => (
                                                                <div className="col-lg-6">
                                                                    <span className="mb-0">{key?.replace(/_/g, ' ')?.toUpperCase()} : </span>
                                                                    <strong>
                                                                        {key === "category" ?
                                                                            (footfallDetail[key] && JSON.parse(footfallDetail[key]))?.map((data) =>

                                                                                <strong>{data}</strong>

                                                                            ) :
                                                                            footfallDetail[key] ? footfallDetail[key] : 'N/A'}
                                                                    </strong>
                                                                </div>
                                                            ))}
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OutletFootfallDetail;