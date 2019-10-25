import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

import Colors from "../../constants/Colors";
import CartItem from "./CartItem";

const OrderItem = props => {
  const { totalAmount, date, item } = props;
  const [showDetails, setShowDetails] = useState(false);
  return (
    <View style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.amount}>${totalAmount.toFixed(2)}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <Button
        title={showDetails ? "Hide Details" : "Show Details"}
        color={Colors.primary}
        onPress={() => {
          setShowDetails(prevState => !prevState);
        }}
      />
      {showDetails && (
        <View style={styles.details}>
          {item.map(item => (
            <CartItem
              key={item.productId}
              amount={item.sum}
              title={item.productTitle}
              quantity={item.quantity}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    margin: 20,
    padding: 10,
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
    backgroundColor: "white",
    alignItems: "center"
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 15
  },
  amount: { fontFamily: "open-sans-bold", fontSize: 16 },
  date: { fontFamily: "open-sans", fontSize: 16, color: "#888" },
  details: { width: "100%" }
});

export default OrderItem;
