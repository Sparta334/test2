import { Button, Drawer, theme } from 'antd';
import { useState } from 'react';
import CartSummary from '../Cart/CartSummary/CartSummary';
import { Link } from 'react-router-dom';
import styles from "./NavBarDrawer.module.css"


export default function NavBarDrawer({Title} ){

  const { token } = theme.useToken();
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <div className={styles.NavBarContainer} >


      <style>
         @import url('https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic&display=swap');
      </style>

      {/*
       *   
       *         引入樣式
       */}
      


      <div>
        <Button type="primary" onClick={showDrawer}>
          {Title}
        </Button>
      </div>

      <Drawer
        title="選單"
        placement="top"
        closable={true}
        open={open}
        onClose={onClose}
        getContainer={false}
        className={styles.Drawer}
        height="380%"
      >

        <hr/>
        <div className={styles.DrawerItems}>
        <CartSummary/>
            
        </div>
        <hr/>

        <div div className={styles.DrawerItems}>
            <Link to="/Profile">帳號</Link>
        </div>
      </Drawer>
    </div>
  );
};