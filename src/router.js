import { createBrowserRouter } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import BookmarkList from "./components/BookmarkList";
import App from "./App";

const router = createBrowserRouter([
    { path: 'home', element: <App/> },
    { path: '', element: <SignUp/> },
    { path: '/login', element: <Login/> },
    { path: '/listingPage', element: <BookmarkList/> },
]);

export default router;