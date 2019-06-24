import React, {Component} from 'react'
import {View, Alert, Text, AsyncStorage} from 'react-native'
import {TxtInputLogin, BtnLogin, BtnLoginText, Container, ContainerBusca} from './styles' 
 
class Main extends Component{
  
  medidor;

  constructor(props) {
    super(props)

    this.state = {
      medidor: ''
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

        </ContainerBusca>
      </Container>
    )
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
}

export default Main