import React, {Component} from 'react'
import {View, Text, AsyncStorage, Image} from 'react-native'
import NavigationService from '~/utils/NavigationService';

class SplashScreen extends Component{

   constructor(props) {
      super(props)

      setTimeout(() => {
         this.getMedidor().then(value => {
            if(value != null){
               //this.props.navigation.navigate('tabNav')
               NavigationService.navigate('buscar')
            }else{
               NavigationService.navigate('login')
            }
         })
      }, 1000)
      
   }

   render() {
      return (
         <Image source={require('~/resources/bg_login.png')} 
            style={{
               position: 'absolute',
               left: 0,
               top: 0,
               width: '100%',
               height: '100%'
            }}
            resizeMode='stretch'
         /> 
      )
   }

   getMedidor = async () => {
      try {
         const value = await AsyncStorage.getItem("medidor");
         if (value !== null) {
            return JSON.parse(value);
         }else{
            return null;
         }
      } catch (error) {
         return null;
        // Error retrieving data
      }
   }
}

export default SplashScreen