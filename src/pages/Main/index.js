import React, {Component} from 'react'
import {Platform, UIManager, LayoutAnimation, View, Alert, Text, Dimensions, ActivityIndicator, AsyncStorage, Image, Animated, Easing, ScrollView} from 'react-native'
import {TxtInputLogin, BtnLogin, BtnLoginText, Container, ContainerBusca, BtnAdvanSearch, BtnAdvanSearchImage, FloatingBtn, FloatingBtnImage, BtnSair} from './styles' 
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { accent1 } from '~/utils/Colors'
import List from './components/List';
//import AbortController from 'abort-controller'
import 'abort-controller/polyfill'
//import 'abortcontroller-polyfill'
import { ServerUrl,ServerAuthPsw,ServerAuthUser } from '~/utils/server'
import ApiUtils from '~/utils/ApiUtils'

const AbortController = window.AbortController;
const controller = new AbortController()
const signal = controller.signal
 
class Main extends Component{

  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props)

    this.height = 0

    this.state = {
      medidor: '',
      ruaInput: '',
      numeroInput: '',
      bairroInput: '',
      cidadeInput: '',
      ufInput: '',
      cepInput: '',
      //height: new Animated.Value(0),
      //height: 0,
      isMaxHeight: false,
      txtInputBuscaEditable: true,
      items: [],
      loading: false,
      currentArrowImage: require('~/resources/arrow_down.png') 
    }

    if(Platform.OS === 'android'){
      UIManager.setLayoutAnimationEnabledExperimental && 
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    this.getMedidor().then(() => {
    /*Alert.alert('', this.state.medidor.nome, [{
        text: 'Ok'
      }])*/
    })
  }

  render() {

    return (
      <Container>
        <ContainerBusca>
          <TxtInputLogin 
            editable={this.state.txtInputBuscaEditable} 
            placeholder="BUSCAR"
            onChangeText={(text) => {
              if(text !== ''){
                //controller.abort()
                this.setState({
                  loading: true
                })
                //this.forceUpdate();
                this.buscarCasasSimples(text)
              }else{
                this.listCasas.updateItems([], this.state.medidor)
              }
            }}/>
          <BtnAdvanSearch onPress={this.btnAdvanSearchPress}>
            <BtnAdvanSearchImage source={this.state.currentArrowImage}/>
          </BtnAdvanSearch>
        </ContainerBusca>

        <Animated.View 
          style={{
            height: `${this.height}%`,
            //opacity: this.interpolateValue(this.height,[0,50],[0,1]),
            opacity: this.interpolateValue(this.height,[0,50],[0,1]),
            width: '100%',
            flexDirection: 'column',
            backgroundColor: '#00000005',
            justifyContent: 'center',
            alignItems: 'center'
          }}>

          <View style={{
              flex: 1,
              width: '90%',
              maxHeight: 40,
              minHeight: 40,
              flexDirection: 'row',
              marginTop: 5
            }}
          >
            <TextInput 
              style={{
                flex:0.75, 
                backgroundColor:'#00000010',
                width: '90%',
                textAlign: 'center',
                borderRadius: 40
              }}
              placeholder="RUA"
              onChangeText={(field) => this.setState({ruaInput: field})}
            />
            <TextInput 
              style={{
                flex:0.25, 
                backgroundColor:'#00000010',
                width: '90%',
                textAlign: 'center',
                borderRadius: 40,
                marginLeft: 5
              }}
              placeholder="Nº"
              onChangeText={(field) => this.setState({numeroInput: field})}
            />
          </View>

          <View style={{
              flex: 1,
              width: '90%',
              maxHeight: 40,
              minHeight: 40,
              flexDirection: 'row',
              marginTop: 5
            }}
          >
            <TextInput 
              style={{
                flex:1, 
                backgroundColor:'#00000010',
                width: '90%',
                textAlign: 'center',
                borderRadius: 40
              }}
              placeholder="BAIRRO"
              onChangeText={(field) => this.setState({bairroInput: field})}
            />
            <TextInput 
              style={{
                flex:1, 
                backgroundColor:'#00000010',
                width: '90%',
                textAlign: 'center',
                borderRadius: 40,
                marginLeft: 5
              }}
              placeholder="CIDADE"
              onChangeText={(field) => this.setState({cidadeInput: field})}
            />
          </View>

          <View style={{
              flex: 1,
              width: '90%',
              maxHeight: 40,
              minHeight: 40,
              flexDirection: 'row',
              marginTop: 5
            }}
          >
            <TextInput 
              style={{
                flex:0.25, 
                backgroundColor:'#00000010',
                width: '90%',
                textAlign: 'center',
                borderRadius: 40
              }}
              placeholder="UF"
              onChangeText={(field) => this.setState({ufInput: field})}
            />
            <TextInput 
              style={{
                flex:0.75, 
                backgroundColor:'#00000010',
                width: '90%',
                textAlign: 'center',
                borderRadius: 40,
                marginLeft: 5
              }}
              placeholder="CEP"
              onChangeText={(field) => this.setState({cepInput: field})}
            />
          </View>

          <BtnLogin onPress={this.buscarPress} style={{marginTop: 20, backgroundColor: accent1}}>
            <BtnLoginText>BUSCAR</BtnLoginText>
          </BtnLogin>

        </Animated.View>

        <ScrollView style={{width: '100%'}}>
          <List style={{width: '100%'}} 
            items={[]} 
            ref={(ref) => this.listCasas = ref}/>
        </ScrollView>

        <FloatingBtn onPress={this.qrCodePress} style={{backgroundColor: accent1}}>
          <FloatingBtnImage source={require('~/resources/qr_code.png')}/>
        </FloatingBtn>

        { 
          this.state.loading ?
            <ActivityIndicator 
              size="120%" 
              color={accent1} 
              style={{
                marginTop: ((Dimensions.get('window').height/100)*this.height) + 140,
                position: 'absolute',
                backgroundColor: 'white',
                borderRadius: 40,
                borderWidth: 3,
                borderColor: 'white'
              }}
            /> 
          : 
            <View/>
        }

      </Container>
    )
  }

  buscarPress = () => {
    const rua = this.state.ruaInput;
    const numero = this.state.numeroInput;
    const bairro = this.state.bairroInput;
    const cidade = this.state.cidadeInput;
    const uf = this.state.ufInput;
    const cep = this.state.cepInput;

    //console.warn(rua + ", " + numero + ", " + bairro + ", " + cidade + ", " + uf + ", " + cep)

    if(rua != '' ||
    numero != '' ||
    bairro != '' ||
    cidade != '' ||
    uf != '' ||
    cep != ''){

      this.btnAdvanSearchPress()
      this.setState({
        loading: true
      })
      this.buscarCasasAvancado(rua, numero, bairro, cidade, uf, cep)

    }else{
      Alert.alert('', 'Preencha pelo menos um campo.', [{
        text: 'Ok'
      }])
    }
  }

  qrCodePress = () => {
    this.props.navigation.navigate('qrCodeReader')
  }

  btnAdvanSearchPress = () => {
    if(this.state.isMaxHeight){
      this.setState({
        currentArrowImage: require('~/resources/arrow_down.png') 
      });
    }else{
      this.setState({
        currentArrowImage: require('~/resources/arrow_up.png') 
      });
    }
    this.toggleWidth();
  }

  toggleWidth() {
    const endHeight = this.state.isMaxHeight ? 0 : 50;

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    //this.setState({height: endHeight})
    this.height = endHeight

    this.setState({
      isMaxHeight: !this.state.isMaxHeight,
      txtInputBuscaEditable: !this.state.txtInputBuscaEditable
    })

    /*Animated.timing(this.height, {
      toValue: endHeight,
      duration: 200,
      easing: Easing.ease,
      //useNativeDriver: true
    }).start(() => {
      this.setState({
        isMaxHeight: !this.state.isMaxHeight
      })
      this.setState({
        txtInputBuscaEditable: !this.state.txtInputBuscaEditable
      })

      this.setState({
        animationStarted: false
      })
    })*/
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

  buscarCasasSimples = async (busca) => {
    //console.warn(JSON.stringify({'casa-id': casaId, 'medidor-id': this.state.medidor.id, 'medicao': '89'}))
    await fetch(ServerUrl + '/projeto-boletos-server/buscarCasasSimples.php', {method: 'POST', body: JSON.stringify({"auth-usr": ServerAuthUser, "auth-psw": ServerAuthPsw, 'id-cedente': this.state.medidor.cedenteId, 'busca': busca})},{signal})
    .then(ApiUtils.checkStatus)
    .then(res => {
      return res.text()
    })
    .then(res => {
      if(res.split(';')[0].includes("ok")){
        object = JSON.parse(res.trim().slice(3));
        /*Alert.alert('Error', object[0].id, [{
          text: 'Ok'
        }])*/
        /*this.setState({
          items: object
        })*/
        this.listCasas.updateItems(object, this.state.medidor)
        this.setState({
          loading: false
        })
      }else{
        this.listCasas.updateItems([], this.state.medidor)
        this.setState({
          loading: false
        })
        //nada encontrado
      }
    })
    .catch(erro =>{
      Alert.alert('Error', 'Problemas com o servidor  ou sua conexão com a internet.', [{
            text: 'Ok'
      }])
      this.setState({
        loading: false
      })
    })
  }

  buscarCasasAvancado = async (rua, numero, bairro, cidade, uf, cep) => {
    //console.warn(JSON.stringify({'casa-id': casaId, 'medidor-id': this.state.medidor.id, 'medicao': '89'}))
    await fetch(ServerUrl + '/projeto-boletos-server/buscarCasasAvancado.php', 
      {method: 'POST', body: JSON.stringify({
        "auth-usr": ServerAuthUser, 
        "auth-psw": ServerAuthPsw,
        'id-cedente': this.state.medidor.cedenteId,
        'rua': rua,
        'numero': numero,
        'bairro': bairro,
        'cidade': cidade,
        'uf': uf,
        'cep': cep
      })},
      {signal}
    )
    .then(ApiUtils.checkStatus)  
    .then(res => {
      return res.text()
    })
    .then(res => {
      /*Alert.alert('Error', res, [{
        text: 'Ok'
      }])*/
      if(res.split(';')[0].includes("ok")){
        object = JSON.parse(res.trim().slice(3));
        this.listCasas.updateItems(object, this.state.medidor)
        this.setState({
          loading: false
        })
      }else{
        this.listCasas.updateItems([], this.state.medidor)
        this.setState({
          loading: false
        })
        //nada encontrado
      }
    })
    .catch(erro =>{
      Alert.alert('Error', 'Problemas com o servidor  ou sua conexão com a internet.', [{
            text: 'Ok'
      }])
      this.setState({
        loading: false
      })
    })
  }

  storeData = async (medidorJson) => {
    try {
      await AsyncStorage.setItem("medidor", medidorJson);
    } catch (error) {
      console.warn(error)
      // Error saving data
    }
  }

  interpolateValue(value, inputRange, outputRange){
    //inputPercent = ((inputRange[1] - inputRange[0])/100)*(value - inputRange[0])
    inputPercent = (value - inputRange[0])/(inputRange[1] - inputRange[0])*100
    outputValue = (((outputRange[1] - outputRange[0])/100) * inputPercent) + outputRange[0]
    
    return outputValue
  }
}

export default Main