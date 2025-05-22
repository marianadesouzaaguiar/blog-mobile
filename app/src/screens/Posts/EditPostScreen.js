import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import api from '../../api';
import { AuthContext } from '../../contexts/AuthContext';

export default function EditPostScreen() {
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    loadPost();
  }, []);

  const loadPost = async () => {
    try {
      const { data } = await api.get(`/posts/${id}`);
      setTitle(data.title);
      setContent(data.content);
    } catch (error) {
      console.error('Erro ao carregar post:', error);
      Alert.alert('Erro', 'Não foi possível carregar o post para edição.');
    }
  };

  const handleUpdate = async () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    try {
      await api.put(`/posts/${id}`, {
        title,
        content,
      });

      Alert.alert('Sucesso', 'Post atualizado com sucesso!');
      navigation.navigate('PostList');
    } catch (error) {
      console.error('Erro ao atualizar post:', error);
      Alert.alert('Erro', 'Não foi possível atualizar o post.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Postagem</Text>

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
