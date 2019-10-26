import React, { useEffect, useCallback, useReducer } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Platform,
  Alert,
  KeyboardAvoidingView
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import * as productsActions from "../../store/actions/products";
import HeaderButton from "../../components/UI/HeaderButton";
import Input from "../../components/UI/Input";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  switch (action.type) {
    case FORM_INPUT_UPDATE:
      const updatedInputValues = {
        ...state.inputValues,
        [action.input]: action.value
      };

      const updatedInputValidities = {
        ...state.inputVaildities,
        [action.input]: action.isValid
      };

      let updatedFormIsValid = true;

      for (const key in updatedInputValidities) {
        if (key === "[object Object]") continue;
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
    formIsVaild: selectedProduct ? true : false
  });

  const textChangeHandler = useCallback(
    (inputIdentifier, value, isValid) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: value,
        isValid: isValid,
        input: inputIdentifier
      });
    },
    [dispatchFormState]
  );

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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <ScrollView style={styles.form}>
        <Input
          id="title"
          label="Title"
          errorTexts="Please enter a valid title!"
          keyboardType="default"
          autoCapitalize="sentences"
          autoCorrect
          returnKeyType="next"
          onChange={textChangeHandler}
          initialValue={selectedProduct ? selectedProduct.title : ""}
          initaillyValid={!!selectedProduct}
          required
        />
        <Input
          id="imageUrl"
          label="ImageUrl"
          errorTexts="Please enter a valid ImageUrl!"
          keyboardType="default"
          returnKeyType="next"
          onChange={textChangeHandler}
          initialValue={selectedProduct ? selectedProduct.imageUrl : ""}
          initaillyValid={!!selectedProduct}
          required
        />
        {!selectedProduct && (
          <Input
            id="price"
            label="Price"
            errorTexts="Please enter a valid Price!"
            keyboardType="decimal-pad"
            returnKeyType="next"
            onChange={textChangeHandler}
            required
            min={0.1}
          />
        )}
        <Input
          id="description"
          label="Description"
          errorTexts="Please enter a valid Description!"
          keyboardType="default"
          autoCapitalize="sentences"
          autoCorrect
          multiline
          numberOfLines={3}
          onChange={textChangeHandler}
          initialValue={selectedProduct ? selectedProduct.description : ""}
          initaillyValid={selectedProduct ? true : false}
          required
          minLength={5}
        />
      </ScrollView>
    </KeyboardAvoidingView>
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
  }
});

export default EditProductScreen;
