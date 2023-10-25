import React from "react";
import { FaRegStar, FaStar, FaStarHalfAlt as SHalf } from "react-icons/fa";

const Rating = ({ value, text }) => {
  return (
    <div className="rating">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i}>
          {value > i ? value > i + 0.5 ? <FaStar /> : <SHalf /> : <FaRegStar />}
        </span>
      ))}{" "}
      <span>{text}</span>
    </div>
  );
};

export default Rating;
