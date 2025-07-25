import React from "react";
import { useTheme } from "../contexts/ThemeContext";

const Navbar = () => {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  return (
    <>
      <div className="sticky navbar shadow-sm text-primary flex justify-between items-center p-4 ">
        <span className="font-bold text-3xl">Mewzii</span>

        <ul className="flex space-x-4 text-lg items-center">
          <li className="btn btn-ghost">
            Home
          </li>
          <li className="btn btn-ghost">
            About
          </li>
          <li className="btn btn-ghost">
            Chat
          </li>
          <li className="btn btn-ghost">
            Login
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
