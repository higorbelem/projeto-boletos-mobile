import React, { Component } from 'react';
import PopupDialog, { SlideAnimation } from 'react-native-popup-dialog';
import DialogManager, { ScaleAnimation, DialogContent, Dialog, DialogButton } from 'react-native-dialog-component';
import { text1, text2, accent1 } from '~/utils/Colors'
import {BtnEnviar, BtnEnviarText, TxtInputMedicao} from './styles'
 
const slideAnimation = new SlideAnimation({
  slideFrom: 'bottom',
});

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  View,
  Alert,
  AsyncStorage
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';

class QRCodeReader extends Component {

   constructor(props) {
      super(props)

      this.medicaoField = React.createRef();

      this.state = {
         medidor: ''
      }
   
      this.getMedidor()
   }

   render() {
      return (
         <QRCodeScanner
            onRead={this.onSuccess}
            checkAndroid6Permissions={true}
            showMarker={true}
            ref={(node) => { this.scanner = node }}
         />
      );
   }

   onSuccess = (e) => {
      if(this.state.medidor !== ''){
         //console.warn(e.data)
         //this.gerarMedicao(e.data)
         /*this.popupDialog.show(() => {
            console.log('callback - will be called immediately')
         });*/
         object = JSON.parse(e.data);

         DialogManager.show({
            title: 'INFORMAÇÕES DA CASA',
            titleAlign: 'center',
            animationDuration: 200,
            dialogAnimation: new SlideAnimation({ slideFrom: 'bottom' }),
            children: (
              <DialogContent>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <View 
                     style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop:10
                     }}
                  >
                     <Text style={{color: text1}}>
                        ID
                     </Text>
                     <Text style={{color: text2, marginLeft: 10}}>
                        {object.id}
                     </Text>
                  </View>
                  <View 
                     style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop:10
                     }}
                  >
                     <Text style={{color: text1}}>
                        RUA
                     </Text>
                     <Text style={{color: text2, marginLeft: 10}}>
                        {object.rua}
                     </Text>

                     <Text style={{color: text1, marginLeft: 20}}>
                        NUMERO
                     </Text>
                     <Text style={{color: text2, marginLeft: 10}}>
                        {object.numero}
                     </Text>
                  </View>
                  <View 
                     style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop:10
                     }}
                  >
                     <Text style={{color: text1}}>
                        BAIRRO
                     </Text>
                     <Text style={{color: text2, marginLeft: 10}}>
                        {object.bairro}
                     </Text>

                     <Text style={{color: text1, marginLeft: 20}}>
                        CIDADE
                     </Text>
                     <Text style={{color: text2, marginLeft: 10}}>
                        {object.cidade}
                     </Text>
                  </View>
                  <View 
                     style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop:10
                     }}
                  >
                     <Text style={{color: text1}}>
                        UF
                     </Text>
                     <Text style={{color: text2, marginLeft: 10}}>
                        {object.uf}
                     </Text>

                     <Text style={{color: text1, marginLeft: 20}}>
                        NÚMERO DO HIDRÔMETRO
                     </Text>
                     <Text style={{color: text2, marginLeft: 10}}>
                        {object.numHidrometro}
                     </Text>
                  </View>

                  <TxtInputMedicao 
                     style={{marginTop: 10}} 
                     placeholder="VALOR DA MEDIÇÃO"
                     ref={this.medicaoField} 
                  />

                  <BtnEnviar onPress={this.btnEnviarPress(object)} style={{backgroundColor: accent1, marginTop: 10}}>
                     <BtnEnviarText>
                        ENVIAR
                     </BtnEnviarText>
                  </BtnEnviar>

                </View>
              </DialogContent>
            ),
            onDismissed:() => {
               this.scanner.reactivate() 
            }
          }, () => {
            //console.warn('callback - show');
          });
      }else{
         this.scanner.reactivate()  
      }
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

   btnEnviarPress = (object) => {
      console.warn(object.id)
      /*const medicao = this.medicaoField.current.value
      if(senha !== '' && senha !== undefined){
         this.gerarMedicao(object.id, medicao)
      }*/
   }

   gerarMedicao = (casaId, medicao) => {
      //console.warn(JSON.stringify({'casa-id': casaId, 'medidor-id': this.state.medidor.id, 'medicao': '89'}))
      fetch('http://ibarber.ga/projeto-boletos-server/gerarMedicao.php',{method: 'POST', body: JSON.stringify({'casa-id': casaId, 'medidor-id': this.state.medidor.id, 'medicao': medicao})})
      .then(res => {
         return res.text()
      })
      .then(res => {
         if(!res.includes("erro-login")){
            Alert.alert('', "asdadadasd", [{
               text: 'Ok'
            }])
         }else{
            Alert.alert('', "Algo deu errado, tente novamente.", [{
               text: 'Ok'
            }])
            this.scanner.reactivate()  
         }
      })
      .catch(erro =>{
         Alert.alert('Error', 'Problem with the connection or server.' + erro, [{
               text: 'Ok'
         }])
         this.scanner.reactivate()  
      })
   }
}

export default QRCodeReader