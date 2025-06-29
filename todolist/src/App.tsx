import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TodoPage from "./pages/TodoPage"; // Trang chính sau khi login

function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <TodoPage /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
