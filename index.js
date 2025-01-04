const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");
const cors = require("cors");
const app = express();
const db = new sqlite3.Database("./database.sqlite");
const { swaggerUi, swaggerSpec } = require("./swagger");

// Middleware
app.use(express.json());
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid username or password
 *       500:
 *         description: Server error
 */
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  const query = "SELECT * FROM users WHERE username = ?";

  db.get(query, [username], (err, row) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error logging in.", error: err.message });
    }

    if (row) {
      bcrypt.compare(password, row.password, (err, result) => {
        if (err) {
          return res.status(500).json({
            message: "Error comparing passwords.",
            error: err.message,
          });
        }

        if (result) {
          return res.status(200).json({
            message: "Login successful!",
            userId: row.id,
          });
        } else {
          return res
            .status(400)
            .json({ message: "Invalid username or password." });
        }
      });
    } else {
      return res.status(400).json({ message: "Invalid username or password." });
    }
  });
});

/**
 * @swagger
 * /settings:
 *   get:
 *     summary: Get user settings by userId
 *     parameters:
 *       - name: userId
 *         in: query
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User settings retrieved successfully
 *       400:
 *         description: User ID is required
 *       500:
 *         description: Server error
 */
app.get("/settings", (req, res) => {
  const userId = parseInt(req.query.userId, 10);

  if (isNaN(userId)) {
    return res.status(400).json({ message: "Invalid user ID." });
  }

  const query = "SELECT key, value FROM user_settings WHERE user_id = ?";

  db.all(query, [userId], (err, rows) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error fetching settings.", error: err.message });
    }

    if (rows.length > 0) {
      const settings = {};
      rows.forEach((row) => {
        settings[row.key] = parseFloat(row.value) ?? row.value;
      });
      console.log(settings);
      return res.status(200).json({ settings });
    } else {
      return res.json({
        settings: {
          rotation: 0,
          zoom: 5,
          panX: 0,
          panY: 0,
          controlY: 0,
          controlX: 0,
          controlZ: 0,
        },
      });
    }
  });
});

/**
 * @swagger
 * /settings:
 *   put:
 *     summary: Update user settings by userId
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               settings:
 *                 type: object
 *                 properties:
 *                   rotation:
 *                     type: number
 *                   zoom:
 *                     type: number
 *                   panX:
 *                     type: number
 *                   panY:
 *                     type: number
 *     responses:
 *       200:
 *         description: Settings updated successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
app.put("/settings", (req, res) => {
  const { userId, settings } = req.body;

  if (!userId || !settings) {
    return res
      .status(400)
      .json({ error: "User ID and settings are required." });
  }

  console.log("Settings:", settings);

  const query = `
    INSERT INTO user_settings (user_id, key, value)
    VALUES (?, 'rotation', ?), (?, 'zoom', ?), (?, 'panX', ?), (?, 'panY', ?), (?, 'controlY', ?), (?, 'controlX', ?), (?, 'controlZ', ?)
  `;

  db.run(
    query,
    [
      userId,
      settings.rotation,
      userId,
      settings.zoom,
      userId,
      settings.panX,
      userId,
      settings.panY,
      userId,
      settings.controlY,
      userId,
      settings.controlX,
      userId,
      settings.controlZ,
    ],
    function (err) {
      if (err) {
        console.error("Err:", err);
        return res
          .status(500)
          .json({ error: "Failed to update settings.", details: err.message });
      }
      res.status(200).json({ message: "Settings updated successfully." });
    }
  );
});

// Start the server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
