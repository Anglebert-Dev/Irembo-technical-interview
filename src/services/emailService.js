// src/services/emailService.js
const config = require("../config");
const createTransporter = require("../config/email");

const transporter = createTransporter(config);

const sendPermitEmail = async (permit) => {
  const emailContent = `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
          }
          .email-container {
            background-color: #fff;
            padding: 20px;
            max-width: 600px;
            margin: 0 auto;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          h1 {
            color: #333;
          }
          p {
            font-size: 16px;
            line-height: 1.5;
            color: #555;
          }
          .application-details {
            margin-top: 20px;
            border-top: 2px solid #f4f4f4;
            padding-top: 20px;
          }
          .application-details table {
            width: 100%;
            border-collapse: collapse;
          }
          .application-details th, .application-details td {
            padding: 10px;
            border-bottom: 1px solid #f4f4f4;
            text-align: left;
          }
          .footer {
            margin-top: 30px;
            font-size: 14px;
            color: #888;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <h1>Dear ${permit.businessOwner.otherNames} ${
    permit.businessOwner.surname
  },</h1>
          <p>Your import permit application has been received successfully. Below are the details of your application:</p>
          
          <div class="application-details">
            <h2>Business Owner Details</h2>
            <table>
              <tr>
                <th>Full Name</th>
                <td>${permit.businessOwner.otherNames} ${
    permit.businessOwner.surname
  }</td>
              </tr>
              <tr>
                <th>Citizenship</th>
                <td>${permit.businessOwner.applicantCitizenship}</td>
              </tr>
              <tr>
                <th>Identification Number</th>
                <td>${permit.businessOwner.identificationNumber}</td>
              </tr>
              <tr>
                <th>Phone Number</th>
                <td>${permit.businessOwner.phoneNumber}</td>
              </tr>
              <tr>
                <th>Email Address</th>
                <td>${permit.businessOwner.emailAddress}</td>
              </tr>
              <tr>
                <th>Address</th>
                <td>${permit.businessOwner.address.province}, ${
    permit.businessOwner.address.district
  }</td>
              </tr>
            </table>

            <h2>Business Details</h2>
            <table>
              <tr>
                <th>Company Name</th>
                <td>${permit.businessDetails.companyName}</td>
              </tr>
              <tr>
                <th>Business Type</th>
                <td>${permit.businessDetails.businessType}</td>
              </tr>
              <tr>
                <th>TIN Number</th>
                <td>${permit.businessDetails.tinNumber}</td>
              </tr>
              <tr>
                <th>Registration Date</th>
                <td>${new Date(
                  permit.businessDetails.registrationDate
                ).toLocaleDateString()}</td>
              </tr>
              <tr>
                <th>Business Address</th>
                <td>${permit.businessDetails.businessAddress.province}, ${
    permit.businessDetails.businessAddress.district
  }</td>
              </tr>
            </table>

            <h2>Product Information</h2>
            <table>
              <tr>
                <th>Product Name</th>
                <td>${permit.productInformation.productDetails.productName}</td>
              </tr>
              <tr>
                <th>Category</th>
                <td>${
                  permit.productInformation.productDetails.productCategory
                }</td>
              </tr>
              <tr>
                <th>Weight (Kg)</th>
                <td>${permit.productInformation.productDetails.weightKg} ${
                  permit.productInformation.productDetails.unitOfMeasurement
                }kg</td>
              </tr>
              <tr>
                <th>Quantity</th>
                <td>${
                  permit.productInformation.productDetails.quantityOfProducts} </td>
              </tr>
              <tr>
                <th>Description</th>
                <td>${
                  permit.productInformation.productDetails.descriptionOfProducts
                }</td>
              </tr>
              <tr>
                <th>Purpose of Importation</th>
                <td>${
                  permit.productInformation.importationDetails
                    .purposeOfImportation
                }</td>
              </tr>
              <tr>
                <th>Specific Purpose</th>
                <td>${
                  permit.productInformation.importationDetails.specifyPurpose
                }</td>
              </tr>
            </table>
          </div>

          <p>We will review your application and get back to you soon.</p>

          <p class="footer">Best regards,<br>RICA Import Permit Team</p>
        </div>
      </body>
    </html>
  `;

  const mailOptions = {
    from: config.email.user,
    to: permit.businessOwner.emailAddress,
    subject: "RICA Import Permit Application Confirmation",
    html: emailContent, // Sending HTML content
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendPermitEmail,
};
