import React, { useState } from "react";
import { storage, fs } from "../Config/Config";
import "./AddProduct.css";
import bannerImage from "../Images/addProduct.png";
import { SellerNavBar } from "./SellerNavBar";
import { SellerFooter } from "./SellerFooter";
import { useHistory } from "react-router-dom";

export const AddProducts = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");
  const [image, setImage] = useState(null);

  const [imageError, setImageError] = useState("");

  const [successMsg, setSuccessMsg] = useState("");
  const [uploadError, setUploadError] = useState("");

  const history = useHistory();

  const types = ["image/jpg", "image/jpeg", "image/png", "image/PNG"];
  const handleProductImg = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && types.includes(selectedFile.type)) {
        setImage(selectedFile);
        setImageError("");
      } else {
        setImage(null);
        setImageError("please select a valid image file type (png or jpg)");
      }
    } else {
      console.log("please select your file");
    }
  };

  const handleAddProducts = (e) => {
    e.preventDefault();

    // Upload the image to Firebase Storage
    const uploadTask = storage.ref(`product-images/${image.name}`).put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Track the upload progress if needed
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload progress: ${progress}%`);
      },
      (error) => {
        // Handle any upload errors
        setUploadError(error.message);
      },
      () => {
        // Image upload is complete, get the image URL
        storage
          .ref("product-images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            // Add the product data to Firestore
            fs.collection("Products")
              .add({
                title,
                description,
                category,
                color,
                price: Number(price),
                url,
              })
              .then(() => {
                // Product added successfully, reset form fields and show success message
                setSuccessMsg("Product added successfully");
                setTitle("");
                setDescription("");
                setCategory("");
                setPrice("");
                setColor("");
                setImage(null);
                setImageError("");
                setUploadError("");
                setTimeout(() => {
                  setSuccessMsg("");
                  // Navigate to 'seller-shop'
                  history.push("/seller-shop");
                }, 3000);
              })
              .catch((error) => {
                // Handle Firestore database errors
                setUploadError(error.message);
              });
          })
          .catch((error) => {
            // Handle image URL retrieval errors
            setUploadError(error.message);
          });
      }
    );
  };

  return (
    <>
      <SellerNavBar />
      <div className="container">
        <br></br>
        <br></br>
        <h1 className="page-title">Add Products</h1>
        <hr></hr>
        {successMsg && (
          <>
            <div className="success-msg">{successMsg}</div>
            <br></br>
          </>
        )}
        <div className="content-container">
          <div className="form-container">
            <form
              autoComplete="off"
              className="form-group"
              onSubmit={handleAddProducts}
            >
              <label>Product Title</label>
              <input
                type="text"
                className="form-control"
                required
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              ></input>
              <br></br>
              <label>Product Description</label>
              <input
                type="text"
                className="form-control"
                required
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              ></input>
              <br></br>
              <label>Product Price</label>
              <input
                type="number"
                className="form-control"
                required
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              ></input>
              <br></br>
              <label>Product Category</label>
              <select
                className="form-control"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Product Category</option>
                <option>Casual Wear Tops</option>
                <option>Office Wear Tops</option>
                <option>Under Garments</option>
                <option>Sports Wear</option>
                <option>Casual Wear Bottoms</option>
                <option>Office Wear Bottoms</option>
                <option>Party Wear</option>
              </select>
              <br></br>
              <label>Prominent Color</label>
              <select
                className="form-control"
                required
                value={color}
                onChange={(e) => setColor(e.target.value)}
              >
                <option value="">Select Color</option>
                <option>Black</option>
                <option>White</option>
                <option>Red</option>
                <option>Blue</option>
                <option>Purple</option>
                <option>Green</option>
                <option>Yellow</option>
                <option>Orange</option>
                <option>Pink</option>
                <option>Brown</option>
                <option>Grey</option>
              </select>
              <br></br>
              <label>Upload Product Image</label>
              <input
                type="file"
                id="file"
                className="form-control"
                required
                onChange={handleProductImg}
              ></input>

              {imageError && (
                <>
                  <br></br>
                  <div className="error-msg">{imageError}</div>
                </>
              )}
              <br></br>
              <div className="center-submit">
                <button type="submit" className="btn-addProduct">
                  SUBMIT
                </button>
              </div>
            </form>
          </div>

          {uploadError && (
            <>
              <br></br>
              <div className="error-msg">{uploadError}</div>
            </>
          )}
          <div className="product-image">
            <img src={bannerImage} alt="ProductBanner" />
          </div>
        </div>
      </div>
      <SellerFooter />
    </>
  );
};
