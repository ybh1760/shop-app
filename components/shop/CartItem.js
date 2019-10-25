import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CartItem = props => {
  const { amount, title, quantity, onRemove } = props;

  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <Text style={styles.quantity}>{quantity} </Text>
        <Text style={styles.mainText}>{title}</Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.mainText}>${amount}</Text>
        <TouchableOpacity style={styles.button} onPress={onRemove}>
          <Ionicons
            name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
            size={23}
            color={"red"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    marginTop: 20,
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  itemData: {
    flexDirection: "row"
  },
  quantity: {
    fontFamily: "open-sans",
    fontSize: 16,
    color: "#888"
  },
  mainText: {
    fontFamily: "open-sans-bold",
    fontSize: 16
  },
  button: { marginLeft: 10 }
});

export default CartItem;
