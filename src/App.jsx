import axios from "axios";
import { useState, useEffect } from "react";
import Match from "./component/Match";
import "./App.css";
import { json } from "react-router-dom";

function App() {
  const [match, setMatch] = useState(null);

  useEffect(() => {
    const sse = new EventSource("http://127.0.0.1:8000/api/v1/stream/");
    sse.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMatch(data);
      // setsse(data);
      console.log(match);
    };
    sse.onerror = (error) => {
      console.log(error);
    };
    return () => {
      sse.close();
    };
  }, [match]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/v1/match")
      .then((response) => {
        setMatch(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <h1 className="heading-font text-4xl font-bold text-white text-center p-4 rounded-b-lg shadow-xl mb-8 bg-[#009270]">
        Sport Scoring App
      </h1>
      <div className="text-center flex flex-wrap justify-center gap-8 m-4 ">
        {match && match.map((m) => <Match key={m.id} {...m} />)}
      </div>
    </>
  );
}

export default App;
