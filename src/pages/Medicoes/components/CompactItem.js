import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Alert, LayoutAnimation, Image } from 'react-native'
import { text1, text2, accent1 } from '~/utils/Colors'
import DialogManager, { DialogContent } from 'react-native-dialog-component';
import { SlideAnimation } from 'react-native-popup-dialog';
import {TxtInputMedicao, BtnEnviar, BtnEnviarText} from '~/pages/QrCodeReader/styles'
import { ServerUrl } from '~/utils/server'
import ApiUtils from '~/utils/ApiUtils'
import moment from 'moment'; 
   
class CompactItem extends Component {

   constructor(props) {
      super(props)

      //console.warn(props.medidor)
      this.state = {
         height: 0,
         isMaxHeight: false,
         maxHeight: props.maxHeight,
         medicao: props.medicao,
         currentArrowImage: require('~/resources/arrow_down.png') 
      }

   }

   render() {

      return (
         <TouchableOpacity 
            style={{
               backgroundColor: '#0000000A',
               width: '100%',
               alignItems: 'center',
               justifyContent: 'flex-start',
               marginTop: this.props.topMargin
            }} 
            onPress={this.press}>

            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
               <View style={{flex:0.9, alignItems: 'center', justifyContent: 'center'}}>
                  {this.props.topContent}
               </View>
               <Image 
                  style={{
                     height: 20,
                     width: 20,
                     resizeMode:'contain',
                     flex: 0.1
                  }}
                  source={
                     this.state.currentArrowImage
                  }
               />
            </View>
            <View 
               style={{
                  width: '100%',
                  height: this.state.height,
                  opacity: this.interpolateValue(this.state.height,[0,this.state.maxHeight],[0,1])
               }}
            >
               {this.props.mainContent}
            </View>

         </TouchableOpacity>
      )
   }

   press = () => {
      if(this.state.isMaxHeight){
         this.setState({
           currentArrowImage: require('~/resources/arrow_down.png') 
         });
       }else{
         this.setState({
           currentArrowImage: require('~/resources/arrow_up.png') 
         });
       }
      this.toggleHeight()
   }

   toggleHeight() {
      const endHeight = this.state.isMaxHeight ? 0 : this.state.maxHeight;
  
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  
      this.setState({
         height: endHeight
      })

      this.setState({
        isMaxHeight: !this.state.isMaxHeight
      })
   }

   interpolateValue(value, inputRange, outputRange){
      //inputPercent = ((inputRange[1] - inputRange[0])/100)*(value - inputRange[0])
      inputPercent = (value - inputRange[0])/(inputRange[1] - inputRange[0])*100
      outputValue = (((outputRange[1] - outputRange[0])/100) * inputPercent) + outputRange[0]
      
      return outputValue
    }
}
export default CompactItem

const styles = StyleSheet.create ({
   container: {
      padding: 10,
      marginTop: 3,
      alignItems: 'center',
   },
   text: {
      color: '#4f603c'
   },separator: {
      flex: 1,
      height: StyleSheet.hairlineWidth,
      backgroundColor: '#8E8E8E',
  }
})