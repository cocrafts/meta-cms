const express = require("express");
const admin = require("firebase-admin");
const bodyParser = require("body-parser");
const cors = require("cors");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/api/signin", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send("Unauthorized");
  }
  const tokenParts = authHeader.split(' '); // Tách chuỗi "Bearer token" thành mảng ["Bearer", "token"]
  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    return res.status(401).send("Unauthorized");
  }
  const idToken = tokenParts[1];
  console.log(idToken);
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    res.json(decodedToken);
  } catch (error) {
    res.status(401).send("Unauthorized");
  }
});

// eslint-disable-next-line turbo/no-undeclared-env-vars
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
