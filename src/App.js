import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";
import AssignPage from "./pages/AssignPage";
import AdminPage from "./pages/AdminPage";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<PrivateRoute permissionLevel="customer" />}>
        <Route path='/home' element={<HomePage/>}></Route>
        <Route path="/assign" element={<AssignPage />} />
      </Route>
      <Route element={<PrivateRoute permissionLevel="admin" />}>
        <Route path="/admin" element={<AdminPage />} />
      </Route>
    </Routes>
  );
}

export default App;
