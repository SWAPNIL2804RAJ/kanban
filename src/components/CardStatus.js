import React, { useEffect, useState } from 'react';
import '../styles/CardComponent.css';

// import priority from '../assets/images/No-priority.svg';
import tag from '../assets/images/tag.png';
import img0 from '../assets/images/No-priority.svg'; // Updated path
import img4 from '../assets/images/SVG - Urgent Priority colour.svg'; // Updated path
import img3 from '../assets/images/HighPriority.svg'; // Updated path
import img2 from '../assets/images/Img - Medium Priority.svg'; // Updated path
import img1 from '../assets/images/Img - Low Priority.svg'; // Updated path
import done from '../assets/images/Done.svg'; // Updated path
import Cancelled from '../assets/images/Cancelled.svg'; // Updated path
import backlogimg from '../assets/images/Backlog.svg'; // Updated path
import inprogressimg from '../assets/images/in-progress.svg'; // Updated path
import todo from '../assets/images/To-do.svg'; // Updated path
import usr1 from '../assets/images/usr-1.png'; // Updated path
import usr2 from '../assets/images/usr-2.png'; // Updated path
import usr3 from '../assets/images/usr-3.png'; // Updated path
import usr4 from '../assets/images/usr-4.png'; // Updated path
import usr5 from '../assets/images/usr-5.png'; // Updated path
import usr6 from '../assets/images/usr-6.png'; // Updated path
import usr7 from '../assets/images/usr-7.png'; // Updated path




// import img from 

const CardStatus = (props) => {
    // let available = true;
    const [available, setavailable] = useState(false);
    // console.log({props});
    let imgt=`imgr${props.ticket.priority.toString()}`;
    // console.log(imgt);
    let dotuser;
    
    const [users, setusers] = useState([]);
    const [tick, setTick] = useState([]);

    useEffect(() => {

        hello();
        // count();


    }, []);

    async function hello() {
        try {
            const response = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment");

            const result = await response.json();

        setTick(result.tickets);
        setusers(result.users);
        } catch (error) {
            console.error("Error:", error);
        }


    }
    const priorityImageMap = {
        0: img0,
        1: img1,
        2: img2,
        3: img3,
        4: img4,
      };
    const statusImageMap={
        "Todo": todo,
        "In progress":inprogressimg,
        "Backlog":backlogimg,
        "Done":done,
        "Cancelled":Cancelled,

    }
    const usrImageMap = {
        "usr-1": usr1,
        "usr-2": usr2,
        "usr-3": usr3,
        "usr-4": usr4,
        "usr-5": usr5,
        "usr-6": usr6,
        "usr-7": usr7,
      };
      useEffect(() => {
        users.map((user) => {
                               
            if(
                props.ticket &&
                 user.id === props.ticket.userId){
                    setavailable(user.available);
                
            }  })   
      }, [users])
      
      
      const usrImage=usrImageMap[props.ticket.userId]||usr1;
      const imgSrc = priorityImageMap[props.ticket.priority] || img0;
      const statusImgSrc=statusImageMap[props.ticket.status]||todo;
    if(available===true){
        dotuser=<div className='availableUser' />;

    }else{
        dotuser=<div className='notavailableUser' />;
    }
   
    

    return (
        <div className='cardBox'>
            <div className='cardBoxrow'>
                <div className='cardBoxin'>
                    <text className='cardId'>{props.ticket.id}</text>
                    <text className='cardTitle'>
                        {/* <img  src={statusImgSrc}></img> */}
                        {props.ticket.title}</text>
                </div >
                <div style={{ height: "38px" }}>
                    <img className='userImg' src={usrImage} alt='' />
                    {dotuser}
                </div>
            </div>


            <div className='lowerBox'>
                <div className='priorityBox'><img className='priorityImg' src={imgSrc} alt='logo' /></div>

                <div className='tagBox'>
                    <img className='tagImg' src={tag} alt='logo' />
                    <tag className='tagText'>{props.ticket.tag}</tag>
                </div>

            </div>
        </div>
    );
};

export default CardStatus;