import React from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Card = ({ contact }) => {
    const navigate = useNavigate();
    const { store } = useGlobalReducer();

    // Edit handler: navigate to the edit page for this contact
    const handleEdit = () => {
        navigate(`/edit/${contact.id}`);
    };

    // Delete handler: call API to delete, then refresh or navigate
    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this contact?")) return;
        const res = await fetch(`${store.BASE_URL}/${store.SLUG}/contacts/${contact.id}`, {
            method: "DELETE"
        });
        if (!res.ok) {
            alert("Failed to delete contact");
            return;
        }
        // Optionally: refresh the contact list or navigate
        window.location.reload(); // or call a prop function to update the list
    };

    return (
        <div className="page-center">
            <div className="contact-card">
                <img
                    className="contact-photo"
                    src={contact.photo || "https://randomuser.me/api/portraits/men/32.jpg"}
                    alt={`${contact.name}'s profile`}
                />
                <div className="contact-info">
                    <h3>{contact.name}</h3>
                    <p><strong>Phone:</strong> {contact.phone}</p>
                    <p><strong>Email:</strong> {contact.email}</p>
                    <p><strong>Address:</strong> {contact.address}</p>
                </div>
                <div className="contact-actions">
                    <button className="icon-btn" onClick={handleEdit}>
                        <FiEdit2 />
                    </button>
                    <button className="icon-btn" onClick={handleDelete}>
                        <FiTrash2 />
                    </button>
                </div>
            </div>
        </div>
    );
};