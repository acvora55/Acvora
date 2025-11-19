import React, { useState } from "react";
import "./UniversityRegister.css";

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [files, setFiles] = useState({});
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);

  const totalSteps = 9;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files: uploadedFiles } = e.target;
    if (
      name === "logo" ||
      name === "accreditationDoc" ||
      name === "affiliationDoc" ||
      name === "registrationDoc" ||
      name === "file" ||
      name === "cutoffExcel" ||
      name === "admissionsExcel" ||
      name === "placementsExcel"
    ) {
      setFiles({
        ...files,
        [name]: uploadedFiles[0], // Single file
      });
    } else {
      setFiles({
        ...files,
        [name]: Array.from(uploadedFiles), // Multiple files
      });
    }
  };

  const handleFacilityChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedFacilities([...selectedFacilities, value]);
      setFormData((prev) => ({
        ...prev,
        facilities: [
          ...(prev.facilities || []),
          { name: value, description: "" },
        ],
      }));
    } else {
      setSelectedFacilities(selectedFacilities.filter((f) => f !== value));
      setFormData((prev) => ({
        ...prev,
        facilities: (prev.facilities || []).filter((f) => f.name !== value),
      }));
    }
  };

  const addBranch = () => {
    setBranches([...branches, { name: "", avgLPA: "", highestLPA: "" }]);
  };

  const handleBranchChange = (index, field, value) => {
    const newBranches = [...branches];
    newBranches[index][field] = value;
    setBranches(newBranches);
  };

  const next = () => {
    if (step === 1) {
      if (!files.bannerImage || files.bannerImage.length < 3) {
        alert("Please upload at least 3 banner images.");
        return;
      }
    }
    if (step === 2) {
      if (!files.aboutImages || files.aboutImages.length < 5) {
        alert("Please upload at least 5 about images.");
        return;
      }
    }
    setStep((s) => Math.min(totalSteps, s + 1));
  };

  const prev = () => setStep((s) => Math.max(1, s - 1));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // ✅ Show loader

    try {
      // -----------------------------
      // 1. Prepare main payload
      // -----------------------------
      const payload = new FormData();

      // Append text fields except facilities
      Object.entries(formData).forEach(([key, val]) => {
        if (key !== "facilities") {
          payload.append(key, val);
        }
      });

      // Facilities (stringify array)
      if (formData.facilities?.length) {
        payload.append("facilities", JSON.stringify(formData.facilities));
      }

      // Branches
      if (branches?.length) {
        payload.append("branches", JSON.stringify(branches));
      }

      // File fields
      Object.entries(files).forEach(([key, fileList]) => {
        if (!fileList) return;
        if (Array.isArray(fileList)) {
          fileList.forEach((f) => payload.append(key, f));
        } else {
          payload.append(key, fileList);
        }
      });

      // -----------------------------
      // 2. Register university
      // -----------------------------
      const baseUrl = "https://acvora-07fo.onrender.com";

      const res = await fetch(`${baseUrl}/api/university-registration`, {
        method: "POST",
        body: payload,
      });

      if (!res.ok) {
        console.error("❌ Registration failed:", await res.text());
        alert("❌ University registration failed!");
        return;
      }

      const data = await res.json();
      console.log("✅ University registered:", data);

      if (!data?.data?._id) {
        alert("❌ University not created!");
        return;
      }

      // ✅ store universityId in localStorage and variable
      const universityId = data.data._id;
      localStorage.setItem("universityId", universityId);

      // -----------------------------
      // 3. Helper for uploads
      // -----------------------------
      const uploadFile = async (url, formData, label) => {
        const r = await fetch(url, { method: "POST", body: formData });
        if (!r.ok) {
          console.error(`❌ ${label} upload failed:`, await r.text());
          alert(`❌ ${label} upload failed!`);
          throw new Error(`${label} upload failed`);
        }
        console.log(`✅ ${label} uploaded`);
      };

      // -----------------------------
      // 4. Upload extras (if provided)
      // -----------------------------
      if (files.file) {
        const fd = new FormData();
        fd.append("file", files.file);
        await uploadFile(
          `${baseUrl}/api/universities/${universityId}/courses/upload`,
          fd,
          "Courses"
        );
      }

      if (files.cutoffExcel) {
        const fd = new FormData();
        fd.append("file", files.cutoffExcel);
        await uploadFile(
          `${baseUrl}/api/cutoff/${universityId}/cutoff/upload`,
          fd,
          "Cutoff"
        );
      }

      if (files.admissionsExcel) {
        const fd = new FormData();
        fd.append("file", files.admissionsExcel);
        await uploadFile(
          `${baseUrl}/api/admissions/${universityId}/admissions/upload`,
          fd,
          "Admissions"
        );
      }

      if (files.placementsExcel) {
        const fd = new FormData();
        fd.append("file", files.placementsExcel);
        await uploadFile(
          `${baseUrl}/api/universities/${universityId}/placements/upload`,
          fd,
          "Placements"
        );
      }

      if (files.infraPhotos || files.eventPhotos || files.galleryImages) {
        const fd = new FormData();
        files.infraPhotos?.forEach((f) => fd.append("infraPhotos", f));
        files.eventPhotos?.forEach((f) => fd.append("eventPhotos", f));
        files.galleryImages?.forEach((f) => fd.append("galleryImages", f));
        await uploadFile(
          `${baseUrl}/api/universities/${universityId}/gallery/upload`,
          fd,
          "Gallery"
        );
      }

      if (files.recruitersLogos?.length) {
        const fd = new FormData();
        files.recruitersLogos.forEach((f) => fd.append("recruitersLogos", f));
        await uploadFile(
          `${baseUrl}/api/recruiters/${universityId}/recruiters/upload`,
          fd,
          "Recruiters logos"
        );
      }

      // -----------------------------
      // 5. Success
      // -----------------------------
      alert("🎉 University Registered Successfully!");
    } catch (err) {
      console.error("❌ Error submitting form:", err);
      alert("❌ Form submission failed!");
    } finally {
      setLoading(false); // ✅ Hide loader
    }
  };

  const facilityOptions = [
    "hostel",
    "library",
    "labs",
    "researchCenters",
    "sports",
    "cafeteria",
    "auditorium",
    "medical",
    "transport",
    "itFacilities",
    "placementCell",
    "internshipTieups",
  ];

  return (
    <div className="univ-app-container">
      {loading && (
        <div className="loader-overlay">
          <div className="loader"></div>
          <p>Processing... Please wait</p>
        </div>
      )}
     
      <header className="univ-header">
        <h1 className="univ-header-title">University Registration</h1>
        <p className="univ-header-subtitle">Complete all 9 steps below</p>
      </header>

      <div className="univ-stepper">
        {[...Array(totalSteps)].map((_, i) => (
          <div
            key={i}
            className={`univ-stepper-circle ${step === i + 1 ? "active" : ""} ${
              step > i + 1 ? "completed" : ""
            }`}
          >
            {i + 1}
          </div>
        ))}
      </div>

      <main className="univ-main-container">
        <form
          className="univ-multi-step-form wide-form"
          onSubmit={handleSubmit}
        >
          {step === 1 && (
            <div className="univ-form-step grid-3">
              <h3 className="univ-step-title">
                Step 1: Basic Info + Hero Section
              </h3>
              <input
                name="instituteName"
                placeholder="Institute Name"
                onChange={handleChange}
                title="Enter the full name of the institute. This will appear in the hero section."
              />
              <select
                name="type"
                onChange={handleChange}
                title="Select the type of institution. Used in hero display."
              >
                <option value="">Select Type</option>
                <option>University</option>
                <option>College</option>
                <option>Institute</option>
              </select>
              <input
                name="year"
                placeholder="Establishment Year"
                onChange={handleChange}
                title="Year the institute was established, e.g., 1998. Shown in hero."
              />
              <select
                name="ownership"
                onChange={handleChange}
                title="Ownership type. Displayed in hero."
              >
                <option value="">Select Ownership</option>
                <option>Private</option>
                <option>Government</option>
                <option>Deemed</option>
                <option>Autonomous</option>
              </select>
              <input
                name="accreditation"
                placeholder="Accreditation (e.g., NAAC A+)"
                onChange={handleChange}
                title="Accreditation details like NAAC grade. Hero section."
              />
              <input
                name="affiliation"
                placeholder="Affiliation (e.g., UGC, AICTE)"
                onChange={handleChange}
                title="Affiliations and approvals. Shown in hero."
              />
              <input
                name="students"
                placeholder="No. of Students (e.g., 78234)"
                onChange={handleChange}
                title="Total number of students. Hero display."
              />
              <input
                name="faculty"
                placeholder="No. of Faculty (e.g., 234)"
                onChange={handleChange}
                title="Total faculty count. Hero section."
              />
              <label>Upload Logo</label>
              <input
                type="file"
                name="logo"
                accept="image/*"
                onChange={handleFileChange}
              />

              <label>Upload Banner Images (at least 3)</label>
              <input
                type="file"
                name="bannerImage"
                multiple
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
          )}

          {step === 2 && (
            <div className="univ-form-step grid-3">
              <h3 className="univ-step-title">Step 2: About Section</h3>
              <textarea
                name="description"
                placeholder="About the University (Detailed Description)"
                rows={6}
                onChange={handleChange}
                title="Provide a detailed description about the university. This will be displayed in the about section."
              />
              <label>Upload About Images (at least 5)</label>
              <input
                type="file"
                name="aboutImages"
                multiple
                onChange={handleFileChange}
                title="Upload at least 5 images for the about section (e.g., campus views)."
              />
            </div>
          )}

          {step === 3 && (
            <div className="univ-form-step grid-3">
              <h3 className="univ-step-title">
                Step 3: Contact & Info Section
              </h3>
              <input
                name="address"
                placeholder="Campus Address"
                onChange={handleChange}
                title="Full campus address. Used in info section."
              />
              <select
                name="state"
                onChange={handleChange}
                title="Select state. Part of location in info."
              >
                <option value="">Select State</option>
                <option>Maharashtra</option>
                <option>Karnataka</option>
                <option>Delhi</option>
                <option>Tamil Nadu</option>
                <option>Uttar Pradesh</option>
              </select>
              <input
                name="city"
                placeholder="City (e.g., Gurgaon)"
                onChange={handleChange}
                title="City name. Displayed in hero and info."
              />
              <input
                name="email"
                placeholder="Email"
                onChange={handleChange}
                title="Contact email."
              />
              <input
                name="phone"
                placeholder="Phone"
                onChange={handleChange}
                title="Contact phone number."
              />
              <input
                name="website"
                placeholder="Website"
                onChange={handleChange}
                title="Institute website URL."
              />
              <input
                name="socialMedia"
                placeholder="Social Media Links (comma-separated)"
                onChange={handleChange}
                title="List social media links, separated by commas."
              />
              <input
                name="topRecruiters"
                placeholder="Top Recruiters (comma-separated)"
                onChange={handleChange}
                title="List top recruiters for info section."
              />
              <input
                name="highestPackage"
                placeholder="Highest Package (LPA)"
                onChange={handleChange}
                title="Highest placement package. Info section."
              />
              <input
                name="avgPackage"
                placeholder="Average Package (LPA)"
                onChange={handleChange}
                title="Average placement package. Info section."
              />
              <input
                name="campusSize"
                placeholder="Campus Size (e.g., 50 acres)"
                onChange={handleChange}
                title="Campus size details."
              />
              <input
                name="hostelFee"
                placeholder="Hostel Fee"
                onChange={handleChange}
                title="Hostel fee details."
              />
              <input
                name="studentRating"
                placeholder="Student Rating (e.g., 4.5/5)"
                onChange={handleChange}
                title="Overall student rating."
              />
              <input
                name="nirfRank"
                placeholder="NIRF Rank"
                onChange={handleChange}
                title="NIRF ranking."
              />
            </div>
          )}

          {step === 4 && (
            <div className="univ-form-step grid-3">
              <h3 className="univ-step-title">
                Step 4: Courses, Fees & Cutoffs
              </h3>
              <label>Upload Courses & Fees Excel (courses.xlsx)</label>
              <input
                type="file"
                name="file"
                onChange={handleFileChange}
                accept=".xlsx"
                title="Upload Excel file with columns: Course Name, Total Fee, Yearly Fees, Duration, Intake."
              />
              <label>Upload Cutoffs Excel (cutoff.xlsx)</label>
              <input
                type="file"
                name="cutoffExcel"
                onChange={handleFileChange}
                accept=".xlsx"
                title="Upload Excel file with columns: Courses, Open, General, EWS, OBC, SC, ST, PWD."
              />
              <input
                name="popularCourses"
                placeholder="Popular Courses (comma-separated)"
                onChange={handleChange}
                title="List popular courses for info section."
              />
            </div>
          )}

          {step === 5 && (
            <div className="univ-form-step grid-3">
              <h3 className="univ-step-title">Step 5: Placements</h3>

              {/* Placement Rate */}
              <input
                name="placementRate"
                placeholder="Placement Rate (%)"
                value={formData.placementRate || ""}
                onChange={handleChange}
                title="Overall placement rate."
              />

              {/* Highest Package */}
              <input
                name="highestPackage"
                placeholder="Highest Package (₹ LPA)"
                value={formData.highestPackage || ""}
                onChange={handleChange}
                title="Highest package overall."
              />

              {/* Average Package */}
              <input
                name="avgPackage"
                placeholder="Average Package (₹ LPA)"
                value={formData.avgPackage || ""}
                onChange={handleChange}
                title="Average package overall."
              />

              {/* Upload Year-wise Placements */}
              <label>Upload Year-wise Placements Excel (placements.xlsx)</label>
              <input
                type="file"
                name="placementsExcel"
                onChange={handleFileChange}
                accept=".xlsx"
                title="Upload Excel with columns: Year, Companies, Placed, Highest CTC, Avg CTC."
              />

              {/* Upload Recruiters Logos */}
              <label>Upload Top Recruiters Logos</label>
              <input
                type="file"
                name="recruitersLogos"
                multiple
                onChange={handleFileChange}
              />

              {/* Branch-wise Placements */}
              <h4>Branch-wise Placements</h4>
              <button
                type="button"
                onClick={addBranch}
                className="univ-add-btn"
              >
                + Add Branch
              </button>

              {branches.map((branch, index) => (
                <div key={index} className="branch-group">
                  <input
                    placeholder="Branch Name"
                    value={branch.name}
                    onChange={(e) =>
                      handleBranchChange(index, "name", e.target.value)
                    }
                    title="Enter branch name for dropdown."
                  />
                  <input
                    placeholder="Avg Package (₹ LPA)"
                    value={branch.avgPackage || ""}
                    onChange={(e) =>
                      handleBranchChange(index, "avgPackage", e.target.value)
                    }
                    title="Average package for this branch."
                  />
                  <input
                    placeholder="Highest Package (₹ LPA)"
                    value={branch.highestPackage || ""}
                    onChange={(e) =>
                      handleBranchChange(
                        index,
                        "highestPackage",
                        e.target.value
                      )
                    }
                    title="Highest package for this branch."
                  />
                </div>
              ))}
            </div>
          )}

          {step === 6 && (
            <div className="univ-form-step grid-3">
              <h3 className="univ-step-title">Step 6: Facilities</h3>
              <p>Select facilities (icons hardcoded in frontend):</p>
              {facilityOptions.map((fac) => (
                <label key={fac} className="univ-checkbox-label">
                  <input
                    type="checkbox"
                    value={fac}
                    checked={selectedFacilities.includes(fac)}
                    onChange={handleFacilityChange}
                  />
                  {fac.charAt(0).toUpperCase() + fac.slice(1)}
                </label>
              ))}
              {selectedFacilities.map((fac) => (
                <textarea
                  key={fac}
                  name={`facility_${fac}_desc`}
                  placeholder={`Description for ${
                    fac.charAt(0).toUpperCase() + fac.slice(1)
                  }`}
                  rows={3}
                  value={
                    (formData.facilities || []).find((f) => f.name === fac)
                      ?.description || ""
                  }
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      facilities: [
                        ...(prev.facilities || []).filter(
                          (f) => f.name !== fac
                        ),
                        { name: fac, description: e.target.value },
                      ],
                    }))
                  }
                />
              ))}
            </div>
          )}

          {step === 7 && (
            <div className="univ-form-step grid-3">
              <h3 className="univ-step-title">Step 7: Gallery</h3>
              <label>Upload Infrastructure Photos</label>
              <input
                type="file"
                name="infraPhotos"
                multiple
                onChange={handleFileChange}
                title="Upload photos related to infrastructure for gallery."
              />
              <label>Upload Event Photos</label>
              <input
                type="file"
                name="eventPhotos"
                multiple
                onChange={handleFileChange}
                title="Upload photos related to events for gallery."
              />
              <label>Upload Additional Gallery Images</label>
              <input
                type="file"
                name="galleryImages"
                multiple
                onChange={handleFileChange}
                title="Upload any additional images for the gallery section."
              />
            </div>
          )}

          {step === 8 && (
            <div className="univ-form-step grid-3">
              <h3 className="univ-step-title">Step 8: Admissions</h3>
              <label>Upload Admissions Excel (admissions.xlsx)</label>
              <input
                type="file"
                name="admissionsExcel"
                onChange={handleFileChange}
                accept=".xlsx"
                title="Upload Excel with columns: Course Name, Eligibility, Specialization, Fee, Highest Pack, Avg Package."
              />
              <textarea
                name="admissionDetails"
                placeholder="Overall Admission Details"
                rows={4}
                onChange={handleChange}
                title="Provide general admission information."
              />
              <input
                name="scholarships"
                placeholder="Scholarships (comma-separated)"
                onChange={handleChange}
                title="List available scholarships."
              />
            </div>
          )}

          {step === 9 && (
            <div className="univ-form-step grid-3">
              <h3 className="univ-step-title">
                Step 9: International, Docs, Account & Submit
              </h3>
              <input
                name="intlStudentOffice"
                placeholder="Intl. Student Office"
                onChange={handleChange}
                title="Details about international student office."
              />
              <input
                name="countriesEnrolled"
                placeholder="Countries Enrolled (comma-separated)"
                onChange={handleChange}
                title="Countries from which students are enrolled."
              />
              <input
                name="foreignMoUs"
                placeholder="Foreign MoUs (comma-separated)"
                onChange={handleChange}
                title="List of foreign MoUs."
              />
              <input
                name="languageSupport"
                placeholder="Language Support"
                onChange={handleChange}
                title="Language support details."
              />
              <input
                name="visaSupport"
                placeholder="Visa Support"
                onChange={handleChange}
                title="Visa assistance details."
              />
              <label>Upload Accreditation Doc</label>
              <input
                type="file"
                name="accreditationDoc"
                onChange={handleFileChange}
                title="Upload accreditation document."
              />
              <label>Upload Affiliation Doc</label>
              <input
                type="file"
                name="affiliationDoc"
                onChange={handleFileChange}
                title="Upload affiliation document."
              />
              <label>Upload Registration Doc</label>
              <input
                type="file"
                name="registrationDoc"
                onChange={handleFileChange}
                title="Upload registration document."
              />
              <label>Upload Videos</label>
              <input
                type="file"
                name="videos"
                multiple
                onChange={handleFileChange}
                title="Upload promotional or campus videos."
              />
              <input
                name="emailUsername"
                placeholder="Email (Username)"
                onChange={handleChange}
                title="Email to use as username for account."
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                title="Set a password for the account."
              />
              <select
                name="subscriptionPlan"
                onChange={handleChange}
                title="Select subscription plan."
              >
                <option value="">Select Plan</option>
                <option value="free">Free</option>
                <option value="standard">Standard ₹999/mo</option>
                <option value="premium">Premium ₹1999/mo</option>
              </select>
              <label className="univ-checkbox-label">
                <input
                  type="checkbox"
                  name="declaration"
                  checked={formData.declaration || false}
                  onChange={handleChange}
                />
                I confirm all details are correct
              </label>
              <button type="submit" className="univ-submit-btn">
                Submit
              </button>
            </div>
          )}

          <div className="univ-form-nav">
            {step > 1 && step <= totalSteps && (
              <button type="button" onClick={prev} className="univ-nav-btn">
                ⬅ Back
              </button>
            )}
            {step < totalSteps && (
              <button type="button" onClick={next} className="univ-nav-btn">
                Next ➡
              </button>
            )}
          </div>
        </form>
      </main>
    </div>
  );
}