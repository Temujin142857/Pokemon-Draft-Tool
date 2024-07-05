// Card.js
import React from 'react';
import '../CSS/Card.css'; // Import the CSS file

const Card = ({ children }) => {
    return (
        <div className="card">
            {children}
        </div>
    );
};

export default Card;