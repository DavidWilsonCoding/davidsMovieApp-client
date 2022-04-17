import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

import { Link } from "react-router-dom";

// moviecard stylesheet
import './movie-card.scss';

export class MovieCard extends React.Component {
    render() {
        const { movie } = this.props;
        return (
            <Link to={`/movies/${movie._id}`}>
            <Card className="moviecard">
            <Card.Body>
                <Card.Title className="movie-title">{movie.Title}</Card.Title>
                <Card.Img variant="top" src={movie.ImagePath} crossOrigin="anonymous" />
                {/* <Card.Text>{movie.Description}</Card.Text> */}
            </Card.Body>
            </Card>
            </Link>
        );
    }
}


MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired
        })
    }).isRequired,

};