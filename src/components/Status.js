// Status.js
import React, { useEffect, useState } from 'react';
import '../styles/Status.css';
import CardStatus from './CardStatus';

// Importing Images
import backlogimg from '../assets/images/Backlog.svg';
import todo from '../assets/images/To-do.svg';
import inprogressimg from '../assets/images/in-progress.svg';
import done from '../assets/images/Done.svg';
import cancelled from '../assets/images/Cancelled.svg';
import plusmore from '../assets/images/add.svg';

const Status = () => {
    const [tick, setTick] = useState([]);
    const [backlog, setBacklog] = useState([]);
    const [todolist, setTodolist] = useState([]);
    const [inProgress, setInProgress] = useState([]);
    const [doneList, setDoneList] = useState([]);
    const [cancelledList, setCancelledList] = useState([]);

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
        setBacklog(tick.filter(ticket => ticket.status === "Backlog"));
        setTodolist(tick.filter(ticket => ticket.status === "Todo"));
        setInProgress(tick.filter(ticket => ticket.status === "In progress"));
        setDoneList(tick.filter(ticket => ticket.status === "Done"));
        setCancelledList(tick.filter(ticket => ticket.status === "Cancelled"));
    };

    return (
        <div className='Boards'>
            {[{ list: backlog, name: "Backlog", img: backlogimg },
              { list: todolist, name: "Todo", img: todo },
              { list: inProgress, name: "In-Progress", img: inprogressimg },
              { list: doneList, name: "Done", img: done },
              { list: cancelledList, name: "Cancelled", img: cancelled }].map((status, index) => (
                <div className='Board' key={index}>
                    <div className='boardHeading'>
                        <img src={status.img} className='headingImg' alt={status.name} />
                        <p className='cText'>{status.name}</p>
                        <p className='cText'>{status.list.length}</p>
                        <img src={plusmore} className='headingImg' alt='Add' />
                    </div>
                    <div className='Cards'>
                        {status.list.map(ticket => (
                            <CardStatus key={ticket.id} ticket={ticket} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Status;
