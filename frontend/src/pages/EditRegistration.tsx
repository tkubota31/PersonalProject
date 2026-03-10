import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, Button, Typography, message as antMessage, Spin, Checkbox, Empty } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import apiClient from "../api/client";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

const { Title } = Typography;

interface TeamMember {
  name: string;
  email: string;
  is_captain: boolean;
}

interface Registration {
  id: number;
  tournament: number;
  team_name: string;
  captain_name: string;
  captain_email: string;
  captain_phone: string;
  notes: string;
  team_members: TeamMember[];
  status: string;
  created_at: string;
}

export default function EditRegistration() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { isAuthenticated } = useAuth();
  const [registration, setRegistration] = useState<Registration | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !id) {
      navigate("/login");
      return;
    }

    setLoading(true);
    apiClient
      .get(`/registrations/${id}/`)
      .then((res) => {
        setRegistration(res.data);
        form.setFieldsValue({
          team_name: res.data.team_name,
          captain_name: res.data.captain_name,
          captain_email: res.data.captain_email,
          captain_phone: res.data.captain_phone,
          notes: res.data.notes,
          team_members: res.data.team_members.map((member: TeamMember) => ({
            name: member.name,
            email: member.email,
            is_captain: member.is_captain,
          })),
        });
      })
      .catch((err) => {
        const errorMsg = err.response?.status === 403 ? "You don't have permission to edit this registration." : "Error loading registration.";
        antMessage.error(errorMsg);
        navigate("/");
      })
      .finally(() => setLoading(false));
  }, [isAuthenticated, id, navigate, form]);

  const handleSubmit = (values: any) => {
    setSubmitting(true);

    apiClient
      .patch(`/registrations/${id}/`, {
        team_name: values.team_name,
        captain_name: values.captain_name,
        captain_email: values.captain_email,
        captain_phone: values.captain_phone,
        notes: values.notes,
        team_members: values.team_members || [],
      })
      .then(() => {
        antMessage.success("Registration updated successfully!");
        setTimeout(() => {
          if (registration) {
            navigate(`/tournaments/${registration.tournament}`);
          }
        }, 1500);
      })
      .catch((err) => {
        const errorMsg = err.response?.data?.detail || "Error updating registration. Please try again.";
        antMessage.error(errorMsg);
      })
      .finally(() => setSubmitting(false));
  };

  if (loading) {
    return (
      <div style={{ padding: "40px 20px", textAlign: "center" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!registration) {
    return (
      <div style={{ padding: "40px 20px", maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
        <Title level={2}>Registration Not Found</Title>
        <Button type="primary" onClick={() => navigate("/")}>
          Back to Tournaments
        </Button>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px 20px", maxWidth: "600px", margin: "0 auto" }}>
      <Title level={2}>Edit Team Registration</Title>
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
                        <Input placeholder="Member email" size="large" type="email" />
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
                      style={{ marginTop: "8px", cursor: "pointer", color: "red" }}
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
          <Button 
            type="primary" 
            size="large" 
            block 
            htmlType="submit"
            loading={submitting}
          >
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
