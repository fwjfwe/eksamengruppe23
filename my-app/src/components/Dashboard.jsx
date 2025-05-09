import React, { useState } from "react";
import "../styles/MIDLERTIDIGDASH.css";
export default function Dashboard() {
  return (
    <>
    <section>
        <h2>Dashboard</h2>
        <p>Velkommen til ditt dashboard!</p>
      </section>

      <section className="login-container">
        <form className="login-form">
          <h2>Login</h2>

          <fieldset>
            <label htmlFor="epost">Epost</label>
            <input
              type="epost"
              id="epost"
              placeholder="Skriv inn Epost"
            />
          </fieldset>

          <fieldset>
            <label htmlFor="passord">Passord</label>
            <input
              type="passord"
              id="passord"
              placeholder="Skriv inn passord"
            />
          </fieldset>

          <button type="button">
            Login
          </button>
        </form>
      </section>
    </>
  );
}