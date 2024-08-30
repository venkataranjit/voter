import React, { useState, createContext } from "react";

export const VoterContext = createContext();

const initialVoterData = () => {
  return [
    {
      id: "00001",
      city: "guntur",
      name: "Ranjit Victory",
      age: 32,
      hasVoterId: true,
    },
  ];
};

const inputData = () => {
  return {
    id: "",
    city: "",
    name: "",
    age: "",
    hasVoterId: "",
  };
};

export const VoterContextProvider = ({ children }) => {
  const [voter, setVoter] = useState(initialVoterData);
  const [input, setInput] = useState(inputData);
  const [search, setSearch] = useState("");
  const [edit, setEdit] = useState("");
  const [errDisplay, setErrDisplay] = useState("");

  const contextValue = {
    voter,
    setVoter,
    input,
    setInput,
    search,
    setSearch,
    edit,
    setEdit,
    errDisplay,
    setErrDisplay,
    initialVoterData,
    inputData
  };

  return (
    <VoterContext.Provider value={contextValue}>
      {children}
    </VoterContext.Provider>
  );
};
