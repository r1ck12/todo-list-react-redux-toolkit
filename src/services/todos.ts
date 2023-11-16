import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_ENDPOINT } from './requests'
import { Todo } from '../types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    addTodoState: (state, action: PayloadAction<Todo>) => {
      state.push(action.payload)
    },
  }
})

export const { addTodoState } = todosSlice.actions

// Define a service using a base URL and expected endpoints
export const todosApi = createApi({
  reducerPath: 'todosApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_ENDPOINT }),
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], string>({
      query: () => "todos",
    }),
    getTodo: builder.query<Todo, string>({
      query: (id) => `todos/${id}`,
    }),
    addTodo: builder.mutation<Todo, Partial<Todo>>({
      query: (body) => ({
        url: 'todos',
        method: 'POST',
        body,
      }),
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetTodoQuery, useGetTodosQuery, useAddTodoMutation } = todosApi