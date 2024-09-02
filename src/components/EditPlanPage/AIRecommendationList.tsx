import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import AIRecommendationItem from "./AIRecommendationItem"; // Adjust the import path as necessary
import "./AIRecommendationList.css"; // Ensure to style the list if needed

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
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="airecommendation-list">
        {(provided) => (
          <div
            className="airecommendation-list"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {items.map(({ id, content }, index) => (
              <Draggable key={id} draggableId={id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <AIRecommendationItem content={content} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default AIRecommendationList;
