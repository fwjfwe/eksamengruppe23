import React, {useState} from "react";
import "../styles/dash.css";


export default function Dashboard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedin] = useState(false);

const handleLogin = () => {
  if (email&&password) {
    setLoggedin(true);
  } else {
    alert("Vennligst fyll ut feltene under");
  }
};

const isFormValid = email&&password;

return (
  <>
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
            <button
              type="button"
              onClick={handleLogin}
            >
              Login
            </button>
        </form>
      </section>
    ) : (
      <section className="min.side">
        <h2>Min Side</h2>
      </section>
    )}
  </>
);
}