import React, { useEffect, useState } from 'react';
import Card from './Card';
import '../styles/Status.css';

// Import images
import plusmore from './plusmore.png';
import nopriorityimg from './No-priority.svg';

const Board = () => {
    const [tick, setTick] = useState([]);
    const [backlog, setBacklog] = useState(0);

    useEffect(() => {
        fetchData();
        calculateCounts();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment");
            const result = await response.json();
            setTick(result.tickets);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const calculateCounts = () => {
        let backlogCount = 0;

        tick.forEach(ticket => {
            if (ticket.status === "backlog") backlogCount++;
        });

        setBacklog(backlogCount);
    };

    return (
        <div className='Board'>
            <div className='boardHeading'>
                <img src={nopriorityimg} className='headingImg' alt='' />
                <p className='cText' style={{ width: "190px" }}>No-Priority</p>
                <p className='cText'>{backlog}</p>
                <div className='boardHeading' id='pluske'>
                    <img src={plusmore} className='headingImg' alt='' />
                </div>
            </div>

            <div className='Cards'>
                {tick.filter(ticket => ticket.priority === 0).map(ticket => (
                    <Card key={ticket.id} ticket={ticket} />
                ))}
            </div>
        </div>
    );
};

export default Board;
