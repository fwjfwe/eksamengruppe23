import { Link } from "react-router-dom";
import "../styles/style.css";

export default function Header() {
  return (
    <header>
      <Link to="/">Billetlyst</Link>
      <Link to="/category/music">Music</Link>
      <Link to="/category/sports">Sports</Link>
      <Link to="/category/theater">Theater</Link>
      <Link to="/dashboard">Logg inn</Link>
    </header>
  );
}
