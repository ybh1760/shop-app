import React, { useEffect, useReducer } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

const INPUT_UPDATE = "INPUT_UPDATE";
const INPUT_BLUR = "INPUT_BLUR";

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_UPDATE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true
      };
    default:
      return state;
  }
};

const Input = props => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : "",
    isValid: props.initaillyValid,
    touched: false
  });

  const textChangeHandler = text => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }

    dispatch({ type: INPUT_UPDATE, value: text, isValid: isValid });
  };

  const blurHandler = () => {
    dispatch({ type: INPUT_BLUR });
  };

  const { onChange, id } = props;

  useEffect(() => {
    if (inputState.touched) {
      onChange(id, inputState.value, inputState.isValid);
    }
  }, [onChange, id, inputState]);

  return (
    <View style={styles.formContent}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        {...props}
        style={styles.input}
        value={inputState.value}
        onChangeText={textChangeHandler}
        onBlur={blurHandler}
      />
      {!inputState.isValid && inputState.touched && (
        <View style={styles.error}>
          <Text style={styles.errorText}>{props.errorTexts}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
  },
  error: {
    margin: 5
  },
  errorText: {
    fontSize: 13,
    color: "red"
  }
});

export default Input;
