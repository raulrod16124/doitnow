import React, { useState } from "react";

export const Tag = ({ tag, fromForm = false, handleDeleteTag }) => {
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
    >
      {tag.tag}
      {fromForm && (
        <i
          className="fas fa-times icon"
          style={{ color: colorCondition }}
          onClick={() => handleDeleteTag(tag.tag)}
        ></i>
      )}
    </div>
  );
};
