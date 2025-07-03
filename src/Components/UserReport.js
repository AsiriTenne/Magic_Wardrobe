import React, { useState, useEffect } from "react";
import { fs } from "../Config/Config";
import "jspdf-autotable";
import jsPDF from "jspdf";

export const UserReport = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUserProfiles = async () => {
      try {
        const usersCollection = await fs.collection("users").get();
        const usersData = usersCollection.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUserProfiles();
  }, []);

  // Function to handle the download report action
  const handleDownloadReport = () => {
    const doc = new jsPDF();

    // Define the header text
    const headerText = "User Report";

    // Calculate the text width and center it
    const textWidth = doc.getTextWidth(headerText);
    const pageWidth = doc.internal.pageSize.width;
    const x = (pageWidth - textWidth) / 2;

    // Add the centered header to the PDF
    doc.text(headerText, x, 10); // Center the text horizontally

    // Define the table columns and rows
    const columns = ["Full Name", "Email", "Contact Number", "Address"];
    const rows = users.map((user) => [
      user.FullName,
      user.Email,
      user.ContactNumber,
      user.Address, // Include the registered date
    ]);

    // Add the table to the PDF
    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 20,
    });

    // Save the PDF or open it in a new tab
    doc.save("user_report.pdf");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>User Details</h1>
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
              Full Name
            </th>
            <th
              style={{
                backgroundColor: "#333",
                color: "white",
                padding: "8px",
              }}
            >
              Email
            </th>
            <th
              style={{
                backgroundColor: "#333",
                color: "white",
                padding: "8px",
              }}
            >
              Contact Number
            </th>
            <th
              style={{
                backgroundColor: "#333",
                color: "white",
                padding: "8px",
              }}
            >
              Address
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={user.id}
              style={{
                backgroundColor: index % 2 === 0 ? "#f2f2f2" : "white",
              }}
            >
              <td style={{ padding: "8px" }}>{user.FullName}</td>
              <td style={{ padding: "8px" }}>{user.Email}</td>
              <td style={{ padding: "8px" }}>{user.ContactNumber}</td>
              <td style={{ padding: "8px" }}>{user.Address}</td>
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
      >
        <button
          onClick={handleDownloadReport}
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Download Report
        </button>
      </div>
    </div>
  );
};
