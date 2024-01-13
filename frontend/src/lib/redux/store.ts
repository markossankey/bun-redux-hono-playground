import { todoApi } from "@/lib/redux/services/todo";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(todoApi.middleware),
  reducer: {
    [todoApi.reducerPath]: todoApi.reducer,
  },
});
