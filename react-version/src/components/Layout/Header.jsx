import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header
      style={{
        borderBottom: "1px solid #e5e7eb",
        backgroundColor: "white",
        position: "sticky",
        top: 0,
        zIndex: 40,
      }}
    >
      <div className="container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1rem 0",
          }}
        >
          <Link
            to="/dashboard"
            style={{
              fontSize: "1.25rem",
              fontWeight: "bold",
              color: "#3b82f6",
              textDecoration: "none",
            }}
          >
            TicketFlow
          </Link>

          <nav className="navigation">
            <Link
              to="/dashboard"
              style={{
                fontSize: "1.25rem",
                fontWeight: "bold",
                color: "#3b82f6",
                textDecoration: "none",
              }}
            >
              Multi-Framework Tickets
            </Link>
            <Link
              to="/tickets"
              style={{
                textDecoration: "none",
                color: "#374151",
                padding: "0.5rem 1rem",
              }}
            >
              Tickets
            </Link>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <span style={{ color: "#4b5563" }}>Welcome, {user?.name}</span>
              <button
                onClick={handleLogout}
                className="btn btn-secondary"
                style={{ fontSize: "14px" }}
              >
                Logout
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
