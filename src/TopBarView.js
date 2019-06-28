import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs'
import {AsyncStorage, Text, Image, View, Alert} from 'react-native';
import {BtnSair} from '~/pages/Main/styles'
import React, {Component} from 'react';
import NavigationService from '~/utils/NavigationService';


class TopBarView extends React.Component {

   constructor(props){
      super(props)

      this.state = {
         medidor: 'Carregando...'
      }
   }

   componentDidMount(){
      this.getMedidor().then(() => {
         
      })
   }

   render() {
     return (
         <View style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#666666',
            flexDirection: 'row',
            alignItems: 'center'
         }}>

         <Text style={{
            position: 'absolute',
            left: 10,
            color: '#FFFFFFCC',
            fontWeight: 'bold',
            fontSize: 15
            }}>
            {
               this.state.medidor.nome
            }
         </Text>

         <BtnSair onPress={() => {
            Alert.alert('', "Deseja sair?", [
               {
                  text: 'Sim',
                  onPress: () => {
                     this.storeData('').then(() =>{
                        //this.props.navigation.navigate('login')
                        NavigationService.navigate('login');
                     })
                  }
               },
               {
                  text: 'Não'
               }
            ])
         }}>
            <Text style={{
               color: 'white',
               fontWeight: 'bold',
               fontSize: 15
            }}>SAIR</Text>
         </BtnSair>

      </View>
     );
   }

   getMedidor = async () => {
      try {
        const value = await AsyncStorage.getItem("medidor");
        if (value !== null) {
          object = JSON.parse(value);
          this.setState({
            medidor: object
          })
        }
      } catch (error) {
        // Error retrieving data
      }
   }

   storeData = async (medidorJson) => {
      try {
        await AsyncStorage.setItem("medidor", medidorJson);
      } catch (error) {
        console.warn(error)
        // Error saving data
      }
   }
}

export default TopBarView;