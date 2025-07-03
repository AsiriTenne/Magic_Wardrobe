import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";
import { Person as UserIcon } from "@mui/icons-material";

export const Chatbot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [showChatbot, setShowChatbot] = useState(true);
  const handleSendMessage = () => {
    const userMessage = input.trim().toLowerCase();
    const newUserMessage = { text: userMessage, user: "user" };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    if (
      userMessage.includes("hi") ||
      userMessage.includes("hey") ||
      userMessage.includes("hello") ||
      userMessage.includes("yo")
    ) {
      const botResponse = {
        text: "Hello again... How can I help you?",
        user: "bot",
      };
      setTimeout(() => {
        setMessages((prevMessages) => [...prevMessages, botResponse]);
      }, 500);
    } else if (
      userMessage.includes("buy") ||
      userMessage.includes("buy clothes") ||
      userMessage.includes("get clothes") ||
      userMessage.includes("get items")
    ) {
      const botResponse = {
        text: "You can purchase our products through the website. Here are some instructions.. You have to login and add the items to the cart. Choose your payment method and buy the products",
        user: "bot",
      };
      setTimeout(() => {
        setMessages((prevMessages) => [...prevMessages, botResponse]);
      }, 500);
    } else if (
      userMessage.includes("return") ||
      userMessage.includes("return items ") ||
      userMessage.includes("return clothes")
    ) {
      const botResponse = {
        text: "We are not usually doing that. But if need more information conact us - 0114447852",
        user: "bot",
      };
      setTimeout(() => {
        setMessages((prevMessages) => [...prevMessages, botResponse]);
      }, 500);
    } else if (
      userMessage.includes("Thanks") ||
      userMessage.includes("Thank you ")
    ) {
      const botResponse = {
        text: "You're welcome!",
        user: "bot",
      };
      setTimeout(() => {
        setMessages((prevMessages) => [...prevMessages, botResponse]);
      }, 500);
    } else if (
      userMessage.includes("contact number") ||
      userMessage.includes("phone number") ||
      userMessage.includes("get an email") ||
      userMessage.includes("email")
    ) {
      const botResponse = {
        text: "Our contact number - 0114475896, Our email - matchy@gmail.com. If you have any issue contact us through an email or phone",
        user: "bot",
      };
      setTimeout(() => {
        setMessages((prevMessages) => [...prevMessages, botResponse]);
      }, 500);
    } else {
      const botResponse = {
        text: "Sorry I didn't get that. Can you explain a bit more please ..",
        user: "bot",
      };
      setTimeout(() => {
        setMessages((prevMessages) => [...prevMessages, botResponse]);
      }, 500);
    }
    setInput("");
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };
  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };
  const closeChatbot = () => {
    setShowChatbot(false);
  };
  useEffect(() => {
    if (showChatbot && messages.length === 0) {
      setMessages([{ text: "Hi. How can I help you today?", user: "bot" }]);
    }
  }, [showChatbot, messages]);
  return (
    <div>
      {showChatbot && (
        <Card
          style={{
            width: "350px",
            height: "500px",
            position: "fixed",
            bottom: "10px",
            right: "10px",
            display: "flex",
            flexDirection: "column",
            background: "#f2f2f2",
          }}
        >
          <CardContent
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "5px",
              }}
            >
              <div></div>
              <button
                onClick={closeChatbot}
                style={{
                  color: "white",
                  background: "black",
                  border: "none",
                  cursor: "pointer",
                  alignSelf: "flex-start",
                  borderRadius: "50%", // Make the button round
                  padding: "15px", // Optional: Add padding for a larger round button
                }}
              >
                X
              </button>
            </div>
            <div style={{ flex: 1, overflowY: "auto" }}>
              {messages.map((message, index) => (
                <div
                  key={index}
                  style={{
                    display: "inline-block",
                    background:
                      message.user === "user" ? "lightgrey" : "lightgrey",
                    margin: "5px",
                    padding: "10px",
                    borderRadius:
                      message.user === "user"
                        ? "10px 10px 10px 0"
                        : "10px 10px 0 10px",
                    textAlign: message.user === "user" ? "right" : "left",
                    float: message.user === "user" ? "right" : "left",
                  }}
                >
                  {message.user === "user" ? (
                    <UserIcon
                      fontSize="small"
                      style={{
                        verticalAlign: "middle",
                        marginRight: "5px",
                        color: "blue",
                      }}
                    />
                  ) : (
                    <SendIcon
                      fontSize="small"
                      style={{
                        verticalAlign: "middle",
                        marginRight: "5px",
                        color: "black",
                      }}
                    />
                  )}
                  {message.text}
                </div>
              ))}
            </div>
            <div
              className="message-input"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px",
              }}
            >
              <TextField
                label="Type a message"
                variant="standard"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                style={{ flex: 1 }}
              />
              <Button
                variant="outlined"
                onClick={handleSendMessage}
                style={{ color: "black", borderColor: "black" }}
              >
                Send
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
