import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import './css/updateground.css'
import MainNavbar from "./MainNavbar";

export const UpdateGround = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ground, setGround] = useState({
    name: "",
    location: "",
    type: "",
    pricePerHour: "",
    pricePerDay: "",
    description: "",
  });

  const [images, setImages] = useState([]);

  // fetch existing data
  useEffect(() => {
    axios.get(`http://localhost:8080/ground/${id}`)
      .then((res) => setGround(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    setGround({
      ...ground,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  const handleUpdate = () => {
    const formData = new FormData();

    // send DTO as JSON blob
    formData.append(
      "ground",
      new Blob([JSON.stringify(ground)], { type: "application/json" })
    );

    // append images
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    axios.put(`http://localhost:8080/updateground/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(() => {
      alert("Updated successfully");
      navigate("/manageGrounds");
    })
    .catch((err) => console.log(err));
  };

  return (
    <div> 
      <MainNavbar/>
   
   <div className="update-container">
    <div className="update-card shadow">
      <h2 className="text-center mb-4">Update Ground</h2>

      <div className="row">
        <div className="col-md-6">
          <label>Name</label>
          <input
            className="form-control mb-3"
            name="name"
            value={ground.name}
            onChange={handleChange}
          />

          <label>Location</label>
          <input
            className="form-control mb-3"
            name="location"
            value={ground.location}
            onChange={handleChange}
          />

          <label>Type</label>
          <input
            className="form-control mb-3"
            name="type"
            value={ground.type}
            onChange={handleChange}
          />

          <label>Description</label>
          <textarea
            className="form-control mb-3"
            name="description"
            value={ground.description}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label>Price / Hour</label>
          <input
            type="number"
            className="form-control mb-3"
            name="pricePerHour"
            value={ground.pricePerHour}
            onChange={handleChange}
          />

          <label>Price / Day</label>
          <input
            type="number"
            className="form-control mb-3"
            name="pricePerDay"
            value={ground.pricePerDay}
            onChange={handleChange}
          />

          <label>Upload New Images</label>
          <input
            type="file"
            multiple
            className="form-control mb-3"
            onChange={handleImageChange}
          />
        </div>
      </div>

      {/* Preview Selected Images */}
      {images.length > 0 && (
        <div className="preview-container">
          <h5>Image Preview</h5>
          <div className="preview-grid">
            {Array.from(images).map((img, index) => (
              <img
                key={index}
                src={URL.createObjectURL(img)}
                alt="preview"
                className="preview-img"
              />
            ))}
          </div>
        </div>
      )}

      <div className="d-flex justify-content-between mt-4">
        <button
          className="btn btn-secondary px-4"
          onClick={() => navigate("/manageGrounds")}
        >
          Cancel
        </button>

        <button
          className="btn btn-success px-4"
          onClick={handleUpdate}
        >
          Update Ground
        </button>
      </div>
    </div>
  </div>
   </div>
  );
};