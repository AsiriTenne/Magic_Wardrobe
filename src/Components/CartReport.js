import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

export const CartReport = () => {
  // Sample data
  const customers = [
    "sandali@gmail.com",
    "kanishka@gmail.com",
    "nuran1@gmail.com",
    "mehara@gmail.com",
    "deshitha@gmail.com",
  ];
  const products = [
    "Zara Office Wear",
    "Jady Fitness Fit",
    "Zeena Army Green",
    "Kazuky Party fit",
    "Didas Office Pant",
    "Didas Office Wear",
    "Blue overthrow Jacket",
  ];

  const getRandomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const generateRandomSalesData = () => {
    const salesData = [];
    for (let customer of customers) {
      const customerSales = [];
      // Shuffle the products array
      const shuffledProducts = products.sort(() => 0.5 - Math.random());
      const selectedProducts = shuffledProducts.slice(0, getRandomInt(3, 4));
      let total = 0;
      for (let product of selectedProducts) {
        const quantity = getRandomInt(1, 5); // Random quantity
        const price = getRandomInt(3000, 8000); // Random price
        const productTotal = quantity * price;
        total += productTotal;
        customerSales.push({
          product,
          quantity,
          price,
          total: productTotal,
        });
      }
      salesData.push({ customer, sales: customerSales, total });
    }
    return salesData;
  };

  const salesData = generateRandomSalesData();

  // Function to handle the download report action
  const handleDownloadReport = () => {
    const doc = new jsPDF();

    // Define the header text
    const headerText = "Sales Report";

    // Calculate the text width and center it
    const textWidth = doc.getTextWidth(headerText);
    const pageWidth = doc.internal.pageSize.width;
    const x = (pageWidth - textWidth) / 2;

    // Add the centered header to the PDF
    doc.text(headerText, x, 10); // Center the text horizontally

    // Define the table columns and rows
    const columns = ["Customer", "Product", "Quantity", "Price", "Total"];
    const rows = [];

    // Populate rows with data
    salesData.forEach((salesEntry) => {
      rows.push([
        salesEntry.customer,
        salesEntry.sales[0].product,
        salesEntry.sales[0].quantity,
        salesEntry.sales[0].price,
        salesEntry.sales[0].total,
      ]);

      salesEntry.sales.slice(1).forEach((productData) => {
        rows.push([
          "",
          productData.product,
          productData.quantity,
          productData.price,
          productData.total,
        ]);
      });

      // Add a row for the total
      rows.push(["", "", "", "Total:", salesEntry.total]);
    });

    // Add the table to the PDF
    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 20,
    });

    // Save the PDF or open it in a new tab
    doc.save("sales_report.pdf");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        All Carts Report
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
              Customer
            </th>
            <th
              style={{
                backgroundColor: "#333",
                color: "white",
                padding: "8px",
              }}
            >
              Product
            </th>
            <th
              style={{
                backgroundColor: "#333",
                color: "white",
                padding: "8px",
              }}
            >
              Quantity
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
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {salesData.map((salesEntry, index) => (
            <React.Fragment key={index}>
              <tr>
                <td
                  rowSpan={salesEntry.sales.length}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#f2f2f2" : "white",
                    padding: "8px",
                  }}
                >
                  {salesEntry.customer}
                </td>
                <td style={{ padding: "8px" }}>
                  {salesEntry.sales[0].product}
                </td>
                <td style={{ padding: "8px" }}>
                  {salesEntry.sales[0].quantity}
                </td>
                <td style={{ padding: "8px" }}>{salesEntry.sales[0].price}</td>
                <td style={{ padding: "8px" }}>{salesEntry.sales[0].total}</td>
              </tr>
              {salesEntry.sales.slice(1).map((productData, productIndex) => (
                <tr key={productIndex}>
                  <td style={{ padding: "8px" }}>{productData.product}</td>
                  <td style={{ padding: "8px" }}>{productData.quantity}</td>
                  <td style={{ padding: "8px" }}>{productData.price}</td>
                  <td style={{ padding: "8px" }}>{productData.total}</td>
                </tr>
              ))}
              <tr>
                <td colSpan="4" style={{ textAlign: "right" }}>
                  <strong>Total:</strong>
                </td>
                <td style={{ padding: "8px" }}>{salesEntry.total}</td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
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
          margin: "20px auto",
        }}
      >
        Download Report
      </button>
    </div>
  );
};
