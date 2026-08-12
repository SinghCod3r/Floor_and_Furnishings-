import React from "react";
import { useNavigate } from "react-router-dom";

function Error() {
  const navigate = useNavigate();
  return (
    <>
      <div className="vh-100">
        <div className="authincation h-100">
          <div className="container h-100">
            <div className="row justify-content-center h-100 align-items-center">
              <div className="col-md-5">
                <div className="form-input-content text-center error-page">
                  <h1 className="error-text fw-bold   text-white">500</h1>
                  <h4 className="text-white">
                    <i className="fa fa-times-circle text-danger" />
                    Internal Server Error
                  </h4>
                  <p className="text-white">
                    You do not have permission to view this resource
                  </p>

                  <button
                    onClick={() => navigate(-1)}
                    className="btn btn-primary"
                  >
                    GO Back
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Error;
