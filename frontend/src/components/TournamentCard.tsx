import { Link } from "react-router-dom";
import { Card, Tag, Button, Space } from "antd";
import {
  CalendarOutlined,
  EnvironmentOutlined,
  TrophyOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";

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
        style={{
          height: "100%",
          borderRadius: "8px",
          border: "1px solid #f0f0f0",
          transition: "all 0.3s ease",
        }}
        bodyStyle={{ padding: "24px" }}
        cover={
          <div
            style={{
              height: "120px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "16px",
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
        <h2
          style={{
            fontSize: "18px",
            fontWeight: "600",
            marginBottom: "16px",
            color: "#262626",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {tournament.name}
        </h2>

        {/* Details Section */}
        <Space
          direction="vertical"
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
              color: "#595959",
            }}
          >
            <CalendarOutlined
              style={{
                fontSize: "14px",
                color: "#1890ff",
              }}
            />
            <span>{tournament.date}</span>
          </div>

          {/* Location */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#595959",
            }}
          >
            <EnvironmentOutlined
              style={{
                fontSize: "14px",
                color: "#faad14",
              }}
            />
            <span>{tournament.location}</span>
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
          iconPosition="end"
          size="large"
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            borderColor: "transparent",
            marginTop: "12px",
          }}
        >
          View Details
        </Button>
      </Card>
    </Link>
  );
}
