import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import ParrotImage from '../assets/parrot.png';
import './Header.css'; // Import the new CSS file

function Header() {
    return (
        <header className="header-container">
            <Container className="header-content">
                <Row className="header-row">
                    {/* Logo */}
                    <Col xs="auto">
                        <Image src={ParrotImage} alt="PollyGlot Logo" className="logo-image" />
                    </Col>
                    {/* Title and Subtitle */}
                    <Col>
                        <h1 className="header-title">RomanceGot</h1>
                        <p className="header-subtitle">Perfect Translation Every Time</p>
                    </Col>
                </Row>
            </Container>
        </header>
    );
}

export default Header;
