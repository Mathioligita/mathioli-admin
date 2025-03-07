
"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
// import axiosInstance from '../../../../axiosConfig';
import "../BookDetail.css";
// import axios from 'axios';
// import { API_BASE_URL } from '../../../utlis';
import { BookAPIGETSingle } from '../../../../api/page';

export default function Page() {
    const { id } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                // const response = await axios.get(`${API_BASE_URL}/book/${id}`);
                const response = await BookAPIGETSingle(id)
                // Assuming the response is an array and you want to display the first book
                setBook(response?.data?.book[0]);
            } catch (error) {
                console.error(error);
            }
        };
        fetchBook();
    }, [id]);

    if (!book) {
        return <div>Loading...</div>;
    }

    return (
        <div className="book-detail-container">
            <div className="book-image">
                <img src={book.bookimage[0]} alt={book.title} />
            </div>
            <div className="book-info">
                <h1>{book.title}</h1>
                <p><strong>Author:</strong> {book.author}</p>
                <p><strong>Category:</strong> {book.category}</p>
                <p><strong>Genre:</strong> {book.genre}</p>
                <p><strong>Publisher:</strong> {book.publisher}</p>
                <p><strong>Language:</strong> {book.language}</p>
                <p><strong>Pages:</strong> {book.pages}</p>
                <p><strong>Publish Date:</strong> {new Date(book.publishDate).toLocaleDateString()}</p>
                <p><strong>Price:</strong> ${book.price}</p>
                <p><strong>Description:</strong> {book.description}</p>
                <p><strong>Author Biography:</strong> {book.authorBiography}</p>
                <p><strong>Hard Copy Available:</strong> {book.isHardCopyAvailable ? 'Yes' : 'No'}</p>
                <p><strong>Audiobook Available:</strong> {book.isAudiobookAvailable ? 'Yes' : 'No'}</p>
                <p><strong>EBook Available:</strong> {book.isEBookAvailable ? 'Yes' : 'No'}</p>
                {book.isAudiobookAvailable && (
                    <div className="audiobook-section">
                        <h3>Audiobook</h3>
                        <audio controls>
                            <source src={book.audiobookUpload[0]} type="audio/mp3" />
                            Your browser does not support the audio element.
                        </audio>
                    </div>
                )}
                {book.isEBookAvailable && (
                    <div className="ebook-section">
                        <h3>EBook</h3>
                        <a href={book.EbookUpload[0]} download>Download EBook</a>
                    </div>
                )}
            </div>
        </div>
    );
}
