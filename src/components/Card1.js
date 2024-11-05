import React, { useEffect, useState } from 'react';
import '../styles/CardComponent.css';
import {
  priorityImageMap,
  statusImageMap,
  usrImageMap,
} from './imageMaps'; // Assuming you create a shared imageMaps.js
import { fetchTicketsAndUsers } from './fetchUtils'; // Assuming you centralize the fetch logic

const CardUser = ({ ticket }) => {
  const [available, setAvailable] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const { users } = await fetchTicketsAndUsers();
      setUsers(users);
    };
    loadData();
  }, []);

  useEffect(() => {
    const user = users.find(user => user.id === ticket.userId);
    setAvailable(user ? user.available : false);
  }, [users, ticket.userId]);

  const imgSrc = priorityImageMap[ticket.priority] || priorityImageMap.default;
  const statusImgSrc = statusImageMap[ticket.status] || statusImageMap.default;
  const usrImage = usrImageMap[ticket.userId] || usrImageMap.default;
  const dotClass = available ? 'availableUser' : 'notAvailableUser';

  return (
    <div className='cardBox'>
      <div className='cardHeader'>
        <span className='cardId'>{ticket.id}</span>
        <div className='cardTitle'>
          <img src={statusImgSrc} alt='status' />
          {ticket.title}
        </div>
      </div>
      <div className='userSection'>
        <img className='userImg' src={usrImage} alt='user' />
        <div className={dotClass} />
      </div>
      <div className='cardFooter'>
        <img className='priorityImg' src={imgSrc} alt='priority' />
        <div className='tagBox'>
          <img src='/path/to/tag.png' alt='tag' />
          <span className='tagText'>{ticket.tag}</span>
        </div>
      </div>
    </div>
  );
};

export default CardUser;
