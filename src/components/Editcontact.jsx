import React, { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate, useParams } from "react-router-dom";

export const EditContact = () => {
    const { store } = useGlobalReducer();
    const navigate = useNavigate();
    const { id } = useParams();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    useEffect(() => {
        async function fetchContact() {
            const res = await fetch(`${store.BASE_URL}/${store.SLUG}/contacts/${id}`);
            if (!res.ok) {
                alert("Failed to fetch contact");
                navigate("/");
                return;
            }
            const data = await res.json();
            setName(data.name || "");
            setEmail(data.email || "");
            setPhone(data.phone || "");
            setAddress(data.address || "");
        }
        fetchContact();
    }, [id, store.BASE_URL, store.SLUG, navigate]);

    async function handleUpdate(e) {
        e.preventDefault();
        const requestBody = { name, email, phone, address };
        const res = await fetch(`${store.BASE_URL}/${store.SLUG}/contacts/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody),
        });
        if (!res.ok) {
            alert("Failed to update contact");
            return;
        }
        navigate("/");
    }

    return (
        <form className="contact-input-form" onSubmit={handleUpdate}>
            <h2>Edit Contact</h2>
            <div>
                <input
                    type="text"
                    name="fullName"
                    placeholder="Full name"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </div>
            <div>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            <div>
                <input
                    type="tel"
                    name="phone"
                    placeholder="Phone number"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                />
            </div>
            <div>
                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    required
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                />
            </div>
            <button type="submit" className="btn btn-primary"
           
            >Update Contact</button>
            <p 
                    className="text-decoration-underline text-primary"
                    onClick={e => navigate ("/")}
                    style={{ cursor: "pointer" }}
                    >Cancel
                    </p>
        </form>
    );
};