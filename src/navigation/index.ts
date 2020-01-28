import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import OfferingListPage from '../pages/OfferingList.screen';
import OfferingPage from '../pages/Offering.screen';

const AppNavigator = createStackNavigator(
{
    Home: { screen: OfferingListPage },
    Offering: { screen: OfferingPage },
  },
  {
    headerMode: 'none',
    initialRouteName: 'Home',
    
  });
  
  export default createAppContainer(AppNavigator);