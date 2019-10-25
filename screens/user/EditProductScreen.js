import React, { useState, useEffect, useCallback } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import * as productsActions from "../../store/actions/products";
import HeaderButton from "../../components/UI/HeaderButton";

const EditProductScreen = props => {
  const prodId = props.navigation.getParam("id");
  const selectedProduct = useSelector(state =>
    state.products.userProducts.find(prod => prod.id === prodId)
  );
  const dispatch = useDispatch();
  const [title, setTitle] = useState(
    selectedProduct ? selectedProduct.title : ""
  );
  const [imageUrl, setImageUrl] = useState(
    selectedProduct ? selectedProduct.imageUrl : ""
  );
  const [description, setDescription] = useState(
    selectedProduct ? selectedProduct.description : ""
  );
  const [price, setPrice] = useState("");

  const sumbitHandler = useCallback(() => {
    if (selectedProduct) {
      dispatch(
        productsActions.updateProduct(prodId, title, imageUrl, description)
      );
    } else {
      dispatch(
        productsActions.createProduct(title, imageUrl, description, +price)
      );
    }
    props.navigation.goBack();
  }, [dispatch, prodId, title, imageUrl, description, price]);

  useEffect(() => {
    props.navigation.setParams({ submit: sumbitHandler });
  }, [sumbitHandler]);
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.form}>
        <View style={styles.formContent}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={text => setTitle(text)}
          />
        </View>
        <View style={styles.formContent}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={text => setImageUrl(text)}
          />
        </View>
        {!selectedProduct && (
          <View style={styles.formContent}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={text => setPrice(text)}
            />
          </View>
        )}
        <View style={styles.formContent}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={text => setDescription(text)}
          />
        </View>
      </ScrollView>
    </View>
  );
};

EditProductScreen.navigationOptions = navData => {
  const onSubmit = navData.navigation.getParam("submit");

  return {
    headerTitle: navData.navigation.getParam("id")
      ? "Edit Product"
      : "Add Product",
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="check"
          iconName={
            Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
          }
          onPress={onSubmit}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20
  },
  formContent: {
    width: "100%",
    marginBottom: 10
  },
  label: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
    marginBottom: 5
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    padding: 3
  }
});

export default EditProductScreen;
