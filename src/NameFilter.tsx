import React from 'react';
import { Input } from 'antd';

interface NameFilterProps {
  onFilterChange: (value: string) => void;
}

const NameFilter: React.FC<NameFilterProps> = ({ onFilterChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange(e.target.value);
  };

  return (
    <div className="filter-name">
      <div><b>Name</b></div>
      <Input
      className="filter-input"
      placeholder="Filter by name"
      onChange={handleChange}
      style={{backgroundColor: '#fff', border: '2px solid black', height: 33}}
    />
    </div>
  );
};

export default NameFilter;