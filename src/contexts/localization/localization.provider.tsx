import { createContext, useState, useContext } from "react";

const localizationContext = createContext({} as any);

export const LocalizationProvider = ({ children }) => {
  const [localization, setLocalization] = useState({});

  return (
    <localizationContext.Provider
      value={{
        localization,
        setLocalization,
      }}
    >
      {children}
    </localizationContext.Provider>
  );
};

export const useLocalization = () => useContext(localizationContext);
