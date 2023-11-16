import { Box, Card, Checkbox, Flex, Select, Strong, TextField, Text } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import { baseRequest } from '../../utils/services/requests';

type TodoListProps = {
  categories: { color: string; id: number; name: string }[];
};

const TodoList = ({ categories }: TodoListProps) => {
  const [todos, setTodos] = useState<any>([]);
  const [todoText, setTodoText] = useState<any>('');

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

  const toggleTodo = async (id: any) => {
    const todo = todos.find((todo: any) => todo.id === id);
    if (todo) {
      const updatedTodo = await baseRequest(`todos/${id}`, 'PUT', {
        ...todo,
        done: !todo.done,
      });
      const updatedTodos = todos.map((todo: any) => {
        if (todo.id === updatedTodo.id) {
          return updatedTodo;
        }
        return todo;
      });
      setTodos(updatedTodos);
    }
  };

  const onTodoCategoryChange = async (value: any, todoId: any) => {
    const todo = todos.find((todo: any) => todo.id === parseInt(todoId));

    if (todo) {
      const updatedTodo = await baseRequest(`todos/${todoId}`, 'PUT', {
        ...todo,
        categoryId: parseInt(value),
      });
      const updatedTodos = todos.map((todo: any) => {
        if (todo.id === updatedTodo.id) {
          return updatedTodo;
        }
        return todo;
      });
      setTodos(updatedTodos);
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

      {todos.map((todo: any) => {
        return (
          <Card
            my="2"
            key={todo.id}
            style={{
              backgroundColor: categories.find((category: any) => category.id === todo.categoryId)?.color,
            }}
          >
            <Flex gap="3" align="center">
              <Checkbox
                size="3"
                checked={todo.done}
                onCheckedChange={() => {
                  toggleTodo(todo.id);
                }}
              />
              <Box>
                <Text
                  as="span"
                  size="3"
                  style={{
                    color: 'black',
                  }}
                >
                  <Strong> {todo.text}</Strong>
                </Text>
              </Box>
              <Select.Root
                value={todo.categoryId?.toString()}
                onValueChange={(value) => onTodoCategoryChange(value, todo.id.toString())}
              >
                <Select.Trigger />
                <Select.Content>
                  <Select.Group>
                    {categories.map((category: any) => {
                      return (
                        <Select.Item key={category.id} value={category.id.toString()}>
                          {category.name}
                        </Select.Item>
                      );
                    })}
                  </Select.Group>
                </Select.Content>
              </Select.Root>
            </Flex>
          </Card>
        );
      })}
    </Box>
  );
};

export default TodoList;
