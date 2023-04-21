import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';


export default function Audio({ navigation }) {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Audio</Text>
    </View>
  );
}

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
  }
});
