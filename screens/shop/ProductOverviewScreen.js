import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Platform,
  Button,
  ActivityIndicator,
  StyleSheet
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/UI/HeaderButton";
import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from "../../store/actions/cart";
import * as productsActions from "../../store/actions/products";
import Colors from "../../constants/Colors";

const ProductOverviewScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const products = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();

  const loadProducts = useCallback(async () => {
    
    setIsRefreshing(true);
    try {
      await dispatch(productsActions.fetchProducts());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
    
  }, [dispatch, setIsRefreshing]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      "willFocus",
      loadProducts
    );
    return () => {
      willFocusSub.remove();
    };
  });

  useEffect(() => {
    setIsLoading(true);
    loadProducts().then(()=>{setIsLoading(false);});
  }, [dispatch, loadProducts]);

  const viewDetailHandler = (id, title) => {
    props.navigation.navigate({
      routeName: "productDetail",
      params: { id: id, title: title }
    });
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }
  if (products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products, Maybe add products!</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.centered}>
        <Text>Error Occurs</Text>
        <Button
          title="try again"
          onPress={loadProducts}
          color={Colors.primary}
        />
      </View>
    );
  }
  return (
    <FlatList
      onRefresh={loadProducts}
      refreshing={isRefreshing}
      data={products}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price.toFixed(2)}
          onSelect={() => {
            viewDetailHandler(itemData.item.id, itemData.item.title);
          }}
        >
          <Button
            color={Colors.primary}
            title="View Detail"
            onPress={() => {
              viewDetailHandler(itemData.item.id, itemData.item.title);
            }}
          />
          <Button
            color={Colors.primary}
            title="To Cart"
            onPress={() => {
              dispatch(cartActions.addToCart(itemData.item));
            }}
          />
        </ProductItem>
      )}
    />
  );
};

ProductOverviewScreen.navigationOptions = navData => {
  return {
    headerTitle: "All Products",
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
    ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="cart"
          iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          onPress={() => {
            navData.navigation.navigate("cart");
          }}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default ProductOverviewScreen;
