import React from 'react'
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import Image1 from "../Images/google1.png"
import {useNavigate} from 'react-router-dom'
import {host} from '../helper';

const GoogleAuth = () => {
    const navigate = useNavigate();
    const login = useGoogleLogin({
        onSuccess: async respose => {
            try {
                const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                    headers: {
                        "Authorization": `Bearer ${respose.access_token}`
                    }
                })
                const val = res.data;
                axios.post(`${host}googleAuth`,{name:val.name,email:val.email,image:val.picture}).then((res)=>{
                    localStorage.setItem('userid',res.data._id);
                    navigate('/');
                }).catch((err)=>console.log(err));

            } catch (err) {
                console.log(err)
            }
        }
    });
  return (
    <>
      <button onClick={login}  className="p-2 my-3 border-2 text-black bg-transparent hover:bg-blue-600 hover:text-white font-semibold drop-shadow-lg flex items-center justify-between w-[15rem] lg:pr-4" type="button">
               <span><img className='w-10' src={Image1} alt="google-png" /></span>Sign in with Google</button>
    </>
  )
}

export default GoogleAuth
