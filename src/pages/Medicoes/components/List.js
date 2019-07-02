import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native'
import { text1, text2, accent1 } from '~/utils/Colors'
import DialogManager, { DialogContent } from 'react-native-dialog-component';
import { SlideAnimation } from 'react-native-popup-dialog';
import {TxtInputMedicao, BtnEnviar, BtnEnviarText} from '~/pages/QrCodeReader/styles'
import { ServerUrl } from '~/utils/server'
import ApiUtils from '~/utils/ApiUtils'
import moment from 'moment'; 
import CompactItem from './CompactItem';
import { accent2 } from '~/utils/Colors'
   
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

   excluirMedicao = (idMedicao) => {
      //console.warn(JSON.stringify({'casa-id': casaId, 'medidor-id': this.state.medidor.id, 'medicao': medicao}))
      
      fetch(ServerUrl + '/projeto-boletos-server/deletaMedicao.php',{method: 'POST', body: JSON.stringify({'id-medicao': idMedicao})})
      .then(ApiUtils.checkStatus)
      .then(res => {
         return res.text()
      })
      .then(res => {
         if(res.includes("ok")){
            Alert.alert('', "Medição excluida com sucesso", [{
               text: 'Ok',
               onPress: () => {
                  DialogManager.dismissAll(() => {
                     this.props.parent.refreshScreen()
                  });
               }
            }])
         }else if(res.includes("erro")){
            Alert.alert('', "Algo deu errado, tente novamente.", [{
               text: 'Ok'
            }])
         }else if(res.includes("boleto-gerado")){
            Alert.alert('', "Já foi gerado o boleto para esta medição. Não é possivel excluí-la", [{
               text: 'Ok'
            }])
         }else{
            Alert.alert('', "Algum erro ocorreu.", [{
               text: 'Ok'
            }])
         }
      })
      .catch(erro =>{
         Alert.alert('Error', 'Problem with the connection or server.' + erro, [{
               text: 'Ok'
         }])
      })
   }
   
   alertItemName = (item) => {
      DialogManager.show({
         title: 'INFORMAÇÕES DA MEDIÇÃO',
         titleAlign: 'center',
         animationDuration: 200,
         dialogAnimation: new SlideAnimation({ slideFrom: 'top' }),
         children: (
            <DialogContent>
               <View style={{alignItems: 'center', justifyContent: 'center', maxHeight: '100%'}}>
                  <ScrollView style={{width: '100%'}}>
                     <CompactItem 
                        medicao={item}
                        maxHeight={200}
                        topContent={
                           <View 
                              style={{
                                 height: 40,
                                 justifyContent: 'center',
                                 alignItems: 'center'
                              }}
                           >
                              <Text>MEDIÇÃO</Text>
                           </View>
                        }
                        mainContent={
                           <View style={{flex:1}}>
                              <View style={{flex: 1, flexDirection: 'row', maxHeight: 50, padding: 10}}>
                                 <Text style={{flex:1, textAlign: 'left', textAlignVertical: 'center', fontWeight: 'bold'}}>ID:</Text>
                                 <Text style={{flex:1, textAlign: 'left', textAlignVertical: 'center'}}>{item.id}</Text>
                              </View>
                              <View style={{flex: 1, flexDirection: 'row', maxHeight: 50, padding: 10}}>
                                 <Text style={{flex:1, textAlign: 'left', textAlignVertical: 'center', fontWeight: 'bold'}}>DATA:</Text>
                                 <Text style={{flex:1, textAlign: 'left', textAlignVertical: 'center'}}>{moment(item.dataMedicao).format("DD/MM/YY hh:mm:ss")}</Text>
                              </View>
                              <View style={{flex: 1, flexDirection: 'row', maxHeight: 50, padding: 10}}>
                                 <Text style={{flex:1, textAlign: 'left', textAlignVertical: 'center', fontWeight: 'bold'}}>MEDIÇÃO:</Text>
                                 <Text style={{flex:1, textAlign: 'left', textAlignVertical: 'center'}}>{item.medicao}</Text>
                              </View>
                              <View style={{flex: 1, flexDirection: 'row', maxHeight: 50, padding: 10}}>
                                 <Text style={{flex:1, textAlign: 'left', textAlignVertical: 'center', fontWeight: 'bold'}}>MEDIÇÃO ANTERIOR:</Text>
                                 <Text style={{flex:1, textAlign: 'left', textAlignVertical: 'center'}}>{item.medicaoAnterior}</Text>
                              </View>
                           </View>
                        }
                     />
                     <CompactItem 
                        topMargin={10}
                        medicao={item}
                        maxHeight={300}
                        topContent={
                           <View 
                              style={{
                                 height: 40,
                                 justifyContent: 'center',
                                 alignItems: 'center'
                              }}
                           >
                              <Text>CASA</Text>
                           </View>
                        }
                        mainContent={
                           <View style={{flex:1}}>
                              <View style={{flex: 1, flexDirection: 'row', maxHeight: 50, padding: 10}}>
                                 <Text style={{flex:1, textAlign: 'left', textAlignVertical: 'center', fontWeight: 'bold'}}>ID:</Text>
                                 <Text style={{flex:1, textAlign: 'left', textAlignVertical: 'center'}}>{item.casa.id}</Text>
                              </View>
                              <View style={{flex: 1, flexDirection: 'row', maxHeight: 50, padding: 10}}>
                                 <Text style={{flex:1, textAlign: 'left', textAlignVertical: 'center', fontWeight: 'bold'}}>ENDEREÇO:</Text>
                                 <Text style={{flex:1, textAlign: 'left', textAlignVertical: 'center'}}>{item.casa.rua}, {item.casa.numero}</Text>
                              </View>
                              <View style={{flex: 1, flexDirection: 'row', maxHeight: 50, padding: 10}}>
                                 <Text style={{flex:1, textAlign: 'left', textAlignVertical: 'center', fontWeight: 'bold'}}>BAIRRO:</Text>
                                 <Text style={{flex:1, textAlign: 'left', textAlignVertical: 'center'}}>{item.casa.bairro}</Text>
                              </View>
                              <View style={{flex: 1, flexDirection: 'row', maxHeight: 50, padding: 10}}>
                                 <Text style={{flex:1, textAlign: 'left', textAlignVertical: 'center', fontWeight: 'bold'}}>CIDADE/UF:</Text>
                                 <Text style={{flex:1, textAlign: 'left', textAlignVertical: 'center'}}>{item.casa.cidade}/{item.casa.uf}</Text>
                              </View>
                              <View style={{flex: 1, flexDirection: 'row', maxHeight: 50, padding: 10}}>
                                 <Text style={{flex:1, textAlign: 'left', textAlignVertical: 'center', fontWeight: 'bold'}}>MEDIÇÃO ANTERIOR:</Text>
                                 <Text style={{flex:1, textAlign: 'left', textAlignVertical: 'center'}}>{item.medicaoAnterior}</Text>
                              </View>
                              <View style={{flex: 1, flexDirection: 'row', maxHeight: 50, padding: 10}}>
                                 <Text style={{flex:1, textAlign: 'left', textAlignVertical: 'center', fontWeight: 'bold'}}>NUM. HIDRÔMETRO:</Text>
                                 <Text style={{flex:1, textAlign: 'left', textAlignVertical: 'center'}}>{item.casa.numHidrometro}</Text>
                              </View>
                           </View>
                        }
                     />
                     <CompactItem 
                        topMargin={10}
                        medicao={item}
                        maxHeight={150}
                        topContent={
                           <View 
                              style={{
                                 height: 40,
                                 justifyContent: 'center',
                                 alignItems: 'center'
                              }}
                           >
                              <Text>DONO</Text>
                           </View>
                        }
                        mainContent={
                           <View style={{flex:1}}>
                              <View style={{flex: 1, flexDirection: 'row', maxHeight: 50, padding: 10}}>
                                 <Text style={{flex:1, textAlign: 'left', textAlignVertical: 'center', fontWeight: 'bold'}}>ID:</Text>
                                 <Text style={{flex:1, textAlign: 'left', textAlignVertical: 'center'}}>{item.sacado.id}</Text>
                              </View>
                              <View style={{flex: 1, flexDirection: 'row', maxHeight: 50, padding: 10}}>
                                 <Text style={{flex:1, textAlign: 'left', textAlignVertical: 'center', fontWeight: 'bold'}}>NOME:</Text>
                                 <Text style={{flex:1, textAlign: 'left', textAlignVertical: 'center'}}>{item.sacado.nome}</Text>
                              </View>
                              <View style={{flex: 1, flexDirection: 'row', maxHeight: 70, padding: 10}}>
                                 <Text style={{flex:1, textAlign: 'left', textAlignVertical: 'center', fontWeight: 'bold'}}>EMAIL:</Text>
                                 <Text style={{flex:1, textAlign: 'left', textAlignVertical: 'center'}}>{item.sacado.email}</Text>
                              </View>
                           </View>
                        }
                     />
                  </ScrollView>

                  <TouchableOpacity
                     style={{
                        width: '70%',
                        height: 50,
                        backgroundColor: item.boletoGerado == '0' ? accent2 : '#00000020',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 10,
                        borderRadius: 40
                     }}
                     onPress={() => {
                        if(item.boletoGerado == '0'){
                           Alert.alert('', "Deseja excluir esta medição?", [
                              {
                                 text: 'sim',
                                 onPress:() => {
                                    this.excluirMedicao(item.id)
                                 }
                              },
                              {
                                 text: 'não'
                              }
                           ])
                        }else{
                           Alert.alert('', "Já foi gerado o boleto para esta medição. Não é possivel excluí-la.", [
                              {
                                 text: 'ok'
                              }
                           ])
                        }
                     }}
                  >
                     <Text style={{fontSize: 15, color: 'white', fontWeight: 'bold'}}>EXCLUIR</Text>
                  </TouchableOpacity>
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
                           <View style={{
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                              alignContent: 'center',
                              flex:0.25
                           }}>
                              <Text
                                 numberOfLines={5}
                                 style={{color: accent1, fontSize: 15, fontWeight: 'bold', textAlign: 'center'}}>
                                    {
                                       moment(item.dataMedicao).format("DD/MM/YY")
                                       //moment().format("DD/MM/YYYY")
                                       //new Date.getDate()
                                       //new Date(item.dataMedicao).toString().split(" ")[0]
                                       //"1000"
                                    }
                              </Text>
                              <Text
                                 numberOfLines={5}
                                 style={{color: accent1, fontSize: 15, fontWeight: 'bold', textAlign: 'center', color: text1}}>
                                    {moment(item.dataMedicao).format("hh:mm:ss")}
                              </Text>
                           </View>

                           <View style={{flex:0.75, justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>

                              <Text style={{color: text1, flex: 2, fontSize: 25, fontWeight: 'bold'}}>{item.medicao}</Text>
                              <Text style={{color: text2, flex: 1}}>{item.casa.rua}, {item.casa.numero}</Text>
                              <Text style={{color: text2,flex: 1}}>{item.sacado.nome}</Text>
                           
                           </View>
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