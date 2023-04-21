import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";

export default function MovilScreen({navigation}) {


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Información del móvil</Text>


    </View>
  );
}
//hola
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    paddingTop: 100
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  
  },
});
