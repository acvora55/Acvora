import "./ReviewForm.css";

const ReviewForm = ({data }) => {
  return (
    <div className="review-form">
      <div className="form-control">
        <label htmlFor="comment">About University</label>
        <textarea
          name="comment"
          id="comment"
          placeholder="Write about your university/college"
          required
          onChange={(e) => data.append("comment", e.target.value)}
        ></textarea>
      </div>
      <div className="form-control">
        <label htmlFor="course">Courses</label>
        <textarea
          name="course"
          id="course"
          placeholder="Enter your Course details"
          required
          onChange={(e) => data.append("course", e.target.value)}
        ></textarea>
      </div>
      <div className="form-control">
        <label htmlFor="AdmissionDetails">Admission Details</label>
        <textarea
          name="AdmissionDetails"
          id="AdmissionDetails"
          placeholder="Write your Admission details"
          required
          onChange={(e) => data.append("AdmissionDetails", e.target.value)}
        ></textarea>
      </div>
    </div>
  );
};

export default ReviewForm;
