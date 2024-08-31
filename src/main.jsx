import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { UserContextProvider } from "./Context/UserContext";
import { VoterContextProvider } from "./Context/VoterContext";
import { AuthContextProvider } from "./Context/AuthContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <UserContextProvider>
        <VoterContextProvider>
          <App />
        </VoterContextProvider>
      </UserContextProvider>
    </AuthContextProvider>
  </StrictMode>
);
