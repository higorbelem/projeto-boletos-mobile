import React, {Component} from 'react'
import {View, Text, AsyncStorage} from 'react-native'
 
class SplashScreen extends Component{

   constructor(props) {
      super(props)

      setTimeout(() => {
         this.getMedidor().then(value => {
            if(value != null){
               this.props.navigation.navigate('main')
            }else{
               this.props.navigation.navigate('login')
            }
         })
      }, 1000)
      
   }

   render() {
      return (
         <View>
            <Text style={{width: '100%', height: '100%', textAlign: 'center', fontSize: 20}}>SplashScreen</Text>
         </View>
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