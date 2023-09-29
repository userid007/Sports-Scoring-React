import "./Match.css";
function Match({
  status,
  first_player,
  second_player,
  datetime,
  first_player_points,
  second_player_points,
}) {
  return (
    <div className="match-card w-[230px] border rounded-lg shadow-xl flex flex-col flex-wrap gap-2">
      {/* <h2>{status.toUpperCase()[0] + status.substr(1)}</h2> */}
      {/* Heading status */}
      <h2 className="bg-[#009270] text-white rounded-t-lg font-semibold">
        {status.toUpperCase()}
      </h2>

      {/* score */}
      <div className="score-font">
        <span className="p-[7px] bg-black text-white rounded-md text-[50px] text-bold font-bold shadow-gray-500">
          {first_player_points}
        </span>
        <span className="mx-1 text-[40px] text-bold font-bold"> : </span>
        <span className="p-[7px] bg-black text-white rounded-md text-[50px] text-bold font-bold shadow-sm shadow-gray-500">
          {second_player_points}
        </span>
      </div>

      {/* Player Names */}
      <div className="player-font my-4 w-[100%] grid px-4 grid-cols-3 items-center text-md leading-6">
        <p className="grid grid-cols-1 col-span-1">
          {(() => {
            if (first_player_points > second_player_points && status === "completed") {
              return <span className="text-[#009270]">Winner</span>;
            }
          })()}
          <span>{first_player.first_name}</span>
          <span>{first_player.last_name}</span>
        </p>
        <p className="col-span-1 mx-1 font-semibold text-sm">VS</p>
        <p className="grid grid-cols-1 col-span-1">
          {(() => {
            if (second_player_points > first_player_points && status === "completed") {
              return <span className="text-[#009270]">Winner</span>;
            }
          })()}
          <span>{second_player.first_name}</span>
          <span>{second_player.last_name}</span>
        </p>
      </div>
      <div className="bg-[#009270] text-white rounded-b-lg">
        <span className="mx-2">{datetime.substr(0, 10)}</span> |
        <span className="mx-2 mr-6">{datetime.substr(11, 5)}</span>
      </div>
    </div>
  );
}

export default Match;
