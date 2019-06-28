import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { text1, text2, accent1 } from '~/utils/Colors'
import DialogManager, { DialogContent } from 'react-native-dialog-component';
import { SlideAnimation } from 'react-native-popup-dialog';
import {TxtInputMedicao, BtnEnviar, BtnEnviarText} from '~/pages/QrCodeReader/styles'
import { ServerUrl } from '~/utils/server'
import ApiUtils from '~/utils/ApiUtils'
   
class List extends Component {

   constructor(props) {
      super(props)

      //console.warn(props.medidor)

      this.state = {
         items: props.items,
         medidor: '',
         medicao:''
      }
   }

   updateItems(items, medidor){
      this.setState({
         items: items,
         medidor: medidor
      })
   }
   
   btnEnviarPress = (object) => {
      //console.warn(object.id)
      const medicao = this.state.medicao;
      if(medicao !== '' && medicao !== undefined){
         //console.warn(medicao)
         this.gerarMedicao(object.id, medicao)
      }else{
         Alert.alert('', "Campo vazio", [{
            text: 'Ok'
         }])
      }
   }

   gerarMedicao = (casaId, medicao) => {
      //console.warn(JSON.stringify({'casa-id': casaId, 'medidor-id': this.state.medidor.id, 'medicao': medicao}))
      
      fetch(ServerUrl + '/projeto-boletos-server/gerarMedicao.php',{method: 'POST', body: JSON.stringify({'casa-id': casaId, 'medidor-id': this.state.medidor.id, 'medicao': medicao})})
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
         }else if(res.includes("medicao-menor")){
            Alert.alert('', "Medição dada é menor que a ultima medição da casa.", [{
               text: 'Ok'
            }])
         }else{
            Alert.alert('', "Algum erro ocorreu.", [{
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
   
   alertItemName = (item) => {
      DialogManager.show({
         title: 'INFORMAÇÕES DA CASA',
         titleAlign: 'center',
         animationDuration: 200,
         dialogAnimation: new SlideAnimation({ slideFrom: 'bottom' }),
         children: (
            <DialogContent>
               <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Text>asdasdas</Text>
               </View>
            </DialogContent>
         ),
         onDismissed:() => {

         }
      }, () => {
         //console.warn('callback - show');
      });
   }

   render() {

      if(this.state.items.length === 0){
         return(
            <Text style={{textAlign: 'center', padding: 30, fontSize: 15}}>
               Busque por rua, número, bairro, cidade, UF, CEP, nome ou documento do proprietário.
            </Text>
         )
      }

      return (
         <View>
            { 
               this.state.items.map((item) => (
                  <View>
                     <TouchableOpacity
                        key = {item.id}
                        style = {styles.container}
                        onPress = {() => this.alertItemName(item)}>
                        <View 
                           style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'center'
                           }}
                        >
                           <Text>{item.id}</Text>
                        </View>
                     </TouchableOpacity>

                     <View style={styles.separator}/>
                  
                  </View>
               ))
            }
         </View>
      )
   }
}
export default List

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