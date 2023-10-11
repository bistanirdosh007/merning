const mongoose = require("mongoose");

const questionCategorySchema = mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      enum: [
        "दृष्टि सम्बन्धी",
        "सुनाइ सम्बन्धी",
        "हिँडडूल सम्बन्धी (मोबिलिटी)",
        "सूक्ष्म कार्य सिप सम्बन्धी",
        "सञ्चार र बोध सम्बन्धी",
        "सिकाइ सम्बन्धी",
        "खेल सम्बन्धी",
        "व्यवहार नियन्त्रण सम्बन्धी",
        "स्वहेरचाह सम्बन्धी",
        "सञ्चार र बोध सम्बन्धी",
        "स्मरण सम्बन्धी",
        "एकाग्रता सम्बन्धी",
        "परिवर्तन स्वीकार्ने सम्बन्धी",
        "साथी बनाउने सम्बन्धी",
        "चिन्ता सम्बन्धी",
      ],
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Question_Category", questionCategorySchema);
