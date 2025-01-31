// src/models/Permit.js
const mongoose = require("mongoose");

const permitSchema = new mongoose.Schema({
  businessOwner: {
    applicantCitizenship: {
      type: String,
      enum: ["Rwandan", "Foreigner"],
      required: true,
    },
    // For Rwandan citizens
    identificationNumber: {
      type: String,
      required: function () {
        return this.applicantCitizenship === "Rwandan";
      },
    },
    // For Foreigners
    passportNumber: {
      type: String,
      required: function () {
        return this.applicantCitizenship === "Foreigner";
      },
    },
    otherNames: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    nationality: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true, 
    },
    emailAddress: {
      type: String,
      required: true, 
    },
    address: {
      province: {
        type: String,
        required: true, 
      },
      district: {
        type: String,
        required: true,
      },
    },
  },
  businessDetails: {
    businessType: {
      type: String,
      enum: ["Retailer", "Wholesale", "Manufacturer"],
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    tinNumber: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^\d{9}$/.test(v);
        },
        message: "Please provide a valid TIN number (9 digits)",
      },
    },
    registrationDate: {
      type: Date,
      required: true,
    },
    businessAddress: {
      province: {
        type: String,
        required: true, 
      },
      district: {
        type: String,
        required: true,
      },
    },
  },
  productInformation: {
    importationDetails: {
      purposeOfImportation: {
        type: String,
        enum: ["Direct sale", "Personal use", "Trial use", "Other"],
        required: true,
      },
      specifyPurpose: {
        type: String,
        required: function () {
          return this.purposeOfImportation === "Other"; 
        },
      },
    },
    productDetails: {
      productCategory: {
        type: String,
        enum: ["General purpose", "Construction materials", "Chemicals"],
        required: true,
      },
      productName: {
        type: String,
        required: true,
      },
      weightKg: {
        type: Number,
        required: false, 
      },
      descriptionOfProducts: {
        type: String,
        required: true,
      },
      unitOfMeasurement: {
        type: String,
        enum: ["Kgs", "Tonnes"],
        required: true,
      },
      quantityOfProducts: {
        type: Number,
        required: true,
        min: [1, "Please provide number greater than zero"],
      },
    },
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Permit", permitSchema);
