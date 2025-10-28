import { TodoRepository } from "../repositories/Todorepository";

export class DeleteTodo{
    constructor(private repository: TodoRepository){}

    async execute(id: string): Promise<void>{
        await this.repository.delete(id);
    }
}