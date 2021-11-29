export const DragDropController = ({
  sourceList,
  destinationStatus,
  draggableID,
}) => {
  // console.log(sourceList);
  const taskToMove = sourceList.filter((task) => {
    if (task.id === draggableID) {
      task.status = destinationStatus;
      return task;
    }
  });
  const sourceListUpdated = sourceList.filter(
    (task) => task.id !== draggableID
  );

  return { taskToMove, sourceListUpdated };
};
