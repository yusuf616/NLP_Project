import {useEffect,useState} from 'react';
import {useLocation,Outlet,Navigate} from 'react-router-dom';
import { Content } from '../../components/Content';
import { SubContent } from './SubContent/SubContent';



const AITeacher=()=>{
    const location =useLocation();
    const PageContent={
        '/aiteacher':<>
            <Content boxStyle={{width:'100%',height:'100%',border:'none'}}>
                <SubContent></SubContent>
            </Content>
        </>
    }

    return(<>
        <Outlet/>
        {PageContent[location.pathname]}
    </>);
}




export const AITeacherPage=()=>{
    const [navigate,setNavigate]=useState(<></>);
    useEffect(()=>{
        setNavigate(<AITeacher/>);
    },[]);
    return(<>
        {navigate}
    </>)
}