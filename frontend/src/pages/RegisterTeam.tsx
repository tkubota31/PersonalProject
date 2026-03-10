import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, Button, Typography, message as antMessage } from "antd";
import { Link } from "react-router-dom";
import apiClient from "../api/client";
import { useAuth } from "../context/AuthContext";

const { Title } = Typography;

interface RegistrationData {
  tournament: string;
  team_name: string;
  captain_name: string;
  captain_email: string;
  captain_phone: string;
  notes?: string;
}

export default function RegisterTeam() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div
        style={{
          padding: "40px 20px",
          maxWidth: "600px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <Title level={2}>Register Your Team</Title>
        <Typography.Paragraph>
          You must be logged in to register a team. Please sign in or register
          first.
        </Typography.Paragraph>
        <div style={{ marginTop: "20px" }}>
          <Link to="/login">
            <Button type="primary" size="large" style={{ marginRight: "10px" }}>
              Sign In
            </Button>
          </Link>
          <Link to="/register">
            <Button size="large">Register</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = (values: any) => {
    const formData: RegistrationData = {
      tournament: id || "",
      ...values,
    };

    apiClient
      .post("/registrations/", formData)
      .then(() => {
        antMessage.success("Registration submitted successfully!");
        setTimeout(() => navigate(`/tournaments/${id}`), 1500);
      })
      .catch(() => {
        antMessage.error("Error submitting registration. Please try again.");
      });
  };

  return (
    <div style={{ padding: "40px 20px", maxWidth: "600px", margin: "0 auto" }}>
      <Title level={2}>Register Your Team</Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        style={{ marginTop: "20px" }}
      >
        <Form.Item
          name="team_name"
          label="Team Name"
          rules={[{ required: true, message: "Please enter your team name" }]}
        >
          <Input placeholder="Enter team name" size="large" />
        </Form.Item>

        <Form.Item
          name="captain_name"
          label="Captain Name"
          rules={[{ required: true, message: "Please enter captain name" }]}
        >
          <Input placeholder="Enter captain name" size="large" />
        </Form.Item>

        <Form.Item
          name="captain_email"
          label="Captain Email"
          rules={[
            { required: true, message: "Please enter captain email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input placeholder="Enter captain email" size="large" type="email" />
        </Form.Item>

        <Form.Item
          name="captain_phone"
          label="Captain Phone"
          rules={[
            { required: true, message: "Please enter captain phone number" },
          ]}
        >
          <Input placeholder="Enter captain phone number" size="large" />
        </Form.Item>

        <Form.Item name="notes" label="Additional Notes (Optional)">
          <Input.TextArea placeholder="Enter any additional notes" rows={4} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" size="large" block htmlType="submit">
            Submit Registration
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
