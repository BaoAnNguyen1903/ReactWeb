// imgArtist.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArtists, addArtist, updateArtist, deleteArtist } from '../redux/artistSlice';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';

const ImgArtist = () => {
  const dispatch = useDispatch();
  const artists = useSelector((state) => state.artist);

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    img: ''
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState('');

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  const handleAddClick = () => {
    setIsFormVisible(true);
    setFormData({ name: '', img: '' });
    setImagePreview(null);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, img: reader.result });
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const dataToSubmit = { ...formData };
    if (isEditing) {
      dispatch(updateArtist(dataToSubmit));
    } else {
      dispatch(addArtist(dataToSubmit));
    }
    setIsFormVisible(false);
    setFormData({ name: '', img: '' });
    setImagePreview(null);
  };

  const handleEdit = (artist) => {
    setIsFormVisible(true);
    setIsEditing(true);
    setFormData(artist);
    setImagePreview(artist.img);
  };

  const handleDelete = (id) => {
    dispatch(deleteArtist(id));
  };

  const handleImageClick = (img) => {
    setModalImage(img);
    setShowModal(true);
  };

  return (
    <Container>
      <Row>
        {artists.map((artist) => (
          <Col xs={12} sm={6} md={4} lg={3} key={artist.id} className="mb-4">
            <div className="card h-100 text-center">
              <img 
                src={artist.img} 
                alt={artist.name} 
                className="card-img-top" 
                style={{ height: '250px', width: '100%', objectFit: 'cover', cursor: 'pointer' }} 
                onClick={() => handleImageClick(artist.img)}
              />
              <div className="card-body">
                <h5 className="card-title">{artist.name}</h5>
                <Button variant="primary" onClick={() => handleEdit(artist)} className="me-2">Update</Button>
                <Button variant="danger" onClick={() => handleDelete(artist.id)}>Delete</Button>
              </div>
            </div>
          </Col>
        ))}
      </Row>
      <Button variant="success" onClick={handleAddClick}>Add New Artist</Button>

      {isFormVisible && (
        <div style={{ border: '1px solid #ddd', padding: '20px', marginTop: '20px' }}>
          <h3>{isEditing ? 'Update Artist' : 'Add New Artist'}</h3>
          <form onSubmit={handleFormSubmit}>
            <label>
              Name:
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
            </label>
            <br />
            <label>
              Image:
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </label>
            <br />
            {imagePreview && (
              <div>
                <h4>Image Preview:</h4>
                <img src={imagePreview} alt="Preview" style={{ width: '100px', height: '100px' }} />
              </div>
            )}
            <Button type="submit" variant="primary">{isEditing ? 'Update Artist' : 'Add Artist'}</Button>
          </form>
        </div>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Body>
          <img src={modalImage} alt="Full size" style={{ width: '100%' }} />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ImgArtist;
