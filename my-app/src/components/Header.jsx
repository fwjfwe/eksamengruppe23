import { Link } from "react-router-dom";
import "../styles/style.css";

export default function Header() {
  return (
    <header>
      <Link to="/">Billetlyst</Link>
      <Link to="/category/music">Musikk</Link>
      <Link to="/category/sports">Sport</Link>
      <Link to="/category/theater">Teater</Link>
      <Link to="/dashboard">Logg inn</Link>
    </header>
  );
}
