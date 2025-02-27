import React, { useState, useEffect, useRef } from "react";
import "./ProductCard.css";

const ProductCard = () => {
  const [products, setProducts] = useState([]);
  const cardContainerRef = useRef(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/Card");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProductDetails();
  }, []);

  // Function to scroll cards left or right
  const handleScroll = (direction) => {
    if (!cardContainerRef.current) return;

    const scrollAmount = 30; // Adjust scroll step size
    if (direction === "left") {
      cardContainerRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      cardContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Function to detect the center card
  const updateActiveCard = () => {
    const container = cardContainerRef.current;
    if (!container) return;
  
    const cards = container.querySelectorAll(".card");
    let containerCenter = container.scrollLeft + container.clientWidth / 2;
  
    let closestCard = null;
    let minDistance = Infinity;
  
    cards.forEach((card) => {
      let cardCenter = card.offsetLeft + card.offsetWidth / 2;
      let distance = Math.abs(containerCenter - cardCenter);
  
      if (distance < minDistance) {
        minDistance = distance;
        closestCard = card;
      }
    });
  
    // Remove active class from all cards
    cards.forEach((card) => card.classList.remove("active"));
  
    // Add active class to the closest card
    if (closestCard) {
      closestCard.classList.add("active");
    }
  };
  
  useEffect(() => {
    const container = cardContainerRef.current;
    if (container) {
      container.addEventListener("scroll", updateActiveCard);
      updateActiveCard(); // Run once initially
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", updateActiveCard);
      }
    };
  }, [products]);
  

  return (
    <div className="carousel-container">
      <button className="scroll-btn left" onClick={() => handleScroll("left")}>
        ❮
      </button>

      <div className="card-container" ref={cardContainerRef}>
        {products.length === 0 ? (
          <p>Loading products...</p>
        ) : (
          products.map((product, index) => (
            <div key={index} className="card">
              <img src={product.image || "/placeholder.jpg"} alt={product.name} className="image" />
              <h2>{product.name}</h2>
              <p className="price">${product.price ? product.price.toFixed(2) : "0.00"}</p>
              <p className="rating">Ratings ({product.rating})</p>
              <p className={`stock ${product.stock === 0 ? "out" : "in"}`}>
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </p>
              <p className="description">{product.description}</p>
              <button className="buy-btn" disabled={product.stock === 0}>
                {product.stock === 0 ? "Sold Out" : "Add to Cart"}
              </button>
            </div>
          ))
        )}
      </div>

      <button className="scroll-btn right" onClick={() => handleScroll("right")}>
        ❯
      </button>
    </div>
  );
};

export default ProductCard;



/* Root styling */
// #root {
//     width: 100vw;
//     min-height: 100vh;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     background-color: #c7baba;
//     overflow-x: hidden;
//     padding: 20px;
//     box-sizing: border-box;
   
//   }
  
//   /* Carousel Container */
//   .carousel-container {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     position: relative;
//     width: 100%;
//     max-width: 1900px; /* Adjusted for better spacing */
//     overflow: hidden;
//     background: linear-gradient(135deg, #29117e, #ddd);
//     padding: auto;
//     border-radius: 30px;
//     box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
//     margin:0 auto;
//   }
  
//   /* Scroll Buttons */
//   .scroll-btn {
//     position: absolute;
//     background: rgba(0, 0, 0, 0.6);
//     color: white;
//     border: none;
//     padding: 20px;
//     font-size: 30px;
//     cursor: pointer;
//     border-radius: 28px;
//     transition: background 0.3s ease-in-out;
//     z-index: 10;
//   }
  
//   .scroll-btn:hover {
//     background: rgba(21, 134, 26, 0.8);
//   }
  
//   .scroll-btn.left {
//     left: 10px;
//   }
  
//   .scroll-btn.right {
//     right: 10px;
//   }
  
//   .card-container {
//     display: flex;
//     max-width: 100%; /* Increased to full width */
//     padding: 160px 140px; /* Adjusted padding for spacing */
//     gap: 60px; 
//     justify-content: center;
//     align-items: center;
//     overflow-x: auto; 
//     scroll-behavior: smooth;
//     border-radius: 20px;
//     /* white-space: nowrap; */
//     scroll-snap-type: x mandatory;
//     scroll-padding: 40px; 
//   }
  
//   /* Individual Cards */
//   .card {
//     width: 340px; /* Adjust width for better fit */
//     padding: 80px;
//     border-radius: 20px;
//     box-shadow: 0 3px 6px rgba(125, 154, 38, 0.15);
//     text-align: center;
//     background: #fbfcfd;
//     transition: transform 0.3s ease, opacity 0.3s ease;
//     flex-shrink: 0;
//     scroll-snap-align: center;
//     margin: 0 10px;
//     color: black;
//     height: 500px;
//     border: 10px transparent;
//   }
  
//   /* Active Card (Center Zoom Effect) */
//   .card.active {
//     transform: scale(1.1);
//     opacity: 1;
//     z-index: 10;
//     box-shadow: 0 8px 12px rgba(0, 0, 0, 0.3);
   
//   }
  
//   /* Other Cards Transparent Effect */
//   .card:not(.active) {
//     opacity: 0.5;
//   }
  
//   /* Image Styling */
//   .image {
//     width: 100%;
//     height: 140px; /* Ensures uniform size */
//     object-fit: contain;
//     border-radius: 6px;
//   }
  
//   /* Product Details */
//   .price {
//     font-size: 25px;
//     font-weight: bold;
//     color: #2c3e50;
//   }
  
//   .rating {
//     font-size: 20px;
//     color: #f39c12;
//   }
  
//   /* Stock Indicator */
//   .stock {
//     font-size: 20px;
//     font-weight: bold;
//   }
  
//   .stock.in {
//     color: green;
//   }
  
//   .stock.out {
//     color: red;
//   }
  
//   /* Description */
//   .description {
//     font-size: 20px;
//     color: #090a0a;
//     margin: 5px 0;
//     word-wrap: break-word;
//     overflow: hidden;
//     text-overflow: ellipsis;
//     display: -webkit-box;
//     /* -webkit-line-clamp: 3; Limits text to 3 lines */
//     -webkit-box-orient: vertical;
//     max-width: 100%;
//     max-height: 60px; /* Ensures proper fit */
//   }
  
//   /* Buy Button */
//   .buy-btn {
//     background-color: #27ae60;
//     color: white;
//     border: none;
//     padding: 10px 15px;
//     margin-top: 10px;
//     border-radius: 5px;
//     cursor: pointer;
//     transition: background 0.3s ease-in-out;
//   }
  
//   .buy-btn:disabled {
//     background-color: #bdc3c7;
//     cursor: not-allowed;
//   }
  
//   .buy-btn:hover:not(:disabled) {
//     background-color: #219150;
//   }
//   .card-container::-webkit-scrollbar {
//     height: 1px;
//   }
  
//   .card-container::-webkit-scrollbar-track {
//     background: #f4f4f4;
//     border-radius: 10px;
//   } 
  
//   .card-container::-webkit-scrollbar-thumb {
//     background: #888;
//     border-radius: 10px;
//   }
  
//   .card-container::-webkit-scrollbar-thumb:hover {
//     background: #e63636;
//   }
//   .card:first-child {
//     margin-left: 40px; /* Push first card into view */
//   }
  
//   .card:last-child {
//     margin-right: 40px; /* Push last card into view */
//   }
  
  


/* Root styling */
// #root {
//     width: 100vw;
//     min-height: 100vh;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     background-color: #c7baba;
//     overflow-x: hidden;
//     padding: 20px;
//     box-sizing: border-box;
   
//   }
  
//   /* Carousel Container */
//   .carousel-container {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     position: relative;
//     width: 100%;
//     max-width: 1900px; /* Adjusted for better spacing */
//     overflow: hidden;
//     background: linear-gradient(135deg, #29117e, #ddd);
//     padding: auto;
//     border-radius: 30px;
//     box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
//     margin:0 auto;
//   }
  
//   /* Scroll Buttons */
//   .scroll-btn {
//     position: absolute;
//     background: rgba(0, 0, 0, 0.6);
//     color: white;
//     border: none;
//     padding: 20px;
//     font-size: 30px;
//     cursor: pointer;
//     border-radius: 28px;
//     transition: background 0.3s ease-in-out;
//     z-index: 10;
//   }
  
//   .scroll-btn:hover {
//     background: rgba(21, 134, 26, 0.8);
//   }
  
//   .scroll-btn.left {
//     left: 10px;
//   }
  
//   .scroll-btn.right {
//     right: 10px;
//   }
//   .card-container {
//     display: flex;
//     max-width: 100%;
//     /* Instead of fixed padding values, we center the cards using calculated padding */
//     padding: 160px calc(50% - 170px); 
//     gap: 60px; 
//     justify-content: center;
//     align-items: center;
//     overflow-x: auto; 
//     scroll-behavior: smooth;
//     border-radius: 20px;
//     scroll-snap-type: x mandatory;
//     scroll-padding: 40px; 
//   }
  
//   /* Individual Cards */
//   .card {
//     width: 340px; /* Adjust width for better fit */
//     padding: 80px;
//     border-radius: 20px;
//     box-shadow: 0 3px 6px rgba(125, 154, 38, 0.15);
//     text-align: center;
//     background: #fbfcfd;
//     transition: transform 0.3s ease, opacity 0.3s ease;
//     flex-shrink: 0;
//     scroll-snap-align: center;
//     margin: 0 10px;
//     color: black;
//     height: 500px;
//     border: 10px transparent;
//   }
  
//   /* Active Card (Center Zoom Effect) */
//   .card.active {
//     transform: scale(1.1);
//     opacity: 1;
//     z-index: 10;
//     box-shadow: 0 8px 12px rgba(0, 0, 0, 0.3);
   
//   }
  
//   /* Other Cards Transparent Effect */
//   .card:not(.active) {
//     opacity: 0.5;
//   }
  
//   /* Image Styling */
//   .image {
//     width: 100%;
//     height: 140px; /* Ensures uniform size */
//     object-fit: contain;
//     border-radius: 6px;
//   }
  
//   /* Product Details */
//   .price {
//     font-size: 25px;
//     font-weight: bold;
//     color: #2c3e50;
//   }
  
//   .rating {
//     font-size: 20px;
//     color: #f39c12;
//   }
  
//   /* Stock Indicator */
//   .stock {
//     font-size: 20px;
//     font-weight: bold;
//   }
  
//   .stock.in {
//     color: green;
//   }
  
//   .stock.out {
//     color: red;
//   }
  
//   /* Description */
//   .description {
//     font-size: 20px;
//     color: #090a0a;
//     margin: 5px 0;
//     word-wrap: break-word;
//     overflow: hidden;
//     text-overflow: ellipsis;
//     display: -webkit-box;
//     /* -webkit-line-clamp: 3; Limits text to 3 lines */
//     -webkit-box-orient: vertical;
//     max-width: 100%;
//     max-height: 60px; /* Ensures proper fit */
//   }
  
//   /* Buy Button */
//   .buy-btn {
//     background-color: #27ae60;
//     color: white;
//     border: none;
//     padding: 10px 15px;
//     margin-top: 10px;
//     border-radius: 5px;
//     cursor: pointer;
//     transition: background 0.3s ease-in-out;
//   }
  
//   .buy-btn:disabled {
//     background-color: #bdc3c7;
//     cursor: not-allowed;
//   }
  
//   .buy-btn:hover:not(:disabled) {
//     background-color: #219150;
//   }
//   .card-container::-webkit-scrollbar {
//     height: 1px;
//   }
  
//   .card-container::-webkit-scrollbar-track {
//     background: #f4f4f4;
//     border-radius: 10px;
//   } 
  
//   .card-container::-webkit-scrollbar-thumb {
//     background: #888;
//     border-radius: 10px;
//   }
  
//   .card-container::-webkit-scrollbar-thumb:hover {
//     background: #e63636;
//   }
  
  

/* Root styling */
// #root {
//   width: 100vw;
//   min-height: 100vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background-color: #c7baba;
//   overflow-x: hidden;
//   padding: 20px;
//   box-sizing: border-box;
 
// }

// /* Carousel Container */
// .carousel-container {
//   width: 90vw; /* Limits width to viewport */
//   max-width: 1400px; /* Prevents excessive width */
//   overflow: hidden; /* Hides overflow */
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   position: relative;
//   background: linear-gradient(135deg, #29117e, #ddd);
//   padding: auto;
//   border-radius: 30px;
//   box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
//   margin:0 auto;
// }

// /* Scroll Buttons */
// .scroll-btn {
//   position: absolute;
//   background: rgba(0, 0, 0, 0.6);
//   color: white;
//   border: none;
//   padding: 20px;
//   font-size: 30px;
//   cursor: pointer;
//   border-radius: 28px;
//   transition: background 0.3s ease-in-out;
//   z-index: 10;
// }

// .scroll-btn:hover {
//   background: rgba(21, 134, 26, 0.8);
// }

// .scroll-btn.left {
//   left: 10px;
// }

// .scroll-btn.right {
//   right: 10px;
// }
// .card-container {
//   display: flex;
//   max-width: 100%;
//   width: 100%;
//   /* Instead of fixed padding values, we center the cards using calculated padding */
//   padding: 160px calc(23% - 170px); 
//   gap: 60px; 
//   justify-content: flex-start; /* Ensures cards stay aligned */
//   align-items: center;
//   overflow-x: auto; 
//   scroll-behavior: smooth;
//   border-radius: 20px;
//   scroll-snap-type: x mandatory;
//   scroll-padding: 40px; 
// }

// /* Individual Cards */
// .card {
//   width: 350px; /* Adjust width for better fit */
//   padding: 80px;
//   border-radius: 20px;
//   box-shadow: 0 3px 6px rgba(125, 154, 38, 0.15);
//   text-align: center;
//   background: #fbfcfd;
//   transition: transform 0.3s ease, opacity 0.3s ease;
//   flex-shrink: 0;
//   scroll-snap-align:center;
//   margin: 0 10px;
//   color: black;
//   height: 500px;
//   border: 10px solid transparent;

// }
// .card {
//   width: 350px; /* Adjust width for better fit */
//   padding: 80px;
//   border-radius: 20px;
//   box-shadow: 0 3px 6px rgba(125, 154, 38, 0.15);
//   text-align: center;
//   background: #fbfcfd;
//   transition: transform 0.3s ease, opacity 0.3s ease;
//   flex-shrink: 0;
//   scroll-snap-align:center;
//   margin: 0 10px;
//   color: black;
//   height: 500px;
//   border: 10px solid transparent;

// }

// /* Active Card (Center Zoom Effect) */
// .card.active {
//   transform: scale(1.1);
//   opacity: 1;
//   z-index: 10;
//   box-shadow: 0 8px 12px rgba(0, 0, 0, 0.3);
 
// }

// /* Other Cards Transparent Effect */
// .card:not(.active) {
//   opacity: 0.5;
// }

// /* Image Styling */
// .image {
//   width: 100%;
//   height: 140px; /* Ensures uniform size */
//   object-fit: contain;
//   border-radius: 6px;
// }

// /* Product Details */
// .price {
//   font-size: 25px;
//   font-weight: bold;
//   color: #2c3e50;
// }

// .rating {
//   font-size: 20px;
//   color: #f39c12;
// }

// /* Stock Indicator */
// .stock {
//   font-size: 20px;
//   font-weight: bold;
// }

// .stock.in {
//   color: green;
// }

// .stock.out {
//   color: red;
// }

// /* Description */
// .description {
//   font-size: 20px;
//   color: #090a0a;
//   margin: 5px 0;
//   word-wrap: break-word;
//   overflow: hidden;
//   text-overflow: ellipsis;
//   display: -webkit-box;
//   /* -webkit-line-clamp: 3; Limits text to 3 lines */
//   -webkit-box-orient: vertical;
//   max-width: 100%;
//   max-height: 60px; /* Ensures proper fit */
// }

// /* Buy Button */
// .buy-btn {
//   background-color: #27ae60;
//   color: white;
//   border: none;
//   padding: 10px 15px;
//   margin-top: 10px;
//   border-radius: 5px;
//   cursor: pointer;
//   transition: background 0.3s ease-in-out;
// }

// .buy-btn:disabled {
//   background-color: #bdc3c7;
//   cursor: not-allowed;
// }

// .buy-btn:hover:not(:disabled) {
//   background-color: #219150;
// }
// .card-container::-webkit-scrollbar {
//   height: 1px;
// }

// .card-container::-webkit-scrollbar-track {
//   background: #f4f4f4;
//   border-radius: 10px;
// } 

// .card-container::-webkit-scrollbar-thumb {
//   background: #888;
//   border-radius: 10px;
// }

// .card-container::-webkit-scrollbar-thumb:hover {
//   background: #e63636;
// }




// import React, { useState, useEffect, useRef } from "react";
// import "./ProductCard.css";

// const ProductCard = () => {
//   const [products, setProducts] = useState([]);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const cardContainerRef = useRef(null);
  
//   useEffect(() => {
//     const fetchProductDetails = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/Card");
//         const data = await response.json();
//         // Duplicate products for infinite scroll effect
//         setProducts([...data, ...data, ...data]);  
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchProductDetails();
//   }, []);

//   // Scroll Function (scroll by one card's width)
//   const handleScroll = (direction) => {
//     if (!cardContainerRef.current) return;
//     const scrollAmount = 350; // Adjust scroll step
//     if (direction === "left") {
//       cardContainerRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
//     } else {
//       cardContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
//     }
//   };

//   // Infinite Scroll Logic (immediate reset for continuous scrolling)
//   useEffect(() => {
//     const container = cardContainerRef.current;
//     if (!container) return;
//     const totalWidth = container.scrollWidth;
//     const sectionWidth = totalWidth / 3; // Middle section width

//     const handleInfiniteScroll = () => {
//       // When nearly at the left boundary, jump to the same position in the middle section.
//       if (container.scrollLeft < 1) {
//         container.scrollLeft += sectionWidth;
//       }
//       // When nearly at the right boundary, jump back to the corresponding position in the middle.
//       if (container.scrollLeft > sectionWidth * 2 - 1) {
//         container.scrollLeft -= sectionWidth;
//       }
//     };

//     container.addEventListener("scroll", handleInfiniteScroll);
//     return () => container.removeEventListener("scroll", handleInfiniteScroll);
//   }, [products]);

//   // Active Card Detection Logic: marks the card closest to container's center as active
//   useEffect(() => {
//     const container = cardContainerRef.current;
//     if (!container) return;
    
//     const handleActiveCard = () => {
//       const containerRect = container.getBoundingClientRect();
//       const containerCenter = containerRect.left + containerRect.width / 2;
//       let minDistance = Infinity;
//       let newActiveIndex = 0;
//       const cards = Array.from(container.children);
//       cards.forEach((card, i) => {
//         const cardRect = card.getBoundingClientRect();
//         const cardCenter = cardRect.left + cardRect.width / 2;
//         const distance = Math.abs(containerCenter - cardCenter);
//         if (distance < minDistance) {
//           minDistance = distance;
//           newActiveIndex = i;
//         }
//       });
//       setActiveIndex(newActiveIndex);
//     };

//     container.addEventListener("scroll", handleActiveCard);
//     // Call once initially to set the active card.
//     handleActiveCard();
//     return () => container.removeEventListener("scroll", handleActiveCard);
//   }, []);

//   return (
//     <div className="carousel-container">
//       <button className="scroll-btn left" onClick={() => handleScroll("left")}>
//         ❮
//       </button>

//       <div className="card-container" ref={cardContainerRef}>
//         {products.map((product, index) => (
//           <div key={index} className={`card ${index === activeIndex ? "active" : ""}`}>
//             <img src={product.image || "/placeholder.jpg"} alt={product.name} className="image" />
//             <h2>{product.name}</h2>
//             <p className="price">${product.price ? product.price.toFixed(2) : "0.00"}</p>
//             <p className="rating">Ratings ({product.rating})</p>
//             <p className={`stock ${product.stock === 0 ? "out" : "in"}`}>
//               {product.stock > 0 ? "In Stock" : "Out of Stock"}
//             </p>
//             <p className="description">{product.description}</p>
//             <button className="buy-btn" disabled={product.stock === 0}>
//               {product.stock === 0 ? "Sold Out" : "Add to Cart"}
//             </button>
//           </div>
//         ))}
//       </div>

//       <button className="scroll-btn right" onClick={() => handleScroll("right")}>
//         ❯
//       </button>
//     </div>
//   );
// };

// // export default ProductCard;
