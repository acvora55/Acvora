import React from "react";
import { useNavigate } from "react-router-dom";
const UserProfile = ({Profile}) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-white p-4 rounded-lg shadow-md w-64">
        <div className="text-center">
          {Profile ? <div><div className="w-20 h-20 mx-auto bg-yellow-500 rounded-full flex items-center justify-center text-white overflow-hidden font-bold text-2xl">
            <img src={Profile.image} alt="profile" className="overflow-hidden " />
          </div>  
          <div>
            <h1 className="capitalize">{Profile.name}</h1>
          </div>
        {/* </div> */}
        <hr className="my-4" />
        <div className="text-left">
          <p className="text-gray-700 text-sm lowercase">
            <span className="font-semibold uppercase">Email:</span> {Profile.email}
          </p>
       </div>
       </div>:
       <div>
       <div className="w-20 h-20 mx-auto  rounded-full flex items-center justify-center text-white font-bold text-2xl overflow-hidden">
            <img src="./candidate.png" alt="profile" className=" overflow-hidden" />
          </div> 
          <button class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full w-full my-3" onClick={()=>navigate('/login')}>
  Login/Register
</button>
          </div>
          }
        </div>
        </div>
    </>
  );
};

export default UserProfile;
