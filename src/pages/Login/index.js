import React, {Component} from 'react'
import {View, Alert, AsyncStorage, Image, ActivityIndicator} from 'react-native'
import { 
   Container,
   TxtInputLogin,
   BtnLogin,
   BtnLoginText
} from './styles';
import { TextInput } from 'react-native-gesture-handler';
import { TextInputMask } from 'react-native-masked-text'
import { accent1 } from '~/utils/Colors'
 
class Login extends Component{

   buttonClicked = false

   constructor(props) {
      super(props)
  
      this.state = {
        cpf: '',
        loading: false
      }
   }

   render() {
       return (
         <View style={{width: '100%', height:'100%', justifyContent: 'center', alignItems: 'center'}}>
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

            <Container>
               <Image source={require('~/resources/logo.png')}
                  style={{
                     width: 150,
                     height: 150
                  }}   
                  resizeMode='stretch'
               />
               <TextInputMask type={'cpf'}
                  value={this.state.cpf}
                  onChangeText={text => {
                     this.setState({
                        cpf: text
                     })
                  }}
                  ref={(ref) => this.cpfField = ref}
                  keyboardType="numeric"
                  placeholder="CPF"
                  style={{width: 280, height: 50, marginTop: 20,textAlign: "center", padding: 10, borderRadius: 40, backgroundColor: "#FFFFFFCC"}}
               />
               <TxtInputLogin placeholder="SENHA" 
                  secureTextEntry={true}
                  style={{marginTop: 20}}  
                  ref={(ref) => this.senhaField = ref} 
               />
               <BtnLogin onPress={this.loginPress} style={{marginTop: 20, backgroundColor: accent1}}>
                  <BtnLoginText>LOGIN</BtnLoginText>
               </BtnLogin>

            </Container>

            { 
               this.state.loading ?
                  <ActivityIndicator 
                     size="100%" 
                     color={accent1} 
                     style={{
                        position: 'absolute',
                        width: 70,
                        height: 70,
                        backgroundColor: 'white',
                        borderRadius: 70,
                        borderWidth: 3,
                        borderColor: 'white'
                     }}
                  /> 
               : 
                  <View/>
            }

         </View>
      )
   }

   loginPress = () => {
      const senha = this.senhaField._lastNativeText;
      const cpf = this.cpfField.getRawValue()

      if(!this.buttonClicked){
         if(senha != '' && senha != undefined && cpf != ''){
            this.setState({
               loading: true
            })
            this.buttonClicked = true
            fetch('http://ibarber.ga/projeto-boletos-server/getMedidor.php',{method: 'POST', body: JSON.stringify({cpf: cpf, senha: senha})})
            .then(res => {
               return res.text()
            })
            .then(res => {
               this.buttonClicked = false
               if(!res.includes("erro-login")){
                  this.storeData(res)

                  this.props.navigation.navigate('main')
                  this.setState({
                     loading: false
                  })
               }else{
                  Alert.alert('', "Usuário ou senha inválido.", [{
                     text: 'Ok'
                  }])
                  this.setState({
                     loading: false
                  })
               }
               
            })
            .catch(erro =>{
               this.buttonClicked = false
               Alert.alert('Error', 'Problem with the connection or server.' + erro, [{
                     text: 'Ok'
               }])
               this.setState({
                  loading: false
               })
            })
         }else{
            Alert.alert('', "Algum campo vazio", [{
               text: 'Ok'
            }])
         } 
      }
   }

   storeData = async (medidorJson) => {
      try {
        await AsyncStorage.setItem("medidor", medidorJson);
      } catch (error) {
        // Error saving data
      }
   }
}

export default Login