import { Card, Flex, Checkbox, Box, Strong, Select, Text } from '@radix-ui/themes';
import { Category, Todo } from '../../types';
import { baseRequest } from '../../services/requests';
import { Dispatch, SetStateAction } from 'react';

type TodoListItemProps = {
  todo: Todo;
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  categories: Category[];
};

const TodoListItem = ({ todo, todos, setTodos, categories }: TodoListItemProps) => {
  const toggleTodo = async (todo: Todo) => {
    if (todo) {
      const updatedTodo = await baseRequest(`todos/${todo.id}`, 'PUT', {
        ...todo,
        done: !todo.done,
      });
      const updatedTodos = todos.map((todo: Todo) => {
        if (todo.id === updatedTodo.id) {
          return updatedTodo;
        }
        return todo;
      });
      setTodos(updatedTodos);
    }
  };

  const onTodoCategoryChange = async (value: string, todoId: number) => {
    const todo = todos.find((todo: Todo) => todo.id === todoId);

    if (todo) {
      const updatedTodo = await baseRequest(`todos/${todoId}`, 'PUT', {
        ...todo,
        categoryId: parseInt(value),
      });
      const updatedTodos = todos.map((todo: Todo) => {
        if (todo.id === updatedTodo.id) {
          return updatedTodo;
        }
        return todo;
      });
      setTodos(updatedTodos);
    }
  };

  return (
    <Card
      my="2"
      key={todo.id}
      style={{
        backgroundColor: categories.find((category: Category) => category.id === todo.categoryId)?.color,
      }}
    >
      <Flex gap="3" align="center">
        <Checkbox
          size="3"
          checked={todo.done}
          onCheckedChange={() => {
            toggleTodo(todo);
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
          onValueChange={(value) => onTodoCategoryChange(value, todo.id)}
        >
          <Select.Trigger />
          <Select.Content>
            <Select.Group>
              {categories.map((category: Category) => {
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
};

export default TodoListItem;
