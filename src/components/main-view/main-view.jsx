import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { BrowserRouter as Router, Route } from "react-router-dom";

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { NavbarView } from '../navbar-view/navbar-view';
import { ProfileView } from '../profile-view/profile-view';
import './main-view.scss';


<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"></link>


class MainView extends React.Component {

    constructor() {
        super();
        //Initial stat is set to null
        this.state = {
            movies: [],
            seletedMovie: null,
            user: null
        };

    }

    componentDidMount() {

        let accessToken = localStorage.getItem('token');
        if (accessToken != null) {
            this.setState({
                user: localStorage.getItem('user')
            })
            this.getMovies(accessToken);
        }
    }

    /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` property to that movie*/
    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    /* When a user successfully logs in, this function updates the `user` property in state to that particular user*/
    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.Username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token)
    }

    //* Get all movies
    getMovies(token) {
        axios.get('https://davidsmovieapp.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })

            .then(response => {
                // Assign the result to the state
                this.setState({
                    movies: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null
        });
    }


    render() {
        const { movies, selectedMovie, user } = this.state;

        /* If there is no user, the LoginView is rendered. If a user is logged in, the user details are passed as a prop to the LoginView*/
        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

        // Before the movies have been loaded
        if (movies.length === 0) return <div className="main-view-row" />;

        return (


            <Router>

                <NavbarView />

                <Row className="main-view-row">
                
                    <Col className="main-view-col align-items-center">

                        {/*If a movie has been selected (selectedMovie is not null), it will returned otherwise, all *movies will be returned*/}
                        <Row>
                            <Route exact path="/" render={() => {
                                return movies.map(m => (
                                <Col xs={12} sm={6} md={4} key={m._id}>
                                    <MovieCard movie={m} />
                                </Col>
                                ))
                            }} />
                            <Route path="/movies/:movieId" render={({ match, history }) => {
                            return <Col md={8}>
                                <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
                            </Col>
                            }} />

                            <Route path="/directors/:name" render={({ match, history }) => {
                                if (!user) return
                                <Col>
                                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                                </Col>

                                if (movies.length === 0) return <div className="main-view" />;

                                return <Col md={10} >
                                    <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
                                </Col>
                            }} />

                            <Route path="/genres/:name" render={({ match, history }) => {
                                if (!user) return
                                <Col>
                                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                                </Col>

                                if (movies.length === 0) return <div className="main-view" />;

                                return <Col md={8}>
                                    <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
                                </Col>
                            }} />

                            <Route path='/users/:username' render={({ history, match }) => {
                                if (!user) return
                                <Col>
                                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                                </Col>

                                if (movies.length === 0) return <div className="main-view" />;

                                return <Col className="view-container-col">
                                    <ProfileView onBackClick={() => history.goBack()} movies={movies} />
                                </Col>
                            }} />
                        </Row>
                    </Col>
                </Row>
            </Router>
        );
    }
}

export default MainView;