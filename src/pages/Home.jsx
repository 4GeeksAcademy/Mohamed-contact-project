import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Contact } from "../components/Contact.jsx";

export const Home = () => {
    const { store, dispatch } = useGlobalReducer();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchContacts = async () => {
            // Only fetch if contacts array is empty or undefined and not already loading
            if ((!store.contacts || store.contacts.length === 0) && !isLoading) {
                setIsLoading(true);
                setError(null);
                
                try {
                    const response = await fetch(`${store.BASE_URL}/${store.SLUG}/contacts`);
                    
                    if (response.status === 429) {
                        throw new Error('Too many requests. Please wait a moment and try again.');
                    }
                    
                    if (!response.ok) {
                        throw new Error('Failed to fetch contacts');
                    }

                    const data = await response.json();
                    // Ensure we're setting an array of contacts
                    const contactsArray = Array.isArray(data) ? data : data.contacts || [];
                    dispatch({ type: "set_contacts", payload: { contacts: contactsArray } });
                } catch (error) {
                    console.error("Error fetching contacts:", error);
                    setError(error.message);
                    // Initialize with empty array on error
                    dispatch({ type: "set_contacts", payload: { contacts: [] } });
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchContacts();
    }, [store.BASE_URL, store.SLUG]); // Remove store.contacts from dependencies

    return (
        <div className="text-center mt-5">
            {isLoading && <p>Loading contacts...</p>}
            {error && <p className="text-danger">{error}</p>}
            <Contact />
        </div>
    );
};