import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import notificationReducer, {
  displayNotification,
  cancelNotification,
} from "./reducers/notificationReducer";
import blogsReducer, {
  setBlogs,
  createBlog,
  likeBlog,
  deleteBlog,
} from "./reducers/blogsReducer";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import blogFormReducer from "./reducers/blogFormReducer";
import { UserContextProvider } from "./reducers/userReducer";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
    blogForm: blogFormReducer,
  },
});

console.log(store.getState());

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </Provider>
);
