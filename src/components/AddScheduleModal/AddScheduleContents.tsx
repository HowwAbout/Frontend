import React, { useState, useEffect } from "react";
import "./AddScheduleContents.css";

interface AIRecommendation {
  activityTitle: string;
  activityLocation: string;
  timeTotal: string;
  activityDescription: string;
}

interface AddScheduleContentsProps {
  aiRecommendation: AIRecommendation; // The AI Recommendation data
  onFormChange: (data: {
    title: string;
    location: string;
    durationTime: string;
    description: string;
  }) => void; // Callback to send form data to parent (header)
}

const AddScheduleContents: React.FC<AddScheduleContentsProps> = ({
  aiRecommendation,
  onFormChange,
}) => {
  const [initialTitle, setInitialTitle] = useState(
    aiRecommendation.activityTitle
  );
  const [initialLocation, setInitialLocation] = useState(
    aiRecommendation.activityLocation
  );
  const [initialDurationTime, setInitialDurationTime] = useState(
    aiRecommendation.timeTotal
  );
  const [initialDescription, setInitialDescription] = useState(
    aiRecommendation.activityDescription
  );

  useEffect(() => {
    // Send the initial form data to the parent when component loads
    onFormChange({
      title: initialTitle,
      location: initialLocation,
      durationTime: initialDurationTime,
      description: initialDescription,
    });
  }, [
    initialTitle,
    initialLocation,
    initialDurationTime,
    initialDescription,
    onFormChange,
  ]);

  return (
    <>
      <div className="addschedulecontents_first_input-date-picker clip-contents">
        <div className="addschedulecontents_first_date">
          <div className="addschedulecontents_first_text-field-1">
            <div className="addschedulecontents_first_text-field">
              <div className="addschedulecontents_first_state-layer">
                <div className="addschedulecontents_first_content">
                  <div className="addschedulecontents_first_label-text-1">
                    <p className="addschedulecontents_first_label-text">
                      Title
                    </p>
                  </div>
                  <div className="addschedulecontents_first_input-text-1">
                    <input
                      type="text"
                      className="addschedulecontents_first_input-text"
                      value={initialTitle}
                      onChange={(e) => setInitialTitle(e.target.value)} // Update state when input changes
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="addschedulecontents_first_input-date-picker clip-contents">
        <div className="addschedulecontents_first_date">
          <div className="addschedulecontents_first_text-field-1">
            <div className="addschedulecontents_first_text-field">
              <div className="addschedulecontents_first_state-layer">
                <div className="addschedulecontents_first_content">
                  <div className="addschedulecontents_first_label-text-1">
                    <p className="addschedulecontents_first_label-text">
                      Location
                    </p>
                  </div>
                  <div className="addschedulecontents_first_input-text-1">
                    <input
                      type="text"
                      className="addschedulecontents_first_input-text"
                      value={initialLocation}
                      onChange={(e) => setInitialLocation(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="addschedulecontents_first_input-date-picker clip-contents">
        <div className="addschedulecontents_first_date">
          <div className="addschedulecontents_first_text-field-1">
            <div className="addschedulecontents_first_text-field">
              <div className="addschedulecontents_first_state-layer">
                <div className="addschedulecontents_first_content">
                  <div className="addschedulecontents_first_label-text-1">
                    <p className="addschedulecontents_first_label-text">
                      Duration Time
                    </p>
                  </div>
                  <div className="addschedulecontents_first_input-text-1">
                    <input
                      type="text"
                      className="addschedulecontents_first_input-text"
                      value={initialDurationTime}
                      onChange={(e) => setInitialDurationTime(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="addschedulecontents_second_input-date-picker clip-contents">
        <div className="addschedulecontents_second_date">
          <div className="addschedulecontents_second_text-field-1">
            <div className="addschedulecontents_second_text-field">
              <div className="addschedulecontents_second_state-layer">
                <div className="addschedulecontents_second_content">
                  <textarea
                    className="addschedulecontents_second_input-text"
                    value={initialDescription}
                    onChange={(e) => setInitialDescription(e.target.value)}
                  />
                  <div className="addschedulecontents_second_label-text-1">
                    <p className="addschedulecontents_second_label-text">
                      Activity detail
                    </p>
                  </div>
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/cgg48vx1ezg-I120%3A3680%3B115%3A2742?alt=media&token=e94bc86d-e888-453f-a078-fcce0433f2df"
                    alt="Not Found"
                    className="addschedulecontents_second_input-text-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddScheduleContents;
