import { User } from "../entities/User";

export interface AuthRepository {
    // Registrar nuevo usuario con datos adicionales
    register(
        email: string,
        password: string,
        displayName: string
    ): Promise<User>;

    // Iniciar sesión
    login(email: string, password: string): Promise<User>;

    // Cerrar sesión
    logout(): Promise<void>;

    // Obtener usuario actualmente autenticado 
    getCurrentUser(): Promise<User | null>;

    // Actualizar perfil de usuario
    updateProfile(userId: string, displayName: string): Promise<User>;

    // Recuperar contraseña
    resetPassword(email: string): Promise<void>;

    // Escuchar cambios de autenticación (observer pattern) 
    onAuthStateChanged(callback: (user: User | null) => void): () => void;
}