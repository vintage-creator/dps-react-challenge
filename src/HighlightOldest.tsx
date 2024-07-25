import React from 'react';

interface HighlightOldestProps {
  onHighlightChange: (highlight: boolean) => void;
}

const HighlightOldest: React.FC<HighlightOldestProps> = ({ onHighlightChange }) => {
  return (
    <div className="filter-container">
      <div className="highlight-checkbox">
        <div style={{marginRight: '10px'}}><b>Highlight oldest<br/> per city</b></div>
        <div>
        <input
          type="checkbox"
          onChange={(e) => onHighlightChange(e.target.checked)}
        />
        </div>
      </div>
    </div>
  );
};

export default HighlightOldest;