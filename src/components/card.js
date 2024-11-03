// card.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArt, addArt, updateArt, deleteArt } from '../redux/artSlice';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';

const Card = () => {
  const dispatch = useDispatch();
  const artItems = useSelector((state) => state.art);

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    img: ''
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState('');

  useEffect(() => {
    dispatch(fetchArt());
  }, [dispatch]);

  const handleAddClick = () => {
    setIsFormVisible(true);
    setFormData({ title: '', price: '', img: '' });
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
      dispatch(updateArt(dataToSubmit));
    } else {
      dispatch(addArt(dataToSubmit));
    }
    setIsFormVisible(false);
    setFormData({ title: '', price: '', img: '' });
    setImagePreview(null);
  };

  const handleEdit = (art) => {
    setIsFormVisible(true);
    setIsEditing(true);
    setFormData(art);
    setImagePreview(art.img);
  };

  const handleDelete = (id) => {
    dispatch(deleteArt(id));
  };

  const handleImageClick = (img) => {
    setModalImage(img);
    setShowModal(true);
  };

  return (
    <Container>
      <Row>
        {artItems.map((art) => (
          <Col xs={12} sm={6} md={4} lg={3} key={art.id} className="mb-4">
            <div className="card h-100 text-center">
              <img 
                src={art.img} 
                alt={art.title} 
                className="card-img-top" 
                style={{ height: '250px', width: '100%', objectFit: 'cover', cursor: 'pointer' }} 
                onClick={() => handleImageClick(art.img)}
              />
              <div className="card-body">
                <h5 className="card-title">{art.title}</h5>
                <p className="card-text">Price: {art.price}</p>
                <Button variant="primary" onClick={() => handleEdit(art)} className="me-2">Update</Button>
                <Button variant="danger" onClick={() => handleDelete(art.id)}>Delete</Button>
              </div>
            </div>
          </Col>
        ))}
      </Row>
      <Button variant="success" onClick={handleAddClick}>Add New Art</Button>

      {isFormVisible && (
        <div style={{ border: '1px solid #ddd', padding: '20px', marginTop: '20px' }}>
          <h3>{isEditing ? 'Update Art' : 'Add New Art'}</h3>
          <form onSubmit={handleFormSubmit}>
            <label>
              Title:
              <input type="text" name="title" value={formData.title} onChange={handleInputChange} required />
            </label>
            <br />
            <label>
              Price:
              <input type="text" name="price" value={formData.price} onChange={handleInputChange} required />
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
            <Button type="submit" variant="primary">{isEditing ? 'Update Art' : 'Add Art'}</Button>
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

export default Card;
