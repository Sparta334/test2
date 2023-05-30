import { theme } from "antd";

const darkTheme = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: "#ffffff",  
    colorBgBase	: "#222222",  
    colorTextBase: "#ffffff",     
    colorTextFooter: "#ffffff",   //textcolor
    colorBgFooter: "#000000",   //backGround
    colorNavText: "#ffffff",  //navbar文字 
    colorNavbg:"#000000",
    /* 需要修改↓ */
    colorImgText:"#ffffff",   //imgText文字顔色要白色 Style.imgText   需要修改
    colorBigText:"#ffffff", //熱門，最新和專屬於你 的顔色轉白色 ProductList Title
    colorNavTextCollapse:"#ffffff",
  },

  components: {
    Button: {
      colorPrimary: "#6366f2;",  
      colorPrimaryHover: "#85C1E9 ",
  
    }
  },
};

const lightTheme = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorBgFooter: "#3e3f97",
    colorTextFooter: '#ffffff',
    colorNavText: "#ffffff",
    colorNavbg:"#000000",
    colorBgBase:"#ffffff ", //我已添加的bg 顔色
    /* 需要修改↓ */
    colorImgText:"#ffffff",   //imgText文字顔色要黑色 Style.imgText 應該預設就是黑色
    colorBigText:"#ffffff", //熱門，最新和專屬於你 的顔色轉黑色 ProductList Title 應該預設就是黑色
    colorNavTextCollapse:"#ffffff",
  },
  components: {
    Button: {
      colorPrimary: "#6366f2;",
      colorPrimaryHover: "#9192f5",
      
    },
  },
};

export { lightTheme, darkTheme };
