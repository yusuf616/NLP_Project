import React, { useEffect, useRef } from "react";
import {useGLTF} from '@react-three/drei'
import { useFrame } from "@react-three/fiber";
import * as AniFun from './AnimationFun'

export const Model=({
    charsRef={current:[]},
    speaking=false,
    cancel=()=>{}
},props)=>{
    const intervalRef=useRef(null);
    const {nodes,materials} =useGLTF('/face.glb');
    const indexRef=useRef(0);
    
    useEffect(()=>{
        
        if(speaking){
            indexRef.current=0;
            
            const target=charsRef.current[indexRef.current].info;
            AniFun.anime(
                nodes,
                target
            );
            indexRef.current++;
            intervalRef.current= setInterval(()=>{
                if(charsRef.current.length>indexRef.current &&charsRef.current[indexRef.current]){
                   
                    const target=charsRef.current[indexRef.current].info;
                    AniFun.anime(
                        nodes,
                        target
                    );
                }
                
                indexRef.current+=1;
                if(indexRef.current>charsRef.current.length){
                    cancel();
                    clearInterval(intervalRef.current)
                }
            },80);
        }else{

            const target=charsRef.current[charsRef.current.length-1].info;
                    AniFun.anime(
                        nodes,
                        target
                    );
            
            clearInterval(intervalRef.current);
        }
            
    },[speaking]);

    return(
        <group {...props} dispose={null}>
            <mesh
                name="FBHead_mesh001"
                castShadow
                receiveShadow
                geometry={nodes.FBHead_mesh001.geometry}
                material={materials["Material.001"]}
                morphTargetDictionary={nodes.FBHead_mesh001.morphTargetDictionary}
                morphTargetInfluences={nodes.FBHead_mesh001.morphTargetInfluences}
            />
            <mesh
                name="FBHead_mesh001_1"
                castShadow
                receiveShadow
                geometry={nodes.FBHead_mesh001_1.geometry}
                material={materials["Material.002"]}
                morphTargetDictionary={nodes.FBHead_mesh001_1.morphTargetDictionary}
                morphTargetInfluences={nodes.FBHead_mesh001_1.morphTargetInfluences}
            />
        </group>
    )
}

useGLTF.preload("/face.glb");