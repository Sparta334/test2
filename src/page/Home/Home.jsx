
import {Row , Col} from 'antd';
import { useLocation, useParams } from 'react-router-dom';
import Header from '../../component/Header/Header';
import Popalur from '../../json/PopularGame.json';
import ExculsiveToYou from '../../json/ExculsiveToYou.json';
import NewSet from '../../json/Newset.json'
import ProductList from "../../component/ProuctList/ProductList"
import MainCarousel from '../../component/Carousel/MainCarousel';
import Footer from '../../component/Footer/Footer';
import style from './home.module.css'
import { theme } from 'antd';
import { useEffect, useState } from 'react';
import Prolist from "../../component/ProuctList/Prolist"
import { createClient } from "@supabase/supabase-js";
import axios from 'axios';


const supabase = createClient('https://yjfcopvmnoefmqlerdxc.supabase.co' ,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqZmNvcHZtbm9lZm1xbGVyZHhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODEwMTk3MDUsImV4cCI6MTk5NjU5NTcwNX0.UAlO3qY6sU4fqOqUEpzuOEyStPMf1eQNR1JepD34QS8' );

const api = axios.create({
  headers: {
      'Access-Control-Allow-Origin': '*'
  },
  baseURL: 'https://rose-wide-eyed-termite.cyclic.app',
});

export default function Home(){

    const Los = useLocation();

    const {
        token: { colorBgBase, colorTextBase ,colorNavText},
      } = theme.useToken();

    
      const [Data, setData] = useState(null)
      const [session, setSession] = useState(null)
      const [Reload , setReload] = useState(false);
      useEffect(() => {
        
          supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
          })

       } ,[ ])


    return(

        <div className={style.container}>

                <style>{`
                    .${style.container} { 
                        background-color: ${colorBgBase}; 
                        color: ${colorTextBase}
                        }
                `}</style>

            <Header/>
            <MainCarousel className={style.MainCarousel} />
            <ProductList Title="熱門遊戲" InputJson={Popalur}/>
            <ProductList Title="最新遊戲" InputJson={NewSet} />
            {
              (localStorage.getItem('myData') === "" ) || ( localStorage.getItem('myData') === null) ?  <ProductList Title="專屬於你" InputJson={ExculsiveToYou} />  : <Prolist Title="專屬於你" InputJson={ JSON.parse(localStorage.getItem('myData'))}/>
            }
            
            <Footer/>

            
        </div>

    )


        
}

// <Prolist Title="專屬於你" InputJson={localStorage.getItem('myData')} />