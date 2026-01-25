import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface RegistrationData {
  tournament: string;
  team_name: string;
  captain_name: string;
  captain_email: string;
  captain_phone: string;
  notes?: string;
}

export default function RegisterTeam() {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<RegistrationData>({
    tournament: id || "",
    team_name: "",
    captain_name: "",
    captain_email: "",
    captain_phone: "",
    notes: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/api/registrations/", formData)
      .then(() => setMessage("Registration submitted!"))
      .catch(() => setMessage("Error submitting registration."));
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Register Your Team</h1>
      {message && <p className="mb-4">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          "team_name",
          "captain_name",
          "captain_email",
          "captain_phone",
          "notes",
        ].map((field) => (
          <div key={field}>
            <label className="block mb-1 capitalize">
              {field.replace("_", " ")}
            </label>
            {field === "notes" ? (
              <textarea
                name={field}
                value={(formData as any)[field]}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            ) : (
              <input
                type={field.includes("email") ? "email" : "text"}
                name={field}
                value={(formData as any)[field]}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            )}
          </div>
        ))}
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Submit Registration
        </button>
      </form>
    </div>
  );
}
