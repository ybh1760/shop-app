import { Platform } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import ProductOverviewScreen from "../screens/shop/ProductOverviewScreen";
import Colors from "../constants/Colors";

const ProductNavigator = createStackNavigator(
  {
    productOverview: ProductOverviewScreen
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.primary : ""
      },
      headerTintColor: Platform.OS === "android" ? "white" : Colors.primary
    }
  }
);

export default createAppContainer(ProductNavigator);
