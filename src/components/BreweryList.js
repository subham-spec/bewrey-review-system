import React from 'react';
import './BreweryList.css';
import {Link} from 'react-router-dom';

const BreweryList = ({ breweries }) => {
    return (
        <div className='brewery_list_container'>
            {breweries.map((item) => (
                <div className='brewery_item' 
                key={item.id}>
                    <h3>
                        <Link to={`/brewery/${item.id}`}>{item.name}</Link>
                    </h3>
                    <p>{item.street}</p>
                    <p>{item.phone}</p>
                    <p>{item.city}, {item.state}</p>
                    <p>Website: <a href={item.website_url} target="_blank" rel="noopener noreferrer">{item.website_url}</a></p>
                </div>
            ))}
        </div>
    );
};

export default BreweryList;
