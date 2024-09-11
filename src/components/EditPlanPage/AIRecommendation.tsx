import React, { useState } from "react";
import "./AIRecommendation.css";
import RecommendationIcon from "../../assets/icons/RecommendationIcon.svg";
import SearchIcon from "../../assets/icons/SearchIcon.svg";

interface AIRecommendationProps {
  onSearchTextChange: (searchText: string) => void;
}

const SearchBar: React.FC<AIRecommendationProps> = ({ onSearchTextChange }) => {
  const [searchText, setSearchText] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission or page reload on Enter key
      onSearchTextChange(searchText); // Pass the searchText only when Enter is pressed
    }
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
            onKeyDown={handleKeyDown}
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
};

export default SearchBar;
