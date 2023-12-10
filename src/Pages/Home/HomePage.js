// import { Outlet } from "react-router-dom";
// import { useLocation } from "react-router-dom";
import {useEffect} from 'react';
import { NavBar } from "../../components/NavBar";
import { Outlet, useLocation } from "react-router-dom"; 

export const HomePage=()=>{
    const {pathname}=useLocation();
  

    const PageContent={
        '/':<div className='full-page'>
            <div className='center'>
                Home
            </div>

        </div>
    }
    
    return(<>
        <NavBar/>
        <Outlet/>
        {PageContent[pathname]}
        
    </>);
}