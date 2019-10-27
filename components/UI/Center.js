import React from "react";
import {View, StyleSheet} from "react-native";

const Center=(props)=>{
    return <View style={styles.center}>
        {props.children}
    </View>
}

const styles = StyleSheet.create({
    center:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }
})

export default Center;