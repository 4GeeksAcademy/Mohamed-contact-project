import React from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";

export const Contact = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    const handleEdit = (id) => {
        navigate(`/edit/${id}`);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this contact?")) return;
        try {
            const res = await fetch(`${store.BASE_URL}/${store.SLUG}/contacts/${id}`, {
                method: "DELETE"
            });
            if (res.ok) {
                dispatch({ type: "delete_contact", payload: { id } });
            } else {
                alert("Failed to delete contact");
            }
        } catch (error) {
            console.error("Error deleting contact:", error);
            alert("Failed to delete contact. Please try again.");
        }
    };

    //contacts  array
    const contacts = Array.isArray(store.contacts) ? store.contacts : [];

    return (
        <div className="page-center">
            {contacts.length === 0 && <p>No contacts found.</p>}
            {contacts.map(contact => (
                <div className="contact-card" key={contact.id}>
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
                        <button 
                            className="icon-btn" 
                            onClick={() => handleEdit(contact.id)}
                            title="Edit contact"
                        >
                            <FiEdit2 />
                        </button>
                        <button 
                            className="icon-btn" 
                            onClick={() => handleDelete(contact.id)}
                            title="Delete contact"
                        >
                            <FiTrash2 />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};