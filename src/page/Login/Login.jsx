
import addUserProfile from '../../redux/UserSlice'
import axios from "axios";
import Store from '../../redux/Store'
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";
import { useEffect } from "react";
import Auth from '../../component/Auth/auth'
import Account from '../../component/profile/Profile'
import style from "./Login.module.css"

const supabase = createClient('https://yjfcopvmnoefmqlerdxc.supabase.co' ,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqZmNvcHZtbm9lZm1xbGVyZHhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODEwMTk3MDUsImV4cCI6MTk5NjU5NTcwNX0.UAlO3qY6sU4fqOqUEpzuOEyStPMf1eQNR1JepD34QS8' );

const api = axios.create({
    headers: {
        'Access-Control-Allow-Origin': '*'
     },
      baseURL: 'https://rose-wide-eyed-termite.cyclic.app/'
       
    }
    
);
  


    
export default function LogIn(){

   
    const [session, setSession] = useState(null)
    const navigator =useNavigate();

    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
      })
  
      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })


    }, [])


  
    return (

      
      <div className={style.container} >


        {!session ? <Auth /> : navigator("/Profile")}

      </div>
    )
  }
  

  //dispatch(addUserProfile(Result))

    // api.get('/profile')
    //     .then(res => res.json())
    //     .then(data => {
    //         .log(data.user.displayName)
    //     // 在這裡處理資料
    //     })
    // .catch(err => .log(err)).finally( () =>{

    //     window.location = "//Home"

    //  }
    // )

    // function loginwithGithub(){
    //     window.location.assign("https://github.com/login/oauth/authorize?client_id=" + GITHUB_CLIENT_ID )
    // }
