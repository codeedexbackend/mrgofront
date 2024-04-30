import React from "react";
import PropTypes from "prop-types";

const Tab = ({ index, tab, isActive, handleCloseTab, handleTabClick }) => {
  return (
    <li style={{display:'flex'}} className={`nav-item${isActive ? " active" : ""}`}>
      <a
        className="nav-link"
        style={{ cursor: "pointer" }}
        onClick={() => {
          if (typeof handleTabClick === 'function') {
            handleTabClick(index);
          }
        }}
      >
        {tab.label}
      </a>
      {!tab.closed && (
        <button
          type="button"
          className="btn btn-close ms-2"
          aria-label="Close"
          onClick={(e) => {
            e.stopPropagation();
            if (typeof handleCloseTab === 'function') {
              handleCloseTab(index);
            }
          }}
        >
          ×
        </button>
      )}
    </li>
  );
};


export default Tab;