import React from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";


export const Card = () => {
    return (
        <div className="contact-card">
            <img
                className="contact-photo"
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Someone's profile"
            />
            <div className="contact-info">
                <h3>Someone</h3>
                <p><strong>Phone:</strong> 123 456 1076</p>
                <p><strong>Email:</strong> someone@example.com</p>
                <p><strong>Address:</strong> 123 Main St, Cityville</p>
            </div>
            <div className="contact-actions">
                <button className="icon-btn">
                    <FiEdit2 />
                </button>
                <button className="icon-btn">
                    <FiTrash2 />
                </button>
            </div>
        </div>
    );
};