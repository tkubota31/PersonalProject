import { Layout, Typography, Card, Row, Col, Space } from "antd";
import {
  TrophyOutlined,
  TeamOutlined,
  RocketOutlined,
} from "@ant-design/icons";
import NavigationBanner from "../components/NavigationBanner";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

export default function AboutUs() {
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
          <Card
            style={{
              marginBottom: "24px",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              <div style={{ textAlign: "center" }}>
                <Title level={1}>About Us</Title>
                <Paragraph style={{ fontSize: "16px", color: "#666" }}>
                  Your premier volleyball tournament management platform
                </Paragraph>
              </div>

              <div>
                <Title level={2}>
                  <RocketOutlined /> Our Mission
                </Title>
                <Paragraph style={{ fontSize: "16px" }}>
                  We're dedicated to making volleyball tournament management
                  simple, efficient, and accessible for everyone. Our platform
                  connects players, teams, and organizers to create seamless
                  tournament experiences from registration to victory.
                </Paragraph>
                <Paragraph style={{ fontSize: "16px" }}>
                  Whether you're organizing a local beach tournament or a
                  regional championship, we provide the tools you need to manage
                  registrations, track teams, and ensure every event runs
                  smoothly.
                </Paragraph>
              </div>

              <div>
                <Title level={2}>
                  <TrophyOutlined /> What We Offer
                </Title>
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={12} md={8}>
                    <Card
                      type="inner"
                      title="Easy Registration"
                      style={{ height: "100%" }}
                    >
                      <Paragraph>
                        Quick and simple team registration process with support
                        for multiple skill levels and tournament formats.
                      </Paragraph>
                    </Card>
                  </Col>
                  <Col xs={24} sm={12} md={8}>
                    <Card
                      type="inner"
                      title="Tournament Management"
                      style={{ height: "100%" }}
                    >
                      <Paragraph>
                        Comprehensive tools for organizers to create, manage,
                        and track tournaments with ease.
                      </Paragraph>
                    </Card>
                  </Col>
                  <Col xs={24} sm={12} md={8}>
                    <Card
                      type="inner"
                      title="Real-time Updates"
                      style={{ height: "100%" }}
                    >
                      <Paragraph>
                        Stay informed with instant updates on registrations,
                        schedules, and tournament information.
                      </Paragraph>
                    </Card>
                  </Col>
                </Row>
              </div>

              <div>
                <Title level={2}>
                  <TeamOutlined /> Our Team
                </Title>
                <Paragraph style={{ fontSize: "16px", marginBottom: "24px" }}>
                  We're a passionate group of volleyball enthusiasts and
                  technology professionals committed to bringing the best
                  tournament management experience to the volleyball community.
                </Paragraph>
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={12} md={8}>
                    <Card
                      hoverable
                      style={{
                        textAlign: "center",
                        borderRadius: "8px",
                      }}
                    >
                      <div
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "50%",
                          background:
                            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          margin: "0 auto 16px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "40px",
                          color: "#fff",
                        }}
                      >
                        👨‍💼
                      </div>
                      <Title level={4}>Alex Johnson</Title>
                      <Paragraph type="secondary">Co-founder & CEO</Paragraph>
                      <Paragraph>
                        Former professional volleyball player with 15 years of
                        tournament experience.
                      </Paragraph>
                    </Card>
                  </Col>
                  <Col xs={24} sm={12} md={8}>
                    <Card
                      hoverable
                      style={{
                        textAlign: "center",
                        borderRadius: "8px",
                      }}
                    >
                      <div
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "50%",
                          background:
                            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          margin: "0 auto 16px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "40px",
                          color: "#fff",
                        }}
                      >
                        👩‍💻
                      </div>
                      <Title level={4}>Sarah Chen</Title>
                      <Paragraph type="secondary">Co-founder & CTO</Paragraph>
                      <Paragraph>
                        Software engineer passionate about building platforms
                        that empower sports communities.
                      </Paragraph>
                    </Card>
                  </Col>
                  <Col xs={24} sm={12} md={8}>
                    <Card
                      hoverable
                      style={{
                        textAlign: "center",
                        borderRadius: "8px",
                      }}
                    >
                      <div
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "50%",
                          background:
                            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          margin: "0 auto 16px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "40px",
                          color: "#fff",
                        }}
                      >
                        👨‍🎨
                      </div>
                      <Title level={4}>Marcus Rodriguez</Title>
                      <Paragraph type="secondary">Head of Operations</Paragraph>
                      <Paragraph>
                        Tournament organizer with expertise in managing events
                        of all sizes and formats.
                      </Paragraph>
                    </Card>
                  </Col>
                </Row>
              </div>
            </Space>
          </Card>
        </div>
      </Content>
    </Layout>
  );
}
