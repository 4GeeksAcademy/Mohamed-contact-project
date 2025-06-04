import React, { useState } from "react"; 
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link, useNavigate } from "react-router-dom";


export const Input = () => {



    const {store, dispatch} = useGlobalReducer();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    async function addNewContact() {
         e.preventDefault();
       if (name === "" || phone === "" || email === "" || address === "") {
        alert("Missing a field");
        return;
    }
        const requestBody = {
            name: name, 
            email: email, 
            phone: phone,  
            address: address, 
        };

         const response = await fetch(
        `${store.BASE_URL}/${store.SLUG}/contacts`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody)
        }
    );

         const body = await response.json();
        if (!response.ok) {
            alert(`status:${response.status}, message: ${body}`);
            return;
        }
    
        dispatch({ type: "add_contact", payload: { contact: body } });
        setName("");
        setPhone("");
        setEmail(""); 
        setAddress("");
        navigate("/");
    }


   



    return (
        <form className="contact-input-form" onSubmit={addNewContact}>
            <div>
                <input
                    type="text"
                    name="fullName"
                    placeholder=" full name"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    
                />
            </div>
            <div>
               
                <input
                    type="email"
                    name="email"
                    placeholder=" Email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            <div>
               
                <input
                    type="tel"
                    name="phone"
                    placeholder=" Phone number"
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
                    onChange ={e => setAddress(e.target.value)}
                />
            </div>
            <button type="submit" className="btn btn-primary">Save Contact</button>
            <Link to="/" className="btn btn-secondary">Back Home</Link>
        </form>
    );
};