import TWEEN from '@tweenjs/tween.js';


const array =[
	'jawOpen',
	'mouthClose',
	'jawForward',
	'mouthUpperUpLeft',
	'mouthUpperUpRight',
	'mouthLowerDownLeft',
	'mouthLowerDownRight',
	'mouthRollUpper',
	'mouthRollLower',
	'mouthDimpleLeft',
	'mouthDimpleRight',
	'mouthPucker',
	'mouthFunnel',
	'mouthShrugLower',
	'mouthShrugUpper'

]





export function anime(nodes,target){
    var time=0;
    const elementValues={};
    array.forEach(element=>{
        elementValues[element]=nodes.FBHead_mesh001.morphTargetInfluences[
            nodes.FBHead_mesh001.morphTargetDictionary[element]];
    });

    new TWEEN.Tween(elementValues)
        .to({
            jawOpen:target['jawOpen'],
            mouthClose:target['mouthClose'],
            jawForward:target['jawForward'],
            mouthUpperUpLeft:target['mouthUpperUpLeft'],
            mouthUpperUpRight:target['mouthUpperUpRight'],
            mouthLowerDownLeft:target['mouthLowerDownLeft'],
            mouthLowerDownRight:target['mouthLowerDownRight'],
            mouthRollUpper:target['mouthRollUpper'],
            mouthRollLower:target['mouthRollLower'],
            mouthDimpleLeft:target['mouthDimpleLeft'],
            mouthDimpleRight:target['mouthDimpleRight'],
            mouthPucker:target['mouthPucker'],
            mouthFunnel:target['mouthFunnel'],
            mouthShrugLower:target['mouthShrugLower'],
            mouthShrugUpper:target['mouthShrugUpper']
        },150)
        .easing(TWEEN.Easing.Linear.None)
        .start();

    const interval= setInterval(()=>{
        TWEEN.update();

        array.forEach(element=>{
            nodes.FBHead_mesh001.morphTargetInfluences[
                nodes.FBHead_mesh001.morphTargetDictionary[element]
            ]=elementValues[element];
            nodes.FBHead_mesh001_1.morphTargetInfluences[
                nodes.FBHead_mesh001_1.morphTargetDictionary[element]
            ]=elementValues[element]
        })

        time+=15;
        if(time>=150){
            clearInterval(interval);
        }
        
    },15);

    
    
}