import { List, Typography } from "antd";

const { Text } = Typography;

interface Registration {
  id: string;
  team_name: string;
  captain_name: string;
  captain_email: string;
  captain_phone: string;
  notes: string;
  status: string;
  created_at: string;
}

interface RegisteredTeamsProps {
  registrations: Registration[];
}

export default function RegisteredTeams({
  registrations,
}: RegisteredTeamsProps) {
  if (registrations.length === 0) {
    return <p>No confirmed teams registered yet.</p>;
  }

  return (
    <List
      dataSource={registrations}
      renderItem={(registration) => (
        <List.Item>
          <div>
            <Text strong>{registration.team_name}</Text>
            <br />
            <Text>Captain: {registration.captain_name}</Text>
            <br />
            <Text type="secondary">
              Registered on:{" "}
              {new Date(registration.created_at).toLocaleDateString()}
            </Text>
          </div>
        </List.Item>
      )}
    />
  );
}
