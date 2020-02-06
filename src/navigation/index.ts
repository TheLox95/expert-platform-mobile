import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import OfferingListPage from '../pages/OfferingList.screen';
import OfferingPage from '../pages/Offering.screen';
import ImageGallery from '../tools/ImageGallery';
import VideoPlayer from '../tools/VideoPlayer';
import SearchScreen from '../pages/Search.screen';
import ExpertScreen from '../pages/Expert.screen';
import LoginScreen from '../pages/Login.screen';
import CreateOfferingScreen from '../pages/CreateOffering.screen';
import SideMenu from '../tools/SideMenu';
import EditExpertScreen from '../pages/EditExpert.screen';
import EditOfferingScreen from '../pages/EditOffering.screen';

export default (token: string | null ) => {

  const AppNavigator = createDrawerNavigator(
    {
        Home: { screen: OfferingListPage },
        Offering: { screen: OfferingPage },
        ImageGallery: { screen: ImageGallery },
        VideoPlayer: { screen: VideoPlayer },
        Search: { screen: SearchScreen },
        Expert: { screen: ExpertScreen },
        EditExpert: { screen: EditExpertScreen },
        Login: { screen: LoginScreen },
        CreateOffering: { screen: CreateOfferingScreen },
        EditOffering: { screen: EditOfferingScreen },
      },
      {
        contentComponent: SideMenu,
        initialRouteName: token ? 'Home' : 'Login',
        backBehavior: 'history',
      });

  return createAppContainer(AppNavigator)
};