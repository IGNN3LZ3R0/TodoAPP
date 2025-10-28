import {Todo, CreateTodoDTO, UpdateTodoDTO} from '../entities/Todo';

export interface TodoRepository {
    getAll(): Promise<Todo[]>;
    getById(id: string): Promise<Todo | null>;
    create(data: CreateTodoDTO): Promise<Todo>;
    update(data: UpdateTodoDTO): Promise<Todo>;
    delete(id: string): Promise<void>;
}