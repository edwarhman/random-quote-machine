import React from 'react';
import {connect} from 'react-redux';
import {newQuote} from './quoteMachineSlice';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import styles from './QuoteMachine.module.css';

const quoteBoxBootstrap = " mx-auto rounded p-1 bg-white";

class Presentational extends React.Component {
    constructor(props) {
        super(props);
        this.newQuote = this.newQuote.bind(this);
    }

    newQuote(quote) {
        this.props.setNewQuote(quote);
    }

    render() {
        console.log(this.props.quote);
        return (
            <div id="quote-box"  className={styles.quoteBox + quoteBoxBootstrap}>
                <p id="text">
                    <q>{this.props.quote.text}</q>
                </p>
                <p id="author">{this.props.quote.author}</p>
                <Container>
                    <Row>
                        <Col>
                            <Button id="new-quote" onClick={this.newQuote(fetchNewQuote())}>New quote</Button>
                        </Col>
                        <Col>
                            <ul className={styles.linksList}>
                                <li><a id="tweet-quote" href="#">Tweet quote</a></li>
                                <li><a id="repository" href="#">Repository</a></li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

// React Redux

const mapStateToProps = (state) => {
    return {
        quote: {
            text: state.quoteMachine.quote,
            author: state.quoteMachine.author
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setNewQuote: (quote) => {
            dispatch(newQuote(quote));
        }
    }
}

function fetchNewQuote() {
    return {
        quote: "This is a quote fetched from Internet",
        author: "Fetched author"
    }
}

const QuoteMachine = connect(mapStateToProps, mapDispatchToProps)(Presentational);
export default QuoteMachine;
