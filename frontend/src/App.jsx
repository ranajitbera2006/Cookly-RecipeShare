import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "./context/authContext";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import SignUp from "./components/pages/SignUp";
import { Toaster } from "react-hot-toast";
import Recipes from "./components/pages/Recipes";
import AdminLayout from "./components/pages/admin/AdminLayout";
import ListOfRecipes from "./components/pages/admin/ListOfRecipes";
import AddRecipe from "./components/pages/admin/AddRecipe";
import Farewell from "./components/pages/admin/Farewell";
import UpdateAccount from "./components/pages/admin/UpdateAccount";
import EditAuthRecipe from "./components/pages/admin/EditAuthRecipe";

function App() {
  const { authUser } = useAuthContext();
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={authUser ? <Navigate to={"/"} replace /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to={"/"} replace /> : <SignUp />}
        />
        <Route
          path="/blog/:id"
          element={authUser ? <Recipes /> : <Navigate to={"/login"} replace />}
        />
        <Route
          path="/admin"
          element={
            authUser ? <AdminLayout /> : <Navigate to={"/login"} replace />
          }
        >
          <Route index element={<ListOfRecipes />} />
          <Route path="listRecipe" element={<ListOfRecipes />} />
          <Route path="addRecipe" element={<AddRecipe />} />
          <Route path="delete-account" element={<Farewell />} />
          <Route path="update-account" element={<UpdateAccount />} />
          <Route path="update-recipe/:id" element={<EditAuthRecipe />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
