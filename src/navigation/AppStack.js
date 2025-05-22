import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

// Telas de postagens
import AdminPanelScreen from '../screens/Admin/AdminPanelScreen';
import CreatePostScreen from '../screens/Posts/CreatePostScreen';
import EditPostScreen from '../screens/Posts/EditPostScreen';
import PostDetailScreen from '../screens/Posts/PostDetailScreen';
import PostListScreen from '../screens/Posts/PostListScreen';

// Professores
import CreateProfessorScreen from '../screens/Professors/CreateProfessorScreen';
import EditProfessorScreen from '../screens/Professors/EditProfessorScreen';
import ListProfessorScreen from '../screens/Professors/ListProfessorScreen';

// Alunos
import CreateStudentScreen from '../screens/Students/CreateStudentScreen';
import EditStudentScreen from '../screens/Students/EditStudentScreen';
import ListStudentScreen from '../screens/Students/ListStudentScreen';

const Stack = createNativeStackNavigator();

export default function AppStack() {
  const { user } = useContext(AuthContext);
  const isProfessor = user?.role === 'professor';

  return (
    <Stack.Navigator>
      {/* Telas acessíveis a todos usuários autenticados */}
      <Stack.Screen name="PostList" component={PostListScreen} />
      <Stack.Screen name="PostDetail" component={PostDetailScreen} />

      {/* Telas exclusivas de professores */}
      {isProfessor && (
        <>
          {/* Posts */}
          <Stack.Screen name="CreatePost" component={CreatePostScreen} />
          <Stack.Screen name="EditPost" component={EditPostScreen} />
          <Stack.Screen name="AdminPanel" component={AdminPanelScreen} />

          {/* Professores */}
          <Stack.Screen name="CreateProfessor" component={CreateProfessorScreen} />
          <Stack.Screen name="EditProfessor" component={EditProfessorScreen} />
          <Stack.Screen name="ListProfessor" component={ListProfessorScreen} />

          {/* Alunos */}
          <Stack.Screen name="CreateStudent" component={CreateStudentScreen} />
          <Stack.Screen name="EditStudent" component={EditStudentScreen} />
          <Stack.Screen name="ListStudent" component={ListStudentScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
