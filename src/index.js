
import React from 'react';

import '~/config/ReactotronConfig';

import Routes from '~/routes';
import NavigationService from '~/utils/NavigationService';

const App = () => <Routes ref={navigatorRef => {NavigationService.setTopLevelNavigator(navigatorRef)}}/>;

export default App;
