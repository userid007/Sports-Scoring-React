import Select from "react-select";
import { useEffect, useState } from "react";
import axios from "axios";

function MatchEdit({
  id,
  status,
  first_player,
  second_player,
  datetime,
  first_player_points,
  second_player_points,
}) {
  const options = [
    { value: "upcoming", label: "Upcoming" },
    { value: "ongoing", label: "Ongoing" },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancelled" },
  ];
  const [selectedOption, setSelectedOption] = useState({
    label: options.find((option) => option.value === status).label,
    value: status,
  });

  const [points, setPoints] = useState({
    first: first_player_points,
    second: second_player_points,
  });

  useEffect(() => {
    axios
      .put(`${import.meta.env.API}/match/${id}/`, {
        status: selectedOption.value,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, [selectedOption, id, points]);

  const handleFirstPlayerPoints = () => {
    axios
      .put(`${import.meta.env.VITE_API}/match/${id}/`, {
        points: "first",
        first_player_points: points.first,
      })
      .then((res) => {
        setPoints({ ...points, first: res.data.first_player_points });
        setSelectedOption({
          label: options.find((option) => option.value === res.data.status)
            .label,
          value: res.data.status,
        });
      })
      .catch((error) => {
        console.log(error.response);
        alert(error.response.data.msg);
      });
  };

  const handleSecondPlayerPoints = () => {
    axios
      .put(`${import.meta.env.VITE_API}/match/${id}/`, {
        points: "second",
        second_player_points: points.second,
      })
      .then((res) => {
        setPoints({ ...points, second: res.data.second_player_points });
      })
      .catch((error) => {
        console.log(error.response);
        alert(error.response.data.msg);
      });
  };
  return (
    <div className="border py-8 px-4 rounded-lg shadow-sm flex flex-col flex-wrap gap-2 bg-white">
      <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
      />
      <div className="grid grid-cols-3 items-center">
        <p className="grid grid-cols-1">
          {(() => {
            if (
              first_player_points > second_player_points &&
              status === "completed"
            ) {
              return <span className="text-[#009270]">Winner</span>;
            } else {
              return <span className="text-[#009270]"> </span>;
            }
          })()}
          <span>{first_player.first_name}</span>
          <span>{first_player.last_name}</span>
        </p>
        <p>VS</p>
        <p className="grid grid-cols-1">
          {(() => {
            if (
              second_player_points > first_player_points &&
              status === "completed"
            ) {
              return <span className="text-[#009270]">Winner</span>;
            } else {
              return <span className="text-[#009270]"> </span>;
            }
          })()}
          <span>{second_player.first_name}</span>
          <span>{second_player.last_name}</span>{" "}
        </p>
      </div>
      <div className="flex gap-4 justify-around items-center">
        <button
          onClick={handleFirstPlayerPoints}
          className="border rounded-md py-2 px-2"
        >
          Point+
        </button>
        <p>
          {points.first} - {points.second}
        </p>
        <button
          onClick={handleSecondPlayerPoints}
          className="border rounded-md py-2 px-2"
        >
          Point+
        </button>
      </div>
    </div>
  );
}

export default MatchEdit;
