import React, { useState, useEffect } from "react";
import { Navbar } from "./Navbar";
import { auth, fs } from "../Config/Config";
import "./Home.css";
import "./Wardrobe.css";

export const Wardrobe = () => {
  // state of products
  const [products, setProducts] = useState([]);

  // getting products function
  const getProducts = async () => {
    const products = await fs.collection("Products").get();
    const productsArray = [];
    for (var snap of products.docs) {
      var data = snap.data();
      data.ID = snap.id;
      productsArray.push({
        ...data,
      });
      if (productsArray.length === products.docs.length) {
        setProducts(productsArray);
      }
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const [topContainer, setTopContainer] = useState([]);
  const [bottomContainer, setBottomContainer] = useState([]);
  const [lastContainer, setLastContainer] = useState("bottom"); // Initialize the last container as "top"

  const handleAddToContainer = (product) => {
    let container = lastContainer === "top" ? "bottom" : "top";

    // Check if the container is empty
    if (
      (container === "top" && topContainer.length === 0) ||
      (container === "bottom" && bottomContainer.length === 0)
    ) {
      if (container === "top") {
        setTopContainer([product]);
      } else {
        setBottomContainer([product]);
      }

      // Update the last used container
      setLastContainer(container);
    }
  };

  const [combinedColors, setCombinedColors] = useState([]);
  const [topColor, setTopColor] = useState();
  const [bottomColor, setBottomColor] = useState();
  const [isMatching, setIsMatching] = useState();
  const [text, settext] = useState("According the wiley website,");
  

  // Function to calculate and update the combined color values
  const calculateCombinedColors = () => {
    const topColors = topContainer.map((product) => product.color);
    const bottomColors = bottomContainer.map((product) => product.color);
    const combined = [...topColors, ...bottomColors];
    setTopColor(topColors);
    setBottomColor(bottomColors);

    fetch(
      `http://127.0.0.1:5001/?top=${topColors[0]}&bottom=${bottomColors[0]}`
    )
      .then((response) => response.json())
      .then((data) => setIsMatching(data))
      .catch((error) => console.error(error));
  };

  return (
    <>
      <Navbar />
      <div className="app-w">
        <div className="left-panel-w">
          <div className="left-panel-content-w">
            {/* <div className="search-bar">
              <input className="search-bar-input-Box" type="text" placeholder="Search" />
            </div> */}
            <div className="product-list-w">
              {products.map((product) => (
                <div key={product.id} className="product-card">
                  <img src={product.url} alt={product.title} />
                  <h3>{product.title}</h3>
                  <button
                    onClick={() => handleAddToContainer(product)}
                    className="product-card-w button"
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="right-panel-w">
          <div className="right-panel-text-display-w">
            <div className="container-w">
              <h2>Top Selection</h2>
              <div className="container-content-w">
                {topContainer.map((product) => (
                  <div key={product.id} className="container-item-w">
                    <img src={product.url} alt={product.title} />
                  </div>
                ))}
              </div>
            </div>
            <div className="container-w">
              <h2>Bottom Selection</h2>
              <div className="container-content-w">
                {bottomContainer.map((product) => (
                  <div key={product.id} className="container-item-w">
                    <img src={product.url} alt={product.title} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Button to calculate and display combined colors */}
          <div className="calculate-button-w">
            <button onClick={calculateCombinedColors}>
              Predict match
            </button>
          </div>
          <div className="combined-colors-w">
            <div>
              <div>
                <h2>{text}</h2>
              </div>
              <div>
                <h6>{topColor} top and {bottomColor} bottom</h6>
                <h1>{isMatching}</h1>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
};
