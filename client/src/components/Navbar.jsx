import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

const Navbar = () => {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  return (
    <>
      <div className="sticky top-0 z-50 navbar bg-base-100 shadow-sm text-primary flex justify-between items-center p-4 ">
        <span className="font-bold text-3xl">Mewzii</span>

        <ul className="flex space-x-4 text-lg items-center">
          <li>
            <Link to="/" className="btn btn-ghost">Home</Link>
          </li>
          <li>
            <Link to="/about" className="btn btn-ghost">About</Link>
          </li>
          <li>
            <Link to="/chat" className="btn btn-ghost">Chat</Link>
          </li>
          <li>
            <Link to="/login" className="btn btn-ghost">Login</Link>
          </li>
          <li>
            <select
              className="select select-primary bg-base-100 text-base"
              value={theme}
              onChange={handleThemeChange}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="cupcake">Cupcake</option>
              <option value="synthwave">Synthwave</option>
              <option value="retro">Retro</option>
              <option value="cyberpunk">Cyberpunk</option>
              <option value="valentine">Valentine</option>
              <option value="halloween">Halloween</option>
              <option value="aqua">Aqua</option>
              <option value="pastel">Pastel</option>
              <option value="forest">Forest</option>
              <option value="lemonade">Lemonade</option>
              <option value="black">Black</option>
              <option value="caramellatte">Caramel Latte</option>
            </select>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
