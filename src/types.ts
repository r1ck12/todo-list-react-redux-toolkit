export type Todo = {
  id: number;
  text: string;
  done: boolean;
  categoryId?: number;
};

export type Category = {
  color: string;
  id: number;
  name: string;
};
