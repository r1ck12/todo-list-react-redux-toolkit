import { Grid } from '@radix-ui/themes';
import TodoList from './components/TodoList/TodoList';
import Categories from './components/Categories/Categories';
import { useGetCategoriesQuery } from './services/todos';

function App() {
  const { data, error, isLoading } = useGetCategoriesQuery('categories');

  const categories = data;

  return (
    <Grid columns="2" gap="3" width="auto">
      <Categories categories={categories} />
      <TodoList categories={categories} />
    </Grid>
  );
}

export default App;
