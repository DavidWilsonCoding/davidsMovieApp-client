import React from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';


// Movie view stylesheet
import './movie-view.scss';


export class MovieView extends React.Component {

    keypressCallback(event) {
        console.log(event.key);
    }

    //Add Keypress event listener
    componentDidMount() {
        document.addEventListener('keypress', this.keypressCallback);
    }

    //Unmount event listener
    componentWillUnmount() {
        document.removeEventListener('keypress', this.keypressCallback);
    }

    //render movie view
    render() {
        const { movie, onBackClick } = this.props;
        return (
            <Row className="main-view justify-content-md-center">
                <Col md={12} >

                    <div className="movie-view" >
                        <Row>
                            <Col className="movie-col" md={6}>
                                <div className="movie-poster" ><img src={movie.ImagePath} crossOrigin="anonymous" className='movie-image' /></div>
                            </Col>


                            <Col className="movie-col" md={6}>
                                <Row >
                                    <div className="movie-title">
                                        <span className="value">{movie.Title}</span>
                                    </div>
                                    <div className="movie-description">
                                        <span className="value">{movie.Description}</span>
                                    </div>

                                    <p></p>
                                    <div className="movie-genre">
                                        <span className="value">{movie.Genre.Name}</span>
                                    </div>
                                    <div className="movie-director">
                                        <span className="value">Directed by: {movie.Director.Name}</span>
                                    </div>

                                </Row>
                                <Row className="back-row"><Col ><Button onClick={() => { onBackClick(null); }} >Back</Button></Col></Row>


                            </Col>
                        </Row>

                    </div>
                    <Row><Col md={12}>  </Col></Row>
                </Col>

            </Row>

        )
    }
}


MovieView.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,

        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired
        }).isRequired,
    }),
    onBackClick: PropTypes.func.isRequired

};