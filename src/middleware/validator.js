const Joi = require("joi");

const permitValidationSchema = Joi.object({
  businessOwner: Joi.object({
    applicantCitizenship: Joi.string()
      .valid("Rwandan", "Foreigner")
      .required()
      .messages({
        "any.required": "This field is required",
      }),
    identificationNumber: Joi.when("applicantCitizenship", {
      is: "Rwandan",
      then: Joi.string().required().messages({
        "any.required": "This field is required",
      }),
    }),
    passportNumber: Joi.when("applicantCitizenship", {
      is: "Foreigner",
      then: Joi.string().required().messages({
        "any.required": "This field is required",
      }),
    }),
    otherNames: Joi.string().required().messages({
      "any.required": "This field is required",
    }),
    surname: Joi.string().required().messages({
      "any.required": "This field is required",
    }),
    nationality: Joi.string().required().messages({
      "any.required": "This field is required",
    }),
    phoneNumber: Joi.string().allow(""),
    emailAddress: Joi.string().email().allow(""),
    address: Joi.object({
      province: Joi.string().optional(), // Now allowing the province field
      district: Joi.string().required().messages({
        "any.required": "This field is required",
      }),
    }),
  }),
  businessDetails: Joi.object({
    businessType: Joi.string()
      .valid("Retailer", "Wholesale", "Manufacturer")
      .required()
      .messages({
        "any.required": "This field is required",
      }),
    companyName: Joi.string().required().messages({
      "any.required": "This field is required",
    }),
    tinNumber: Joi.string()
      .pattern(/^\d{9}$/)
      .required()
      .messages({
        "any.required": "This field is required",
        "string.pattern.base": "Please provide a valid TIN number",
      }),
    registrationDate: Joi.date().required().messages({
      "any.required": "This field is required",
    }),
    businessAddress: Joi.object({
      province: Joi.string().optional(), // Now allowing the province field
      district: Joi.string().required().messages({
        "any.required": "This field is required",
      }),
    }),
  }),
  productInformation: Joi.object({
    importationDetails: Joi.object({
      purposeOfImportation: Joi.string()
        .valid("Direct sale", "Personal use", "Trial use", "Other")
        .required()
        .messages({
          "any.required": "This field is required",
        }),
      specifyPurpose: Joi.when("purposeOfImportation", {
        is: "Other",
        then: Joi.string().required().messages({
          "any.required": "This field is required",
        }),
        otherwise: Joi.string().allow(""),
      }),
    }),
    productDetails: Joi.object({
      productCategory: Joi.string()
        .valid("General purpose", "Construction materials", "Chemicals")
        .required()
        .messages({
          "any.required": "This field is required",
        }),
      productName: Joi.string().required().messages({
        "any.required": "This field is required",
      }),
      weightKg: Joi.number().allow(null),
      descriptionOfProducts: Joi.string().required().messages({
        "any.required": "This field is required",
      }),
      unitOfMeasurement: Joi.string()
        .valid("Kgs", "Tonnes")
        .required()
        .messages({
          "any.required": "This field is required",
        }),
      quantityOfProducts: Joi.number().greater(0).required().messages({
        "any.required": "This field is required",
        "number.greater": "Please provide number greater than zero",
      }),
    }),
  }),
});

const validatePermit = (req, res, next) => {
  const { error } = permitValidationSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const errorMessages = error.details.map((detail) => ({
      field: detail.path.join("."),
      message: detail.message,
    }));

    return res.status(400).json({
      success: false,
      errors: errorMessages,
    });
  }

  next();
};

module.exports = validatePermit;
