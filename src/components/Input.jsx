import React from "react";

export const Input = () => {
    return (
        <form className="contact-input-form">
            <div>
               
                <input
                    type="text"
                    name="fullName"
                    placeholder=" Full name"
                    required
                />
            </div>
            <div>
               
                <input
                    type="email"
                    name="email"
                    placeholder=" Email"
                    required
                />
            </div>
            <div>
               
                <input
                    type="tel"
                    name="phone"
                    placeholder=" Phone number"
                    required
                />
            </div>
            <div>
                
                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary">Save Contact</button>
        </form>
    );
};