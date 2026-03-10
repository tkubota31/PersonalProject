import { useParams, useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  Typography,
  message as antMessage,
  Space,
  Checkbox,
  Empty,
} from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import apiClient from "../api/client";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

const { Title } = Typography;

interface TeamMember {
  name: string;
  email: string;
  is_captain: boolean;
}

interface RegistrationData {
  tournament: string;
  team_name: string;
  captain_name: string;
  captain_email: string;
  captain_phone: string;
  notes?: string;
  team_members?: TeamMember[];
}

interface ExistingRegistration {
  id: number;
  team_name: string;
  captain_name: string;
  captain_email: string;
  captain_phone: string;
  notes: string;
  team_members: TeamMember[];
}

export default function RegisterTeam() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { isAuthenticated } = useAuth();
  const [existingRegistration, setExistingRegistration] =
    useState<ExistingRegistration | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated && id) {
      setLoading(true);
      apiClient
        .get(`/registrations/my/?tournament=${id}`)
        .then((res) => {
          if (res.data && res.data.length > 0) {
            setExistingRegistration(res.data[0]);
          }
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [isAuthenticated, id]);

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

  if (existingRegistration) {
    return (
      <div
        style={{ padding: "40px 20px", maxWidth: "600px", margin: "0 auto" }}
      >
        <Title level={2}>Your Registration</Title>
        <Typography.Paragraph>
          You have already registered for this tournament.
        </Typography.Paragraph>
        <Button
          type="primary"
          size="large"
          onClick={() =>
            navigate(`/registrations/${existingRegistration.id}/edit`)
          }
          style={{ marginRight: "10px" }}
        >
          Edit Registration
        </Button>
        <Button size="large" onClick={() => navigate(`/tournaments/${id}`)}>
          Back to Tournament
        </Button>
      </div>
    );
  }

  const handleSubmit = (values: any) => {
    const formData: RegistrationData = {
      tournament: id || "",
      team_members: values.team_members || [],
      ...values,
    };

    apiClient
      .post("/registrations/", formData)
      .then(() => {
        antMessage.success("Registration submitted successfully!");
        setTimeout(() => navigate(`/tournaments/${id}`), 1500);
      })
      .catch((err) => {
        const errorMsg =
          err.response?.data?.detail ||
          "Error submitting registration. Please try again.";
        antMessage.error(errorMsg);
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

        <Form.Item label="Team Members">
          <Form.List name="team_members">
            {(fields, { add, remove }) => (
              <>
                {fields.length === 0 ? (
                  <Empty
                    description="No team members added yet"
                    style={{ marginBottom: "20px" }}
                  />
                ) : null}
                {fields.map((field, idx) => (
                  <div
                    key={field.key}
                    style={{
                      display: "flex",
                      gap: "8px",
                      marginBottom: "16px",
                      padding: "12px",
                      border: "1px solid #f0f0f0",
                      borderRadius: "4px",
                      alignItems: "flex-start",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <Form.Item
                        {...field}
                        name={[field.name, "name"]}
                        rules={[{ required: true, message: "Name required" }]}
                        style={{ marginBottom: "8px" }}
                      >
                        <Input placeholder="Member name" size="large" />
                      </Form.Item>

                      <Form.Item
                        {...field}
                        name={[field.name, "email"]}
                        rules={[
                          { required: true, message: "Email required" },
                          { type: "email", message: "Invalid email" },
                        ]}
                        style={{ marginBottom: "8px" }}
                      >
                        <Input
                          placeholder="Member email"
                          size="large"
                          type="email"
                        />
                      </Form.Item>

                      <Form.Item
                        {...field}
                        name={[field.name, "is_captain"]}
                        valuePropName="checked"
                        style={{ marginBottom: "0" }}
                      >
                        <Checkbox>Mark as captain</Checkbox>
                      </Form.Item>
                    </div>

                    <MinusCircleOutlined
                      onClick={() => remove(field.name)}
                      style={{
                        marginTop: "8px",
                        cursor: "pointer",
                        color: "red",
                      }}
                    />
                  </div>
                ))}

                <Form.Item>
                  <Button
                    type="dashed"
                    icon={<PlusOutlined />}
                    onClick={() => add()}
                    disabled={fields.length >= 10}
                    block
                  >
                    Add Team Member (Max 10)
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
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
