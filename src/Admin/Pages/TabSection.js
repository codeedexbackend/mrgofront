import React, { useState } from "react";

const TabSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`tab-section ${isOpen ? "open" : ""}`}>
      <button className="tab-header" onClick={() => setIsOpen(!isOpen)}>
        {title}
        <i className={`fas ${isOpen ? "fa-chevron-up" : "fa-chevron-down"}`} />
      </button>
      {isOpen && <div className="tab-content">{children}</div>}
    </div>
  );
};

export default TabSection;