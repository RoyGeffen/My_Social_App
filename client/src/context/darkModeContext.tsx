import { ReactNode, createContext, useEffect, useState } from "react";

interface DarkModeContextValue {
  darkMode: boolean;
  toggle: () => void;
}

const darkModeValueFromStorage = localStorage.getItem('darkMode');
const initialDarkModeValue: boolean = darkModeValueFromStorage ? JSON.parse(darkModeValueFromStorage) : false;

export const DarkModeContext = createContext<DarkModeContextValue>({
  darkMode: initialDarkModeValue,
  toggle: () => {},
});
interface DarkModeContextProviderProps {
  children: ReactNode;
}

export const DarkModeContextProvider: React.FC<DarkModeContextProviderProps>= ( {children}) => {

  const [darkMode, setDarkMode] = useState<boolean>(
    JSON.parse(localStorage.getItem("darkMode")!) || false
  );

  const toggle = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <DarkModeContext.Provider value={ {darkMode, toggle} }>
      {children}
    </DarkModeContext.Provider>
  );
};

