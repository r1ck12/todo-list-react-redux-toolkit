import { Box, TextField } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import { baseRequest } from '../../services/requests';
import { Category, Todo } from '../../types';
import TodoListItem from './TodoListItem';
import { addTodoState, useAddTodoMutation, useGetTodosQuery } from '../../services/todos';
import { useDispatch } from 'react-redux';

type TodoListProps = {
  categories: Category[];
};

const TodoList = ({ categories }: TodoListProps) => {
  const [todoText, setTodoText] = useState<string>('');

  const { data, error, isLoading } = useGetTodosQuery('todos');

  // use redux addTodo mutation to add a todo
  const [addTodo, result] = useAddTodoMutation();

  const dispatch = useDispatch();

  console.log(data);

  if (!data) return null;

  const todos = data;

  const onCreateTodoKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      const todo = {
        id: Date.now(),
        text: todoText,
        done: false,
      };
      addTodo(todo);
      dispatch(addTodoState(todo));
    }
  };

  return (
    <Box width="auto">
      <h2>Todo List</h2>
      <TextField.Root>
        <TextField.Input
          placeholder="Type your todo here"
          value={todoText}
          size="3"
          onChange={(e) => setTodoText(e.target.value)}
          onKeyDown={onCreateTodoKeyDown}
        />
      </TextField.Root>

      {todos.map((todo: Todo) => {
        return <TodoListItem key={todo.id} todo={todo} todos={todos} setTodos={() => {}} categories={categories} />;
      })}
    </Box>
  );
};

export default TodoList;
