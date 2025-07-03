import React, { useState, useEffect } from "react";
import { Navbar } from "./Navbar";
import { Products } from "./Products";
import { auth, fs } from "../Config/Config";
import { IndividualFilteredProduct } from "./IndividualFilteredProduct";
import "./Home.css";
import bannerImage from "../Images/herov2.jpg";
import { HomeFooter } from "./HomeFooter.js";
import "./chatStyle.css";
import { Chatbot } from "./Chat";
export const Home = (props) => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  function GetUserUid() {
    const [uid, setUid] = useState(null);
    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setUid(user.uid);
        }
      });
    }, []);
    return uid;
  }
  const uid = GetUserUid();
  function GetCurrentUser() {
    const [user, setUser] = useState(null);
    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          fs.collection("users")
            .doc(user.uid)
            .get()
            .then((snapshot) => {
              setUser(snapshot.data().FullName);
            });
        } else {
          setUser(null);
        }
      });
    }, []);
    return user;
  }
  const user = GetCurrentUser();
  const [products, setProducts] = useState([]);
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
  const [totalProducts, setTotalProducts] = useState(0);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        fs.collection("Cart " + user.uid).onSnapshot((snapshot) => {
          const qty = snapshot.docs.length;
          setTotalProducts(qty);
        });
      }
    });
  }, []);
  let Product;
  const addToCart = (product) => {
    if (uid !== null) {
      Product = product;
      Product["qty"] = 1;
      Product["TotalProductPrice"] = Product.qty * Product.price;
      fs.collection("Cart " + uid)
        .doc(product.ID)
        .set(Product)
        .then(() => {
          console.log("successfully added to cart");
        });
    } else {
      props.history.push("/login");
    }
  };
  const [spans] = useState([
    { id: "CasualWearTops", text: "Casual Wear Tops" },
    { id: "OfficeWearTops", text: "Office Wear Tops" },
    { id: "UnderGarments", text: "Under Garments" },
    { id: "SportsWear", text: "Sports Wear" },
    { id: "CasualWearBottoms", text: "Casual Wear Bottoms" },
    { id: "OfficeWearBottoms", text: "Office Wear Bottoms" },
    { id: "PartyWear", text: `Party Wear` },
  ]);
  const [active, setActive] = useState("");
  const [category, setCategory] = useState("");
  const handleChange = (individualSpan) => {
    setActive(individualSpan.id);
    setCategory(individualSpan.text);
    filterFunction(individualSpan.text);
  };
  const [filteredProducts, setFilteredProducts] = useState([]);
  const filterFunction = (text) => {
    if (products.length > 1) {
      const filter = products.filter((product) => product.category === text);
      setFilteredProducts(filter);
    } else {
      console.log("no products to filter");
    }
  };
  const returntoAllProducts = () => {
    setActive("");
    setCategory("");
    setFilteredProducts([]);
  };
  const openChatbot = () => {
    setIsChatbotOpen(true);
  };
  const closeChatbot = () => {
    setIsChatbotOpen(false);
  };

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };
  
  return (
    <>
      <Navbar user={user} totalProducts={totalProducts} />
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
            Welcome to Matchy
          </h2>
          <p
            style={{
              color: "#fff",
              fontSize: "24px",
              fontWeight: 500,
            }}
          >
            Where all things trendy
          </p>
        </div>
      </div>
      <div className="container-fluid filter-products-main-box">
        <div className="row">
          <div className="col-md-3 filter-box">
            <h6>Filter by category</h6>
            {spans.map((individualSpan, index) => (
              <div className="underline" style={{ marginBottom: "20px" }}>
                <span
                  key={index}
                  id={individualSpan.id}
                  onClick={() => handleChange(individualSpan)}
                  className={individualSpan.id === active ? active : "deactive"}
                >
                  {individualSpan.text}
                </span>
              </div>
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
                      <button onClick={() => addToCart(product)}>
                        Add to Cart
                      </button>
                    </div>
                  ))
                : products.map((product) => (
                    <div key={product.ID} className="product-card">
                      <img src={product.url} alt={product.title} />
                      <h3>{product.title}</h3>
                      <p>{product.description}</p>
                      <p>${product.price}</p>
                      <button onClick={() => addToCart(product)}>
                        Add to Cart
                      </button>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>
      <div className="chat-button">
      <button onClick={toggleChatbot}>Chat</button>
    </div>
    {isChatbotOpen && <Chatbot />}
      <HomeFooter />
    </>
  );
};
