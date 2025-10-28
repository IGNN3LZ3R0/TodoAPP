import { Todo } from "../entities/Todo";
import { TodoRepository } from "../repositories/Todorepository";

export class GetAllTodos {
    constructor(private repository: TodoRepository) {}

    async execute(): Promise<Todo[]> {
        return await this.repository.getAll();
    }
}
