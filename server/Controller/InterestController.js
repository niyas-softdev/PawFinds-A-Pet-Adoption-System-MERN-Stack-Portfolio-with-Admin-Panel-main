const Interest = require("../Model/InterestModel");

// 📌 Add Interest Submission
const postInterest = async (req, res) => {
    try {
        const { name, contact, message, petFoodId, petFoodName } = req.body;

        // Validate required fields
        if (!name || !contact || !petFoodId || !petFoodName) {
            return res.status(400).json({ error: "All required fields must be filled." });
        }

        const newInterest = new Interest({
            name,
            contact,
            message,
            petFoodId,
            petFoodName,
        });

        await newInterest.save();
        res.status(201).json({ message: "Interest recorded successfully!", interest: newInterest });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 📌 Fetch All Interest Submissions
const getAllInterests = async (req, res) => {
    try {
        const interests = await Interest.find().sort({ createdAt: -1 });
        res.status(200).json(interests);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 📌 Fetch Interest by ID
const getInterestById = async (req, res) => {
    try {
        const interest = await Interest.findById(req.params.id);
        if (!interest) {
            return res.status(404).json({ error: "Interest not found." });
        }
        res.status(200).json(interest);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 📌 Delete an Interest Submission
const deleteInterest = async (req, res) => {
    try {
        const interest = await Interest.findByIdAndDelete(req.params.id);
        if (!interest) {
            return res.status(404).json({ error: "Interest not found." });
        }
        res.status(200).json({ message: "Interest deleted successfully!", deletedInterest: interest });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    postInterest,
    getAllInterests,
    getInterestById,
    deleteInterest,
};
