import React, { useState, useEffect, useCallback, useReducer } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  Alert
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import * as productsActions from "../../store/actions/products";
import HeaderButton from "../../components/UI/HeaderButton";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  switch (action.type) {
    case FORM_INPUT_UPDATE:
      const updatedInputValues = { ...state.inputValues };
      updatedInputValues[action.input] = action.value;
      const updatedInputValidities = { ...state.inputVaildities };
      updatedInputValidities[action.input] = action.isValid;
      let updatedFormIsValid = true;
      for (const key in updatedInputValidities) {
        updatedFormIsValid = updatedFormIsValid && updatedInputValidities[key];
      }
      return {
        inputValues: updatedInputValues,
        inputVaildities: updatedInputValidities,
        formIsVaild: updatedFormIsValid
      };
  }
  return state;
};

const EditProductScreen = props => {
  const prodId = props.navigation.getParam("id");
  const selectedProduct = useSelector(state =>
    state.products.userProducts.find(prod => prod.id === prodId)
  );

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: selectedProduct ? selectedProduct.title : "",
      imageUrl: selectedProduct ? selectedProduct.imageUrl : "",
      description: selectedProduct ? selectedProduct.description : "",
      price: ""
    },
    inputVaildities: {
      title: selectedProduct ? true : false,
      imageUrl: selectedProduct ? true : false,
      description: selectedProduct ? true : false,
      price: selectedProduct ? true : false
    },
    formIsVaild: true
  });

  const textSubmitHandler = (inputIdentifier, text) => {
    let isValid = false;
    if (text.trim().length > 0) {
      isValid = true;
    }

    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: text,
      isValid: isValid,
      input: inputIdentifier
    });
  };

  const sumbitHandler = useCallback(() => {
    const { title, imageUrl, description, price } = formState.inputValues;
    if (!formState.formIsVaild) {
      Alert.alert("Not Valid", "check your input errors", [{ text: "OKAY" }]);
      return;
    }
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
  }, [dispatch, prodId, formState]);

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
            value={formState.inputValues.title}
            onChangeText={textSubmitHandler.bind(this, "title")}
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            onEndEditing={() => {
              console.log("End Editing");
            }}
            onSubmitEditing={() => {
              console.log("Submit Editing");
            }}
          />
        </View>
        {!formState.inputVaildities.title && <Text>please write title!!!</Text>}
        <View style={styles.formContent}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.imageUrl}
            onChangeText={textSubmitHandler.bind(this, "imageUrl")}
          />
        </View>
        {!selectedProduct && (
          <View style={styles.formContent}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={formState.inputValues.price}
              onChangeText={textSubmitHandler.bind(this, "price")}
              keyboardType="decimal-pad"
            />
          </View>
        )}
        <View style={styles.formContent}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.description}
            onChangeText={textSubmitHandler.bind(this, "description")}
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
