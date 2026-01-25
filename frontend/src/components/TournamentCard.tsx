import { Link } from "react-router-dom";
import { Card, Tag, Button, Space, Typography } from "antd";
import {
  CalendarOutlined,
  EnvironmentOutlined,
  TrophyOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

interface Tournament {
  id: number;
  name: string;
  date: string;
  location: string;
  skill_level: string;
}

interface TournamentCardProps {
  tournament: Tournament;
}

const skillLevelColors: Record<string, string> = {
  beginner: "green",
  intermediate: "blue",
  advanced: "orange",
  professional: "red",
};

export default function TournamentCard({ tournament }: TournamentCardProps) {
  return (
    <Link
      to={`/tournaments/${tournament.id}`}
      style={{ textDecoration: "none" }}
    >
      <Card
        hoverable
        color="primary"
        style={{
          height: "100%",
          borderRadius: "8px",
          border: "1px solid #f0f0f0",
          transition: "all 0.3s ease",
          overflow: "hidden",
        }}
        cover={
          <div
            style={{
              height: "120px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: 0,
            }}
          >
            <TrophyOutlined
              style={{
                fontSize: "48px",
                color: "white",
              }}
            />
          </div>
        }
      >
        {/* Tournament Name */}
        <Title
          level={3}
          style={{
            marginBottom: "16px",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {tournament.name}
        </Title>

        {/* Details Section */}
        <Space
          orientation="vertical"
          style={{
            width: "100%",
            marginBottom: "16px",
          }}
        >
          {/* Date */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <CalendarOutlined
              style={{
                fontSize: "14px",
                color: "#1890ff",
              }}
            />
            <Text>{tournament.date}</Text>
          </div>

          {/* Location */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <EnvironmentOutlined
              style={{
                fontSize: "14px",
                color: "#faad14",
              }}
            />
            <Text>{tournament.location}</Text>
          </div>
        </Space>

        {/* Skill Level Badge */}
        <div style={{ marginBottom: "16px" }}>
          <Tag
            color={
              skillLevelColors[tournament.skill_level.toLowerCase()] ||
              "default"
            }
            style={{
              padding: "4px 12px",
              fontSize: "12px",
              fontWeight: "500",
              textTransform: "capitalize",
            }}
          >
            {tournament.skill_level}
          </Tag>
        </div>

        {/* View Details Button */}
        <Button
          type="primary"
          block
          icon={<ArrowRightOutlined />}
          iconPlacement="end"
          size="large"
        >
          View Details
        </Button>
      </Card>
    </Link>
  );
}
