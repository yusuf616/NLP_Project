import {  useEffect, useRef, useState } from 'react'
import {Canvas} from '@react-three/fiber'
import { Model } from './Model'
import alphabet from './turk_alpha_database.json'

export const FaceControl=({
    text=null,
    speaking=null,
    cancel=()=>{}
})=>{
    const intervalRef=useRef(null);
    const indexRef=useRef(0);
    const charsRef=useRef([]);
   
    useEffect(()=>{
        
        if(speaking){
            
            charsRef.current=[];
            indexRef.current=0;
            charsRef.current.push(
                alphabet.info.find(item=>
                    item.letter===" "
                ) 
            )
            intervalRef.current=setInterval(()=>{
                if(text &&indexRef.current<text.length){
                    if(text[indexRef.current].toLowerCase() 
                    !== text[indexRef.current].toUpperCase()
                    ){
                        charsRef.current.push(
                            alphabet.info.find(item=>
                                item.letter===text[indexRef.current].toUpperCase()
                            ) 
                        );
                    }else{
                        charsRef.current.push(
                            alphabet.info.find(item=>
                                item.letter===" "
                            ) 
                        )
                    }
                   
                    indexRef.current+=1 
                }else{
                    clearInterval(intervalRef.current)
                }                
            },10)
        }else{
            clearInterval(intervalRef.current);
            charsRef.current.push(
                alphabet.info.find(item=>
                    item.letter===" "
                ) 
            )
        }
    },[speaking]);


    return(<Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Model cancel={cancel}  speaking={speaking} charsRef={charsRef}/>
    </Canvas>)
}