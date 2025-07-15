const express = require("express");
const axios = require("axios");
const { SocksProxyAgent } = require("socks-proxy-agent");
const cors = require("cors");

const app = express();
const agent = new SocksProxyAgent("socks5://127.0.0.1:8080"); // Local SOCKS proxy

app.use(cors()); // Allow all origins
app.use(express.json()); // Ensure JSON body parsing

app.post("/search", async (req, res) => {
      try {
            const payload = req.body; // Receive full EMT-formatted request

            const response = await axios.post(
                  "https://serviceapi-aircasa.easemytrip.com/Flight.svc/json/FlightSearch",
                  payload,
                  {
                        headers: {
                              "Content-Type": "application/json",
                              "User-Agent": "Mozilla/5.0",
                        },
                        httpsAgent: agent,
                  }
            );

            res.json(response.data);
      } catch (err) {
            console.error("EMT API error:", err.message);
            res.status(500).json({ error: err.message });
      }
});

app.listen(3001, "0.0.0.0", () =>
      console.log("Proxy API listening on port 3001")
);
