import React from "react";
import { View, StyleSheet, FlatList, Button, Text } from "react-native";
import { useSelector } from "react-redux";

import Colors from "../../constants/Colors";

const CartScreen = props => {
  const totalAmount = useSelector(state => state.cart.totalAmount);
  const cartItems = useSelector(state => {
    const cartItemsList = [];
    for (const key in state.cart.items) {
      cartItemsList.push({
        productId: key,
        productTitle: state.cart.items[key].title,
        productPrice: state.cart.items[key].price,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum
      });
    }
    return cartItemsList;
  });
  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total Amount : <Text style={styles.amount}>${totalAmount}</Text>
        </Text>
        <Button
          title="Order Now"
          color={Colors.accent}
          onPress={() => {}}
          disabled={cartItems.length === 0}
        />
      </View>
      <FlatList />
    </View>
  );
};

CartScreen.navigationOptions = {
  headerTitle: "CART"
};

const styles = StyleSheet.create({
  screen: {
    margin: 20
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    fontSize: 18
  },
  amount: { color: Colors.primary }
});

export default CartScreen;
