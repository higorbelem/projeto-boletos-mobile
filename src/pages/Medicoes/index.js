import React, {Component} from 'react'
import {View, Text, Alert, RefreshControl, ScrollView, AsyncStorage} from 'react-native'
import List from './components/List'
import { NavigationEvents } from "react-navigation";
import { ServerUrl,ServerAuthPsw,ServerAuthUser } from '~/utils/server'
import ApiUtils from '~/utils/ApiUtils'
  
class Medicoes extends Component{

    constructor(props){
        super(props)

        this.state = {
            medidor: '',
            refreshing: false
        }

        this.getMedidor().then(() => {
            /*Alert.alert('', this.state.medidor.nome, [{
                text: 'Ok'
              }])*/
        })
    }

    render() {
        return (
            <ScrollView 
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={() => {
                            this.refreshScreen()
                        }}
                    />
                }
            >
                <NavigationEvents
                    onDidFocus={payload => {
                        this.refreshScreen()
                    }}
                />
                <List style={{width: '100%'}} 
                    parent={this}
                    items={[]} 
                    ref={(ref) => this.listMedicoes = ref}/>
           </ScrollView>
        )
    }

    refreshScreen(){
        if(this.state.medidor != ''){
            this.setState({
                refreshing: true
            })
            this.buscarMedicoes()
        }
    }

    buscarMedicoes = async () => {
        //console.warn(JSON.stringify({'casa-id': casaId, 'medidor-id': this.state.medidor.id, 'medicao': '89'}))
        await fetch(ServerUrl + '/projeto-boletos-server/getMedicoesMedidor.php', {method: 'POST', body: JSON.stringify({"auth-usr": ServerAuthUser, "auth-psw": ServerAuthPsw,'medidor-id': this.state.medidor.id})})
        .then(ApiUtils.checkStatus)
        .then(res => {
          return res.text()
        })
        .then(res => {
            //console.warn(res)
            if(res.split(';')[0].includes("ok")){
                object = JSON.parse(res.trim().slice(3));
                /*this.setState({
                items: object
                })*/
                this.listMedicoes.updateItems(object, this.state.medidor)
                this.setState({
                    refreshing: false
                })
            }else{
                this.listMedicoes.updateItems([], this.state.medidor)
                this.setState({
                    refreshing: false
                })
                //nada encontrado
            }
        })
        .catch(erro =>{
            Alert.alert('Error', 'Problemas com o servidor  ou sua conexão com a internet.\nERRO: ' + erro, [{
                text: 'Ok'
            }])
            this.setState({
                refreshing: false
            })
        })
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

export default Medicoes