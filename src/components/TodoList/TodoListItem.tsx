import { Card, Flex, Checkbox, Box, Strong, Select, Text } from '@radix-ui/themes';
import { Category, Todo } from '../../types';
import { baseRequest } from '../../services/requests';
import { Dispatch, SetStateAction } from 'react';
import { useSetTodoMutation } from '../../services/todos';

type TodoListItemProps = {
  todo: Todo;
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  categories: Category[] | undefined;
};

const TodoListItem = ({ todo, todos, setTodos, categories }: TodoListItemProps) => {
  const [setTodo, result] = useSetTodoMutation();

  const toggleTodo = async (todo: Todo) => {
    if (todo) {
      const updatedTodo = await setTodo({ ...todo, done: !todo.done });
      console.log(updatedTodo, 'updatedTodo');
    }
  };

  const onTodoCategoryChange = async (value: string, todoId: number) => {
    const todo = todos.find((todo: Todo) => todo.id === todoId);

    if (todo) {
      const updatedTodo = await setTodo({ ...todo, categoryId: parseInt(value) });
      console.log(updatedTodo, 'updatedTodo');
    }
  };

  return (
    <Card
      my="2"
      key={todo.id}
      style={{
        backgroundColor: categories?.length
          ? categories.find((category: Category) => category.id === todo.categoryId)?.color
          : '#fff',
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
              {categories?.length
                ? categories.map((category: Category) => {
                    return (
                      <Select.Item key={category.id} value={category.id.toString()}>
                        {category.name}
                      </Select.Item>
                    );
                  })
                : null}
            </Select.Group>
          </Select.Content>
        </Select.Root>
      </Flex>
    </Card>
  );
};

export default TodoListItem;
