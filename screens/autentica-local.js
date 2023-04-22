import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { Button} from 'react-native-paper';


export default function Auth({ navigation }) {
    const [faceId, setFaceId] = useState('');
    const [resultBioAuth, setResult] = useState('');

    useEffect(() => {
        async function checkBiometricAvailability() {
            const isEnrolled = await LocalAuthentication.hasHardwareAsync();
            const isSupported = await LocalAuthentication.isEnrolledAsync();

            if (isEnrolled && isSupported) {
                setFaceId('El dispositivo tiene biometría habilitada (hardware y datos)');
            } else {
                setFaceId('El dispositivo no tiene biometría habilitada o bien no están registrados sus datos');
            }
        }

        checkBiometricAvailability();
    }, []);

    async function handleBiometricVerification() {

        

        if (faceId) {

            const { success } = await LocalAuthentication.authenticateAsync({promptMessage: 'Por favor, realiza la validación',cancelLabel:"Cancelar Validación"});
            if (success) {
                setResult('Autenticación exitosa');
            } else {
                setResult('La validación ha fallado');
            }
        } else {
            setResult('No disponible');
        }
        
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Autenticación local</Text>
            <View>
                <Text style={styles.text}>{faceId}</Text>
            </View>

            <Button
                mode="contained"
                style={styles.button}
                onPress={handleBiometricVerification}>
                <Text style={styles.buttonText}>Validar FaceId, huella o PIN</Text>
            </Button>

            <View>
                <Text style={styles.text}>{resultBioAuth}</Text>
            </View>
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
        minWidth:300
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
});
