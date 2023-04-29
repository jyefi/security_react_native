import React, { useState, useEffect } from "react";
import { Alert } from 'react-native';
import {
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

const App = () => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [cameraRef, setCameraRef] = useState(null);
  const [userName, setUserName] = useState("Usuario");

  useEffect(() => {
    getCameraPermission();
  }, []);

  const getCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasCameraPermission(status === "granted");
  };

  const getMediaLibraryPermission = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === "granted") {
        // Obtener las fotos y videos creados con la aplicación
        const { assets } = await MediaLibrary.getAssetsAsync({ mediaType: [MediaLibrary.MediaType.photo, MediaLibrary.MediaType.video], createdAfter: Date.now() - 10000 });
        return assets;
      } else {
        Alert.alert(
          "Permisos requeridos",
          "Por favor, otorga permisos de acceso a la biblioteca de medios para usar esta función.",
          [
            { text: "OK", onPress: () => {} }
          ]
        );
        return null;
      }
    } catch (error) {
      console.error("Error al solicitar permiso de la biblioteca de medios:", error);
      return null;
    }
  };

  const takePhoto = async () => {
    if (cameraRef) {
      try {
        const photo = await cameraRef.takePictureAsync();
        const hasPermission = await getMediaLibraryPermission();
        if (hasPermission) {
          await MediaLibrary.createAssetAsync(photo.uri);
          console.log("Photo saved to gallery:", photo.uri);
        } else {
          console.log("No access to media library");
        }
      } catch (err) {
        console.error("Error taking photo:", err);
      }
    }
  };

  const switchCameraType = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const openMediaLibrary = async () => {
    const hasPermission = await getMediaLibraryPermission();
    if (hasPermission) {
      const assets = await MediaLibrary.getAssetsAsync({
        mediaType: "photo",
        source: "user",
      });
      if (assets.totalCount > 0) {
        MediaLibrary.openPickerAsync({
          mediaType: "photo",
          source: "user",
        });
      } else {
        console.log("No photos found in media library");
      }
    } else {
      console.log("No access to media library");
    }
  };

  if (hasCameraPermission === null) {
    return <View />;
  } else if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  } else {
    return (
      <View style={styles.container}>
        {/* <Text style={styles.userNameText}>Hola, {userName}</Text> */}
        <Camera
          style={styles.camera}
          type={cameraType}
          ref={(ref) => setCameraRef(ref)}
        >
          <View style={styles.buttonContainer}>
            <Button title="Cambiar Camara" onPress={switchCameraType} />
            <Button title="Tomar foto" onPress={takePhoto} />
            {/* <Button title="View Photos" onPress={openMediaLibrary} /> */}
          </View>
        </Camera>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  camera: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 36,
    paddingHorizontal: 20,
    width: "100%",
  },
  userNameText: {
    fontSize: 24,
    color: "white",
    marginBottom: 16,
  },
});

export default App;
