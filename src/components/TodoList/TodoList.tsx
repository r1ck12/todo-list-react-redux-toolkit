import { Box, TextField } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import { baseRequest } from '../../utils/services/requests';
import { Category, Todo } from '../../types';
import TodoListItem from './TodoListItem';

type TodoListProps = {
  categories: Category[];
};

const TodoList = ({ categories }: TodoListProps) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoText, setTodoText] = useState<string>('');

  const addTodo = async () => {
    const todo = await baseRequest('todos', 'POST', {
      id: Date.now(),
      text: todoText,
      done: false,
    });
    setTodos([...todos, todo]);
  };

  const onCreateTodoKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await baseRequest('todos', 'GET');

      setTodos(data);
    };
    fetchData();
  }, []);

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
        return <TodoListItem todo={todo} todos={todos} setTodos={setTodos} categories={categories} />;
      })}
    </Box>
  );
};

export default TodoList;
