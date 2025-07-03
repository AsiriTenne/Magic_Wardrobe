import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { fs, storage } from "../Config/Config";
import "./EditProduct.css";
import Swal from 'sweetalert2';

export const EditProduct = () => {
  const { productId } = useParams();
  const history = useHistory();
  const [product, setProduct] = useState({});
  const [editedProduct, setEditedProduct] = useState({
    title: "",
    description: "",
    price: 0,
    url: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [isProductUpdated, setProductUpdated] = useState(false);

  useEffect(() => {
    fs.collection("Products")
      .doc(productId)
      .get()
      .then((snapshot) => {
        const productData = snapshot.data();
        setProduct(productData);
        setEditedProduct(productData);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, [productId]);

  useEffect(() => {
    if (product.url) {
      storage
        .ref()
        .child(product.url)
        .getDownloadURL()
        .then((url) => {
          setEditedProduct({ ...editedProduct, url: url });
        })
        .catch((error) => {
          console.error("Error fetching image URL:", error);
        });
    }
  }, [product.url]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    const url = URL.createObjectURL(file);
    setEditedProduct({ ...editedProduct, url });
  };

  const handleSave = () => {
    fs.collection("Products")
      .doc(productId)
      .update(editedProduct)
      .then(() => {
        Swal.fire("Success", "Product updated successfully", "success");
        setProductUpdated(true);
        setTimeout(() => {
          setProductUpdated(false);
          history.push("/seller-shop");
        }, 2000);
      })
      .catch((error) => {
        console.error("Error updating product:", error);
        Swal.fire("Error", "Failed to update product", "error");
      });

    if (imageFile) {
      const imageRef = storage.ref().child(`product_images/${productId}`);
      imageRef.put(imageFile).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((url) => {
          fs.collection("Products")
            .doc(productId)
            .update({ url })
            .then(() => {
              console.log("Image URL updated successfully");
            })
            .catch((error) => {
              console.error("Error updating image URL:", error);
              Swal.fire("Error", "Failed to update image URL", "error");
            });
        });
      });
    }
  };

  const handleDelete = () => {
    Swal.fire({
      title: 'Are You Sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        fs.collection("Products")
          .doc(productId)
          .delete()
          .then(() => {
            Swal.fire("Success", "Product deleted successfully", "success");
            history.push("/seller-shop");
          })
          .catch((error) => {
            console.error("Error deleting product:", error);
            Swal.fire("Error", "Failed to delete product", "error");
          });
      }
    });
  };

  return (
    <div className="edit-product-container">
      <h1>Edit Product</h1>
      {editedProduct.url && (
        <div>
          <img
            src={editedProduct.url}
            alt="Product"
            style={{
              maxWidth: "200px",
              marginBottom: "30px",
              marginTop: "30px",
            }}
          />
        </div>
      )}
      <div className="label-input-row">
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={editedProduct.title}
          onChange={handleInputChange}
        />
      </div>
      <div className="label-input-row">
        <label>Description:</label>
        <input
          type="text"
          name="description"
          value={editedProduct.description}
          onChange={handleInputChange}
        />
      </div>
      <div className="label-input-row">
        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={editedProduct.price}
          onChange={handleInputChange}
        />
      </div>
      <div className="label-input-row">
        <label>New Image:</label>
        <input type="file" onChange={handleImageChange} />
      </div>
      <div className="button-row">
        <button onClick={handleSave}>Save</button>
        <button onClick={handleDelete} className="delete-button">
          Delete Product
        </button>
      </div>
      {isProductUpdated && <p>Product Updated</p>}
    </div>
  );
};
