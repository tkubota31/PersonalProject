import {
  Layout,
  Typography,
  Card,
  Form,
  Input,
  Button,
  Row,
  Col,
  Space,
  message,
} from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  SendOutlined,
} from "@ant-design/icons";
import NavigationBanner from "../components/NavigationBanner";

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

export default function Contact() {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Contact form submitted:", values);
    message.success("Thank you for your message! We'll get back to you soon.");
    form.resetFields();
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <NavigationBanner />
      <Content
        style={{
          background: "#f5f5f5",
          padding: "24px",
          minHeight: "calc(100vh - 64px)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <Title level={1}>Contact Us</Title>
            <Paragraph style={{ fontSize: "16px", color: "#666" }}>
              Have questions? We'd love to hear from you!
            </Paragraph>
          </div>

          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              <Card
                title="Send us a message"
                style={{
                  borderRadius: "8px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  height: "100%",
                }}
              >
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={onFinish}
                  autoComplete="off"
                >
                  <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your name",
                      },
                    ]}
                  >
                    <Input placeholder="Your name" size="large" />
                  </Form.Item>

                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your email",
                      },
                      {
                        type: "email",
                        message: "Please enter a valid email",
                      },
                    ]}
                  >
                    <Input placeholder="your.email@example.com" size="large" />
                  </Form.Item>

                  <Form.Item
                    label="Subject"
                    name="subject"
                    rules={[
                      {
                        required: true,
                        message: "Please enter a subject",
                      },
                    ]}
                  >
                    <Input placeholder="What is this regarding?" size="large" />
                  </Form.Item>

                  <Form.Item
                    label="Message"
                    name="message"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your message",
                      },
                    ]}
                  >
                    <TextArea
                      placeholder="Tell us how we can help you..."
                      rows={5}
                      size="large"
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      icon={<SendOutlined />}
                      size="large"
                      block
                    >
                      Send Message
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Col>

            <Col xs={24} md={12}>
              <Space
                direction="vertical"
                size="large"
                style={{ width: "100%" }}
              >
                <Card
                  style={{
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  }}
                >
                  <Space
                    direction="vertical"
                    size="middle"
                    style={{ width: "100%" }}
                  >
                    <Title level={4}>Get in Touch</Title>
                    <Paragraph>
                      We're here to help! Reach out to us through any of the
                      following channels:
                    </Paragraph>

                    <Space direction="vertical" size="middle">
                      <div>
                        <Text strong>
                          <MailOutlined style={{ marginRight: "8px" }} />
                          Email
                        </Text>
                        <br />
                        <Text type="secondary">
                          info@volleyballtournaments.com
                        </Text>
                      </div>

                      <div>
                        <Text strong>
                          <PhoneOutlined style={{ marginRight: "8px" }} />
                          Phone
                        </Text>
                        <br />
                        <Text type="secondary">+1 (555) 123-4567</Text>
                      </div>

                      <div>
                        <Text strong>
                          <EnvironmentOutlined style={{ marginRight: "8px" }} />
                          Address
                        </Text>
                        <br />
                        <Text type="secondary">
                          123 Volleyball Ave
                          <br />
                          San Diego, CA 92101
                          <br />
                          United States
                        </Text>
                      </div>
                    </Space>
                  </Space>
                </Card>

                <Card
                  style={{
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  }}
                >
                  <Title level={4}>Business Hours</Title>
                  <Space direction="vertical" size="small">
                    <div>
                      <Text strong>Monday - Friday:</Text>
                      <Text type="secondary" style={{ marginLeft: "8px" }}>
                        9:00 AM - 6:00 PM PST
                      </Text>
                    </div>
                    <div>
                      <Text strong>Saturday:</Text>
                      <Text type="secondary" style={{ marginLeft: "8px" }}>
                        10:00 AM - 4:00 PM PST
                      </Text>
                    </div>
                    <div>
                      <Text strong>Sunday:</Text>
                      <Text type="secondary" style={{ marginLeft: "8px" }}>
                        Closed
                      </Text>
                    </div>
                  </Space>
                </Card>

                <Card
                  style={{
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "#fff",
                  }}
                  bodyStyle={{ color: "#fff" }}
                >
                  <Title level={4} style={{ color: "#fff" }}>
                    Need Immediate Help?
                  </Title>
                  <Paragraph style={{ color: "#fff", marginBottom: "16px" }}>
                    For urgent matters during tournaments, call our 24/7 support
                    hotline:
                  </Paragraph>
                  <Title level={3} style={{ color: "#fff", margin: 0 }}>
                    +1 (555) 999-8888
                  </Title>
                </Card>
              </Space>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
}
