import { User } from "../entities/User";
import { AuthRepository } from "../repositories/AuthRepository";

export class UpdateProfile {
  constructor(private authRepository: AuthRepository) {}

  async execute(userId: string, displayName: string): Promise<User> {
    // 🟢 VALIDACIONES DE NEGOCIO
    if (!displayName || displayName.trim().length === 0) {
      throw new Error("El nombre no puede estar vacío");
    }

    if (displayName.trim().length < 2) {
      throw new Error("El nombre debe tener al menos 2 caracteres");
    }

    if (displayName.trim().length > 50) {
      throw new Error("El nombre es demasiado largo (máximo 50 caracteres)");
    }

    return this.authRepository.updateProfile(userId, displayName.trim());
  }
}