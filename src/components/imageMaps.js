// imageMaps.js

// import tag from '../assets/images/tag.png'; 
import img0 from '../assets/images/No-priority.svg';
import img4 from '../assets/images/SVG - Urgent Priority colour.svg';
import img3 from '../assets/images/HighPriority.svg';
import img2 from '../assets/images/Img - Medium Priority.svg';
import img1 from '../assets/images/Img - Low Priority.svg';
import done from '../assets/images/Done.svg';
import cancelled from '../assets/images/Cancelled.svg';
import backlogimg from '../assets/images/Backlog.svg';
import inprogressimg from '../assets/images/in-progress.svg';
import todo from '../assets/images/To-do.svg';
import usr1 from '../assets/images/usr-1.png';
import usr2 from '../assets/images/usr-2.png';
import usr3 from '../assets/images/usr-3.png';
import usr4 from '../assets/images/usr-4.png';
import usr5 from '../assets/images/usr-5.png';
import usr6 from '../assets/images/usr-6.png';
import usr7 from '../assets/images/usr-7.png';

// Map for ticket priority images
export const priorityImageMap = {
  high: img3,
  medium: img2,
  low: img1,
  urgent: img4,
  default: img0 // Default image for no priority
};

// Map for ticket status images
export const statusImageMap = {
  done: done,
  cancelled: cancelled,
  backlog: backlogimg,
  inProgress: inprogressimg,
  todo: todo,
  default: todo // Default image for unknown status
};

// Map for user images
export const usrImageMap = {
  1: usr1,
  2: usr2,
  3: usr3,
  4: usr4,
  5: usr5,
  6: usr6,
  7: usr7,
  default: usr1 // Default user image
};
