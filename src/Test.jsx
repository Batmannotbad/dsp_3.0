import React, { useState } from 'react';
import { putUserImg } from './APIController';
import { useSelector } from 'react-redux';

const Test = () => {
  const token = useSelector(state => state.user.token);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await putUserImg(token, selectedImage);
      console.log(response);

    } catch (error) {
      console.error(error);
      

    }
  };


  return (
    <div>
      <h2>Image Upload Form</h2>
      <form>
        <div>
          <label htmlFor="imageInput">Select Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setSelectedImage(e.target.files[0])}
          />
        </div>
        <div>
          <button type="button" onClick={handleSubmit}>
            Upload Image
          </button>
        </div>
      </form>
    </div>
  );
};

export default Test;
