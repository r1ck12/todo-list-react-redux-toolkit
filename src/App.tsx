import { useEffect, useState } from 'react';

import { Grid } from '@radix-ui/themes';
import TodoList from './components/TodoList/TodoList';
import Categories from './components/Categories/Categories';

function App() {
  const [categories, setCategories] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3001/categories');
      const data = await response.json();

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
