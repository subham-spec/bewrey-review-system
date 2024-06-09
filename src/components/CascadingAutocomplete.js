import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, MenuItem, Button, Grid, Typography } from '@mui/material';

const CascadingAutocomplete = ({ onSearch }) => {
    const [city, setCity] = useState('');
    const [type, setType] = useState('');
    const [name, setName] = useState('');
    const [citySuggestions, setCitySuggestions] = useState([]);
    const [typeSuggestions, setTypeSuggestions] = useState([]);
    const [nameSuggestions, setNameSuggestions] = useState([]);

    useEffect(() => {
        const fetchCitySuggestions = async () => {
            try {
                if (city.length < 2) {
                    setCitySuggestions([]);
                    return;
                }
                const response = await axios.get(`https://api.openbrewerydb.org/v1/breweries/?by_city=${city}`);
                setCitySuggestions(response.data.map(brewery => brewery.city).filter((value, index, self) => self.indexOf(value) === index));
            } catch (error) {
                console.error('Error fetching city suggestions:', error);
            }
        };
        fetchCitySuggestions();
    }, [city]);

    useEffect(() => {
        const fetchTypeSuggestions = async () => {
            if (!city) return;
            const response = await axios.get(`https://api.openbrewerydb.org/v1/breweries?by_city=${city}`);
            setTypeSuggestions(response.data.map(brewery => brewery.brewery_type).filter((value, index, self) => self.indexOf(value) === index));
        };
        fetchTypeSuggestions();
    }, [type]);

    useEffect(() => {
        const fetchNameSuggestions = async () => {
            if (!city || !type) return;
            const response = await axios.get(`https://api.openbrewerydb.org/v1/breweries?by_city=${city}&by_type=${type}`);
            setNameSuggestions(response.data.map(brewery => brewery.name).filter((value, index, self) => self.indexOf(value) === index));
        };
        fetchNameSuggestions();
    }, [name]);

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch({ city, type, name });
    };

    return (
        <form onSubmit={handleSearch}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        label="City"
                        value={city}
                        SelectProps={{ MenuProps }}
                        onChange={(e) => setCity(e.target.value)}
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        autoComplete="off"
                    />
                    {citySuggestions.length > 0 && (

                        citySuggestions.map((suggestion, index) => (
                            <MenuItem key={index} onClick={() => setCity(suggestion)}>
                                {suggestion}
                            </MenuItem>
                        ))

                    )}
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        label="Type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        disabled={!city}
                    />
                    {typeSuggestions.length > 0 && (
                        <div>
                            {typeSuggestions.map((suggestion, index) => (
                                <MenuItem key={index} onClick={() => setType(suggestion)}>
                                    {suggestion}
                                </MenuItem>
                            ))}
                        </div>
                    )}
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        disabled={!city || !type}
                    />
                    {nameSuggestions.length > 0 && (
                        <div>
                            {nameSuggestions.map((suggestion, index) => (
                                <MenuItem key={index} onClick={() => setName(suggestion)}>
                                    {suggestion}
                                </MenuItem>
                            ))}
                        </div>
                    )}
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" type="submit">Search</Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default CascadingAutocomplete;
const ITEM_HEIGHT = 35
const ITEM_PADDING_TOP = 8
const MenuProps = {
    PaperProps: {
        style: { maxHeight: ITEM_HEIGHT * 3 + ITEM_PADDING_TOP, width: 140, }
    }, getContentAnchorEl: null
}