import { createAppContainer, createSwitchNavigator, createStackNavigator, createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import React, {Component} from 'react';

import Main from '~/pages/Main';
import Login from '~/pages/Login';
import QrCodeReader from '~/pages/QrCodeReader';
import SplashScreen from '~/pages/SplashScreen';
import Medicoes from '~/pages/Medicoes';

import TopBarView from '~/TopBarView';

import {accent1} from '~/utils/Colors'

/*const tabNav = createMaterialTopTabNavigator({
   main: Main,
   medicoes: Medicoes
},{
   header: null,
   tabBarPosition: 'bottom' 
});*/

function Routes(){
   const tabNav = createMaterialTopTabNavigator({
      buscar: Main,
      medicoes: Medicoes
   },{
      /*navigationOptions: {
         header: null
      },*/
      tabBarOptions:{
         indicatorStyle:{
            top:0,
            backgroundColor: accent1,
            height: 5
         },
         style:{
            backgroundColor: '#333333',
            height: 50
         },
         pressColor: accent1,
         activeTintColor: 'white'
      },
      navigationOptions:{
         headerTitle: <TopBarView/>,
         headerStyle:{
            height:40
         }
      },
      tabBarPosition: 'bottom'
   });
   const stackNav = createStackNavigator({ 
      tab: tabNav, 
      qrCodeReader: QrCodeReader
   });
   const switchNav = createSwitchNavigator({
      splash: SplashScreen, 
      login: Login , 
      stack: stackNav
   },{initialRouteName: "splash"});

   return(
      createAppContainer(switchNav)
   );
}

export default Routes();
//export default createAppContainer(tabNav);
