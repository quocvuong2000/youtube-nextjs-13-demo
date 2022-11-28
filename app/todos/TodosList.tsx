import Link from "next/link";
import React from "react";
import { Todo } from "../../typing";

type Props = {};
const fetchTodos = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos", {
    next: { revalidate: 60 },
  });
  const todos: Todo[] = await res.json();
  return todos;
};
const TodosList = async ({}: Props) => {
  const todos = await fetchTodos();
  return (
    <div>
      {todos.map((todo) => (
        <p key={todo.id}>
          <Link href={`/todos/${todo.id}`}>Todo: {todo.id}</Link>
        </p>
      ))}
    </div>
  );
};

export default TodosList;


