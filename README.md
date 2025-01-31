Here’s a sample README for your app:

---

# RICA Import Permit Application

The **RICA Import Permit Application** is a web application designed to help users apply for import permits in Rwanda. This app allows business owners to submit applications with details about their business, products, and purpose of importation. The app processes these submissions and sends confirmation emails to the applicant.

## Features

- **Business Owner Details**: Collects personal details such as name, citizenship, nationality, contact information, and location.
- **Business Details**: Collects company information like business type, TIN number, registration date, and business address.
- **Product Information**: Allows users to provide details about the products they intend to import, including product category, name, weight, quantity, and description.
- **Email Confirmation**: After submission, a confirmation email is sent to the applicant with the details of the application.

## Technologies Used

- **Frontend**:
  - HTML5
  - CSS3 (with external styling)
  - JavaScript (for form validation and interactivity)
  - Font Awesome (for icons)
  
- **Backend**:
  - Node.js
  - Express.js (for handling HTTP requests)
  - MongoDB (for storing application data)
  - Nodemailer (for sending emails)

## Installation

To run the app locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Anglebert-Dev/Irembo-technical-interview.git
   ```

2. **Install dependencies**:
   Navigate to the project folder and install the required dependencies:
   ```bash
   cd rica-import-permit
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add the following variables:
   ```
   PORT=5000
   MONGO_URI=<your-mongo-db-uri>
   EMAIL_USER=<your-email-username>
   EMAIL_PASS=<your-email-password>
   ```

4. **Start the server**:
   Run the following command to start the server:
   ```bash
   npm start
   ```

   The server should now be running on `http://localhost:3000`.

## Usage

1. **Fill out the form**: Navigate to the form page, fill out the required fields for Business Owner Details, Business Details, and Product Information.
2. **Submit the application**: After completing the form, click the "Submit Application" button to submit your application.
3. **Confirmation**: After submission, a confirmation email will be sent to the applicant’s email address with the details of the application.

## API Endpoints

### POST /api/permit

Submit a new permit application. This endpoint accepts a JSON payload with the applicant's and business details.

**Request body example**:
```json
{
  "businessOwner": {
    "applicantCitizenship": "Rwandan",
    "identificationNumber": "1200480089314068",
    "passportNumber": "",
    "otherNames": "Anglebert",
    "surname": "Shumbusho Ishimwe",
    "nationality": "Rwandan",
    "phoneNumber": "+250791746914",
    "emailAddress": "anglebertsh@gmail.com",
    "address": {
      "province": "Northern",
      "district": "Kicukiro"
    }
  },
  "businessDetails": {
    "businessType": "Retailer",
    "companyName": "MAKS",
    "tinNumber": "123456789",
    "registrationDate": "2024-12-17",
    "businessAddress": {
      "province": "Northern",
      "district": "Kicukiro"
    }
  },
  "productInformation": {
    "importationDetails": {
      "purposeOfImportation": "Personal use",
      "specifyPurpose": "others"
    },
    "productDetails": {
      "productCategory": "General purpose",
      "productName": "shoes",
      "weightKg": 20,
      "descriptionOfProducts": "hello",
      "unitOfMeasurement": "Kgs",
      "quantityOfProducts": 20
    }
  }
}
```

### GET /api/permit/:id

Retrieve details of an existing permit application by its ID.

**Response example**:
```json
{
  "success": true,
  "data": {
    "_id": "679c9a16fc36050d49b10dca",
    "businessOwner": { ... },
    "businessDetails": { ... },
    "productInformation": { ... },
    "status": "Pending",
    "createdAt": "2025-01-31T09:38:30.642Z"
  }
}
```

## Contributing

If you’d like to contribute to this project, feel free to fork it and submit a pull request. Any suggestions or improvements are welcome!
