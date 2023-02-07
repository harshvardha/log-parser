import { useState } from "react";
import axios from "axios";
import Log from "./components/Log/Log";
import "./App.css";

function App() {
  const [logs, setLogs] = useState([]);

  const handleUpload = async (event) => {
    event.preventDefault();
    try {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("http://localhost:5000/upload", formData);
      setLogs(res.data.map((log, index) => <Log key={index} timestamp={log.timestamp} logLevel={log.loglevel} transactionId={log.transactionId} errorMessage={log.err} />));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="App">
      <nav className="navbar">
        <h1>Log Parser</h1>
      </nav>
      <div className="selectFile">
        <h1>Select Log File</h1>
        <input type="file" name="logFile" onChange={handleUpload} style={{ marginTop: "10px" }} />
      </div>
      <div className="parsedLogs">
        <h1>Response From Server After Parsing</h1>
        {logs}
      </div>
    </div>
  );
}

export default App;
