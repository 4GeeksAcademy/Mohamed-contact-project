import React, { useEffect, useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";

export const Contact = () => {
    const { store } = useGlobalReducer();
    const [contacts, setContacts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchContacts() {
            const res = await fetch(`${store.BASE_URL}/${store.SLUG}/contacts`);
            const data = await res.json();
            setContacts(data.contacts || data); 
        }
        fetchContacts();
    }, [store.BASE_URL, store.SLUG]);

    const handleEdit = (id) => {
        navigate(`/edit/${id}`);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this contact?")) return;
        const res = await fetch(`${store.BASE_URL}/${store.SLUG}/contacts/${id}`, {
            method: "DELETE"
        });
        if (res.ok) {
            setContacts(contacts.filter(contact => contact.id !== id));
        } else {
            alert("Failed to delete contact");
        }
    };

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
                        <button className="icon-btn" onClick={() => handleEdit(contact.id)}>
                            <FiEdit2 />
                        </button>
                        <button className="icon-btn" onClick={() => handleDelete(contact.id)}>
                            <FiTrash2 />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};