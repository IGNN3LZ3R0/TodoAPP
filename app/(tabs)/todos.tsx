import { useAuth } from "@/src/presentation/hooks/useAuth";
import { useRouter } from "expo-router";
import { useTodos } from "@/src/presentation/hooks/useTodos";
import { createStyles, defaultLightTheme, defaultDarkTheme } from "@/src/presentation/styles/todo.styles";
import { useColorScheme } from "@/hooks/use-color-scheme";
import React, { useState, useMemo } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function TodosScreenClean() {
  const [inputText, setInputText] = useState("");
  const { todos, loading, addTodo, toggleTodo, deleteTodo } = useTodos();
  const { user, logout } = useAuth();
  const router = useRouter();

  // 🎨 Detectar tema y crear estilos dinámicamente
  const colorScheme = useColorScheme();
  const styles = useMemo(
    () => createStyles(colorScheme === "dark" ? defaultDarkTheme : defaultLightTheme),
    [colorScheme]
  );

  const handleLogout = async () => {
    Alert.alert(
      "Cerrar Sesión",
      "¿Estás seguro que quieres cerrar sesión?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Cerrar Sesión",
          style: "destructive",
          onPress: async () => {
            const success = await logout();
            if (success) {
              router.replace("/(tabs)/login");
            }
          },
        },
      ]
    );
  };

  const goToProfile = () => {
    router.push("/(tabs)/profile");
  };

  const handleAddTodo = async () => {
    if (!inputText.trim()) return;

    const success = await addTodo(inputText);
    if (success) {
      setInputText("");
    }
  };

  const handleDeleteTodo = (id: string, title: string) => {
    Alert.alert(
      "Confirmar eliminación",
      `¿Estás seguro que deseas eliminar "${title}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => deleteTodo(id),
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator
          size="large"
          color={
            colorScheme === "dark"
              ? defaultDarkTheme.primary
              : defaultLightTheme.primary
          }
        />
        <Text style={styles.loadingText}>Cargando tareas...</Text>
      </View>
    );
  }

  const renderTodo = ({ item }: { item: any }) => (
    <View style={styles.todoItem}>
      <TouchableOpacity
        style={styles.todoContent}
        onPress={() => toggleTodo(item.id)}
      >
        <View
          style={[styles.checkbox, item.completed && styles.checkboxChecked]}
        >
          {item.completed && <Text style={styles.checkmark}>✓</Text>}
        </View>
        <Text
          style={[styles.todoText, item.completed && styles.todoTextCompleted]}
        >
          {item.title}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleDeleteTodo(item.id, item.title)}
        style={styles.deleteButton}
      >
        <Text style={styles.deleteButtonText}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* HEADER CON INFO DE USUARIO */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={goToProfile}
          style={styles.profileButton}
        >
          <View style={styles.userAvatarPlaceholder}>
            <Text style={styles.userAvatarText}>
              {user?.displayName?.charAt(0) || "U"}
            </Text>
          </View>
          <Text style={styles.userName}>{user?.displayName || "Usuario"}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Salir</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Mis Tareas</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Nueva tarea..."
          placeholderTextColor={
            colorScheme === "dark"
              ? defaultDarkTheme.placeholder
              : defaultLightTheme.placeholder
          }
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTodo}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={todos}
        renderItem={renderTodo}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
        contentContainerStyle={styles.listContent}
      />

      <Text style={styles.footer}>
        Total: {todos.length} | Completadas:{" "}
        {todos.filter((t) => t.completed).length}
      </Text>
    </View>
  );
}