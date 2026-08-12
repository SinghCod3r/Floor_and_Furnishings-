import { toast } from "material-react-toastify";
import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PostData } from "../../ApiHelper/ApiHelper";

const CustomerFeedback = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const formRef = useRef(null);
    console.log("loooooooo", location);
    const onSubmit = (e) => {
        e.preventDefault();

        // Get the selected values from the radio buttons using the formRef
        const formData = new FormData(formRef.current);
        const selectedValues = [];

        for (const [key, value] of formData.entries()) {
            selectedValues.push({ ques: key, ans: value });
        }

        console.log("Selected Values:", selectedValues);

        const submitData = {
            description: selectedValues,
            enquiryId: location?.state?.orderId?.id,
            customerId: location?.state?.orderId?.customerId,
        };

        console.log("Submit Data:", submitData);

        PostData(`customer/add-feedback`, submitData).then((response) => {
            if (response.status === true) {
                toast.success("Feedback sent successfully");
                navigate(-1);
            } else {
                toast.error(response.data.message);
                // toast.error("Sorry, your feedback could not be sent. Please try again.");
            }
        });
    };

    return (
        <div className="authincation h-100">
            <div className="container h-100vh">
                <div className="row justify-content-center h-100 align-items-center">
                    <div className="col-xl-12">
                        <div className="authincation-content">
                            <div className="row no-gutters">
                                <div className="col-xl-12 px-4 py-2">
                                    <div className="card-header">
                                        <h4>Please enter your feedback</h4>
                                        <span
                                            onClick={() => {
                                                navigate(-1);
                                            }}
                                            style={{ cursor: "pointer" }}
                                        >
                                            <i className="fas fa-arrow-left" style={{ fontSize: "20px" }}></i>
                                        </span>
                                    </div>
                                    <div className="basic-form mx-3">
                                        <form ref={formRef} onSubmit={onSubmit}>
                                            <div className="row align-items-center">
                                                {/* Q1 */}
                                                <div className="col-lg-12 my-1">
                                                    <div className="my-2">
                                                        <strong>Q1:</strong>
                                                        <span>Are you satisfied with the quality of the installed material?</span>
                                                    </div>
                                                    <div>
                                                        <input type="radio" name="Are you satisfied with the quality of the installed material?" value="yes" required />
                                                        <label htmlFor="yesq1">Yes</label>
                                                        <input type="radio" name="Are you satisfied with the quality of the installed material?" value="no" required />
                                                        <label htmlFor="noq1">No</label>
                                                    </div>
                                                </div>

                                                {/* Q2 */}
                                                <div className="col-lg-12 my-1">
                                                    <div className="my-2">
                                                        <strong>Q2:</strong>
                                                        <span>Did the installation team complete the work to your satisfaction?</span>
                                                    </div>
                                                    <div>
                                                        <input type="radio" name="Did the installation team complete the work to your satisfaction?" value="yes" required />
                                                        <label htmlFor="yesq2">Yes</label>
                                                        <input type="radio" name="Did the installation team complete the work to your satisfaction?" value="no" required />
                                                        <label htmlFor="noq2">No</label>
                                                    </div>
                                                </div>

                                                {/* Q3 */}
                                                <div className="col-lg-12 my-1">
                                                    <div className="my-2">
                                                        <strong>Q3:</strong>
                                                        <span>Were there any damages or issues with the materials upon installation?</span>
                                                    </div>
                                                    <div>
                                                        <input type="radio" name="Were there any damages or issues with the materials upon installation?" value="yes" required />
                                                        <label htmlFor="yesq3">Yes</label>
                                                        <input type="radio" name="Were there any damages or issues with the materials upon installation?" value="no" required />
                                                        <label htmlFor="noq3">No</label>
                                                    </div>
                                                </div>

                                                {/* Q4 */}
                                                <div className="col-lg-12 my-1">
                                                    <div className="my-2">
                                                        <strong>Q4:</strong>
                                                        <span>Did the installation team clean up the room after installation?</span>
                                                    </div>
                                                    <div>
                                                        <input type="radio" name="Did the installation team clean up the room after installation?" value="yes" required />
                                                        <label htmlFor="yesq4">Yes</label>
                                                        <input type="radio" name="Did the installation team clean up the room after installation?" value="no" required />
                                                        <label htmlFor="noq4">No</label>
                                                    </div>
                                                </div>

                                                {/* Q5 */}
                                                <div className="col-lg-12 my-1">
                                                    <div className="my-2">
                                                        <strong>Q5:</strong>
                                                        <span>Would you consider using our installation services again in the future?</span>
                                                    </div>
                                                    <div>
                                                        <input type="radio" name="Would you consider using our installation services again in the future?" value="yes" required />
                                                        <label htmlFor="yesq5">Yes</label>
                                                        <input type="radio" name="Would you consider using our installation services again in the future?" value="no" required />
                                                        <label htmlFor="noq5">No</label>
                                                    </div>
                                                </div>

                                                {/* Q6 */}
                                                <div className="col-lg-12 my-1">
                                                    <div className="my-2">
                                                        <strong>Q6:</strong>
                                                        <span>On a scale of 1 to 5, how satisfied are you with the installation process?</span>
                                                    </div>
                                                    <div>
                                                        <input type="radio" name="On a scale of 1 to 5, how satisfied are you with the installation process?" value="1" required />
                                                        <label htmlFor="s1q6">1</label>
                                                        <input type="radio" name="On a scale of 1 to 5, how satisfied are you with the installation process?" value="2" required />
                                                        <label htmlFor="s2q6">2</label>
                                                        <input type="radio" name="On a scale of 1 to 5, how satisfied are you with the installation process?" value="3" required />
                                                        <label htmlFor="s3q6">3</label>
                                                        <input type="radio" name="On a scale of 1 to 5, how satisfied are you with the installation process?" value="4" required />
                                                        <label htmlFor="s4q6">4</label>
                                                        <input type="radio" name="On a scale of 1 to 5, how satisfied are you with the installation process?" value="5" required />
                                                        <label htmlFor="s5q6">5</label>
                                                    </div>
                                                </div>

                                                {/* Feedback
                                                <div className="col-lg-12 my-1">
                                                    <label className="me-sm-2">Enter your feedback here</label>
                                                    <textarea
                                                        name="feedback"
                                                        className="me-sm-2 form-control"
                                                    // Add any necessary attributes or validations
                                                    />
                                                </div> */}
                                            </div>
                                            <button className="btn btn-primary" type="submit">
                                                Submit
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerFeedback;
