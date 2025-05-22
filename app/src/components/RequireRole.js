import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';

export default function RequireRole({ role, children }) {
  const { user } = useContext(AuthContext);

  if (user?.role !== role) {
    return (
      <View>
        <Text>Acesso negado</Text>
      </View>
    );
  }

  return children;
}
