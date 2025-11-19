import React, { useState } from "react";
import "./support.css";

const Support = () => {
  const [tickets, setTickets] = useState([
    {
      id: 1,
      user: "student1@university.com",
      issue: "Cannot access course materials",
      status: "Open",
      date: "2025-08-15",
      details: "Unable to log in to the course portal.",
    },
    {
      id: 2,
      user: "staff2@university.com",
      issue: "Payment system error",
      status: "Open",
      date: "2025-08-16",
      details: "Error processing tuition payment.",
    },
    {
      id: 3,
      user: "professor@university.com",
      issue: "Grade submission not working",
      status: "Pending",
      date: "2025-08-18",
      details: "System not saving entered grades for students.",
    },
    {
      id: 4,
      user: "admin@university.com",
      issue: "Email notifications delayed",
      status: "Open",
      date: "2025-08-19",
      details: "Students reporting delays in receiving system emails.",
    },
    {
      id: 5,
      user: "student2@university.com",
      issue: "Unable to reset password",
      status: "Closed",
      date: "2025-08-20",
      details: "Password reset link expired before use.",
    },
    {
      id: 6,
      user: "staff3@university.com",
      issue: "Course enrollment issue",
      status: "Open",
      date: "2025-08-21",
      details: "Student enrollment not reflecting in system.",
    },
    {
      id: 7,
      user: "student3@university.com",
      issue: "Library access denied",
      status: "Pending",
      date: "2025-08-22",
      details: "ID card not recognized by library entry system.",
    },
    {
      id: 8,
      user: "it.support@university.com",
      issue: "VPN not connecting",
      status: "Open",
      date: "2025-08-23",
      details: "Staff unable to connect to university VPN remotely.",
    },

  ]);

  const [response, setResponse] = useState("");
  const [selectedTicket, setSelectedTicket] = useState(null);

  const handleRespond = (ticketId) => {
    if (response) {
      setTickets(
        tickets.map((ticket) =>
          ticket.id === ticketId
            ? { ...ticket, status: "Resolved", response }
            : ticket
        )
      );
      setResponse("");
      setSelectedTicket(null);
    }
  };

  const handleViewDetails = (ticketId) => {
    setSelectedTicket(ticketId === selectedTicket ? null : ticketId);
  };

  return (
    <div className="support-container">
      <header className="support-header">
        <h2>Support</h2>
        <p className="support-subtext">
          View, respond, and manage all support here.
        </p>
      </header>

      <div className="tickets-list">
        {tickets.map((ticket) => (
          <div key={ticket.id} className="ticket-card">
            <div className="ticket-header">
              <div className="ticket-info">
                <h3>{ticket.issue}</h3>
                <p>From: {ticket.user}</p>
                <p>Date: {ticket.date}</p>
                <p>Status: {ticket.status}</p>
              </div>
            </div>

            {selectedTicket === ticket.id && (
              <div className="mt-4">
                <p>
                  <strong>Details:</strong> {ticket.details}
                </p>

                {ticket.status === "Open" && (
                  <div className="mt-3">
                    <textarea
                      placeholder="Type your response..."
                      value={response}
                      onChange={(e) => setResponse(e.target.value)}
                    />
                    <button
                      onClick={() => handleRespond(ticket.id)}
                      className="ticket-btn response-btn mt-2"
                    >
                      Send Response
                    </button>
                  </div>
                )}

                {ticket.response && (
                  <p className="mt-2">
                    <strong>Response:</strong> {ticket.response}
                  </p>
                )}
              </div>
            )}

            {/* ✅ View Details button moved here at the bottom */}
            <button
              onClick={() => handleViewDetails(ticket.id)}
              className="ticket-btn mt-3"
            >
              {selectedTicket === ticket.id ? "Hide Details" : "View Details"}
            </button>
          </div>

        ))}
      </div>
    </div>
  );
};

export default Support;
