import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { UserContextProvider } from "./Context/UserContext";
import { VoterContextProvider } from "./Context/VoterContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserContextProvider>
      <VoterContextProvider>
        <App />
      </VoterContextProvider>
    </UserContextProvider>
  </StrictMode>
);
