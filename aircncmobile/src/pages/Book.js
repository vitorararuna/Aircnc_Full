import React, {useState} from 'react';
import { View, Text, SafeAreaView, Alert, AsyncStorage, StyleSheet, TextInput, TouchableOpacity} from 'react-native';

import api from '../services/api';

export default function Book({navigation}) {
    const [date, setDate] = useState('');

    const id = navigation.getParam('id') //buscando o ID do meu spot tela passada (que veio do botão "Solicitar Reserva")
    
   async function handleSubmit(){
        const user_id = await AsyncStorage.getItem('user'); //buscando o ID do usuário que vai fazer a reserva

        await api.post(`/spots/${id}/bookings`, {
        date    
        }, {
        headers:{user_id}
        })
        Alert.alert('Solicitação de reserva enviada.');   
        navigation.navigate('List');
    }   

    function handleCancel(){
        navigation.navigate('List');
    }

    return  (
        <SafeAreaView style={styles.container}>
            <Text style={styles.label}>DATA DE INTERESSE*</Text>
            <TextInput
                style={styles.input}
                placeholder="Qual data deseja reservar ?"
                placeholderTextColor="#999"
                autoCapitalize="words" 
                autoCorrect={false} //para ele não tentar corrigir o email ou qqr caractere
                value={date}
                onChangeText={setDate} // = onChangeText={text => setEmail(text)} O onChangeText recebe diretamente o texto que o usuário digitou dentro do input 
            />

        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
             <Text style={styles.buttonText}>Solcitar Reserva</Text>
        </TouchableOpacity> 

        <TouchableOpacity onPress={handleCancel} style={[styles.button, styles.cancelButton]}>
             <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>


        </SafeAreaView>

    )
}











const styles = StyleSheet.create({
    container: {
        margin: 30,
      },

    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
        marginTop: 30,
      },
    
      input: {
          borderWidth: 1,
          borderColor: '#ddd',
          paddingHorizontal: 20,
          fontSize: 16,
          color: '#444',
          height: 44,
          marginBottom: 20,
          borderRadius: 2
      },
    
      button: {
          height: 42,
          backgroundColor: '#f05a5b',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius:2,
      },

      cancelButton: {
        backgroundColor: '#ccc',
        marginTop:10,
    },
    
      buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
      },
    
});