import React from "react";
import { Todo } from "../../../typing";
import {notFound} from "next/navigation"
export const dynamicParams = true;
type Props = {
  params: {
    todoId: string;
  };
};
const fetchTodo = async (todoId: string) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId}`,
    { next: { revalidate: 60 } }
  );
  const todo: Todo = await res.json();
  return todo;
};
const TodoPage = async ({ params: { todoId } }: Props) => {
  const todo = await fetchTodo(todoId);
  if(!todo.id) return notFound()
  return (
    <div className="p-10 bg-yellow-200 border-2 m-2 shadow-lg">
      <p>
        #{todo.id} : {todo.title}
      </p>
      <p>Completed: {todo.completed ? "yes" : "no"}</p>
      <p className="border-t border-black mt-5 text-right">
        By User : {todo.userId}
      </p>
    </div>
  );
};

export default TodoPage;

export async function generateStaticParams() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  const todos: Todo[] = await res.json();
  const trimTodos = todos.splice(0, 10);
  return trimTodos.map((todo) => ({
    todoId: todo.id.toString(),
  }));
}
