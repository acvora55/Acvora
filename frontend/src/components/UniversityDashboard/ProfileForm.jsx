import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProfileForm.css";

export default function ProfileForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const baseUrl = "https://acvora-07fo.onrender.com";

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!id) return;
        const res = await fetch(`${baseUrl}/api/universities/${id}`);
        if (!res.ok) throw new Error("Failed to fetch profile");
        const data = await res.json();
        setProfile(data);
        setFormData(data);
      } catch (err) {
        console.error("❌ Error fetching profile:", err);
      }
    };
    fetchProfile();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${baseUrl}/api/universities/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to update profile");
      const updated = await res.json();
      setProfile(updated);
      setEditing(false);
      alert("✅ Profile updated successfully!");
    } catch (err) {
      console.error("❌ Error updating profile:", err);
      alert("❌ Update failed!");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this university?")) return;
    try {
      const res = await fetch(`${baseUrl}/api/universities/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete profile");
      alert("🗑 University deleted!");
      navigate("/");
    } catch (err) {
      console.error("❌ Delete error:", err);
      alert("❌ Delete failed!");
    }
  };

  if (!profile) {
    return <p className="loading-text">Loading profile...</p>;
  }

  return (
    <div className="profile-container">
      <h2 className="profile-title">University Profile</h2>

      <div className="profile-actions">
        {editing ? (
          <button className="btn save-btn" onClick={handleSubmit}>Save</button>
        ) : (
          <button className="btn edit-btn" onClick={() => setEditing(true)}>Edit</button>
        )}
        <button className="btn delete-btn" onClick={handleDelete}>Delete</button>
      </div>

      <form className="profile-form" onSubmit={handleSubmit}>
        {/* Basic Info */}
        <section>
          <h3>Basic Info</h3>
          <input name="instituteName" placeholder="Institute Name" value={formData.instituteName || ""} onChange={handleChange} disabled={!editing} />
          <input name="type" placeholder="Type" value={formData.type || ""} onChange={handleChange} disabled={!editing} />
          <input name="year" placeholder="Year" value={formData.year || ""} onChange={handleChange} disabled={!editing} />
          <input name="ownership" placeholder="Ownership" value={formData.ownership || ""} onChange={handleChange} disabled={!editing} />
          <input name="accreditation" placeholder="Accreditation" value={formData.accreditation || ""} onChange={handleChange} disabled={!editing} />
          <input name="affiliation" placeholder="Affiliation" value={formData.affiliation || ""} onChange={handleChange} disabled={!editing} />
          <input name="students" placeholder="No. of Students" value={formData.students || ""} onChange={handleChange} disabled={!editing} />
          <input name="faculty" placeholder="No. of Faculty" value={formData.faculty || ""} onChange={handleChange} disabled={!editing} />
        </section>

        {/* Contact Info */}
        <section>
          <h3>Contact & Info</h3>
          <input name="address" placeholder="Address" value={formData.address || ""} onChange={handleChange} disabled={!editing} />
          <input name="city" placeholder="City" value={formData.city || ""} onChange={handleChange} disabled={!editing} />
          <input name="state" placeholder="State" value={formData.state || ""} onChange={handleChange} disabled={!editing} />
          <input name="email" placeholder="Email" value={formData.email || ""} onChange={handleChange} disabled={!editing} />
          <input name="phone" placeholder="Phone" value={formData.phone || ""} onChange={handleChange} disabled={!editing} />
          <input name="website" placeholder="Website" value={formData.website || ""} onChange={handleChange} disabled={!editing} />
          <input name="socialMedia" placeholder="Social Media Links" value={formData.socialMedia || ""} onChange={handleChange} disabled={!editing} />
          <input name="topRecruiters" placeholder="Top Recruiters" value={formData.topRecruiters || ""} onChange={handleChange} disabled={!editing} />
          <input name="highestPackage" placeholder="Highest Package" value={formData.highestPackage || ""} onChange={handleChange} disabled={!editing} />
          <input name="avgPackage" placeholder="Average Package" value={formData.avgPackage || ""} onChange={handleChange} disabled={!editing} />
          <input name="campusSize" placeholder="Campus Size" value={formData.campusSize || ""} onChange={handleChange} disabled={!editing} />
          <input name="hostelFee" placeholder="Hostel Fee" value={formData.hostelFee || ""} onChange={handleChange} disabled={!editing} />
          <input name="studentRating" placeholder="Student Rating" value={formData.studentRating || ""} onChange={handleChange} disabled={!editing} />
          <input name="nirfRank" placeholder="NIRF Rank" value={formData.nirfRank || ""} onChange={handleChange} disabled={!editing} />
        </section>

        {/* Placements */}
        <section>
          <h3>Placements</h3>
          <input name="placementRate" placeholder="Placement Rate (%)" value={formData.placementRate || ""} onChange={handleChange} disabled={!editing} />
        </section>

        {/* Facilities */}
        <section>
          <h3>Facilities</h3>
          {formData.facilities?.length > 0 ? (
            formData.facilities.map((f, i) => (
              <div key={i} className="facility-item">
                <strong>{f.name}:</strong>{" "}
                {editing ? (
                  <input
                    value={f.description || ""}
                    onChange={(e) => {
                      const updatedFacilities = [...formData.facilities];
                      updatedFacilities[i].description = e.target.value;
                      setFormData({ ...formData, facilities: updatedFacilities });
                    }}
                  />
                ) : (
                  <span>{f.description}</span>
                )}
              </div>
            ))
          ) : (
            <p>No facilities listed</p>
          )}
        </section>

        {/* International Section */}
        <section>
          <h3>International</h3>
          <input name="intlStudentOffice" placeholder="Intl. Student Office" value={formData.intlStudentOffice || ""} onChange={handleChange} disabled={!editing} />
          <input name="countriesEnrolled" placeholder="Countries Enrolled" value={formData.countriesEnrolled || ""} onChange={handleChange} disabled={!editing} />
          <input name="foreignMoUs" placeholder="Foreign MoUs" value={formData.foreignMoUs || ""} onChange={handleChange} disabled={!editing} />
          <input name="languageSupport" placeholder="Language Support" value={formData.languageSupport || ""} onChange={handleChange} disabled={!editing} />
          <input name="visaSupport" placeholder="Visa Support" value={formData.visaSupport || ""} onChange={handleChange} disabled={!editing} />
        </section>
      </form>
    </div>
  );
}
