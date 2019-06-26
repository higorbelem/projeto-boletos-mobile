import React, {Component} from 'react'
import {View, Alert, AsyncStorage} from 'react-native'
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
        cpf: ''
      }
   }

   render() {
       return (
         <Container>
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
               style={{width: 280, height: 60, textAlign: "center", padding: 10, borderRadius: 40, backgroundColor: "#00000010"}}
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
      )
   }

   loginPress = () => {
      const senha = this.senhaField._lastNativeText;
      const cpf = this.cpfField.getRawValue()

      if(!this.buttonClicked){
         if(senha != '' && senha != undefined && cpf != ''){
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
               }else{
                  Alert.alert('', "Usuário ou senha inválido.", [{
                     text: 'Ok'
                  }])
               }
               
            })
            .catch(erro =>{
               this.buttonClicked = false
               Alert.alert('Error', 'Problem with the connection or server.' + erro, [{
                     text: 'Ok'
               }])
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