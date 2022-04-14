import React from 'react';
import PropTypes from 'prop-types';

// Movie view stylesheet
import './movie-card.scss';

function changeBackground(e) {
    e.target.style.background = '#573b8a';
    e.target.style.color = "white";
}


function resetBackground(e) {
    e.target.style.background = "#e0dede";
    e.target.style.color = "black";

}


export class MovieCard extends React.Component {
    render() {
        const { movie, index, onMovieClick } = this.props;
        if (index == 0) {
            return (
                <div>
                    <div className="movie-card-titles">My Movies</div>
                    <div onMouseOver={changeBackground} onMouseOut={resetBackground} onClick={() => onMovieClick(movie)} className="movie-card">{movie.Title}</div>
                </div>
            );
        } else {

            return (
                <div>
                    <div onMouseOver={changeBackground} onMouseOut={resetBackground} onClick={() => onMovieClick(movie)} className="movie-card">{movie.Title}</div>
                </div>);
        }
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
    index: PropTypes.number.isRequired,
    onMovieClick: PropTypes.func.isRequired
};