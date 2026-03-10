import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TournamentList from "./pages/TournamentList.tsx";
import TournamentDetail from "./pages/TournamentDetail.tsx";
import RegisterTeam from "./pages/RegisterTeam.tsx";
import EditRegistration from "./pages/EditRegistration.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import AboutUs from "./pages/AboutUs.tsx";
import Contact from "./pages/Contact.tsx";
import { ConfigProvider } from "antd";
import { AuthProvider } from "./context/AuthContext.tsx";

function App() {
  const theme = {
    token: {
      colorPrimary: "#1890ff",
    },
  };
  return (
    <ConfigProvider theme={theme}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<TournamentList />} />
            <Route path="/tournaments/:id" element={<TournamentDetail />} />
            <Route path="/register/:id" element={<RegisterTeam />} />
            <Route
              path="/registrations/:id/edit"
              element={<EditRegistration />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ConfigProvider>
  );
}

export default App;
