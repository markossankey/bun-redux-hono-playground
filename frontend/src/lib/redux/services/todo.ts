import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/todo" }),
  tagTypes: ["Todo"],
  endpoints: (builder) => ({
    all: builder.query<Todo[], void>({
      providesTags: ["Todo"],
      query: () => "",
    }),
    delete: builder.mutation<Todo, Todo["id"]>({
      invalidatesTags: (_result, err) => (err ? [] : ["Todo"]),
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
    }),
    add: builder.mutation<Todo, { text: string }>({
      invalidatesTags: (_result, err) => (err ? [] : ["Todo"]),
      query: (body) => ({
        url: "",
        method: "POST",
        body,
      }),
    }),
    edit: builder.mutation<Todo, { id: Todo["id"]; text: string }>({
      invalidatesTags: (_result, err) => (err ? [] : ["Todo"]),
      query: ({ id, text }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: { text },
      }),
    }),
  }),
});

export type Todo = {
  id: number | string;
  text: string;
  isDone: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};
