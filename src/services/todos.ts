import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_ENDPOINT } from './requests'
import { Todo } from '../types'

// Define a service using a base URL and expected endpoints
export const todosApi = createApi({
  reducerPath: 'todosApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_ENDPOINT }),
  tagTypes: ['Todo', 'Category'],
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], string>({
      query: () => "todos",
      providesTags: ['Todo'],
    }),
    getTodo: builder.query<Todo, string>({
      query: (id) => `todos/${id}`,
      providesTags: ['Todo'],
    }),
    addTodo: builder.mutation<Todo, Partial<Todo>>({
      query: (body) => ({
        url: 'todos',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Todo'],
    }),
    setTodo: builder.mutation<Todo, Partial<Todo>>({
      query: (body) => ({
        url: `todos/${body.id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Todo'],
    }),
  })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetTodoQuery, useGetTodosQuery, useAddTodoMutation } = todosApi