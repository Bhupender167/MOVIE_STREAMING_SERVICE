import React from "react";
import TrendingMovie from "./TrendingMovie";
import TrendingTv from "./TrendingTv";

const Trending = () => {
  return (
    <div className="space-y-14">
      <TrendingMovie />
      <TrendingTv />
    </div>
  );
};

export default Trending;
