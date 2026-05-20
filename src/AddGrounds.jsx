import React, { useState } from "react";
import axios from "axios";
import "./css/addgrounds.css";
import AdminNAv from "./AdminNAv";
import MainNavbar from "./MainNavbar";

export default function AddGrounds() {
  const [ground, setGround] = useState({
    name: "",
    location: "",
    type: "",
    pricePerHour: "",
    pricePerDay: "",
    description: "",
  });

  const [images, setImages] = useState([]);       // actual files
  const [previews, setPreviews] = useState([]);   // preview URLs

  const handleChange = (e) => {
    setGround({ ...ground, [e.target.name]: e.target.value });
  };

  // when user selects images
  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviews(previewUrls);
  };

  const submitGround = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // ground object as JSON string
    formData.append(
      "ground",
      new Blob([JSON.stringify(ground)], { type: "application/json" })
    );

    // multiple images
    images.forEach((img) => {
      formData.append("images", img);
    });

    try {
      await axios.post("http://localhost:8080/addGround", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Ground Added Successfully ✅");
    } catch (err) {
      alert("Error adding ground ❌");
    }
  };

  return (
    <div>
<MainNavbar />
      <div className="add-ground-container">
        <form className="ground-form" onSubmit={submitGround}>
          <h2>Add New Ground</h2>

          <div className="form-grid">
            <input name="name" placeholder="Ground Name" onChange={handleChange} required />
            <input name="location" placeholder="Location" onChange={handleChange} required />
            <input name="type" placeholder="Type (Cricket/Football)" onChange={handleChange} required />
            <input name="pricePerHour" placeholder="Price Per Hour" onChange={handleChange} required />
            <input name="pricePerDay" placeholder="Price Per Day" onChange={handleChange} required />
          </div>

          <textarea
            name="description"
            placeholder="Ground Description"
            onChange={handleChange}
            required
          />

          <h4>Select Ground Images</h4>
          <input type="file" multiple accept="image/*" onChange={handleImageSelect} />

          {/* Preview */}
          <div className="preview-container">
            {previews.map((src, index) => (
              <img key={index} src={src} alt="preview" />
            ))}
          </div>

          <button type="submit" className="submit-btn">
            Add Ground
          </button>
        </form>
      </div>
    </div>
  );
}