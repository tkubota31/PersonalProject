import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Typography, Button, Spin, Divider, Empty } from "antd";
import RegisteredTeams from "../components/RegisteredTeams";

const { Title, Text } = Typography;

interface Tournament {
  id: number;
  name: string;
  date: string;
  location: string;
  skill_level: string;
  max_teams: number;
  registration_deadline: string;
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
}

export default function TournamentDetail() {
  const { id } = useParams<{ id: string }>();
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    axios
      .get<Tournament>(`http://127.0.0.1:8000/api/tournaments/${id}/`)
      .then((res) => {
        setTournament(res.data);
        // Fetch registrations after tournament is loaded
        return axios.get<Registration[]>(
          `http://127.0.0.1:8000/api/tournaments/${id}/registrations/`,
        );
      })
      .then((res) => {
        setRegistrations(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Spin size="large" />;
  if (!tournament) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <Title level={2}>{tournament.name}</Title>
      <Text strong>Date: </Text>
      {tournament.date}
      <br />
      <Text strong>Location: </Text>
      {tournament.location}
      <br />
      <Text strong>Skill Level: </Text>
      {tournament.skill_level}
      <br />
      <Text strong>Max Teams: </Text>
      {tournament.max_teams}
      <br />
      <Text strong>Registration Deadline: </Text>
      {new Date(tournament.registration_deadline).toLocaleString()}
      <br />
      <Link to={`/register/${tournament.id}`}>
        <Button type="primary" style={{ marginTop: 16 }} size="large" block>
          Register Team
        </Button>
      </Link>

      <Divider />

      <Title level={3}>Teams Registered</Title>
      <RegisteredTeams registrations={registrations} />

      <Divider />

      <Title level={3}>Tournament Policy</Title>
      <Empty
        description="Tournament policy details coming soon"
        style={{ marginTop: "20px", marginBottom: "20px" }}
      />
    </div>
  );
}
