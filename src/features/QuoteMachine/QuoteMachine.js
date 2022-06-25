import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import styles from './QuoteMachine.module.css';

const quoteBoxBootstrap = " mx-auto rounded p-1 bg-white";

class QuoteMachine extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="quote-box"  className={styles.quoteBox + quoteBoxBootstrap}>
                <p id="text">
                    <q>This is a quote.</q>
                </p>
                <p id="author">Quote author</p>
                <Container>
                    <Row>
                        <Col>
                            <Button id="new-quote">New quote</Button>
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

export default QuoteMachine;
