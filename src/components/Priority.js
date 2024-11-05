// Priority.js
import React, { useEffect, useState } from 'react';
import '../styles/Status.css';
import CardPriority from './CardPriority';

// Importing Images
import nopriorityimg from '../assets/images/No-priority.svg';
import urgentimg from '../assets/images/SVG - Urgent Priority colour.svg';
import highimg from '../assets/images/HighPriority.svg';
import mediumimg from '../assets/images/Img - Medium Priority.svg';
import lowimg from '../assets/images/Img - Low Priority.svg';
import plusmore from '../assets/images/add.svg';

const Priority = () => {
    const [tick, setTick] = useState([]);
    const [nopriority, setNopriority] = useState([]);
    const [lowpriority, setLowpriority] = useState([]);
    const [mediumpriority, setMediumpriority] = useState([]);
    const [hightpriority, setHightpriority] = useState([]);
    const [urgent, setUrgent] = useState([]);

    useEffect(() => {
        fetchTickets();
    }, []);

    useEffect(() => {
        categorizeTickets();
    }, [tick]);

    const fetchTickets = async () => {
        try {
            const response = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment");
            const result = await response.json();
            setTick(result.tickets);
        } catch (error) {
            console.error("Error fetching tickets:", error);
        }
    };

    const categorizeTickets = () => {
        const noprioritypre = tick.filter(ticket => ticket.priority === 0);
        const lowprioritypre = tick.filter(ticket => ticket.priority === 1);
        const mediumprioritypre = tick.filter(ticket => ticket.priority === 2);
        const hightprioritypre = tick.filter(ticket => ticket.priority === 3);
        const urgentpre = tick.filter(ticket => ticket.priority === 4);

        setNopriority(noprioritypre);
        setLowpriority(lowprioritypre);
        setMediumpriority(mediumprioritypre);
        setHightpriority(hightprioritypre);
        setUrgent(urgentpre);
    };

    return (
        <div className='Boards'>
            {[{ list: nopriority, name: "No Priority", img: nopriorityimg },
              { list: urgent, name: "Urgent", img: urgentimg },
              { list: hightpriority, name: "High", img: highimg },
              { list: mediumpriority, name: "Medium", img: mediumimg },
              { list: lowpriority, name: "Low", img: lowimg }].map((priority, index) => (
                <div className='Board' key={index}>
                    <div className='boardHeading'>
                        <img src={priority.img} className='headingImg' alt={priority.name} />
                        <p className='cText'>{priority.name}</p>
                        <p className='cText'>{priority.list.length}</p>
                        <img src={plusmore} className='headingImg' alt='Add' />
                    </div>
                    <div className='Cards'>
                        {priority.list.map(ticket => (
                            <CardPriority key={ticket.id} ticket={ticket} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Priority;
