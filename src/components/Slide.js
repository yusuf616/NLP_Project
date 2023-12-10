import {  useEffect, useState } from 'react';
import styles from '../styles/Slide.module.css';
import {MdNavigateBefore,MdOutlineNavigateNext} from 'react-icons/md';
import {RxSpeakerLoud,RxSpeakerOff} from 'react-icons/rx'

export const Slide=({
    children,
    onClick=()=>{},
   
    speaking=null
})=>{
    const [_speaking,_setSpeakink]=useState(false);
    useEffect(()=>{
        _setSpeakink(speaking);
    },[speaking])
    return (<div className={styles.slide}>
        <div className={styles.content}>
            {children}
        </div>
        <div className={styles.buttongroup}>
            <button 
                className={styles.speakbutton}
                onClick={()=>{
                    onClick(!speaking)
                }}
            >
                {_speaking? <> Dordurma <RxSpeakerOff size={30}/></>:<>konuşma <RxSpeakerLoud size={30}/></>}
            </button>
            
        </div>
    </div>);
}