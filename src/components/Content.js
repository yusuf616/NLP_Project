import styles from '../styles/Content.module.css'
import {MdCancelPresentation} from 'react-icons/md';
import{TbArrowBackUp} from 'react-icons/tb';

import { useNavigate,useLocation } from 'react-router-dom';
export const Content=({
    children,
    style=null,
    processIcons=[],
    onClick=()=>{},
    boxStyle=null,
    cancelSize=30,
    socket=null

})=>{
    const navigate=useNavigate();
    const location=useLocation();
    const state=location.state;
    const getPosition=(index)=>{
        const  a=processIcons.length+1;
        return ((index+1)/a)*100;
    }

    return(
        <div className={styles.content} style={style}>
            <div className={styles.box} style={boxStyle}>
                {children}
                <button 
                    onClick={()=>{
                        if(socket){
                            socket.emit('cancel',{
                                "user_id":state['id_'+state.user],   
                                "user":state.user,
                                "room":state.room.id_rooms
                            })
                        }
                        navigate(-1)
                    }} 
                    className={styles.cancel}> 
                    <TbArrowBackUp  size={cancelSize} />
                </button>
                
                {processIcons.map((icon,index)=>(
                    <button 
                        onClick={()=>onClick(icon.process)}
                        key={index}
                        className={styles.processbutton}
                        style={{left:`${getPosition(index)}%` , transform:`translate(-${getPosition(index)}%,-98%)`}}
                    >
                        {icon.icon}
                    </button>
                ))} 
            </div>
        </div>
    )
}
