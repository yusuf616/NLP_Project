import React,{useState,useRef,useEffect} from 'react';
import * as tf from '@tensorflow/tfjs';
import * as qna from '@tensorflow-models/qna';
import {InfinitySpin } from 'react-loader-spinner';
import styles from '../../../styles/AnswerQuestion.module.css';
import { Sound } from './Sound';


const translate=async(text,sourceLeng,targetLeng)=>{
    const res = await fetch("https://libretranslate.org/translate", {
        method: "POST",
        body: JSON.stringify({
            q:text,
            source: sourceLeng,
            target: targetLeng,
            format: "text",
            api_key: ""
        }),
        headers: { "Content-Type": "application/json" }
    });
    const a=await res.json();
    return a.translatedText;  
}




export function AnswerQuestion({
    onClick=()=>{},
    data=[]
}){
    const [question,setQuestion]=useState('');
    const [model,setModel] =useState(null);
    const answerRef =useRef('');
    const [searchAnswer,setSearchAnswer]=useState(false);
    const lengRef=useRef('tr');
    const loadModel=async()=>{
        const loadedmodel=await qna.load();
        setTimeout(()=>{
            console.log(loadedmodel);
            setModel( loadedmodel)
        },2000);
    }
    useEffect(()=>{
        loadModel();
    },[]);

    const answerQuestion=async()=>{
        if(question!==''){
            setSearchAnswer(true);
            var EnQuestion=await translate(question,lengRef.current,'en');
            console.log('soru\n'+EnQuestion);
            var resoltAnswer=''; 
            if(data!=='')
                var enParagraph=await translate(data,lengRef.current,'en');
                console.log('paragrafı \n '+enParagraph);
                const answers=await model.findAnswers(EnQuestion,enParagraph);
                console.log('Cevapları');
                console.log(answers);
                if(await answers.length){
                    resoltAnswer=answers[0];
                    var avergeScore= 0;
                    answers.forEach(answer=>avergeScore+=answer.score);
                    avergeScore/=answers.length;
                    for(let i=1;i<answers.length;i++){
                        if(resoltAnswer.endIndex-resoltAnswer.startIndex<answers[i].endIndex-answers[i].startIndex){
                            if(answers[i].score>avergeScore)
                                resoltAnswer=answers[i];
                        }
                    }
                }
            if(resoltAnswer===''){
                answerRef.current='Cevabı Yok';
            }else{
                answerRef.current =await translate(resoltAnswer.text,'en',lengRef.current);
            }
            setTimeout(()=>{
                setSearchAnswer(false)
            },2000);
        }
    }
    
    

    const handleMouseUp=()=>{
        answerQuestion();
    }

    return (<div className={styles.box} >{
        model?<>
           
            <Sound onMouseUp={handleMouseUp} Question={{set:setQuestion}} className={styles.questiontitle}>
                <h5 >Soru Sor?</h5>
            </Sound>
            <input 
                value={question}
                onChange={(e)=>setQuestion(e.target.value)}
                className={styles.questioninput} 
                type='text' placeholder='Soru Yaz ... '
                onKeyDown={(e)=>e.key==='Enter'?answerQuestion():null}
            ></input>
            <div >
                {searchAnswer?<>
                    <div style={{textAlign:'center',marginTop:'10px'}}>
                        <span style={{display:'block'}}>Cevabi arıyor</span>
                        <div  style={{marginLeft:'-40px'}}>
                            <InfinitySpin 
                                width='150'
                                color="#5bc9e8"
                            />
                        </div>
                    </div> 
                </>:<>
                    <div className={styles.answer}>{answerRef.current}</div>
                    <button className={styles.talkbutton} onClick={()=>onClick('answer',answerRef.current)}>Konuşma</button>
                </>}
            </div>
        </>:<div style={{textAlign:'center',marginTop:'40px'}}>
            <span style={{display:'block'}}>Modeli hazırlanıyor</span>
            <div  style={{marginRight:'20px'}}>
                <InfinitySpin 
                    width='180'
                    color="#5bc9e8"
                />
            </div>
        </div>        
    }
    </div>)
}