import React from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  Dimensions
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import * as cartActions from "../../store/actions/cart";

import Colors from "../../constants/Colors";

const { width, height } = Dimensions.get("window");

const ProductDetailScreen = props => {
  const productId = props.navigation.getParam("id");
  const selectedProduct = useSelector(state =>
    state.products.availableProducts.find(prod => prod.id === productId)
  );
  const { price, description, imageUrl } = selectedProduct;
  const dispatch = useDispatch();
  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: imageUrl }} />
      <View style={styles.actions}>
        <Button
          color={Colors.primary}
          title="Add To Cart"
          onPress={() => {
            dispatch(cartActions.addToCart(selectedProduct));
          }}
        />
      </View>
      <Text style={styles.price}>${price.toFixed(2)}</Text>
      <Text style={styles.desc}>{description}</Text>
    </ScrollView>
  );
};

ProductDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam("title")
  };
};

const styles = StyleSheet.create({
  image: { width: width, height: height * 0.3 },
  actions: {
    alignItems: "center",
    marginVertical: 10
  },
  price: {
    fontFamily: "open-sans",
    textAlign: "center",
    fontSize: 20,
    color: "#888",
    marginVertical: 20
  },
  desc: {
    fontFamily: "open-sans",
    textAlign: "center",
    fontSize: 14,
    paddingHorizontal: 20
  }
});

export default ProductDetailScreen;
