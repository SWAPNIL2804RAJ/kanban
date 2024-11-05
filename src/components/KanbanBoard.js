import React, { useEffect, useState, useMemo } from 'react';
import '../styles/KanbanBoard.css';

const KanbanBoard = ({ grouping }) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch ticket data from the API
    setLoading(true);
    fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setTickets(data);
        } else {
          console.error("Unexpected data format:", data);
          setError("Unexpected data format");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Failed to load tickets");
      })
      .finally(() => setLoading(false));
  }, []);

  const groupedTickets = useMemo(() => {
    if (!Array.isArray(tickets)) return {};

    switch (grouping) {
      case "Status":
        return groupBy(tickets, "status");
      case "User":
        return groupBy(tickets, "assigned_to");
      case "Priority":
        return groupBy(tickets, "priority");
      default:
        return {};
    }
  }, [tickets, grouping]);

  const groupBy = (array, key) => {
    return array.reduce((result, item) => {
      (result[item[key]] = result[item[key]] || []).push(item);
      return result;
    }, {});
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="kanban-board">
      {Object.keys(groupedTickets).map((group) => (
        <div key={group} className="kanban-column">
          <h2>{group}</h2>
          {groupedTickets[group].map((ticket) => (
            <div key={ticket.id} className="kanban-card">
              <p>{ticket.title}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
