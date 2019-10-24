import React from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback
} from "react-native";
import Colors from "../../constants/Colors";

const { height } = Dimensions.get("window");

const ProductItem = props => {
  const { image, title, price, onViewDetail, onToCart } = props;
  let TouchableCMP = TouchableOpacity;

  if (Platform.OS == "android" && Platform.Version >= 21) {
    TouchableCMP = TouchableNativeFeedback;
  }

  return (
    <View style={styles.product}>
      <View style={styles.touchable}>
        <TouchableCMP onPress={onViewDetail} useForeground>
          <View>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: image }} />
            </View>
            <View style={styles.content}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.price}>${price}</Text>
            </View>
            <View style={styles.actions}>
              <Button
                color={Colors.primary}
                title="View Detail"
                onPress={onViewDetail}
              />
              <Button
                color={Colors.primary}
                title="To Cart"
                onPress={onToCart}
              />
            </View>
          </View>
        </TouchableCMP>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  product: {
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 7,
    width: "90%",
    height: Platform.OS === "android" ? height * 0.4 : height * 0.33,
    backgroundColor: "white",
    alignSelf: "center"
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
