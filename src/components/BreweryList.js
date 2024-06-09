import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Card, CardContent, Typography, Link as MuiLink, CardActionArea } from '@mui/material';

const BreweryList = ({ breweries }) => {
    return (
        <Grid container spacing={3}>
            {breweries.map((brewery) => (
                <Grid key={brewery.id} item xs={12} sm={6} md={4}>
                    <Card elevation={4}>
                        <CardActionArea to={`/brewery/${brewery.id}`} style={{ textDecoration: 'none', color: 'inherit' }} target="_blank">
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    <Link to={`/brewery/${brewery.id}`} style={{ textDecoration: 'none', color: 'inherit' }} target="_blank">
                                        {brewery.name}
                                    </Link>
                                </Typography>
                                <Typography variant="body1" color="textSecondary" gutterBottom>
                                    {brewery.street}, {brewery.city}, {brewery.state}
                                </Typography>
                                <Typography variant="body1" color="textSecondary">
                                    Phone: {brewery.phone}
                                </Typography>
                                <Typography variant="body1" color="textSecondary">
                                    Website: <MuiLink href={brewery.website_url} target="_blank" rel="noopener noreferrer">{brewery.website_url}</MuiLink>
                                </Typography>
                                
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default BreweryList;