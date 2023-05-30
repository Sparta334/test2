import {InstagramOutlined } from '@ant-design/icons'
import {TwitterOutlined} from   '@ant-design/icons'
import {FacebookFilled} from '@ant-design/icons'
import {YoutubeOutlined} from '@ant-design/icons'
import style from './Footer.module.css'

export default function Footer(){

    return(
        <div>
        <footer>
            <div className={style.inner_width}>
            <div className={style.copyright}>
                &copy; 2023 | Created & Designed By Storm
            </div>
            <div class="sm">
                <a href="#" style={{  color: '#ffffff' }} className={style.btnlogo}><InstagramOutlined /></a>
                <a href="#" style={{  color: '#ffffff' }} className={style.btnlogo}><TwitterOutlined /></a>
                <a href="#" style={{  color: '#ffffff' }} className={style.btnlogo}><FacebookFilled /></a>
                <a href="#" style={{  color: '#ffffff' }} className={style.btnlogo}><YoutubeOutlined /></a>
            </div>
            </div>

        </footer>

        </div>
    )

}