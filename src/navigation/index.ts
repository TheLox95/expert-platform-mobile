import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import OfferingListPage from '../pages/OfferingList.screen';
import OfferingPage from '../pages/Offering.screen';
import ImageGallery from '../tools/ImageGallery';
import VideoPlayer from '../tools/VideoPlayer';
import SearchScreen from '../pages/Search.screen';
import ExpertScreen from '../pages/Expert.screen';

const AppNavigator = createStackNavigator(
{
    Home: { screen: OfferingListPage },
    Offering: { screen: OfferingPage },
    ImageGallery: { screen: ImageGallery },
    VideoPlayer: { screen: VideoPlayer },
    Search: { screen: SearchScreen },
    Expert: { screen: ExpertScreen },
  },
  {
    headerMode: 'none',
    initialRouteName: 'Home',
    
  });
  
  export default createAppContainer(AppNavigator);