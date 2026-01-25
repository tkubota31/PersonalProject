import { useEffect, useState } from "react";
import axios from "axios";
import { Layout, Row, Col, Card, Empty, Spin, Space, Button } from "antd";
import { TrophyOutlined } from "@ant-design/icons";
import TournamentCard from "../components/TournamentCard";

interface Tournament {
  id: number;
  name: string;
  date: string;
  location: string;
  skill_level: string;
}

export default function TournamentList() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get<Tournament[]>("http://127.0.0.1:8000/api/tournaments/")
      .then((res) => {
        setTournaments(res.data);
        setError(null);
      })
      .catch((err) => {
        setError("Failed to load tournaments");
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout style={{ background: "#f5f5f5" }}>
      <Layout.Content>
        <div>
          {/* Header Section */}
          <div style={{ marginBottom: "40px" }}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <TrophyOutlined
                  style={{ fontSize: "32px", color: "#1890ff" }}
                />
                <h1
                  style={{
                    fontSize: "32px",
                    fontWeight: "bold",
                    margin: 0,
                    color: "#262626",
                  }}
                >
                  Upcoming Volleyball Tournaments
                </h1>
              </div>
              <p
                style={{
                  fontSize: "16px",
                  color: "#666",
                  margin: 0,
                }}
              >
                Discover and join exciting volleyball tournaments in your area
              </p>
            </Space>
          </div>

          {/* Content Section */}
          <Spin spinning={loading} size="large">
            {error ? (
              <Card style={{ textAlign: "center", padding: "48px" }}>
                <p style={{ color: "#ff4d4f", fontSize: "16px" }}>{error}</p>
                <Button
                  type="primary"
                  onClick={() => window.location.reload()}
                  style={{ marginTop: "16px" }}
                >
                  Retry
                </Button>
              </Card>
            ) : tournaments.length === 0 ? (
              <Card style={{ textAlign: "center", padding: "48px" }}>
                <Empty
                  description="No tournaments available"
                  style={{ marginBottom: "24px" }}
                />
                <p style={{ color: "#666" }}>
                  Check back soon for upcoming tournaments!
                </p>
              </Card>
            ) : (
              <Row gutter={[24, 24]}>
                {tournaments.map((tournament) => (
                  <Col key={tournament.id} xs={24} sm={24} md={12} lg={8}>
                    <TournamentCard tournament={tournament} />
                  </Col>
                ))}
              </Row>
            )}
          </Spin>
        </div>
      </Layout.Content>
    </Layout>
  );
}
