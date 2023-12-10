
import { 
    CDBSidebar,
    CDBSidebarHeader,
    CDBSidebarMenuItem,
    CDBSidebarContent,
    CDBSidebarFooter,
} from 'cdbreact'
import {BiLogOut} from 'react-icons/bi'

import { Link,useNavigate,useLocation} from 'react-router-dom';


import styles from '../styles/SideBar.module.css'
export const SideBar=({
    userInfo=null,
    rootPath='/',
    items=[]
    
})=>{
    const navigate=useNavigate();
    const location=useLocation();
    return( <CDBSidebar  style={{backgroundColor:'rgb(18, 5, 63)',  borderRight:'3px solid rgb(34, 127, 217)'}}>
        <CDBSidebarHeader style={{textAlign:'center'}} prefix={<i className="fa fa-bars" />} >
            <Link to={'https://www.harran.edu.tr/'}>
                <div className={styles.imgdiv} >
                    <img className={styles.img} alt='harran' src='/img/harran_logo.png'/>
                </div>
            </Link>
            <p className={styles.p}>{userInfo.name} {userInfo.lastname}</p>
        </CDBSidebarHeader>
        <CDBSidebarContent> 
            {items.map((item,i)=>(
                <Link 
                    key={i}
                    to={`.${item.path}`}
                    state={location.state}
                    className={styles.link}
                >
                    <CDBSidebarMenuItem className={styles.menuitem}>
                        {item.title}
                    </CDBSidebarMenuItem>
                </Link>  
            ))}
        </CDBSidebarContent>
        <CDBSidebarFooter>
            
            <CDBSidebarMenuItem>
                <Link className={styles.link} to={'/login/'+rootPath} ><BiLogOut size={30}/> Çıkış </Link>
            </CDBSidebarMenuItem>
        </CDBSidebarFooter>
    </CDBSidebar>);
}