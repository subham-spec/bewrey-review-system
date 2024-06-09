// src/components/Home.js
import React, { useState } from 'react';
import axios from 'axios';
import BreweryList from './BreweryList';
import CascadingAutocomplete from './CascadingAutocomplete';
// import Pagination from './Pagination';

const LandingPage = () => {
    const [breweries, setBreweries] = useState([]);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchParams, setSearchParams] = useState({});

    const breweriesPerPage = 10;

    const handleSearch = async ({ city, type, name }) => {
        console.log(city, type, name)
        setSearchParams({ city, type, name });
        await fetchBreweries({ city, type, name, page: 1 });
    };

    const fetchBreweries = async ({ city, type, name, page }) => {
        let url = "https://api.openbrewerydb.org/v1/breweries?{name}=san_diego&per_page=6";

        if (type) {
            url += "&by_type=${type}";
        }
        if (name) {
            url += "&by_name=${name}";
        }

        try {
            const response = await axios.get(url);
            setBreweries(response.data);
            setTotalPages(Math.ceil(response.headers['x-total-count'] / breweriesPerPage));
            setPage(page);
            setError(null);
        } catch (err) {
            setError('Error fetching data, please try again.');
            setBreweries([]);
        }
    };

    const handlePageChange = async (newPage) => {
        await fetchBreweries({ ...searchParams, page: newPage });
    };

    return (
        <div>
            <CascadingAutocomplete onSearch={handleSearch} />
            {error && <p>{error}</p>}
            <BreweryList breweries={breweries} />
            {/* <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} /> */}
        </div>
    );
};

export default LandingPage;