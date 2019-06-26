import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';
import {AsyncStorage} from 'react-native';

import Main from '~/pages/Main';
import Login from '~/pages/Login';
import QrCodeReader from '~/pages/QrCodeReader';
import SplashScreen from '~/pages/SplashScreen';

function Routes(){
   const stackNav = createStackNavigator({ main: Main, qrCodeReader: QrCodeReader});
   const switchNav = createSwitchNavigator({splash: SplashScreen, login: Login , stack: stackNav},{initialRouteName: "splash"});

   return(
      createAppContainer(switchNav)
   );
}

export default Routes();
