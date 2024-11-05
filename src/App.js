import './App.css';
import Header from './components/Header.js';
import Status from './components/Status.js';
import Priority from './components/Priority.js';
import User from './components/ApiServer.js';
import { useState } from 'react';
// Uncomment if React Router is used
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [grouping, setGrouping] = useState(localStorage.getItem('grouping') || 'status');
  const [order, setOrder] = useState(localStorage.getItem('order') || 'Priority');

  const setGroupingValue = (newValue) => {
    if (newValue === 'status' || newValue === 'priority' || newValue === 'user') {
      setGrouping(newValue);
      localStorage.setItem('grouping', newValue); // Save to localStorage
    } else {
      console.error('Invalid grouping value provided:', newValue);
    }
  };

  const setOrderingValue = (newValue) => {
    if (newValue === 'Priority' || newValue === 'Title') {
      setOrder(newValue);
      localStorage.setItem('order', newValue); // Save to localStorage
    } else {
      console.error('Invalid ordering value provided:', newValue);
    }
  };

  let content;
  if (grouping === 'status') {
    content = <Status order={order} />;
  } else if (grouping === 'priority') {
    content = <Priority order={order} />;
  } else {
    content = <User order={order} />;
  }

  return (
    <div className="fullBody">
      <Header 
        order={order} 
        grouping={grouping} 
        setGroupingValue={setGroupingValue} 
        setOrderingValue={setOrderingValue} 
      />
      {content}

      {/* Optional React Router setup */}
      {/* 
      <Router>
        <Header 
          order={order} 
          grouping={grouping} 
          setGroupingValue={setGroupingValue} 
          setOrderingValue={setOrderingValue} 
        />
        <Routes>
          <Route path="/" element={<Status order={order} />} />
          <Route path="/user" element={<User order={order} />} />
          <Route path="/priority" element={<Priority order={order} />} />
        </Routes>
      </Router> 
      */}
    </div>
  );
}

export default App;
