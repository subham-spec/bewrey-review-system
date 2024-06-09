import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, Link, TextField, Button, Rating, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom'; // Import useParams hook

const BreweryDetail = () => {
    const { id } = useParams(); // Access route parameters using useParams hook

    const [brewery, setBrewery] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [submittedRating, setSubmittedRating] = useState(null);

    useEffect(() => {
        const fetchBrewery = async () => {
            try {
                const response = await axios.get(`https://api.openbrewerydb.org/v1/breweries/${id}`);
                setBrewery(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching data, please try again.');
                setLoading(false);
            }
        };

        const timer = setTimeout(() => {
            fetchBrewery();
        }, 2000); // Wait for 5 seconds before fetching data

        return () => clearTimeout(timer); // Cleanup function to clear timer

    }, [id]); // Use id from useParams in the dependency array

    const handleRatingChange = (event, newValue) => {
        setRating(newValue);
    };

    const handleReviewChange = (event) => {
        setReview(event.target.value);
    };

    async function handleRatingSubmit(e){
        e.preventDefault();
        e.preventDefault();
        setSubmittedRating(rating);
        // Submit review logic here

        try{
            await axios.post("http://localhost:8080/ratingchange", {
                id, rating
            })
            .then((res) => {
                if(res.data === "updated"){
                    alert("Rating Updated")
                } else if(res.data === "First-Rating") {
                    alert("First Rating for this Beer.")
                }
            })
            .catch(e => {
                alert("error")
                alert("Wrong Id ig")
                console.log(e)
            })
        }
        catch(e){
            console.log(e)
        }

        // After submit
        setRating(0); // Reset rating after submission
        setReview(''); // Reset review after submission
    };

    if (loading) {
        return (
            <Grid container justifyContent="center">
                <CircularProgress />
            </Grid>
        );
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <Grid container justifyContent="center" spacing={3}>
            <Grid item xs={12} sm={6}>
                <Card elevation={4}>
                    <CardContent>
                        <Typography variant="h4" gutterBottom>{brewery.name}</Typography>
                        <Typography variant="body1">Type: {brewery.brewery_type}</Typography>
                        <Typography variant="body1">Address: {brewery.address_1}, {brewery.city}, {brewery.state}, {brewery.postal_code}</Typography>
                        <Typography variant="body1">Website: <Link href={brewery.website_url} target="_blank" rel="noopener noreferrer">{brewery.website_url}</Link></Typography>

                        <Typography variant="h5" gutterBottom>Rate this Brewery</Typography>
                        <Rating
                            name="rating"
                            value={rating}
                            onChange={handleRatingChange}
                            precision={1}
                            size="large"
                        />
                        <Typography variant="body1">Review:</Typography>
                        <TextField
                            multiline
                            rows={4}
                            value={review}
                            onChange={handleReviewChange}
                            variant="outlined"
                            fullWidth
                        />
                        <Button type="submit" variant="contained" color="primary" onClick={handleRatingSubmit} sx={{ marginTop: 2 }}>Submit</Button>

                        {submittedRating && <Typography variant="body1">Submitted Rating: {submittedRating}</Typography>}
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default BreweryDetail;