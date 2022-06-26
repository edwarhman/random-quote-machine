import React from "react";
import { connect } from "react-redux";
import { fetchQuote } from "./quoteMachineSlice";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import styles from "./QuoteMachine.module.css";

const quoteBoxBootstrap = " mx-auto rounded p-1 bg-white";

class Presentational extends React.Component {
  constructor(props) {
    super(props);
    this.newQuote = this.newQuote.bind(this);
  }

  newQuote() {
    this.props.setNewQuote();
  }

  render() {
    return (
      <div id="quote-box" className={styles.quoteBox + quoteBoxBootstrap}>
        <p id="text">
          <q>{this.props.quote.text}</q>
        </p>
        <p id="author">{this.props.quote.author}</p>
        <Container>
          <Row>
            <Col>
              <Button id="new-quote" onClick={this.newQuote}>
                New quote
              </Button>
            </Col>
            <Col>
              <ul className={styles.linksList}>
                <li>
                  <a id="tweet-quote" className="twitter-share-button" href={`https://twitter.com/intent/tweet?text=${this.props.quote.text}%20${this.props.quote.author}`} target="_blank" rel="noopener noreferrer">
                    Tweet quote
                  </a>
                </li>
                <li>
                    <a id="repository" href="https://github.com/edwarhman/random-quote-machine">
                    Repository
                  </a>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

// React Redux

const mapStateToProps = (state) => {
  return {
    quote: {
      text: state.quoteMachine.quote,
      author: state.quoteMachine.author,
    },
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setNewQuote: () => {
      dispatch(fetchQuote());
    },
  };
};

const QuoteMachine = connect(
  mapStateToProps,
  mapDispatchToProps
)(Presentational);

export default QuoteMachine;

