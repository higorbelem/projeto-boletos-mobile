import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Main from '~/pages/Main';
import Login from '~/pages/Login';
import QrCodeReader from '~/pages/QrCodeReader';

const Routes = createAppContainer(createSwitchNavigator({ main: Main, login: Login , qrCodeReader: QrCodeReader}));

export default Routes;
