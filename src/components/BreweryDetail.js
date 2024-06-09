import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './BreweryDetail.css';

const BreweryDetail = () => {
    const { id } = useParams();
    const [brewery, setBrewery] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [rating, setRating] = useState(0);
    const [new_rating, set_new_rating] = useState(-1);
    const [text_rating, set_text_rating] = useState(null);

    useEffect(() => {
        const fetchBrewery = async () => {
            try {
                const response = await axios.get(`https://api.openbrewerydb.org/v1/breweries/${id}`);
                const oldRating = await axios.post("http://localhost:8080/getrating", {
                    id: id
                  })
                setBrewery(response.data);
                setLoading(false);
                setRating(oldRating.data)
            } catch (err) {
                setError('Error fetching data, please try again.');
                setLoading(false);
            }
        };

        const timer = setTimeout(() => {
            fetchBrewery();
        }, 2000);

        return () => clearTimeout(timer);

    }, [id]);

    function handleRatingChange(e) {
        set_new_rating(e.target.value);
    }
    function handleTextChange(e) {
        set_text_rating(e.target.value);
    }

    const  handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/setRating",{
                id: id,
                rating: new_rating,
                text_rating: text_rating
            })
            .then((res) => {
                if (res.data === "First-Rating") {
                    alert("Thankyou, for your **First** Rating");
                } else if (res.data === "updated") {
                    alert("Thankyou, for your Rating");
                } 
            })
            .catch((e) => {
                alert("Wrong Id");
                console.log(e);
            });
        } catch (e) {
            console.log(e);
        }
    }
    if (!brewery) return <p>Loading...</p>;

    return (
        <div className="brewery-details-card">
            <h2>{brewery.name}</h2>
            <p><strong>Address:</strong> {brewery.street}, {brewery.city}, {brewery.state}, {brewery.country}, {brewery.postal_code}</p>
            <p><strong>Phone:</strong> {brewery.phone}</p>
            <p><strong>Website:</strong> <a href={brewery.website_url} target="_blank" rel="noopener noreferrer">{brewery.website_url}</a></p>
            <p><strong>Type:</strong> {brewery.brewery_type}</p>
            <p><strong>Rating: </strong> {rating}* rated ever</p>

            <h2>Want to Review?</h2>
            <p>
                <input 
                    type='number' 
                    min={0} 
                    max={5} 
                    value={new_rating || ''}
                    onChange={handleRatingChange}
                />
            </p>
            <input 
                type='text'
                max={50}
                value={text_rating || ""}
                onChange={handleTextChange}
            />
            <br/>
            <button
                disabled={new_rating === -1 || text_rating===null}
                onClick={handleSubmit}
            >
                Submit Review
            </button>
        </div>
    );
};

export default BreweryDetail;
