import React, { use, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const { user, isLogin } = useAuth();

  const location = useLocation().pathname;

  const [isActive, setIsActive] = useState(false);

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  return (
    <>
      <div
        className={`${location !== "chat" ? "sticky top-0 z-50" : ""}
       navbar bg-base-100 shadow-sm text-primary flex justify-between items-center p-4`}
      >
        <Link
          className="font-bold text-3xl"
          to="/"
          onClick={() => setIsActive("")}
        >
          Mewzii
        </Link>

        <ul className="flex space-x-4 text-lg items-center">
          <li>
            <Link
              to="/"
              className={`btn btn-ghost ${
                isActive === "" ? "text-accent" : ""
              }`}
              onClick={() => setIsActive("home")}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={`btn btn-ghost ${
                isActive === "about" ? "text-accent" : ""
              }`}
              onClick={() => setIsActive("about")}
            >
              About
            </Link>
          </li>
          {isLogin && (
            <li>
            <Link
              to="/chat"
              className={`btn btn-ghost ${
                isActive === "chat" ? "text-accent" : ""
              }`}
              onClick={() => setIsActive("chat")}
            >
              Chat
            </Link>
          </li>
          )}
          {isLogin && user ? (
            <li>
              <Link to={"/userProfile"}>
                <img
                  src={user.profilePicture}
                  alt={user.fullname}
                  className="w-10 h-10 rounded-full object-cover"
                />
              </Link>
            </li>
          ) : (
            <li>
              <Link
                to="/login"
                className={`btn btn-ghost ${
                  isActive === "login" ? "text-accent" : ""
                }`}
                onClick={() => setIsActive("login")}
              >
                Login
              </Link>
            </li>
          )}

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
