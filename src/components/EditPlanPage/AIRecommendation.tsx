import React, { useState } from "react";
import "./AIRecommendation.css";
import RecommendationIcon from "../../assets/icons/RecommendationIcon.svg";
import SearchIcon from "../../assets/icons/SearchIcon.svg";

export default function SearchBar() {
  const [searchText, setSearchText] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  return (
    <div>
      <div className="airecommendation_headline-and-reviews">
        <p className="airecommendation_headline">AI Recommendations</p>
      </div>
      <div className="airecommendation_search-bar clip-contents">
        <div className="airecommendation_state-layer">
          <img
            src={RecommendationIcon}
            alt="Not Found"
            className="airecommendation_leading-icon"
          />
          <input
            type="text"
            className="airecommendation_input"
            placeholder="AI Recommendations by search"
            value={searchText}
            onChange={handleInputChange}
          />
          <img
            src={SearchIcon}
            alt="Not Found"
            className="airecommendation_trailing-elements"
          />
        </div>
      </div>
    </div>
  );
}
