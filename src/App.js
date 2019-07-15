import React from "react";
import Travel from "./components/Travel";
import { GlobalStateProvider } from "./state";

function App() {

  return (
    <GlobalStateProvider>
      <Travel></Travel>
    </GlobalStateProvider>
  )
}

export default App;
