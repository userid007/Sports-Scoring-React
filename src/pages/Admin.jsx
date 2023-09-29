import MatchEdit from "../component/MatchEdit";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Admin() {
  const [match, setMatch] = useState(null);
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
      <div className="bg-[#009270] rounded-b-lg shadow-xl mb-8 p-4 text-center">
        <span className="text-4xl font-bold text-white">
          Sport Scoring App{" "}
        </span>
        <Link to={"/create"}>
          <button className="float-right border p-2 text-black rounded-xl bg-white mr-4">
            Create Match
          </button>
        </Link>
      </div>

      <div className="text-center flex flex-wrap justify-center gap-8 m-4 ">
        {match && match.map((m) => <MatchEdit key={m.id} {...m} />)}
      </div>
    </>
  );
}

export default Admin;
