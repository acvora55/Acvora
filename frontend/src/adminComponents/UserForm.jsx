import React, { useState } from "react";

const UserForm = ({ data }) => {
  const [profilePIcDefault,uploadimage] = useState("https://static.vecteezy.com/system/resources/previews/002/318/271/non_2x/user-profile-icon-free-vector.jpg");

  // const [name, setname] = useState("");
  // const [email, setemail] = useState("");

  //covert img
  // const getBase64 = (file) => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onload = () => resolve(reader.result);
  //     reader.onabort = (error) => reject(error);
  //     reader.readAsDataURL(file);
  //   });

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            resolve(fileReader.result);
        };

        fileReader.onerror = (error) => {
            reject(error);
        };
    });
};

const uploadImage = async (event) => {
    const file = event.target.files[0];
    const base64 = await convertBase64(file);
    // avatar.src = base64;
    uploadimage(base64);
    data.append("image",base64);
};

  //handle img
  // const handleImg = (e) => {
  //   const file = e.target.files[0];
  //   getBase64(file).then((base64) => {
  //     localStorage["img"] = base64;
  //     console.debug("File Store", base64);
  //     console.log(base64)
  //   });
  // };

  //form submit handler
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (name === "") {
  //       // toast.error("Name Is Required");
  //   } else if (email === "") {
  //     //   toast.error("Email Is Required");
  //   } else {
  //     localStorage.setItem("name", name);
  //     localStorage.setItem("email", email);
  //     // localStorage.setItem("img", img);
  //     //   toast.success("User Saved!");
  //   }
  // };

  return (
    <div>
      <div className="form-control">
        <div className="profile_section">
          <p>Select your university Picture :</p>
          <img
            src={profilePIcDefault}
            alt="profile_pic"
            name="Universityprofile"
            className="img-thumbnail"
            height={250}
            width={250}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formFile" className="form-label">
            Default file input example
          </label>
          <input
            className="form-control"
            type="file"
            onChange={uploadImage}
            name="file"
            id="formFile"
            required
          />
        </div>

        <label htmlFor="exampleInputName">University/College Name:</label>
        <input
          type="text"
          // value={name}
          onChange={(e) => data.append("name",e.target.value)}
          className="form-control"
          id="exampleInputName"
          aria-describedby="emailHelp"
          required
        />
      </div>
      <div className="form-control">
        <label htmlFor="email">University domain</label>
        <input
          type="email"
          // value={email}
          onChange={(e) => data.append("email",e.target.value)}
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          required
        />
      </div>
    </div>
  );
};

export default UserForm;
