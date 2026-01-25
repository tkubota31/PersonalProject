import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TournamentList from "./pages/TournamentList.tsx";
import TournamentDetail from "./pages/TournamentDetail.tsx";
import RegisterTeam from "./pages/RegisterTeam.tsx";
import { ConfigProvider } from "antd";

function App() {
  const theme = {
    token: {
      colorPrimary: "#1890ff",
    },
  };
  return (
    <ConfigProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<TournamentList />} />
          <Route path="/tournaments/:id" element={<TournamentDetail />} />
          <Route path="/register/:id" element={<RegisterTeam />} />
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;
