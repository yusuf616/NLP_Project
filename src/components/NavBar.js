import { Link } from 'react-router-dom';
import styles from '../styles/NavBar.module.css';
import {IoMdHome} from 'react-icons/io';
import {FaChalkboardTeacher}from 'react-icons/fa';
export const NavBar=()=>{
   
    return(<div  className={styles.navbar}  variant="dark" expand='sm'>
        
        <div className={styles.navbarcollapse}>
            <div className={styles.nav}>
                <Link className={styles.navlink} to={'/'}> <IoMdHome size={40}/> Ana Sayfa</Link>
                <Link className={styles.navlink} to={'/aiteacher'}> <FaChalkboardTeacher size={40}/> Sanal Sınıf</Link>
            </div>
        </div>
    </div> )
}