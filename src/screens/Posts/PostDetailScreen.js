import React, { useContext, useEffect, useState } from 'react';
import { Button, FlatList, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import api from '../../api';
import { AuthContext } from '../../contexts/AuthContext';

export default function PostDetailScreen({ route }) {
  const { id } = route.params;
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, []);

  const fetchPost = async () => {
    try {
      const { data } = await api.get(`/posts/${id}`);
      setPost(data);
    } catch (err) {
      console.error('Erro ao carregar post:', err);
    }
  };

  const fetchComments = async () => {
    try {
      const { data } = await api.get(`/posts/${id}/comments`);
      setComments(data);
    } catch (err) {
      console.warn('Sem comentários ou erro ao buscar comentários');
    }
  };

  const handleCommentSubmit = async () => {
    try {
      await api.post(`/posts/${id}/comments`, {
        content: comment,
        authorId: user?.id,
      });
      setComment('');
      fetchComments(); // recarrega os comentários
    } catch (err) {
      console.error('Erro ao enviar comentário:', err);
    }
  };

  if (!post) return <Text>Carregando post...</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.author}>por {post.author?.name || 'Desconhecido'}</Text>
      <Text style={styles.content}>{post.content}</Text>

      <Text style={styles.subTitle}>Comentários:</Text>
      {comments.length > 0 ? (
        <FlatList
          data={comments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.commentCard}>
              <Text style={styles.commentAuthor}>{item.author?.name || 'Anônimo'}:</Text>
              <Text style={styles.commentContent}>{item.content}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noComments}>Nenhum comentário ainda.</Text>
      )}

      {/* Comentário (opcional) */}
      {user && (
        <View style={styles.commentForm}>
          <TextInput
            style={styles.input}
            placeholder="Escreva um comentário..."
            value={comment}
            onChangeText={setComment}
          />
          <Button title="Comentar" onPress={handleCommentSubmit} disabled={!comment.trim()} />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold' },
  author: { fontSize: 16, color: '#555', marginBottom: 12 },
  content: { fontSize: 16, marginBottom: 24 },
  subTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  commentCard: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  commentAuthor: { fontWeight: 'bold' },
  commentContent: { fontSize: 14 },
  noComments: { fontStyle: 'italic', color: '#777' },
  commentForm: { marginTop: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
});
