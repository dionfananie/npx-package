import ErrorState from "../src/assets/empty_state.jpg";
import EmptySearch from "../src/assets/empty_search.jpg";
import React from "react";

const Try = () => {
  return (
    <div>
      <div>
        <img src={ErrorState} alt="cartoon illustration of a green bird with a green mailbox" />
        {/* <img src={ErrorState} alt="" /> */}
        <img src={EmptySearch} alt="a cartoon image of a bird and a rabbit on a stage" />
        {/* <img /> */}
      </div>
    </div>
  );
};

export default Try;
