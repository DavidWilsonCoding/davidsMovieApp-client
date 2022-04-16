import React from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';


// Movie view stylesheet
import './genre-view.scss';


export class GenreView extends React.Component {

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
        const { genre, onBackClick } = this.props;


        return (
            <Row className="justify-content-md-center">
                < Col md={12} className="genre-view">
                    <Row>
                        <Col className="genre-col" md={12}>
                            <div className="genre-name">
                                <span className="value">{genre.Name}</span>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="genre-col" md={12}>
                            <div className="genre-description">
                                <span className="value">{genre.Description}</span>
                            </div>
                        </Col>
                    </Row>


                    <Row className="back-row">
                        <Col >
                            <Button className="back-button" onClick={() => { onBackClick(); }} >
                                Back
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    }
}


GenreView.propTypes = {
    genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
    }).isRequired,

    onBackClick: PropTypes.func.isRequired

};