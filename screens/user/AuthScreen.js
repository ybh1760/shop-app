import React, {useState,useReducer, useCallback, useEffect} from 'react';
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  ActivityIndicator,
  Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {useDispatch} from "react-redux";

import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';
import * as authActions from "../../store/actions/auth";


const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) =>{
  switch(action.type){
    case FORM_INPUT_UPDATE:
        const updatedInputValues = {...state.inputValues, [action.input]:action.value};
        const updatedInputValidities = {...state.inputValidities, [action.input]:action.isValid};
        
        let updatedFormIsValid = true;
        for(const key in updatedInputValidities){
          updatedFormIsValid = updatedFormIsValid && updatedInputValidities[key]
        }
        return {
          inputValues:updatedInputValues,
          inputValidities:updatedInputValidities,
          formIsValid:updatedFormIsValid
        }
  }
  return state;
}

const AuthScreen = props => {
  const [isSigning, setIsSigning] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const [formState , dispatchFormState] = useReducer(formReducer, {
    inputValues :{
      email:"",
      password:""
    },
    inputValidities:{
      email:false,
      password:false
    },
    formIsValid:false
  });

  const onChangeInput = useCallback((inputIdentifier, value, isValid) =>{
    dispatchFormState({type:FORM_INPUT_UPDATE ,input : inputIdentifier, value: value, isValid:isValid})
  },[dispatchFormState])

  const authHandler = async()=>{
    let action;
    if(isSigning){
      action = authActions.login(formState.inputValues.email,formState.inputValues.password)
    }else{
     action= authActions.signup(formState.inputValues.email,formState.inputValues.password)
    }
    setIsLoading(true);
    setError(null);
    try{
      await dispatch(action);
    }catch(err){
      setError(err.message);
    }
    setIsLoading(false);
  }
  useEffect(()=>{
    if(error){
      Alert.alert("ERROR", error, [{text:"ok"}])
    }
  },[error])

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id="email"
              label="E-Mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorTexts="Please enter a valid email address."
              onChange={onChangeInput}
              initialValue=""
            />
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorTexts="Please enter a valid password."
              onChange={onChangeInput}
              initialValue=""
            />
            <View style={styles.buttonContainer}>
              {isLoading ? <ActivityIndicator size="small" color={Colors.primary}/> : <Button title={isSigning ? "Log In":"Sign Up"} color={Colors.primary} onPress={authHandler} />}
              
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={`Switch to ${isSigning ? "Sign Up" : "Log In"}`}
                color={Colors.accent}
                onPress={() => {
                  setIsSigning(prevState=>!prevState);
                }}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: 'Authenticate'
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20
  },
  buttonContainer: {
    marginTop: 10
  }
});

export default AuthScreen;
