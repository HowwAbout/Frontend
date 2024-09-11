import React, { useState } from "react";
import axios from "axios";
import "./DatePlanTitle.css";
import DefaultImage_XLarge from "../../assets/images/DefaultImage_XLarge.svg";
import Favorite_Red from "../../assets/icons/Favorite_Red.svg";

interface ImageAndTitleProps {
  id: number;
  title: string;
  date: string;
  description: string;
}

export default function ImageAndTitle({
  id,
  title: initialTitle,
  date: initialDate,
  description: initialDescription,
}: ImageAndTitleProps) {
  const [title, setTitle] = useState(initialTitle);
  const [date, setDate] = useState(initialDate);
  const [description, setDescription] = useState(initialDescription);

  const fetchDatePlan = async () => {
    try {
      const response = await axios.get(
        `https://assemblytown.com/api/date-plans/${id}`
      );
      const { title, date, description } = response.data;

      // 가져온 데이터를 상태에 반영
      setTitle(title);
      setDate(date);
      setDescription(description);
      console.log("Fetched date plan:", response.data);
    } catch (error) {
      console.error("Error fetching the date plan:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.put(
        `https://assemblytown.com/api/date-plans/${id}`,
        {
          title,
          date,
          description,
          image: "미정",
        }
      );
      console.log("Successfully updated:", response.data);
      await fetchDatePlan();
    } catch (error) {
      console.error("Error updating the date plan:", error);
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission or page reload on Enter key
      handleSubmit();
    }
  };

  return (
    <div className="dateplantitle_image-and-title">
      <div className="dateplantitle_content">
        <img
          src={DefaultImage_XLarge}
          alt="Not Found"
          className="dateplantitle_trailing-element"
        />
        <div className="dateplantitle_headline-and-reviews">
          <p className="dateplantitle_headline">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, "title")}
              className="dateplantitle_headline-input"
            />
          </p>
        </div>
        <div className="dateplantitle_supporting-text-1">
          <div className="dateplantitle_details">
            <p className="dateplantitle_date">
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, "date")}
                className="dateplantitle_date-input"
              />
            </p>
          </div>
          <p className="dateplantitle_supporting-text">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, "description")}
              className="dateplantitle_supporting-text-input"
            />
          </p>
        </div>
        <img
          src={Favorite_Red}
          alt="Not Found"
          className="dateplantitle_favorites"
        />
      </div>
    </div>
  );
}
