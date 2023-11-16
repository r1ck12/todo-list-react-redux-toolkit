import { Box, TextField, Card, Flex, Strong, Text } from '@radix-ui/themes';
import { useState } from 'react';
import { generatePastelColor } from '../../utils/pastelColor';

type CategoriesProps = {
  categories: { color: string; id: number; name: string }[];
  setCategories: any;
};

const Categories = ({ categories, setCategories }: CategoriesProps) => {
  const [categoryText, setCategoryText] = useState<any>('');

  const addCategory = async () => {
    const response = await fetch('http://localhost:3001/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: Date.now(),
        name: categoryText,
        color: generatePastelColor(),
      }),
    });
    const category = await response.json();
    setCategories([...categories, category]);
  };

  const onCreateNewCategoryKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      addCategory();
    }
  };

  return (
    <Box width="auto">
      <h2>Categories</h2>
      <TextField.Root>
        <TextField.Input
          placeholder="Create a new category"
          value={categoryText}
          size="3"
          onChange={(e) => setCategoryText(e.target.value)}
          onKeyDown={onCreateNewCategoryKeyDown}
        />
      </TextField.Root>
      {categories?.map((category: any) => {
        return (
          <Card
            my="2"
            key={category.id}
            style={{
              backgroundColor: category.color,
            }}
          >
            <Flex gap="3" align="center">
              <Box>
                <Text
                  as="span"
                  size="3"
                  style={{
                    color: 'black',
                  }}
                >
                  <Strong>{category.name}</Strong>
                </Text>
              </Box>
            </Flex>
          </Card>
        );
      })}
    </Box>
  );
};

export default Categories;
