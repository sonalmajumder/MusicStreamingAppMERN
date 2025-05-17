import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Asidebar from './Asidebar';



function Addsong() {
  const [formData, setFormData] = useState({
    description:'',
    // itemtype:'',
    title: '',
    singer: '',
    genre: '',
    image :''
  });

const navigate=useNavigate()
const user = JSON.parse(localStorage.getItem('user'));

const handleChange = (e) => {
    if (e.target.name === 'songUrl') {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    }
  };
  


  
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
  
      formDataToSend.append('genre', formData.genre);
      formDataToSend.append('title', formData.title);
      formDataToSend.append('singer', formData.singer);
      formDataToSend.append('image', formData.image);
  
      // Use 'songUrl' as the field name
      formDataToSend.append('songUrl', formData.songUrl);
  
      const response = await axios.post('http://localhost:7000/addsong', formDataToSend);
      console.log(response.data); // Log the server response
  
      alert('Song added successfully');
      navigate('/mysongs');
    } catch (error) {
      console.error('Error adding song: ', error);
    }
  };
  

  return (
    <div> 
      <div>
      <Asidebar/>
      </div>
    <div style={{marginLeft:"100px"}} >

    <div className="max-w-md mx-auto p-4 border rounded shadow-lg" style={{backgroundColor:"teal"}}>
      <h2 className="text-2xl font-semibold mb-4">Add Song</h2>
      <form onSubmit={handleSubmit}>
      <div className="mb-4">
          {/* <label className="block text-gray-600">Car Model</label> */}
          <input
            type="text"
            name="title"
            placeholder='title'
            value={formData.title}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          {/* <label className="block text-gray-600">Car Model</label> */}
          <input
            type="text"
            name="singer"
            placeholder='Singer Name'
            value={formData.singer}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          {/* <label className="block text-gray-600">Car Model</label> */}
          <input
            type="text"
            name="genre"
            placeholder='genre'
            value={formData.genre}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
       
        <div className="mb-4">
          {/* <label className="block text-gray-600">Price</label> */}
          <input
            type="text"
            name="image"
            placeholder='Image'
            value={formData.image}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-white">Song file</label>
          <input
  type="file"
  name="songUrl"
  accept="/*"
  onChange={handleChange}
  className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-white"
  required
/>

        </div>
        <button
          type="submit"
          className="bg-blue-900 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </form>
   
    </div>
    </div>
    </div>
  );
}

export default Addsong;