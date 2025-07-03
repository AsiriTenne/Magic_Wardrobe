import React, { useState, useEffect } from "react";
import { SellerNavBar } from "./SellerNavBar";
import { Products } from "./Products";
import { auth, fs } from "../Config/Config";
import { IndividualFilteredProduct } from "./IndividualFilteredProduct";
import "./Home.css";
import bannerImage from "../Images/herov3.jpg";
import { Link } from "react-router-dom";
import { SellerFooter } from "./SellerFooter";

export const SellerShop = (props) => {
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

  // state of totalProducts
  const [totalProducts, setTotalProducts] = useState(0);

  // categories list rendering using span tag
  const [spans] = useState([
    { id: "CasualWearTops", text: "Casual Wear Tops" },
    { id: "OfficeWearTops", text: "Office Wear Tops" },
    { id: "UnderGarments", text: "Under Garments" },
    { id: "SportsWear", text: "Sports Wear" },
    { id: "CasualWearBottoms", text: "Casual Wear Bottoms" },
    { id: "OfficeWearBottoms", text: "Office Wear Bottoms" },
    { id: "PartyWear", text: `Party Wear` },
  ]);

  // active class state
  const [active, setActive] = useState("");

  // category state
  const [category, setCategory] = useState("");

  // handle change ... it will set category and active states
  const handleChange = (individualSpan) => {
    setActive(individualSpan.id);
    setCategory(individualSpan.text);
    filterFunction(individualSpan.text);
  };

  // filtered products state
  const [filteredProducts, setFilteredProducts] = useState([]);

  // filter function
  const filterFunction = (text) => {
    if (products.length > 1) {
      const filter = products.filter((product) => product.category === text);
      setFilteredProducts(filter);
    } else {
      console.log("no products to filter");
    }
  };

  return (
    <>
      <SellerNavBar />
      <br />

      <div
        style={{
          backgroundImage: `url(${bannerImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "300px",
          position: "relative",
          marginTop: "-24px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.7)", // Transparent black overlay
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              color: "#fff",
              fontSize: "36px",
              fontWeight: 700,
              marginBottom: "20px",
            }}
          >
            Welcome to Matchy Inventory
          </h2>
          <p
            style={{
              color: "#fff",
              fontSize: "20px",
              fontWeight: 500,
            }}
          >
            one place to organize all items
          </p>
        </div>
      </div>

      <div className="container-fluid filter-products-main-box">
        <div className="row">
          <div className="col-md-3 filter-box">
            <h6>Filter by category</h6>

            {spans.map((individualSpan, index) => (
              <span
                key={index}
                id={individualSpan.id}
                onClick={() => handleChange(individualSpan)}
                className={individualSpan.id === active ? active : "deactive"}
              >
                {individualSpan.text}
              </span>
            ))}
          </div>
          <div className="col-md-9 product-container-scroll">
            <div className="product-container">
              {filteredProducts.length > 0
                ? filteredProducts.map((product) => (
                    <div key={product.ID} className="product-card">
                      <img src={product.url} alt={product.title} />
                      <h3>{product.title}</h3>
                      <p>{product.description}</p>
                      <p>${product.price}</p>
                      <Link to={`/edit-product/${product.ID}`}>
                        <button>Edit Product</button>
                      </Link>
                    </div>
                  ))
                : products.map((product) => (
                    <div key={product.ID} className="product-card">
                      <img src={product.url} alt={product.title} />
                      <h3>{product.title}</h3>
                      <p>{product.description}</p>
                      <p>${product.price}</p>
                      <button>Edit Product</button>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>
      <SellerFooter />
    </>
  );
};
