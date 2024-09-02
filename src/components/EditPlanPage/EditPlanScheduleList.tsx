import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import EditPlanScheduleItem from "./EditPlanScheduleItem"; // Adjust the import path as necessary
import "./EditPlanScheduleList.css"; // Ensure to style the list if needed
import AddSchedule from "./AddSchedule";

const AIRecommendationList: React.FC<{
  items: Array<{ id: string; content: string }>;
}> = ({ items }) => {
  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;

    const reorderedItems = Array.from(items);
    const [reorderedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, reorderedItem);

    // Here you would typically set state with the reordered items
    // setItems(reorderedItems);
  };

  return (
    <div className="editplanschedule-list">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="editplanschedule-list">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {items.map(({ id, content }, index) => (
                <Draggable key={id} draggableId={id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <EditPlanScheduleItem content={content} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <AddSchedule />
    </div>
  );
};

export default AIRecommendationList;
