import React from 'react';
import '../styles/CardComponent.css';
import {
  priorityImageMap,
  statusImageMap,
  usrImageMap,
} from './imageMaps';

const Card = ({ ticket, titleDisplay = true, statusDisplay = true }) => {
  const imgSrc = priorityImageMap[ticket.priority] || priorityImageMap.default;
  const statusImgSrc = statusImageMap[ticket.status] || statusImageMap.default;
  const usrImage = usrImageMap[ticket.userId] || usrImageMap.default;
  const dotClass = ticket.available ? 'availableUser' : 'notAvailableUser';

  return (
    <div className='cardBox'>
      <div className='cardHeader'>
        <span className='cardId'>{ticket.id}</span>
        {titleDisplay && (
          <div className='cardTitle'>
            {statusDisplay && <img src={statusImgSrc} alt='status' />}
            {ticket.title}
          </div>
        )}
      </div>
      <div className='userSection'>
        <img className='userImg' src={usrImage} alt='user' />
        <div className={dotClass} />
      </div>
      <div className='cardFooter'>
        <img className='priorityImg' src={imgSrc} alt='priority' />
        <div className='tagBox'>
          <img src='/path/to/tag.png' alt='tag' />
          <span className='tagText'>{ticket.tag || 'No Tag'}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
