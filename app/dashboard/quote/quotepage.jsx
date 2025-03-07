"use client";
import React, { useState, useEffect } from "react";
// import axios from "axios";
import Swal from "sweetalert2";
// import { API_BASE_URL } from "../../utlis";
import "./QuotePage.css";
import { quoteDelete, quoteGET, quotePAtch, quotePOSt } from "../../../api/page";

export default function QuotePage() {
    const [quotes, setQuotes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({ quote: "", author: "", date: "" });
    const [editMode, setEditMode] = useState(false);
    const [selectedQuote, setSelectedQuote] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const accessToken = localStorage.getItem("accessToken");

    useEffect(() => {
        fetchQuotes();
    }, []);

    const fetchQuotes = async () => {
        setLoading(true);
        try {
            // const headers = { Authorization: `Bearer ${accessToken}` };
            // const response = await axios.get(`${API_BASE_URL}/quote`, { headers });
            const response = await quoteGET()
            setQuotes(response.data);
        } catch (error) {
            console.error("Error fetching quotes:", error);
            setError("There was an error fetching the quotes.");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);

        try {
            const headers = { Authorization: `Bearer ${accessToken}` };

            if (editMode && selectedQuote) {
                // await axios.patch(
                //     `${API_BASE_URL}/quote/${selectedQuote._id}`,
                //     formData,
                //     { headers }
                // );
                const id = selectedQuote._id
                const data = formData
                const response = await quotePAtch(id, data)
                if (response) {

                    Swal.fire("Updated!", "Quote updated successfully.", "success");
                }
            } else {
                // await axios.post(`${API_BASE_URL}/quote`, formData, { headers });
                const data = formData
                const response = await quotePOSt(data)
                if (response) {

                    Swal.fire("Created!", "Quote created successfully.", "success");
                }
            }

            setFormData({ quote: "", author: "", date: "" });
            setEditMode(false);
            setSelectedQuote(null);
            setIsModalOpen(false);
            fetchQuotes();
        } catch (error) {
            console.error("Error submitting quote:", error);
            setError("There was an error processing your request.");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (quote) => {
        setEditMode(true);
        setSelectedQuote(quote);
        setFormData({ quote: quote.quote, author: quote.author, date: quote.date });
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            // const headers = { Authorization: `Bearer ${accessToken}` };
            // await axios.delete(`${API_BASE_URL}/quote/${id}`, { headers });
            const response = await quoteDelete(id);
            if (response) {

                Swal.fire("Deleted!", "Quote deleted successfully.", "success");
                fetchQuotes();
            }
        } catch (error) {
            console.error("Error deleting quote:", error);
            setError("There was an error deleting the quote.");
        }
    };

    return (
        <div>
            <h1 className="quote-page-title">Quotes</h1>
            {error && <p className="quote-page-error">{error}</p>}

            <button
                className="quote-page-add-btn"
                onClick={() => {
                    setIsModalOpen(true);
                    setEditMode(false);
                }}
            >
                Add New Quote
            </button>

            <table className="quote-table">
                <thead>
                    <tr>
                        <th>Quote</th>
                        <th>Author</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>

                    {quotes?.Quotes?.length > 0 ? (
                        quotes?.Quotes?.map((quote, i) => (
                            <tr key={i}>
                                <td>{quote.quote}</td>
                                <td>{quote.author}</td>
                                <td>{quote.date}</td>
                                <td>
                                    <button
                                        className="quote-edit-btn"
                                        onClick={() => handleEdit(quote)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="quote-delete-btn"
                                        onClick={() => handleDelete(quote._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" style={{ textAlign: "center" }}>
                                No quotes found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {isModalOpen && (
                <div className="quote-modal-overlay">
                    <div className="quote-modal">
                        <h2 className="quote-modal-title">
                            {editMode ? "Edit Quote" : "Create Quote"}
                        </h2>
                        <form
                            className="quote-modal-form"
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSubmit();
                            }}
                        >
                            <div className="quote-form-group">
                                <label>Quote:</label>
                                <textarea
                                    value={formData.quote}
                                    onChange={(e) =>
                                        setFormData({ ...formData, quote: e.target.value })
                                    }
                                    required
                                />
                            </div>
                            <div className="quote-form-group">
                                <label>Author:</label>
                                <input
                                    type="text"
                                    value={formData.author}
                                    onChange={(e) =>
                                        setFormData({ ...formData, author: e.target.value })
                                    }
                                    required
                                />
                            </div>
                            <div className="quote-form-group">
                                <label>Date:</label>
                                <input
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) =>
                                        setFormData({ ...formData, date: e.target.value })
                                    }
                                    required
                                />
                            </div>
                            <button
                                className="quote-submit-btn"
                                type="submit"
                                disabled={loading}
                            >
                                {editMode ? "Update" : "Create"}
                            </button>
                            <button
                                className="quote-cancel-btn"
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
