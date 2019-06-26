import React, {Component} from 'react'
import {Platform, UIManager, LayoutAnimation, View, Alert, Text, AsyncStorage, Image, Animated, Easing, ScrollView} from 'react-native'
import {TxtInputLogin, BtnLogin, BtnLoginText, Container, ContainerBusca, BtnAdvanSearch, BtnAdvanSearchImage, FloatingBtn, FloatingBtnImage} from './styles' 
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { accent1 } from '~/utils/Colors'
import List from './components/List';
//import AbortController from 'abort-controller'
import 'abort-controller/polyfill'
//import 'abortcontroller-polyfill'

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
      //height: new Animated.Value(0),
      //height: 0,
      isMaxHeight: false,
      txtInputBuscaEditable: true,
      items: []
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
                this.buscarCasasSimples(text)
              }else{
                this.listCasas.updateItems([], this.state.medidor)
              }
            }}/>
          <BtnAdvanSearch onPress={this.btnAdvanSearchPress}>
            <BtnAdvanSearchImage source={require('~/resources/arrow_down.png')}/>
          </BtnAdvanSearch>
        </ContainerBusca>

        <Animated.View style={{
          height: `${this.height}%`,
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
              maxHeight: 60,
              minHeight: 60,
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
            />
            <TextInput 
              style={{
                flex:0.25, 
                backgroundColor:'#00000010',
                maxHeight: 60,
                minHeight: 30,
                width: '90%',
                textAlign: 'center',
                borderRadius: 40,
                marginLeft: 5
              }}
              placeholder="Nº"
            />
          </View>

          <View style={{
              flex: 1,
              width: '90%',
              maxHeight: 60,
              minHeight: 60,
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
            />
            <TextInput 
              style={{
                flex:1, 
                backgroundColor:'#00000010',
                maxHeight: 60,
                minHeight: 30,
                width: '90%',
                textAlign: 'center',
                borderRadius: 40,
                marginLeft: 5
              }}
              placeholder="CIDADE"
            />
          </View>

          <View style={{
              flex: 1,
              width: '90%',
              maxHeight: 60,
              minHeight: 60,
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
            />
            <TextInput 
              style={{
                flex:0.75, 
                backgroundColor:'#00000010',
                maxHeight: 60,
                minHeight: 30,
                width: '90%',
                textAlign: 'center',
                borderRadius: 40,
                marginLeft: 5
              }}
              placeholder="CEP"
            />
          </View>

          <BtnLogin onPress={this.buscarPress} style={{marginTop: 20, backgroundColor: accent1}}>
            <BtnLoginText>BUSCAR</BtnLoginText>
          </BtnLogin>

        </Animated.View>

        <ScrollView style={{width: '100%'}}>
          <List style={{width: '100%'}} 
            items={this.state.items} 
            ref={(ref) => this.listCasas = ref}/>
        </ScrollView>

        <FloatingBtn onPress={this.qrCodePress} style={{backgroundColor: accent1}}>
          <FloatingBtnImage source={require('~/resources/qr_code.png')}/>
        </FloatingBtn>

      </Container>
    )
  }

  buscarPress = () => {
    Alert.alert('', 'BUSCAR', [{
      text: 'Ok'
    }])
  }

  qrCodePress = () => {
    this.props.navigation.navigate('qrCodeReader')
  }

  btnAdvanSearchPress = () => {
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
    await fetch('http://ibarber.ga/projeto-boletos-server/buscarCasasSimples.php', {method: 'POST', body: JSON.stringify({'id-cedente': this.state.medidor.cedenteId, 'busca': busca})},{signal})
    .then(res => {
      return res.text()
    })
    .then(res => {
      if(!res.includes("erro-login")){
        object = JSON.parse(res);
        /*Alert.alert('Error', object[0].id, [{
          text: 'Ok'
        }])*/
        /*this.setState({
          items: object
        })*/
        this.listCasas.updateItems(object, this.state.medidor)
      }else{
        this.listCasas.updateItems([], this.state.medidor)
        //nada encontrado
      }
    })
    .catch(erro =>{
      Alert.alert('Error', 'Problem with the connection or server.' + erro, [{
            text: 'Ok'
      }])
    })
  }

  interpolateValue(value, inputRange, outputRange){
    //inputPercent = ((inputRange[1] - inputRange[0])/100)*(value - inputRange[0])
    inputPercent = (value - inputRange[0])/(inputRange[1] - inputRange[0])*100
    outputValue = (((outputRange[1] - outputRange[0])/100) * inputPercent) + outputRange[0]
    
    return outputValue
  }
}

export default Main