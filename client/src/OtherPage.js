import React from 'react';
import { Link } from 'react-router-dom';

export const OtherPage = () => {
    return (
        <div className="App">
            <p>I'm some other page</p>
            <Link to="/">Go Back Home</Link>
        </div>
    );
};
