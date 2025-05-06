import { Link } from "react-router-dom";
import "../styles/style.css";

export default function Header() {
  return (
    <header>
      <Link to="/">Billetlyst</Link>
      <Link to="/category/musikk">Musikk Sport Teater/Show</Link>
      <Link to="/dashboard">Logg inn</Link>
    </header>
  );
}
