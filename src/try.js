import ErrorState from "../src/assets/empty_state.jpg";
import EmptySearch from "../src/assets/empty_search.jpg";
import React from "react";

const Try = () => {
  return (
    <div>
      <div>
        <img src={ErrorState} alt="product 1" />
        {/* <img src={ErrorState} alt="" /> */}
        <img src={EmptySearch} alt="product 2" />
        {/* <img /> */}
      </div>
    </div>
  );
};

export default Try;
