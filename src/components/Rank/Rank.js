import React from "react";
import "./Rank.css";

const Rank = ({ name, entries, number }) => {
  return (
    <div>
      <div className="yellow f2 ">
        {`${name}, your current entry count is ${entries}`}
      </div>
      <div className="center">
        <div className="text">Spider detected</div>
        <div className="number">
          &nbsp;
          {number}
          &nbsp;
        </div>
        <div className="text">{`faces in your image`}</div>
      </div>
    </div>
  );
};

export default Rank;
