import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MainLayout from "./layouts/MainLayout";
import DashboardPage from "./pages/DashboardPage";
import TodoCalendarPage from "./pages/TodoCalendarPage";
import VocabularyPage from "./pages/VocabularyPage";
import TopicDetailPage from "./pages/TopicDetailPage";
import DailyLearningPage from "./pages/DailyLearningPage";

function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={isAuthenticated ? <MainLayout /> : <Navigate to="/login" />}
        >
          <Route index element={<DashboardPage />} />
          <Route path="calendar" element={<TodoCalendarPage />} />
          <Route path="vocabulary" element={<VocabularyPage />} />
          <Route
            path="vocabulary/topic/:topicId"
            element={<TopicDetailPage />}
          />
          <Route
            path="vocabulary/daily/:date"
            element={<DailyLearningPage />}
          />
        </Route>

        {/* Nếu path không khớp */}
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/" : "/login"} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
