import { React } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Appbar} from 'react-native-paper';

export default function WelcomeScreen({ navigation }) {

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 50, marginTop: 50 }}>
        <TouchableOpacity>
          
        </TouchableOpacity>
        <Text style={{ fontSize: 20 }}>Inicio</Text>
        <TouchableOpacity>
          
        </TouchableOpacity>
      </View>
      <Appbar.Header>
        <Appbar.Content title="Menú Principal" />
      </Appbar.Header>
      <View style={styles.content}>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => navigation.navigate('Audio')}>
          <Text style={styles.buttonText}>Acceder al audio</Text>
        </Button>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => navigation.navigate('Camara')}>
          <Text style={styles.buttonText}>Acceder a la cámara</Text>
        </Button>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => navigation.navigate('Contactos')}>
          <Text style={styles.buttonText}>Acceso a Contactos</Text>
        </Button>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => navigation.navigate('Auth')}>
          <Text style={styles.buttonText}>Autenticación local</Text>
        </Button>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => navigation.navigate('Movil')}>
          <Text style={styles.buttonText}>Información del móvil</Text>
        </Button>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => navigation.navigate('Ubicacion')}>
          <Text style={styles.buttonText}>Permiso de localización</Text>
        </Button>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => navigation.navigate('Calendario')}>
          <Text style={styles.buttonText}>Permiso al Calendario</Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#B03E3E',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 50,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  Logo: {
    width: 260,
    height: 70.3,
    resizeMode: 'cover',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    position: 'absolute',
    left: 50,
    top: 33,
    backgroundColor: 'transparent',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 8,
    marginHorizontal: 21,
  },
});
