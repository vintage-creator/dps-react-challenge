import React from 'react';
import { Select } from 'antd';

interface CityFilterProps {
  cities: string[];
  onCityChange: (city: string) => void;
}

const CityFilter: React.FC<CityFilterProps> = ({ cities, onCityChange }) => {
  return (
    <div className="filter-city" style={{marginRight: '-2px'}}>
      <div><b>City</b></div>
      <Select
      className="filter-select"
      defaultValue="Select City"
      onChange={onCityChange}
      style={{ border: '2px solid black', width: 200, height: 33, borderRadius: '7px'}}
    >
      <Select.Option value="Select City">Select City</Select.Option>
      {cities.map((city) => (
        <Select.Option key={city} value={city}>
          {city}
        </Select.Option>
      ))}
    </Select>
    </div>
    
  );
};

export default CityFilter;