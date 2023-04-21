import { React, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Camara() {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cámara</Text>
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