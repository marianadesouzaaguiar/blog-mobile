import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import api from '../../api';
import { AuthContext } from '../../contexts/AuthContext';

export default function CreatePostScreen() {
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    try {
      await api.post('/posts', {
        title,
        content,
        authorId: user.id,
      });

      Alert.alert('Sucesso', 'Post criado com sucesso!');
      navigation.navigate('PostList');
    } catch (error) {
      console.error('Erro ao criar post:', error);
      Alert.alert('Erro', 'Não foi possível criar o post.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Nova Postagem</Text>

      <TextInput
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <TextInput
        placeholder="Conteúdo"
        value={content}
        onChangeText={setContent}
        multiline
        numberOfLines={6}
        textAlignVertical="top"
        style={[styles.input, { height: 120 }]}
      />

      <Button title="Publicar" onPress={handleSubmit} />
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
