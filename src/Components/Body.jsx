import React, { useState, useEffect } from "react";
import "../styles/Body.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Body = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      {/* Panel Section */}
      <div className="panel">
        <div className="panel-all">
          <FontAwesomeIcon icon={faBars} />
          All
        </div>
        <div className="panel-ops">
          <p>Today's Deal</p>
          <p>Customer Service</p>
          <p>Registry</p>
          <p>Gift Cards</p>
          <p>Sell</p>
        </div>
        <div className="panel-deals">Shops deals in Electronics</div>
      </div>

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-msg">
          <p>
            You are on amazon.com. You can also shop on Amazon India for millions of products with fast local delivery.{" "}
            <a href="#">Click here to go to amazon.in</a>
          </p>
        </div>
      </div>

      {/* Products Section */}
      <div className="shop-section">
        {products.length > 0 ? (
          products.map((product, index) => {
            // Image path (inside public/)
            const imagePath = `/${product.image}`;  

            return (
              <div key={index} className="box">
                <div className="box-content">
                  <h2>{product.name}</h2>
                  <div className="box-image" 
     style={{ backgroundImage: `url(/${product.image})` }}>
</div>

                  <p>See More</p>
                </div>
              </div>
            );
          })
        ) : (
          <p>Loading products...</p>
        )}
      </div>
    </>
  );
};

export default Body;
