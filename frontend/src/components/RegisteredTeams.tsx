import { List, Typography, Collapse } from "antd";

const { Text } = Typography;

interface TeamMember {
  id: string;
  name: string;
  email: string;
  is_captain: boolean;
}

interface Registration {
  id: string;
  team_name: string;
  captain_name: string;
  captain_email: string;
  captain_phone: string;
  notes: string;
  status: string;
  created_at: string;
  team_members?: TeamMember[];
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
          <div style={{ width: "100%" }}>
            <Text strong>{registration.team_name}</Text>
            <br />
            <Text>Captain: {registration.captain_name}</Text>
            <br />
            <Text type="secondary">
              Registered on:{" "}
              {new Date(registration.created_at).toLocaleDateString()}
            </Text>

            {registration.team_members &&
              registration.team_members.length > 0 && (
                <Collapse
                  items={[
                    {
                      key: `team-${registration.id}`,
                      label: `Team Members (${registration.team_members.length})`,
                      children: (
                        <List
                          dataSource={registration.team_members}
                          renderItem={(member) => (
                            <List.Item style={{ paddingLeft: "0" }}>
                              <div>
                                <Text>{member.name}</Text>
                                {member.is_captain && (
                                  <Text
                                    type="success"
                                    style={{ marginLeft: "8px" }}
                                  >
                                    (Captain)
                                  </Text>
                                )}
                                <br />
                                <Text
                                  type="secondary"
                                  style={{ fontSize: "12px" }}
                                >
                                  {member.email}
                                </Text>
                              </div>
                            </List.Item>
                          )}
                        />
                      ),
                    },
                  ]}
                />
              )}
          </div>
        </List.Item>
      )}
    />
  );
}
