import { Layout, Space, Button, Typography } from "antd";
import {
  HomeOutlined,
  InfoCircleOutlined,
  MailOutlined,
  LogoutOutlined,
  LoginOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const { Header } = Layout;
const { Text } = Typography;

export default function NavigationBanner() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <Header
      style={{
        background: "#fff",
        padding: "0 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <Space size="large">
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button
            type={isActive("/") ? "primary" : "text"}
            icon={<HomeOutlined />}
          >
            Tournaments
          </Button>
        </Link>
        <Link to="/about" style={{ textDecoration: "none" }}>
          <Button
            type={isActive("/about") ? "primary" : "text"}
            icon={<InfoCircleOutlined />}
          >
            About Us
          </Button>
        </Link>
        <Link to="/contact" style={{ textDecoration: "none" }}>
          <Button
            type={isActive("/contact") ? "primary" : "text"}
            icon={<MailOutlined />}
          >
            Contact
          </Button>
        </Link>
      </Space>
      <Space>
        {isAuthenticated ? (
          <>
            <Text>Welcome, {user?.username}!</Text>
            <Button
              type="primary"
              danger
              icon={<LogoutOutlined />}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button
              type="primary"
              icon={<LoginOutlined />}
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
            <Button
              icon={<UserAddOutlined />}
              onClick={() => navigate("/register")}
            >
              Register
            </Button>
          </>
        )}
      </Space>
    </Header>
  );
}
