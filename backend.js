
const http = require("http");
const fs = require("fs");
const path = require("path");

const evalPath = "C:/Users/91978/OneDrive/Desktop/Eval-1"; // Adjust this path as necessary
const PORT = 3000;
const usersFile = path.join(evalPath, "users.json"); // Path to the users.json file

const server = http.createServer((req, res) => {
  
  if (req.url === "/") {
    const filePath = path.join(evalPath, "index.html");
    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("500 Internal Server Error");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(content);
      }
    });
  }

  else if (req.method === "GET" && req.url === "/signup") {
    const filePath = path.join(evalPath, "signup.html");
    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("500 Internal Server Error");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(content);
      }
    });
  }

  else if (req.method === "POST" && req.url === "/signup") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const params = new URLSearchParams(body);
      const username = params.get("username");
      const email = params.get("email");
      const password = params.get("password");
      const confirmPassword = params.get("confirm-password");

      if (password !== confirmPassword) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Passwords do not match" }));
        return;
      }

      if (!username || !email || !password) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Missing required fields" }));
        return;
      }


      const signupDetails = {
        username: username,
        email: email,
        password: password,  
        timestamp: new Date().toISOString(),
      };

      fs.readFile(usersFile, "utf8", (err, data) => {
        let users = [];

        if (!err && data) {
          try {
            users = JSON.parse(data);

            if (!Array.isArray(users)) {
              throw new Error("Users data is not an array");
            }
          } catch (parseError) {
            console.error("Error parsing users JSON", parseError);
            users = []; 
          }
        }


        if (users.some((user) => user.username === username)) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Username already exists" }));
          return;
        }

        users.push(signupDetails);

       
        fs.writeFile(usersFile, JSON.stringify(users, null, 2), (err) => {
          if (err) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Error saving user data" }));
            return;
          }

          // Send only the success message, without sensitive data
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({
            message: "Signup successful!"
          }));
        });
      });
    });

    req.on("error", (err) => {
      console.error("Error handling request body", err);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Internal Server Error" }));
    });
  }

  // Handle POST request for login
  else if (req.method === "POST" && req.url === "/login") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const params = new URLSearchParams(body);
      const username = params.get("username");
      const password = params.get("password");

      if (!username || !password) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Missing username or password" }));
        return;
      }

      // Read the users from the JSON file
      fs.readFile(usersFile, "utf8", (err, data) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Error reading user data" }));
          return;
        }

        let users = [];
        if (data) {
          try {
            users = JSON.parse(data);
          } catch (parseError) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Error parsing user data" }));
            return;
          }
        }

        // Find the user with the matching username
        const user = users.find((u) => u.username === username);

        if (!user) {
          res.writeHead(401, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Invalid username or password" }));
          return;
        }

        // Check if the password matches
        if (user.password !== password) {
          res.writeHead(401, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Invalid username or password" }));
          return;
        }

        // Send a success response (excluding the password in the response)
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Login successful" }));
      });
    });

    req.on("error", (err) => {
      console.error("Error handling request body", err);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Internal Server Error" }));
    });
  }

  // Handle 404 errors for invalid routes
  else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
