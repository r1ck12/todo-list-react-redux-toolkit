import { Box, TextField, Card, Flex, Strong, Text } from '@radix-ui/themes';
import { Dispatch, SetStateAction, useState } from 'react';
import { generatePastelColor } from '../../utils/pastelColor';
import { baseRequest } from '../../services/requests';
import { Category } from '../../types';
import { useAddCategoryMutation } from '../../services/todos';

type CategoriesProps = {
  categories: Category[] | undefined;
};

const Categories = ({ categories }: CategoriesProps) => {
  const [categoryText, setCategoryText] = useState<any>('');
  const [addCategoryMutation, result] = useAddCategoryMutation();

  const addCategory = async () => {
    const category: Category = {
      id: Date.now(),
      name: categoryText,
      color: generatePastelColor(),
    };
    const result = await addCategoryMutation(category);
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
