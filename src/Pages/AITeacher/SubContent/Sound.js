import React, { useRef, useState } from 'react';

export function Sound({
    children,
    className,
    Question,
    onMouseUp=()=>{}
}) {
   
    const  recognitionRef = useRef( new window.webkitSpeechRecognition());
    
    const handleSpeechRecognition = (flag) => {


        if(flag){
            recognitionRef.current.lang = 'tr-TR'; // Set the language to Turkish
            recognitionRef.current.onresult = (event) => {
                const speechToText = event.results[0][0].transcript;
                Question.set(speechToText);
            };
            recognitionRef.current.start();
        }else{
            recognitionRef.current.stop();
        }
    };

    return (
        <div className={className}>
            <button 
                onMouseDown={()=>handleSpeechRecognition(true)} 
                onMouseUp={()=>{
                    handleSpeechRecognition(false);
                    onMouseUp();
                }}   
                style={{border:'none'}} 
            >{children}</button>
        </div>
    );
}

