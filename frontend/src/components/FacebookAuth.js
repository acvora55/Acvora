import React, { useState } from 'react'
import { LoginSocialFacebook } from 'reactjs-social-login';
import { FacebookLoginButton } from 'react-social-login-buttons';

const FacebookAuth = () => {
  const [profile, setProfile] = useState(null);
   
  return (
    <>
    <div>
      { !profile ? <LoginSocialFacebook
      appId="389513166721512"
      onResolve={(response) =>{console.log(response); setProfile(response.data)}}
      onReject={(error) =>{console.log(error)}}
      >
        <FacebookLoginButton/>
      </LoginSocialFacebook> : ""}

      {profile ? <div className='flex text-black item-center w-[15rem] pl-3 shadow-md'>
        <img src={profile.picture.data.url} alt="/" />
        <h2 className='pt-2.5 ml-5'>{profile.name}</h2>
      </div>:""}
    </div>
    </>
  )
}

export default FacebookAuth

