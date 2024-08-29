import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import EditPlanListItem from "./EditPlanListItem";

// 로컬 스토리지 키
const LOCAL_STORAGE_KEY = "editPlanListOrder";

const EditPlanList = () => {
  // 리스트 상태를 초기화
  const [items, setItems] = useState([
    { id: "1", content: "Item 1", checked: false },
    { id: "2", content: "Item 2", checked: false },
    { id: "3", content: "Item 3", checked: false },
  ]);

  // 로컬 스토리지에서 순서를 불러오기
  useEffect(() => {
    const savedItems = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY) || "[]"
    );
    if (savedItems.length) {
      setItems(savedItems);
    }
  }, []);

  // 리스트의 순서가 변경되었을 때 호출되는 함수
  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const newItems = Array.from(items);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);

    setItems(newItems);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newItems));
  };

  // 체크박스 클릭 시 호출되는 함수
  const toggleCheckbox = (id: string) => {
    const newItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(newItems);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newItems));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <EditPlanListItem
                      content={item.content}
                      checked={item.checked}
                      onToggle={() => toggleCheckbox(item.id)}
                    />
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

export default EditPlanList;
