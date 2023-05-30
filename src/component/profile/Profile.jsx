import axios from 'axios'
import { useCallback, useState } from 'react';
import { createClient } from "@supabase/supabase-js";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { theme } from 'antd';
import { Space , Tag  } from 'antd';
import Slider from "react-slick";
import NavBar from '../NavBar/navbar';
import {Spin } from "antd"
import Style from './Profile.module.css'
import { Link } from 'react-router-dom';
import history from '../RouterHistory';
import Footer from '../Footer/Footer';
import style from './Profile.module.css'

const supabase = createClient('https://yjfcopvmnoefmqlerdxc.supabase.co' ,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqZmNvcHZtbm9lZm1xbGVyZHhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODEwMTk3MDUsImV4cCI6MTk5NjU5NTcwNX0.UAlO3qY6sU4fqOqUEpzuOEyStPMf1eQNR1JepD34QS8' );
const api = axios.create({
  headers: {
      'Access-Control-Allow-Origin': '*'
  },
  baseURL: 'https://rose-wide-eyed-termite.cyclic.app',
});






export default function Account() {

  const navigator = useNavigate();
  const[session ,setSession] = useState();
  const[Receviedata , Setdata] = useState(null);

  const GetData = useCallback(() => {
  
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })


  },[])


    useEffect(() => {
      
      const fetchingData = async () => {
        await Promise.all([GetData()]);
      };
    
      fetchingData();
    }, []);


    const GetUserData = async (session) =>{
      
          let { data: UserTag2, error } = await supabase
          .from('UserTag2')
          .select('User')
          .eq('id' , session.user.email  )

          if(UserTag2){
            Setdata(UserTag2);
          }

    }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow:1,
    initialSlide: 0,
    draggable:true,
    swipeToSlide: true,
    arrows: false,
    responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
          }
        }
      ]
    };

  
    return (
      <div className="container" style={{ padding: '50px 50px 50px 50px' }}>

      <div style={{backgroundColor:"#fff" , margin:"-50px " ,padding:"0"}}>
        <div className={style.UserProfileBack}>
        <NavBar/>
        </div>

        <div className={style.row}>
        
        <div className={style.form_widget}>
          <h1 style={{paddingBottom:"6%"}}> { session ? session.user.user_metadata.username : null }</h1>
          <h3> { session ? session.user.email : null }</h3>
        </div>

        
      </div>
      <div className={style.TitleProfile}>
          <h1 style={{color:"black" , textAlign:"center" , fontSize:"30px"}}>最近瀏覽</h1>
          <div className={Style.ItemsLayout}>
          
            {

              
              
              (localStorage.getItem("Veiw") === null ) ||(localStorage.getItem("Veiw") === "" )  ? 
              <div className={Style.problemfixed}>啥都沒看</div>
               : 
               <Slider  {...settings} >{
                JSON.parse(localStorage.getItem("Veiw")).map((product)=> (
                                  
                    <div className={Style.ImageBox} key={product.id} >
  
                       <Link className={Style.imageA} to={`/pages/${product.values.ProductName}`}>
                        <img
                              height="1600px" width="900px"
                                src={product.values.imageUrl} 
                                alt="Sample" 
                                style={{objectFit:"contain"}}
  
                            />
                        </Link>
  
  
                        
                    </div>
                    ))
                  }
                   
                   </Slider> 

            }

            </div>
            <div className={Style.ItemsLayout}>

              {
                  Receviedata ? console.log(Receviedata) : null
              
              }

            </div>
        </div>
        <button className="button block" type="button" onClick={() => supabase.auth.signOut().then(()=>{

         navigator("/")
        
        })}>
            登出
          </button>

          
        <Footer/>
    </div>
   
    </div>
  )
}