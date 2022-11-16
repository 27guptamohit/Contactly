import {createStackNavigator} from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import HomeCreateButton from "../components/2_Create_Master_Profile/1_create_master_profile_button";
import EditMasterProfile from "../components/2_Create_Master_Profile/2_edit_master_profile";
import MasterProfileHome from "../components/2_Create_Master_Profile/3_show_master_profile";

const screens = {
    CreateMasterProfileButtonScreen: {
        screen: HomeCreateButton
    },
    EditMasterProfileScreen : {
        screen: EditMasterProfile
    },
    MasterProfileHomeScreen : {
        screen: MasterProfileHome
    }

}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack)