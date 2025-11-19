// Components
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { FiSend } from "react-icons/fi";
import UserForm from "./UserForm";
import ReviewForm from "./ReviewForm";
import Thanks from "./Thanks";
import Steps from "./Steps";

import {host} from '../helper';

// Hooks
import { useForm } from "./hooks/useForm";
// import { useState } from "react";
import axios from 'axios';
import "./Appp.css";
import Navbar from "../components/Navbar";

// const formTemplate = {
//   image:"",
//   name: "",
//   email: "",
//   comment: "",
//   course:"",
//   AdmissionDetails:"",
//   exceldata:{},
//   bouchre:""
// };

function App() {
  // const [data, setData] = useState(formTemplate);
  const data = new FormData();
  // const updateFieldHandler = (key, value) => {
  //   setData((prev) => {
  //     return { ...prev, [key]: value };
  //   });
  // };
  
  const uploadManager = async()=>{
    console.log(data);
    axios.post(`${host}collegeinfo`,data,{"mode":"cors"},{
      'Content-Type': 'application/json',
      'Origin': 'https://acvora-1.onrender.com', // Set to your React app's domain
    }).then((res)=>{
      console.log(res.data);
    }).catch((err)=>{
      console.log(err);
    })
  }

  const formComponents = [
    <UserForm data={data}  />,
    <ReviewForm data={data}  />,
    <Thanks  data={data}  />,
  ];

  const { currentStep, currentComponent, changeStep, isLastStep, isFirstStep } =
    useForm(formComponents);

  return (
    <div className="app bg-slate-200">
      <Navbar/>
      <div className="header">
        <h2>Register your University/College</h2>
        <p>I am here to helping you to increasing your network</p>
      </div>
      <div className="form-container">
        <Steps currentStep={currentStep} />
        <form onSubmit={(e) => changeStep(currentStep + 1, e)}>
          <div className="inputs-container">{currentComponent}</div>
          <div className="actions">
            {!isFirstStep && (
              <button type="button" onClick={() => changeStep(currentStep - 1)}>
                <GrFormPrevious />
                <span>Back</span>
              </button>
            )}
            {!isLastStep ? (
              <button type="submit">
                <span>Next</span>
                <GrFormNext />
              </button>
            ) : (
              <button type="button" onClick={uploadManager}>
                <span>Submit</span>
                <FiSend />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
