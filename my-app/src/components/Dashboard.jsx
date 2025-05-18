import React, { useState, useEffect } from "react";
import "../styles/dash.css";
import Header from "./Header";
import { client } from "../../sanity/client";

export default function Dashboard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);

  const handleLogin = () => {
    // Just log in regardless of inputs
    setLoggedIn(true);
  };

  useEffect(() => {
  if (loggedIn) {
    client.fetch(`*[_type == "user"]`)
      .then((res) => {
        console.log("Fetched users:", res);
        setUsers(res);
      })
      .catch((err) => console.error("Error fetching users:", err));

    client.fetch(`*[_type == "event"]`)
      .then((res) => {
        console.log("Fetched events:", res);
        setEvents(res);
      })
      .catch((err) => console.error("Error fetching events:", err));
  }
}, [loggedIn]);

  return (
    <>
      <Header />
      {!loggedIn ? (
        <section className="login-container">
          <form className="login-form">
            <h2>Login</h2>

            <fieldset>
              <label htmlFor="email">Epost</label>
              <input
                type="email"
                id="email"
                placeholder="Skriv inn Epost"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </fieldset>
            <fieldset>
              <label htmlFor="password">Passord</label>
              <input
                type="password"
                id="password"
                placeholder="Skriv inn passord"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
            <button type="button" onClick={handleLogin}>
              Login
            </button>
          </form>
        </section>
      ) : (
        <section className="main-content">
          <h2>Min Side</h2>

          <div className="data-section">
            <h3>Brukere</h3>
            <ul>
              {users.map((user) => (
                <li key={user._id}>
                  {user.name} – {user.email}
                </li>
              ))}
            </ul>
          </div>

          <div className="data-section">
            <h3>Arrangementer</h3>
            <ul>
              {events.map((event) => (
                <li key={event._id}>
                  <strong>{event.title}</strong> – {event.date}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}