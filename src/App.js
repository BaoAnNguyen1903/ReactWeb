import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import Navbar from './components/navbar';
import Card from './components/card';
import Carousel from './components/carousal';
import ImgArtist from './components/imgArtist';
import HistoryComponent from './components/historyComponent';
import Footer from './components/footer';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="app-container">
        <Navbar />
        <Carousel />
        <div className="section-container" style={{ textAlign: "center" }}>
          <h2>Art Collection</h2>
          <Card />
        </div>
        <div className="section-container" style={{ textAlign: "center" }}>
          <h2>Artists</h2>
          <ImgArtist />
        </div>
        <div className="section-container">
          <HistoryComponent />
        </div>
        <Footer />
      </div>
    </Provider>
  );
}

export default App;
