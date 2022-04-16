import React from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import "./director-view.scss";

export class DirectorView extends React.Component {
  keypressCallback(event) {
    console.log(event.key);
  }

  componentDidMount() {
    document.addEventListener("keypress", this.keypressCallback);
  }

  render() {
    const { director, onBackClick } = this.props;

    return (

      <Card className="director-view d-flex justify-content-center">
        <Card.Title className="director-name">
          <p className="director-name">{director.Name}</p>
        </Card.Title>
        <Card.Text className="director-description">
          <span>Bio: </span>
          {director.Bio}
        </Card.Text>
        <Card.Text className="director-description">
          <span>Year of Birth: </span>
          {director.Birth.substring(0, 10)}
        </Card.Text>
        <Button
          id="back-btn-1"
          onClick={() => {
            onBackClick();
          }}
        >
          Back
        </Button>
      </Card>
    );
  }
}

DirectorView.propTypes = {
  onBackClick: PropTypes.func.isRequired,
};