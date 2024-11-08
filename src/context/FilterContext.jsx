import React, { createContext, useContext, useState } from "react";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [selectedArea, setSelectedArea] = useState("Indian");
  const [sorted, setSorted] = useState(false); // For sorting A-Z or Z-A

  return (
    <FilterContext.Provider
      value={{ selectedArea, setSelectedArea, sorted, setSorted }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  return useContext(FilterContext);
};
