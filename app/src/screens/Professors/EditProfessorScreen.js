import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import api from '../../api';

export default function EditProfessorScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    loadProfessor();
  }, []);

  const loadProfessor = async () => {
    try {
      const { data } = await api.get(`/professors/${id}`);
      setName(data.name);
      setEmail(data.email);
    } catch (error) {
      console.error('Erro ao carregar professor:', error);
      Alert.alert('Erro', 'Não foi possível carregar os dados do professor.');
    }
  };

  const handleUpdate = async () => {
    try {
      await api.put(`/professors/${id}`, {
        name,
        email,
        ...(password ? { password } : {}),
      });

      Alert.alert('Sucesso', 'Professor atualizado com sucesso!');
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao atualizar professor:', error);
      Alert.alert('Erro', 'Não foi possível atualizar os dados do professor.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Professor</Text>

      <TextInput
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Nova senha (opcional)"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />

      <Button title="Salvar Alterações" onPress={handleUpdate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 12,
    padding: 10,
    backgroundColor: '#fff',
  },
});
