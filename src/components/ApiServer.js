import React, { useEffect, useState } from 'react';
import CardUser from './Card1';
import '../styles/Status.css';

// Import images
import usr1 from '../assets/images/usr-1.png';
import usr2 from '../assets/images/usr-2.png';
import usr3 from '../assets/images/usr-3.png';
import usr4 from '../assets/images/usr-4.png';
import usr5 from '../assets/images/usr-5.png';
import usr6 from '../assets/images/usr-6.png';
import usr7 from '../assets/images/usr-7.png';

const ApiServer = (props) => {
    const [tick, setTick] = useState([]);
    const [users, setUsers] = useState([]);
    const [userMass, setUserMass] = useState([]);
    const [order, setOrder] = useState(localStorage.getItem('order'));

    const userImageMap = {
        "usr-1": usr1,
        "usr-2": usr2,
        "usr-3": usr3,
        "usr-4": usr4,
        "usr-5": usr5,
        "usr-6": usr6,
        "usr-7": usr7,
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        organizeTickets();
    }, [tick, users, props.order]);

    const fetchData = async () => {
        try {
            const response = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment");
            const result = await response.json();
            setTick(result.tickets);
            setUsers(result.users);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const organizeTickets = () => {
        const massPre = users.map(user => {
            const userTickets = tick.filter(ticket => ticket.userId === user.id);

            if (props.order === "Title") {
                userTickets.sort((a, b) => a.title.localeCompare(b.title));
            } else {
                userTickets.sort((b, a) => parseInt(a.priority) - parseInt(b.priority));
            }

            return userTickets;
        });

        setUserMass(massPre);
    };

    return (
        <div className='Boards'>
            {userMass.map((userTickets, index) => (
                <div key={index} className='Board'>
                    <div className='boardHeading'>
                        <img
                            src={userTickets[0] ? userImageMap[userTickets[0].userId] : usr1}
                            className='headingImg2'
                            alt=''
                        />
                        <p className='cText' style={{ width: "500px" }}>
                            {users.find(user => user.id === userTickets[0]?.userId)?.name || ''}
                        </p>
                        <p className='cText'>{userTickets.length}</p>
                    </div>

                    <div className='Cards'>
                        {userTickets.map(ticket => (
                            <CardUser key={ticket.id} ticket={ticket} available={userTickets.length > 0} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ApiServer;
