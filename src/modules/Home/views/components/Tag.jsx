import React, { useState } from "react";

export const Tag = ({ tag, handleDeleteTag }) => {
  const [showTrash, setShowTrash] = useState(false);

  const colorCondition =
    tag.color === "#ffeb3b" ||
    tag.color === "#cddc39" ||
    tag.color === "#ffc107"
      ? "#000"
      : "#fff";

  return (
    <div
      className="tag"
      style={{ backgroundColor: tag.color, color: colorCondition }}
      onClick={() => setShowTrash(!showTrash)}
    >
      {tag.tag}
      {showTrash && handleDeleteTag && (
        <i
          className="fas fa-trash icon"
          style={{ color: colorCondition }}
          onClick={() => handleDeleteTag(tag.tag)}
        ></i>
      )}
    </div>
  );
};
