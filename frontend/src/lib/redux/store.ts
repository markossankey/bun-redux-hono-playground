import { configureStore } from "@reduxjs/toolkit";
import { todoApi } from "./services/todo";

export const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(todoApi.middleware),
  reducer: {
    [todoApi.reducerPath]: todoApi.reducer,
  },
});
