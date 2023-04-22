import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList
} from "react-native";

import * as Contacts from 'expo-contacts';
import { Button } from 'react-native-paper';

export default function ContactosScreen({ navigation }) {

  const [Message, setMessage] = useState('');
  const [contacts, setContacts] = useState([]);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      setMessage('Se ha entregado permiso para acceder a los contactos');

      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.FirstName],
        pageSize: 10,
      });
      setContacts(data);
      //console.log(data);
    } else {
      setMessage('Permiso a los contactos, no concedido');
    }
  };



  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        style={styles.button}
        onPress={getContacts()}>
        <Text style={styles.buttonText}>Acceder a contactos</Text>
      </Button>

      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>Nombre</Text>
        <Text style={styles.headerText}>Teléfono</Text>
      </View>
      {contacts.map((item, index) => (
        <View key={index} style={styles.row}>
          <Text style={styles.name}>{item.firstName}</Text>
          {item.phoneNumbers && (
            <Text style={styles.phone}>
              {item.phoneNumbers[0].number.slice(0, 5)}
            </Text>
          )}
        </View>
      ))}
      <View>
        <Text style={styles.text}>{Message}</Text>
      </View>
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
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#B03E3E',
    padding: 5,
    borderRadius: 5,
    marginHorizontal: 40,
    marginBottom: 10,
    minWidth: 300
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginBottom: 5,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  phone: {
    fontSize: 16,
  },
});
