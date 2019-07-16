import React from "react";
import Travel from "./components/Travel"
import Firebase from "firebase";
import config from "./config";

function App() {

  Firebase.initializeApp(config);

  return (
    <Travel></Travel>
  )
}

export default App;
