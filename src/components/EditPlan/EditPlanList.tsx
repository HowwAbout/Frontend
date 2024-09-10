import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import EditPlanListItem from "./EditPlanListItem";

// 로컬 스토리지 키
const LOCAL_STORAGE_KEY = "editPlanListOrder";

interface PlanActivityResponse {
  planActivityId: number;
  datePlanId: number;
  dateActivityResponse: {
    dateActivityId: number;
    title: string;
    location: string;
    durationTime: string;
    description: string;
  };
  order: number;
}

interface DatePlan {
  id: number;
  title: string;
  date: string;
  description: string;
  planActivityResponseList: {
    planActivities: PlanActivityResponse[];
  };
  liked?: boolean; // Adding liked property to DatePlan type
}

interface EditPlanListProps {
  datePlan: DatePlan;
}

const EditPlanList: React.FC<EditPlanListProps> = ({ datePlan }) => {
  // 리스트 상태를 초기화
  const [items, setItems] = useState<
    { id: string; title: string; checked: boolean }[]
  >([]);

  useEffect(() => {
    // dateActivityResponse.title을 기반으로 배열 생성
    const newItems = datePlan.planActivityResponseList.planActivities.map(
      (activity) => ({
        id: activity.dateActivityResponse.dateActivityId.toString(),
        title: activity.dateActivityResponse.title,
        checked: false,
      })
    );

    // items 상태 업데이트
    setItems(newItems);
  }, [datePlan]);

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
                      title={item.title}
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
