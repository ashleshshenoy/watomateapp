import React, { useEffect } from 'react'
import { Link, useNavigate} from "react-router-dom";
import './Home.css'
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { authAtBackend } from '../util/auth';
import { useGoogleOneTapLogin } from '@react-oauth/google';
import { googleLogout } from '@react-oauth/google';



export default function Home() {
  const navigate = useNavigate();

  return (
    <div className='division'>
      <GoogleLogin
        onSuccess={ async credentialResponse => {
          console.log(credentialResponse);
          const result = await authAtBackend(credentialResponse);
          console.log(result);
          if(result){
            navigate('/session')
          }
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </div>
  )
}
