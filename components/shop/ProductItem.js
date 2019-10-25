import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback
} from "react-native";

import Card from "../UI/Card";

const { height } = Dimensions.get("window");

const ProductItem = props => {
  const { image, title, price, onSelect } = props;
  let TouchableCMP = TouchableOpacity;

  if (Platform.OS == "android" && Platform.Version >= 21) {
    TouchableCMP = TouchableNativeFeedback;
  }

  return (
    <Card style={styles.product}>
      <View style={styles.touchable}>
        <TouchableCMP onPress={onSelect} useForeground>
          <View>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: image }} />
            </View>
            <View style={styles.content}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.price}>${price}</Text>
            </View>
            <View style={styles.actions}>{props.children}</View>
          </View>
        </TouchableCMP>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  product: {
    margin: 20,
    height: Platform.OS === "android" ? height * 0.4 : height * 0.33
  },
  touchable: {
    borderRadius: 10,
    overflow: "hidden"
  },
  imageContainer: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    overflow: "hidden",
    width: "100%",
    height: "60%"
  },
  image: { width: "100%", height: "100%" },
  content: {
    paddingTop: Platform.OS === "android" ? height * 0.01 : height * 0.02,
    alignItems: "center",
    height: "15%"
  },
  title: { fontSize: 16, fontFamily: "open-sans-bold" },
  price: { fontSize: 14, fontFamily: "open-sans", color: "#888" },
  actions: {
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "25%"
  }
});

export default ProductItem;
