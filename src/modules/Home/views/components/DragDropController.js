export const DragDropController = ({
  sourceList,
  destinationStatus,
  draggableID,
}) => {
  console.log(sourceList);
  const taskToMove = sourceList.filter((t) => {
    if (t.id === draggableID) {
      t.status = destinationStatus;
      return t;
    }
  });
  const sourceListUpdated = sourceList.filter((t) => t.id !== draggableID);

  return { taskToMove, sourceListUpdated };
};
