import { useEffect, useState } from "react";
import API from "./api";
import "./App.css"; // Import styles

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [message, setMessage] = useState("");

  const fetchUsers = async () => {
    const res = await API.get("/");
    setUsers(res.data);
  };

  useEffect(() => { fetchUsers(); }, []);

  const addUser = async () => {
    const name = prompt("Enter new user name:");
    if (!name) return;
    await API.post("/", { name });
    fetchUsers();
  };

  const claimPoints = async () => {
    if (!selectedUser) return alert("Select a user first!");
    const res = await API.post(`/claim/${selectedUser}`);
    setMessage(`${res.data.user.name} got ${res.data.awardedPoints} points!`);
    setUsers(res.data.leaderboard);
  };

  return (
    <div className="app-container">
      <h1 className="title">🏆 Leaderboard</h1>

      <div className="controls">
        <select
          className="dropdown"
          onChange={(e) => setSelectedUser(e.target.value)}
          value={selectedUser}
        >
          <option value="">-- Select User --</option>
          {users.map(u => (
            <option key={u._id} value={u._id}>{u.name}</option>
          ))}
        </select>

        <button className="btn claim" onClick={claimPoints}>Claim Points</button>
        <button className="btn add" onClick={addUser}>➕ Add User</button>
      </div>

      {message && <p className="message">{message}</p>}

      <div className="table-container">
        <h2>Leaderboard</h2>
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Total Points</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={u._id}>
                <td>{i + 1}</td>
                <td>{u.name}</td>
                <td>{u.totalPoints}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
