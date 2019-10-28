import React, {useState, useEffect, useCallback} from "react";
import { FlatList, Text, Platform, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/UI/HeaderButton";
import OrderItem from "../../components/shop/OrderItem";
import Center from "../../components/UI/Center";
import * as orderActions from "../../store/actions/orders";
import Colors from "../../constants/Colors";

const OrdersScreen = props => {
  const orders = useSelector(state => state.orders.orders);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const fetchOrders = useCallback(async()=>{
    setIsLoading(true);
    setError(null);
    try{
    await dispatch(orderActions.setOrders());
    }catch(err)
    {
      setError(err.message);
    }
    setIsLoading(false);
  },[dispatch])


    useEffect(() => {
      const willFocusSub = props.navigation.addListener(
        "willFocus",
        fetchOrders
      );
      return () => {
        willFocusSub.remove();
      };
    });
    useEffect(()=>{
      fetchOrders()
      },[fetchOrders])
  
    if(isLoading){
      return( <Center>
            <ActivityIndicator size="large" color={Colors.primary}/>
      </Center>);
    }
    if(orders.length===0){
      return <Center><Text>No Orders !!!!!! </Text></Center>
    }
  return (
    <FlatList
      data={orders}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <OrderItem
          totalAmount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
          item={itemData.item.item}
        />
      )}
    />
  );
};

OrdersScreen.navigationOptions = navData => {
  return {
    headerTitle: "Orders",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    )
  };
};
export default OrdersScreen;
