import React, { useState } from 'react';
import '../styles/Status.css';
import '../styles/Dropdown.css';

function Dropdown({ setGroupingValue, setOrderingValue }) {
  const [selectedGrouping, setSelectedGrouping] = useState(localStorage.getItem('grouping') || 'status');
  const [selectedOrdering, setSelectedOrdering] = useState(localStorage.getItem('order') || 'Priority');

  const handleGroupingChange = (event) => {
    const value = event.target.value;
    setSelectedGrouping(value);
    setGroupingValue(value);
    localStorage.setItem('grouping', value);
  };

  const handleOrderingChange = (event) => {
    const value = event.target.value;
    setSelectedOrdering(value);
    setOrderingValue(value);
    localStorage.setItem('order', value);
  };

  return (
    <div className='dropdown'>
      <div className='dropdownGroup'>
        <label>Grouping</label>
        <select value={selectedGrouping} onChange={handleGroupingChange}>
          <option value="status">Status</option>
          <option value="priority">Priority</option>
          <option value="user">User</option>
        </select>
      </div>
      <div className='dropdownGroup'>
        <label>Ordering</label>
        <select value={selectedOrdering} onChange={handleOrderingChange}>
          <option value="Priority">Priority</option>
          <option value="Title">Title</option>
        </select>
      </div>
    </div>
  );
}

export default Dropdown;
