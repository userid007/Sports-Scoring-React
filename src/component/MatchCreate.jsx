import Select from "react-select";
import { useEffect, useState } from "react";
import axios from "axios";


function MatchCreate() {
  const handleFormSumbit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    data.first_player = firstPlayer.value;
    data.second_player = secondPlayer.value;
    data.status = selectedOption.value;
    axios
      .post("http://127.0.0.1:8000/api/v1/match/", data)
      .then((res) => {
        console.log(res.data);
        alert("Match Created");
      })
      .catch((error) => {
        console.log(error.response);
        alert(error.response.data.msg);
      });
  };

  const [selectedOption, setSelectedOption] = useState();
  const [playerOptions, setPlayerOptions] = useState({});
  const [firstPlayer, setFirstPlayer] = useState();
  const [secondPlayer, setSecondPlayer] = useState();
  const options = [
    { value: "upcoming", label: "Upcoming" },
    { value: "ongoing", label: "Ongoing" },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancelled" },
  ];

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/v1/player")
      .then((res) => {
        const player = res.data.map((p) => ({
          label: p.first_name + " " + p.last_name,
          value: p.id,
        }));
        setPlayerOptions(player);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);
  return (
    <div>
      <h1 className="text-4xl font-bold text-white text-center p-4 rounded-b-xm shadow-xl mb-8 bg-[#009270]">
        Sport Scoring App
      </h1>
      <div>
        <form
          onSubmit={handleFormSumbit}
          className="flex w-72 flex-col mx-auto justify-center gap-4"
        >
          <Select
            onChange={setSelectedOption}
            options={options}
            placeholder="Select Match Status"
          />
          <input className="py-2 px-2" type="datetime-local" name="datetime" />
          <Select
            onChange={setFirstPlayer}
            options={playerOptions}
            placeholder="Select First Player"
          />
          <Select
            onChange={setSecondPlayer}
            options={playerOptions}
            placeholder="Select Second Player"
          />
          <button
            className="bg-[#009270] rounded-md py-2 text-white"
            type="submit"
          >
            Create Match
          </button>
        </form>
      </div>
    </div>
  );
}

export default MatchCreate;
