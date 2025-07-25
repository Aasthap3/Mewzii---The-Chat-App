import React, { useEffect, useContext, useState } from "react";

const ThemeContext = React.createContext();

export const ThemeProvider = (props) => {
  const [theme, setTheme] = useState(
    localStorage.getItem("MewziiTheme") || "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("MewziiTheme", theme);
  }, [theme]);

  const value = {
    theme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};