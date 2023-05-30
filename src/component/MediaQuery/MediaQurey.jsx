import { useMediaQuery } from "react-responsive";

export const Desktop = ( { children } ) => {

    const isDesktop = useMediaQuery({minWidth: 992})
    return isDesktop ? children :null;

}


export const Laptop = ( { children } ) => {

    const isLaptop = useMediaQuery({minWidth: 768 , maxWidth:991})
    return isLaptop ? children :null;

}


export const Mobile = ( { children } ) => {

    const isMobile = useMediaQuery({maxWidth:767})
    return isMobile ? children :null;

}


export const Default = ( { children } ) => {

    const isDefault = useMediaQuery({minWidth: 767})
    return isDefault ? children :null;

}