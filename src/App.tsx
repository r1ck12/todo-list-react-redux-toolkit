import { useEffect, useState } from 'react';

import { Grid } from '@radix-ui/themes';
import TodoList from './components/TodoList/TodoList';
import Categories from './components/Categories/Categories';
import { baseRequest } from './utils/services/requests';

function App() {
  const [categories, setCategories] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await baseRequest('categories', 'GET');
      setCategories(data);
    };
    fetchData();
  }, []);

  return (
    <Grid columns="2" gap="3" width="auto">
      <Categories categories={categories} setCategories={setCategories} />
      <TodoList categories={categories} />
    </Grid>
  );
}

export default App;
