import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../footer.css';

const FooterComponent = () => {
    return (
        <footer className="footer bg-dark text-white py-4">
            <Container>
                <Row>
                    <Col md={12} className="text-left" style={{textAlign: "center"}}>
                        <p>&copy; 2024 Vie Art. All rights reserved.</p>
                    </Col>
                   
                </Row>
            </Container>
        </footer>
    );
};

export default FooterComponent;