import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet, npx
} from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

import * as Device from 'expo-device';

export default function MovilScreen({ navigation }) {
  const deviceOS = (Device.brand == 'Redmi' ? 'Android' : Device.osName);

  


  const [deviceType, setDeviceType] = useState(null);

  useEffect(() => {
    async function fetchDeviceType() {
      const type = await Device.getDeviceTypeAsync();
      setDeviceType(type);
    }
    fetchDeviceType();
  }, []);

  let dispositivo;
  switch (deviceType) {
    case Device.DeviceType.PHONE:
      dispositivo = "Móvil";
      break;
    case Device.DeviceType.TABLET:
      dispositivo = "Tablet";
      break;
    case Device.DeviceType.DESKTOP:
      dispositivo = "PC";
      break;
    case Device.DeviceType.TV:
      dispositivo = "TV";
      break;
    case Device.DeviceType.UNKNOWN:
      dispositivo = "Desconicido";
      break;
  }



  const DeviceInfo = () => {
    if (deviceOS === 'iOS') {
      return (
        <>
          <Text style={styles.title}>Valores de {deviceOS}</Text>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.text}>ID de modelo</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.text}>{Device.modelId}</Text>
            </View>
          </View>
        </>
      );
    } else if (deviceOS === 'Android' || deviceOS === 'Huawei') {
      return (
        <>
          <Text style={styles.title}>Valores de {deviceOS}</Text>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.text}>Lector de huella</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.text}>{Device.osBuildFingerprint}</Text>
            </View>
          </View>
        </>
      );
    } else {
      return null;
    }
  };

  let icon = null;
  if (deviceOS === 'iOS') {
    icon = <Ionicons name="ios-logo-apple" size={32} color="grey" />;
  } else if (deviceOS === 'Android') {
    icon = <Ionicons name="logo-android" size={32} color="green" />;
  }

  

  return (
    <View>
      <Text style={styles.title}>{icon}</Text>

      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.text}>Dispositivo</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.text}>{Device.deviceName}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.text}>Nombre de Modelo</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.text}>{Device.modelName}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.text}>Marca</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.text}>{Device.brand}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.text}>Nombre del dispositivo</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.text}>{Device.designName == null ? 'Desconocido' : Device.designName}</Text>

        </View>
      </View>


      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.text}>Sistema Operativo</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.text}>{deviceOS}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.text}>Versión</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.text}>{Device.osVersion}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.text}>Device Year Class</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.text}>{Device.deviceYearClass == null ? 'Desconocido' : Device.deviceYearClass}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.text}>Es un dispositivo real?</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.text}>{Device.isDevice == true ? 'Si' : 'Emulador'}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.text}>Fabricante</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.text}>{Device.manufacturer}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.text}>Id de compilación</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.text}>{Device.osBuildId}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.text}>Memoria total</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.text}>{Device.totalMemory}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.text}>Tipo de Dispositivo</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.text}>{dispositivo}</Text>
        </View>
      </View>

      <Text style={styles.title}></Text>

      {DeviceInfo()}

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
    paddingTop:10,
    alignItems: "center",
    justifyContent: 'center',
    textAlign: 'center'

  },
  table: {
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  column: {
    flex: 1,
    padding: 5,
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  }
});
