import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../../component/Header/Header";
import axios from "axios";
import style from './detailPage.module.css'
import { Image } from "antd";
import { Row, Col, Button } from 'antd'
import { Spin } from 'antd';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "../../component/Footer/Footer";
import './detail.css'
import NavBar from "../../component/NavBar/navbar";
import { theme } from 'antd';
import { createClient } from "@supabase/supabase-js";
import { useLocation } from "react-router-dom";
import AddToCart from "../../component/Cart/AddToCart/AddToCart";
import { useCallback } from "react";

const supabase = createClient('https://yjfcopvmnoefmqlerdxc.supabase.co' ,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqZmNvcHZtbm9lZm1xbGVyZHhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODEwMTk3MDUsImV4cCI6MTk5NjU5NTcwNX0.UAlO3qY6sU4fqOqUEpzuOEyStPMf1eQNR1JepD34QS8' );

const api = axios.create({
    headers: {
        'Access-Control-Allow-Origin': '*'
    },
    baseURL: 'https://rose-wide-eyed-termite.cyclic.app',
});

export default function DetailPage() {

    const location = useLocation();
    const { pathname } = location;

    const {
        token: { colorBgBase, colorTextBase },
      } = theme.useToken();
    
      const [session, setSession] = useState(null)

      
      const handleSaveClick = (response) => {

        
        localStorage.setItem('myData',   JSON.stringify(response.data));

        
      }
    

  

      const { ProductName } = useParams();
    
    const [ReveiceData, setData] = useState("");
    const [imageURLsState, setImageURLsState] = useState([]);
    const [IsLoad, setLoad] = useState (false);
    const [ProductID , setID] =  useState("001")


    const GetApi = () => {
    
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
            GetDataApi(session)
            
            console.log(ProductName)
           
          })

    }
    const PostApi = (session ,itemId) => {
        if(session)  {
            console.log(session.user.email)
            api.post('/BackEnd/Detail',{
                data:{
                    UserData: session.user.email, 
                    UserViewData: itemId
                },
            }).then((response) => {

                    console.log(response)
                    handleSaveClick(response)
                    console.log("UUUU")
              })
              .catch(function (error) {
                
              });
    
    
        }

    

    
    }

    const GetDataApi = (session ) => {
        
        api.get('/BackEnd/Products/' + ProductName).then(res => {
            
            localStorage.setItem("Veiw" ,  JSON.stringify(res.data.recomms) )

            if(session){
                SetSupaData(session.user.email ,JSON.stringify(res.data.recomms) )
            }
            
            setData(res.data.recomms[0])
            setID(res.data.recomms[0].id)
            console.log(res.data);
            const detailArray = res.data.recomms[0].values.Detail;
            const Temo = []
            
            Temo.push(res.data.recomms[0].values.imageUrl);

            for (let i = 0; i < detailArray.length; i += 1) {
                Temo.push(detailArray[i])
            }
            setImageURLsState(Temo);
            setLoad(true);
            PostApi(session ,res.data.recomms[0].id)
            

        }).catch(error => {

          


        });
    }

    const SetSupaData = async  ( useremail  , data2) =>{

        const { data: UserTag2, error } = await supabase
        .from('UserTag2')
        .select('User')
        .eq('id' , useremail  )

        if(UserTag2){
            const updatedData = [...UserTag2];
            updatedData.push(data2);
            
            
                const { data, error } = await supabase
                .from('UserTag2')
                .update({ User: data2 })
                .eq('id', useremail )


        }
        else{
            const { error2 } = await supabase
            .from('UserTag2')
            .insert({ id: useremail , User:data2  })
        }

      
    
    }

    useEffect(()=>{

        const fetchingData = async () => {
            
            await Promise.all([GetApi()]);
            
        }
       
        fetchingData()
        

     }, [pathname]);

  
  
     // 空数组告诉 React 仅执行一次


    const settings = {
        customPaging: function(i) {
          return (
            <a class="abtn">
              <img class="abtnImg" src={imageURLsState[i]} />
            </a>
          );
        },
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false
    };


    return (

        <div className={style.header}>
                <style>{`
                    body { 
                        background-color: ${colorBgBase}; 
                        color: ${colorTextBase}
                        }
                      
                `}</style>
            <NavBar />
            { !IsLoad ? (
                <div className={style.problemfixed}> <Spin size="large" /></div>
            ) : (
                <div>
                    <div className={style.title} >《 {ReveiceData.values.ProductName} 》</div>
                    <Slider {...settings}>

                        {

                            imageURLsState.map((imageURL, index) => (

                               <img key={index} src={imageURL} className={style.img}   alt="" />

                            ))

                        }


                    </Slider>

                    <div className={style.Description}>

                        {ReveiceData.values.Description}

                    </div>
                    <AddToCart product={ReveiceData.values} qty={1} />
                </div>
            )}
            
            <Footer className={style.footer} />



            
        </div>
    );

}