const router = require("express").Router();

const Pin = require("../models/Pin");

//Creating a pin.
router.post("/", async (req, res) => {
  const pinCandidate = new Pin(req.body);

  try {
    const savedPin = await pinCandidate.save();
    res.status(200).json(savedPin);
    console.log("[SUCCESS] Adding Pin to DB!");
  } catch (error) {
    res.status(500).json(error);
    console.log("[FAILED] Adding Pin to DB!", error);
  }
});

//Get all pins
router.get("/", async (req, res) => {
  try {
    const pins = await Pin.find();
    console.log("[SUCCESS] finding all pins!");
    res.status(200).json(pins);
  } catch (error) {
    console.log("[FAILED] Finding all pins!");
    res.status(500).json(error);
  }
});

module.exports = router;
