import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface Tournament {
  id: number;
  name: string;
  date: string;
  location: string;
  skill_level: string;
}

export default function TournamentList() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);

  useEffect(() => {
    axios
      .get<Tournament[]>("http://127.0.0.1:8000/api/tournaments/")
      .then((res) => setTournaments(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-4 bg-black">
      <h1 className="text-2xl font-bold mb-4 dark:text-blue-400">
        Upcoming Volleyball Tournaments
      </h1>
      <ul className="space-y-4">
        {tournaments.map((tournament) => (
          <li
            key={tournament.id}
            className="border p-4 rounded shadow hover:bg-gray-50"
          >
            <Link to={`/tournaments/${tournament.id}`}>
              <h2 className="text-xl font-semibold">{tournament.name}</h2>
              <p>Date: {tournament.date}</p>
              <p>Location: {tournament.location}</p>
              <p>Skill Level: {tournament.skill_level}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
