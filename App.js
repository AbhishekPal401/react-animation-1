import React from 'react';
import { Text, View ,StyleSheet ,Image} from 'react-native';
import Animated, {useSharedValue,useAnimatedGestureHandler,useAnimatedStyle,withSpring,withTiming} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';

const SIZE=100;
const RADIUS=SIZE*2;


function App () {


  const translateX =useSharedValue(0);
  const translateY =useSharedValue(0)

const panGestureHandler=useAnimatedGestureHandler({
  onStart:(event,context)=>{
    context.translateX=translateX.value;
    context.translateY=translateY.value;
  },
  onActive:(event,context)=>{
    translateX.value=event.translationX+context.translateX,
    translateY.value=event.translationY+context.translateY

  },
  onEnd:()=>{

    const distance=Math.sqrt(translateX.value **2 + translateY.value **2);

    if(distance<RADIUS+SIZE/2 ){
    translateX.value=withSpring(0);
   translateY.value=withSpring(0);
    }
   
  }
})

const animatedStyles=useAnimatedStyle(()=>{
  return {
    transform:[{translateX:translateX.value},{translateY:translateY.value}]
  }
})
  
    return (
    
      <View style={styles.container}>
        

        <View style={styles.circle}>
        <PanGestureHandler onGestureEvent={panGestureHandler}>
        <Animated.View style={[styles.square,animatedStyles]}>

        </Animated.View>
        </PanGestureHandler>
        </View>


       

       

      </View>
     
    )
 
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    margin:100
  },
  square:{
    width:SIZE,
    height:SIZE,
    borderRadius:10,
    backgroundColor:"rgba(0,0,256,0.5)",


  },
  circle:{
    width:RADIUS*2,
    height:RADIUS*2,
    borderRadius:RADIUS,
    borderColor:"rgba(0,0,256,0.5)",
    borderWidth:10,
    justifyContent:"center",
    alignItems:'center'
  },
})

export default App;