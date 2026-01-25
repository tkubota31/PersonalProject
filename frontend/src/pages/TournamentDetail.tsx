import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

interface Tournament {
  id: number;
  name: string;
  date: string;
  location: string;
  skill_level: string;
  max_teams: number;
  registration_deadline: string;
}

export default function TournamentDetail() {
  const { id } = useParams<{ id: string }>();
  const [tournament, setTournament] = useState<Tournament | null>(null);

  useEffect(() => {
    if (!id) return;
    axios
      .get<Tournament>(`http://127.0.0.1:8000/api/tournaments/${id}/`)
      .then((res) => setTournament(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!tournament) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{tournament.name}</h1>
      <p>Date: {tournament.date}</p>
      <p>Location: {tournament.location}</p>
      <p>Skill Level: {tournament.skill_level}</p>
      <p>Max Teams: {tournament.max_teams}</p>
      <p>
        Registration Deadline:{" "}
        {new Date(tournament.registration_deadline).toLocaleString()}
      </p>

      <Link
        to={`/register/${tournament.id}`}
        className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Register Team
      </Link>
    </div>
  );
}
