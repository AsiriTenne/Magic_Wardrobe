import React, { useState, useEffect } from "react";
import { fs } from "../Config/Config";
import "jspdf-autotable";
import jsPDF from "jspdf";

export const InventoryReport = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsRef = await fs.collection("Products").get();
        const productsArray = productsRef.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsArray);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Function to handle the download report action
  const handleDownloadReport = () => {
    const doc = new jsPDF();

    // Define the header text
    const headerText = "Inventory Report";

    // Calculate the text width and center it
    const textWidth = doc.getTextWidth(headerText);
    const pageWidth = doc.internal.pageSize.width;
    const x = (pageWidth - textWidth) / 2;

    // Add the centered header to the PDF
    doc.text(headerText, x, 10); // Center the text horizontally

    // Define the table columns and rows
    const columns = [
      "Name",
      "Description",
      "Price",
      "Color",
      "Product Category",
    ];
    const rows = products.map((product) => [
      product.title,
      product.description,
      `$${product.price}`,
      product.color,
      product.category,
    ]);

    // Add the table to the PDF
    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 20,
    });

    // Save the PDF or open it in a new tab
    doc.save("inventory_report.pdf");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Inventory Report
      </h1>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          margin: "0 auto",
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                backgroundColor: "#333",
                color: "white",
                padding: "8px",
              }}
            >
              Name
            </th>
            <th
              style={{
                backgroundColor: "#333",
                color: "white",
                padding: "8px",
              }}
            >
              Description
            </th>
            <th
              style={{
                backgroundColor: "#333",
                color: "white",
                padding: "8px",
              }}
            >
              Price
            </th>
            <th
              style={{
                backgroundColor: "#333",
                color: "white",
                padding: "8px",
              }}
            >
              Color
            </th>
            <th
              style={{
                backgroundColor: "#333",
                color: "white",
                padding: "8px",
              }}
            >
              Product Category
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr
              key={product.id}
              style={{
                backgroundColor: index % 2 === 0 ? "#f2f2f2" : "white",
              }}
            >
              <td style={{ padding: "8px" }}>{product.title}</td>
              <td style={{ padding: "8px" }}>{product.description}</td>
              <td style={{ padding: "8px" }}>{`$${product.price}`}</td>
              <td style={{ padding: "8px" }}>{product.color}</td>
              <td style={{ padding: "8px" }}>{product.category}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div
        style={{
          position: "absolute",
          bottom: "10px", // Adjust the distance from the bottom as needed
          left: "50%",
          transform: "translateX(-50%)", // Center the button horizontally
          textAlign: "center",
          width: "100%",
        }}
      ></div>
      <button
        onClick={handleDownloadReport}
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          display: "block",
          margin: "0 auto", // Center the button horizontally
        }}
      >
        Download Report
      </button>
    </div>
  );
};
