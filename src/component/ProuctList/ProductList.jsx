
import {Row , Col} from 'antd';
import { useState} from 'react';
import { Space } from 'antd';
import { Button } from 'antd/es/radio';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import Style from './ProductList.module.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './ProductList.css'
import { theme } from 'antd';


export default function ProductList({Title , InputJson  }){

    const [inPos ,setInPos ] = useState(0);
    const [width, setWidth] = useState(0);

    const Chan = (offest)  =>{

        let re =inPos+offest ;
        if(re > 4){
            re = 4;
        }
        else if(re < 0){
            re =  0;
        }

        setInPos(re);
       
        let box = document.querySelector(".ImageBox");
        setWidth(box.clientWidth);

    }

    const {
        token: {  colorBigText ,colorImgText},
      } = theme.useToken();
    
    const MoblieSetting ={
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        initialSlide: 0,
        draggable:true,
        swipeToSlide: true,
        arrows: false,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                initialSlide: 1
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

        const {
            token: {colorimgText},
          } = theme.useToken();
        

    return(
        

        
        <div className={Style.ItemsLayout}>
            

            <div className={Style.title} >{Title}</div>
            <Slider {...settings} >
            {/* <motion.div animate={{ x:- width*inPos }}> */}
                {       


                        InputJson.map((product)=> (
                            
                            <div className={Style.ImageBox} key={product.id} >

                               <Link className={Style.imageA} to={`pages/${product.ProductName}`}>
                                <img
                                      height="1600px" width="900px"
                                        src={product.imageUrl} 
                                        alt="Sample" 
                                        style={{objectFit:"contain"}}

                                    />
                                    </Link>

 
                                
                            </div>
                           
                           
                        )     
                    )

                }

            {/* </motion.div> */}
            </Slider>

        </div>

    );


}