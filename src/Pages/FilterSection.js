// FilterSection.js
import React from 'react';
import { Checkbox, Radio } from 'antd';
import { Prices } from "../Components/Routes/Price";

const FilterSection = ({ categories, handleCheckboxChange, handleDropdownChange, setSelectedPrices }) => {
  return (
    <div className="col-3 col-md-2 filter">
      <div className="d-flex flex-column">
        <div className="heading">
          <h4 className="text-start">Filter by Categories</h4>
        </div>
        {categories.map((category) => (
          <Checkbox
            className="checkbox"
            key={category._id}
            onChange={(e) => handleCheckboxChange(e.target.checked, category._id)}
          >
            {category.name}
          </Checkbox>
        ))}
      </div>
      <div className="d-flex flex-column">
        <div className="heading">
          <h4 className="text-start">Filter by Prices</h4>
        </div>
        <Radio.Group onChange={(e) => setSelectedPrices(e.target.value)} style={{ textAlign: 'left' }}>
          {Prices.map((price) => (
            <div key={price._id}>
              <Radio className="radiobox" value={price.array}>
                {price.name}
              </Radio>
            </div>
          ))}
        </Radio.Group>
      </div>
    </div>
  );
};

export default FilterSection;
