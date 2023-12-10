import { useEffect , useState,useRef } from 'react';
import {useLocation} from 'react-router-dom';

import URL from '../../../URL.json'


import { Slide } from '../../../components/Slide';
import { FaceControl } from './FaceControl/FaceControl';
import {useSpeechSynthesis} from 'react-speech-kit' 
import { AnswerQuestion } from './AnswerQuestion';

export const SubContent=()=>{
    const [data,setData]=useState('');
    const {speak,voices,cancel,speaking}=useSpeechSynthesis();
    const answerRef=useRef(null);
    
    

  

    

    const handleClick=(e,answer)=>{
     
        if( typeof(e) === "boolean"){
            if(e){
                speak({
                    text:data,
                    voice:voices[4]
                })      
            }else{
                cancel();
            }
        }else if(e==='answer'){
            answerRef.current=answer;
            speak({
                text:answer,
                voice:voices[4] 
            });  
        }
    }

    return(<>
        <div className="left-side" style={{width:'60%',borderRight: '3px solid #23c9f7'}}>
            <div style={{position:'relative',height:'60%',top:'5%',transform:'translate(0,-5%)'}}>
                <Slide speaking={speaking} onClick={handleClick} >
                    {
                        <textarea
                            onChange={(e)=>setData(e.target.value)}
                            className='textarea' placeholder=' Paragraf yaz ...'
                        >
                        </textarea>
                    }
                </Slide>
            </div>
            <div style={{position:'relative',height:'40%',top:'5%',transform:'translate(0,-5%)'}}>
                <AnswerQuestion data={data} onClick={handleClick}/> 
            </div>
        </div>
        <div className="right-side" style={{width:'40%'}}>
            <FaceControl
                text={speaking?answerRef.current?answerRef.current:data:null}
                speaking={speaking}
                cancel={cancel}
            />
        </div>
    </>)
}