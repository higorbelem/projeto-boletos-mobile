import React, { Component } from 'react';
import PopupDialog, { SlideAnimation } from 'react-native-popup-dialog';
import DialogManager, { ScaleAnimation, DialogContent, Dialog, DialogButton, DialogComponent } from 'react-native-dialog-component';
import { text1, text2, accent1 } from '~/utils/Colors'
import {BtnEnviar, BtnEnviarText, TxtInputMedicao, BackBtn, BackBtnImage} from './styles'
import { ServerUrl,ServerAuthPsw,ServerAuthUser } from '~/utils/server'
import ApiUtils from '~/utils/ApiUtils'
 
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

//{"id":"2","rua":"asdas","numero":"123","bairro":"adasd","cidade":"sadads","uf":"as","numHidrometro":"123123"}

class QRCodeReader extends Component {

   static navigationOptions = {
      header: null
   }

   constructor(props) {
      super(props)

      this.state = {
         medidor: '',
         medicao: ''
      }
   
      this.getMedidor()
   }

   render() {
      return (
         <View style={{width: '100%', height: '100%'}}>
            <View style={{flex:1}}>
               <QRCodeScanner
                  onRead={this.onSuccess}
                  checkAndroid6Permissions={true}
                  showMarker={true}
                  cameraStyle={{width: '100%', height: '100%'}}
                  customMarker={
                     <View style={{width: 300, height: 300, borderWidth: 2, borderColor: 'white'}}/>
                  }
                  ref={(node) => { this.scanner = node }}
                  topContent={
                     <View style={{backgroundColor: 'black', width:'100%', height:'100%'}}/>
                  }
                  bottomContent={
                     <View style={{backgroundColor: 'black', width:'100%', height:'100%'}}/>
                  }
               />
            </View>
            <BackBtn onPress={() => {
               this.props.navigation.goBack()
            }}>
               <BackBtnImage source={require('~/resources/arrow_back_white.png')}/>
            </BackBtn>
         </View>
      );
   }

   onSuccess = (e) => {
      if(this.state.medidor !== ''){
         //console.warn(e.data)
         //this.gerarMedicao(e.data)
         /*this.popupDialog.show(() => {
            console.log('callback - will be called immediately')
         });*/

         try{
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
                              NUMERO. HIDRÔMETRO
                           </Text>
                           <Text style={{color: text2, marginLeft: 10}}>
                              {object.numHidrometro}
                           </Text>
                        </View>
   
                        <TxtInputMedicao 
                           style={{marginTop: 10}} 
                           placeholder="VALOR DA MEDIÇÃO"
                           onChangeText={(field) => this.setState({medicao: field})}
                           keyboardType="numeric"
                           type={'number'}
                        />
   
                        <BtnEnviar onPress={() => {this.btnEnviarPress(object)}} style={{backgroundColor: accent1, marginTop: 10}}>
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
         }catch(erro){
            Alert.alert('', "Qr-Code inválido", [{
               text: 'Ok',
               onPress: () => {
                  this.scanner.reactivate()  
               }
            }])
         }
         
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
         
      }
   }

   btnEnviarPress = (object) => {
      //console.warn(object.id)
      const medicao = this.state.medicao;
      if(medicao !== '' && medicao !== undefined){
         //console.warn(medicao)
         this.gerarMedicao(object.id, medicao, false)
      }else{
         Alert.alert('', "Campo vazio", [{
            text: 'Ok'
         }])
      }
   }

   gerarMedicao = (casaId, medicao, medidorReiniciou) => {
      //console.warn(JSON.stringify({'casa-id': casaId, 'medidor-id': this.state.medidor.id, 'medicao': '89'}))
      fetch(ServerUrl + '/projeto-boletos-server/gerarMedicao.php',{method: 'POST', body: JSON.stringify({"auth-usr": ServerAuthUser, "auth-psw": ServerAuthPsw, 'casa-id': casaId, 'medidor-id': this.state.medidor.id, 'medicao': medicao, 'medidor-reiniciou': medidorReiniciou})})
      .then(ApiUtils.checkStatus)
      .then(res => {
         return res.text()
      })
      .then(res => {
         if(res.includes("ok")){
            Alert.alert('', "Medição enviada com sucesso", [{
               text: 'Ok',
               onPress: () => {
                  DialogManager.dismissAll(() => {

                  });
               }
            }])
         }else if(res.includes("erro-login")){
            Alert.alert('', "Algo deu errado, tente novamente.", [{
               text: 'Ok'
            }])
            this.scanner.reactivate()  
         }else if(res.includes("medicao-menor")){
            Alert.alert('', "Medição dada é menor que a ultima medição da casa.\nO medidor reiniciou?", [
               {
                  text: 'Sim',
                  onPress: () => {
                     this.gerarMedicao(casaId, medicao, true)
                  }
               },
               {
                  text: 'Não'
               }
            ])
         }else{
            Alert.alert('', "Algum erro ocorreu.", [{
               text: 'Ok'
            }])
            this.scanner.reactivate()  
         }
      })
      .catch(erro =>{
         Alert.alert('Error', 'Problemas com o servidor  ou sua conexão com a internet.', [{
               text: 'Ok'
         }])
         this.scanner.reactivate()  
      })
   }
}

export default QRCodeReader