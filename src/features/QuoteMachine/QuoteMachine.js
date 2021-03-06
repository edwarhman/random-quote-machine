import React from "react";
import { connect } from "react-redux";
import { fetchQuote, fetchIndex } from "./quoteMachineSlice";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { randomVerse } from "../../utils.js";

import styles from "./QuoteMachine.module.css";

const quoteBoxBootstrap = " mx-auto rounded p-3 bg-white";

class Presentational extends React.Component {
  constructor(props) {
    super(props);
    this.newQuote = this.newQuote.bind(this);
  }

  newQuote() {
    this.props.setNewQuote(randomVerse(this.props.quote.bookIndex));
  }

  async componentWillMount() {
    if (this.props.quote.bookIndex.length === 0) {
      await this.props.setBookIndex();
    }
    if (this.props.quote.author === "") {
      console.log("fetch verse");
      console.log(this.props.quote.bookIndex);
      await this.newQuote();
    }
  }

  async componentDidMount() {}
  render() {
    return (
      <div
        className={styles.quoteContainer}
        style={{ backgroundColor: getRandomColor() }}
      >
        <div id="quote-box" className={styles.quoteBox + quoteBoxBootstrap}>
          <blockquote className="blockquote">
            <p id="text">
              <q>{this.props.quote.text}</q>
            </p>
            <footer className="blockquote-footer">
              <cite id="author">{this.props.quote.author}</cite>
            </footer>
          </blockquote>
          <Container>
            <Row>
              <Col>
                <Button id="new-quote" onClick={this.newQuote}>
                  Nuevo versículo
                </Button>
              </Col>
              <Col>
                <ul className={styles.linksList}>
                  <li>
                    <a
                      id="tweet-quote"
                      className="twitter-share-button"
                      href={`https://twitter.com/intent/tweet?text=${this.props.quote.text}%20${this.props.quote.author}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      twittear versículo
                    </a>
                  </li>
                  <li>
                    <a
                      id="repository"
                      href="https://github.com/edwarhman/random-quote-machine"
                    >
                      Repositorio
                    </a>
                  </li>
                </ul>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

// get random color to change background color
const colors = ["plum", "darkred", "darkgreen", "blueviolet", "cornflowerblue"];
function getRandomColor() {
  const idx = Math.floor(Math.random() * colors.length);
  return colors[idx];
}

// React Redux

const mapStateToProps = (state) => {
  return {
    quote: {
      bookIndex: state.quoteMachine.bookIndex,
      text: state.quoteMachine.quote,
      author: state.quoteMachine.author,
    },
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setNewQuote: (verseInfo) => {
      dispatch(fetchQuote(verseInfo));
    },
    setBookIndex: () => {
      dispatch(fetchIndex());
    },
  };
};

const QuoteMachine = connect(
  mapStateToProps,
  mapDispatchToProps
)(Presentational);

export default QuoteMachine;
