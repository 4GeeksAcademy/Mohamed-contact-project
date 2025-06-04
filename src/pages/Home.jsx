import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Contact } from "../components/Contact.jsx";


export const Home = () => {
    const { store, dispatch } = useGlobalReducer();

    useEffect(() => {
        // Only fetch if contacts are empty
        if (store.contacts.length === 0) {
            fetch(`${store.BASE_URL}/${store.SLUG}/contacts`)
                .then(res => res.json())
                .then(data => {
                    dispatch({ type: "set_contacts", payload: { contacts: data } });
                });
        }
    }, [store.BASE_URL, store.SLUG, store.contacts.length, dispatch]);

    return (
        <div className="text-center mt-5">
            {store.contacts.map(contact => (
                <div key={contact.id}>
                    <h3>{contact.name}</h3>
                    <p>{contact.email}</p>
                    <p>{contact.phone}</p>
                    <p>{contact.address}</p>
                </div>
            ))}
            <Contact />
        </div>
    );
};