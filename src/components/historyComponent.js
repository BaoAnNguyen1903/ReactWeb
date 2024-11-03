// historyComponent.js
import React, { useState } from 'react';
import { Container, Carousel, Modal } from 'react-bootstrap';
import '../App.css';

const HistoryComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalImage, ] = useState('');



  return (
    <Container fluid className="history-container">
      <h1 className="text-center p-3">History</h1>
      <Carousel id="historyCarousel">
        <Carousel.Item>
          <img
            className="d-block w-100 responsive-img history-img"
            src={`${process.env.PUBLIC_URL}/images/history.jpg`}
            alt="First slide"
          />
          <Carousel.Caption>
            <p>Discover the artistic journey from ancient traditions to modern expression.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 responsive-img history-img"
            src={`${process.env.PUBLIC_URL}/images/history2.jpg`}
            alt="Second slide"

          />
          <Carousel.Caption>
            <p>The evolution of art reflects humanity's deepest beliefs and values.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 responsive-img history-img"
            src={`${process.env.PUBLIC_URL}/images/history3.jpg`}
            alt="Third slide"

          />
          <Carousel.Caption>
            <p>Art as a form of rebellion and beauty throughout the ages.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      
      <p className="history-text">
      Painting’s history spans thousands of years, beginning with prehistoric cave art, like those found in Lascaux, France, where early humans depicted animals and daily life using natural pigments. Ancient civilizations, including the Egyptians, Greeks, and Romans, advanced painting with wall art, mosaics, and frescoes that often portrayed gods, mythology, and daily activities.

In the Middle Ages, European art was dominated by religious themes, with vibrant colors and gold to reflect spiritual grandeur. The Renaissance in the 14th century introduced perspective and realism, pioneered by artists like Leonardo da Vinci and Michelangelo, who developed oil painting to enhance detail and depth.

The 19th and 20th centuries brought major shifts with movements like Impressionism and Cubism, led by artists such as Monet and Picasso, breaking traditional forms and exploring color, light, and abstraction. Today, painting continues to evolve, incorporating modern technology and global perspectives, as one of humanity’s most enduring creative expressions.
      </p>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Body>
          <img src={modalImage} alt="Full size" className="responsive-img" />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default HistoryComponent;
