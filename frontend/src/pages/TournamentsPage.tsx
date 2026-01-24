import { useState, useEffect } from "react";
import { tournamentAPI, registrationAPI } from "../api/client";

interface Tournament {
  id: number;
  name: string;
  description?: string;
  location: string;
  start_date: string;
  end_date: string;
  max_teams: number;
  fee: number;
  registration_deadline: string;
  created_at: string;
  registrations: TeamRegistration[];
}

interface TeamRegistration {
  id: number;
  tournament_id: number;
  team_name: string;
  contact_email: string;
  contact_phone?: string;
  status: string;
  registered_at: string;
}

export function TournamentsPage() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedTournament, setExpandedTournament] = useState<number | null>(
    null
  );
  const [registrationForm, setRegistrationForm] = useState<{
    [key: number]: {
      team_name: string;
      contact_email: string;
      contact_phone: string;
    };
  }>({});

  useEffect(() => {
    loadTournaments();
  }, []);

  const loadTournaments = async () => {
    try {
      setLoading(true);
      const response = await tournamentAPI.list();
      setTournaments(response.data);
    } catch (err: unknown) {
      const error = err as any;
      setError(error.response?.data?.detail || "Failed to load tournaments");
    } finally {
      setLoading(false);
    }
  };

  const toggleTournamentDetails = async (tournamentId: number) => {
    if (expandedTournament === tournamentId) {
      setExpandedTournament(null);
    } else {
      setExpandedTournament(tournamentId);
      // Load tournament details with registrations
      try {
        const response = await tournamentAPI.getDetail(tournamentId);
        setTournaments((prev) =>
          prev.map((t) => (t.id === tournamentId ? response.data : t))
        );
      } catch (err) {
        console.error("Failed to load tournament details:", err);
      }
    }
  };

  const handleRegistration = async (tournamentId: number) => {
    const formData = registrationForm[tournamentId];
    if (!formData?.team_name || !formData?.contact_email) {
      alert("Please fill in team name and contact email");
      return;
    }

    try {
      await registrationAPI.register({
        tournament_id: tournamentId,
        team_name: formData.team_name,
        contact_email: formData.contact_email,
        contact_phone: formData.contact_phone || undefined,
      });

      alert("Registration successful!");
      // Reload tournament details to show updated registrations
      const response = await tournamentAPI.getDetail(tournamentId);
      setTournaments((prev) =>
        prev.map((t) => (t.id === tournamentId ? response.data : t))
      );
      // Clear form
      setRegistrationForm((prev) => ({
        ...prev,
        [tournamentId]: { team_name: "", contact_email: "", contact_phone: "" },
      }));
    } catch (err: any) {
      alert(err.response?.data?.detail || "Registration failed");
    }
  };

  const updateRegistrationForm = (
    tournamentId: number,
    field: string,
    value: string
  ) => {
    setRegistrationForm((prev) => ({
      ...prev,
      [tournamentId]: {
        ...prev[tournamentId],
        [field]: value,
      },
    }));
  };

  if (loading)
    return (
      <div className="loading">
        <span className="spinner"></span>Loading tournaments...
      </div>
    );

  return (
    <div className="container">
      <h1 className="page-title">🏐 Volleyball Tournaments</h1>
      {error && <div className="alert alert-error">{error}</div>}

      {tournaments.length === 0 ? (
        <div className="card">
          <p>No tournaments available yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-1">
          {tournaments.map((tournament) => (
            <div key={tournament.id} className="card">
              <h2 className="card-title">{tournament.name}</h2>
              <p className="card-text">
                <strong>📍 Location:</strong> {tournament.location}
              </p>
              <p className="card-text">
                <strong>📅 Start:</strong>{" "}
                {new Date(tournament.start_date).toLocaleDateString()}
              </p>
              <p className="card-text">
                <strong>📅 End:</strong>{" "}
                {new Date(tournament.end_date).toLocaleDateString()}
              </p>
              <p className="card-text">
                <strong>👥 Max Teams:</strong> {tournament.max_teams}
              </p>
              <p className="card-text">
                <strong>💰 Fee:</strong> ${tournament.fee}
              </p>
              <p className="card-text">
                <strong>⏰ Registration Deadline:</strong>{" "}
                {new Date(
                  tournament.registration_deadline
                ).toLocaleDateString()}
              </p>
              {tournament.description && (
                <p className="card-text">
                  <strong>📝</strong> {tournament.description}
                </p>
              )}

              <button
                className="btn btn-primary"
                onClick={() => toggleTournamentDetails(tournament.id)}
                style={{ marginTop: "15px" }}
              >
                {expandedTournament === tournament.id
                  ? "Hide Details"
                  : "View Details & Register"}
              </button>

              {expandedTournament === tournament.id && (
                <div
                  style={{
                    marginTop: "20px",
                    padding: "20px",
                    backgroundColor: "#f9f9f9",
                    borderRadius: "8px",
                  }}
                >
                  <h3>Team Registration</h3>
                  <div style={{ marginBottom: "15px" }}>
                    <input
                      type="text"
                      placeholder="Team Name"
                      value={registrationForm[tournament.id]?.team_name || ""}
                      onChange={(e) =>
                        updateRegistrationForm(
                          tournament.id,
                          "team_name",
                          e.target.value
                        )
                      }
                      style={{
                        width: "100%",
                        padding: "8px",
                        marginBottom: "10px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                      }}
                    />
                    <input
                      type="email"
                      placeholder="Contact Email"
                      value={
                        registrationForm[tournament.id]?.contact_email || ""
                      }
                      onChange={(e) =>
                        updateRegistrationForm(
                          tournament.id,
                          "contact_email",
                          e.target.value
                        )
                      }
                      style={{
                        width: "100%",
                        padding: "8px",
                        marginBottom: "10px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                      }}
                    />
                    <input
                      type="tel"
                      placeholder="Contact Phone (optional)"
                      value={
                        registrationForm[tournament.id]?.contact_phone || ""
                      }
                      onChange={(e) =>
                        updateRegistrationForm(
                          tournament.id,
                          "contact_phone",
                          e.target.value
                        )
                      }
                      style={{
                        width: "100%",
                        padding: "8px",
                        marginBottom: "10px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                      }}
                    />
                    <button
                      className="btn btn-success"
                      onClick={() => handleRegistration(tournament.id)}
                      style={{ width: "100%" }}
                    >
                      Register Team
                    </button>
                  </div>

                  <h4>
                    Registered Teams ({tournament.registrations?.length || 0})
                  </h4>
                  {tournament.registrations &&
                  tournament.registrations.length > 0 ? (
                    <div style={{ marginTop: "10px" }}>
                      {tournament.registrations.map((reg) => (
                        <div
                          key={reg.id}
                          style={{
                            padding: "10px",
                            backgroundColor: "white",
                            marginBottom: "8px",
                            borderRadius: "4px",
                            border: "1px solid #eee",
                          }}
                        >
                          <strong>{reg.team_name}</strong> - {reg.contact_email}
                          {reg.contact_phone && (
                            <span> ({reg.contact_phone})</span>
                          )}
                          <span
                            style={{
                              float: "right",
                              fontSize: "0.8em",
                              color: "#666",
                            }}
                          >
                            {new Date(reg.registered_at).toLocaleDateString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>No teams registered yet.</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
