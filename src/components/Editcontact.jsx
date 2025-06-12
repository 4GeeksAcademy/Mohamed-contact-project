import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Editcontact = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { store, dispatch } = useGlobalReducer();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    useEffect(() => {
        // Find the contact to edit
        const contact = store.contacts.find(contact => contact.id === parseInt(id));
        if (contact) {
            setFormData({
                name: contact.name,
                email: contact.email,
                phone: contact.phone,
                address: contact.address
            });
        }
    }, [id, store.contacts]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch(
                `${store.BASE_URL}/${store.SLUG}/contacts/${id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData)
                }
            );

            if (!response.ok) {
                throw new Error('Failed to update contact');
            }

            const updatedContact = await response.json();
            dispatch({ 
                type: "update_contact", 
                payload: { contact: { ...updatedContact, id: parseInt(id) } } 
            });
            
            navigate("/");
        } catch (error) {
            console.error("Error updating contact:", error);
            alert("Failed to update contact. Please try again.");
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Edit Contact</h2>
            <form onSubmit={handleSubmit} className="contact-input-form">
                <div className="mb-3">
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="tel"
                        name="phone"
                        className="form-control"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        name="address"
                        className="form-control"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="d-flex justify-content-center gap-2">
                    <button type="submit" className="btn btn-primary">
                        Update Contact
                    </button>
                    <button 
                        type="button" 
                        className="btn btn-secondary"
                        onClick={() => navigate("/")}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}; 