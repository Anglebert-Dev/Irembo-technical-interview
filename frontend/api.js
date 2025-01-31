document.addEventListener('DOMContentLoaded', function() {
    // Get main form elements
    const form = document.getElementById('ricaForm');
    const citizenshipSelect = document.getElementById('applicantCitizenship');
    const purposeSelect = document.getElementById('purposeOfImportation');
    const errorMessages = document.querySelectorAll('.error-message');

    // Initialize location dropdowns
    function initializeLocationDropdowns() {
        const provinces = ['Kigali', 'Northern', 'Southern', 'Eastern', 'Western'];
        const provinceSelects = [
            document.getElementById('province'),
            document.getElementById('businessProvince')
        ];

        provinces.forEach(province => {
            provinceSelects.forEach(select => {
                const option = document.createElement('option');
                option.value = province;
                option.textContent = province;
                select.appendChild(option);
            });
        });
    }

    // Initialize nationality dropdown
    function initializeNationalityDropdown() {
        const nationalities = ['Rwandan', 'Ugandan', 'Kenyan', 'Tanzanian', 'Other'];
        const nationalitySelect = document.getElementById('nationality');

        nationalities.forEach(nationality => {
            const option = document.createElement('option');
            option.value = nationality;
            option.textContent = nationality;
            nationalitySelect.appendChild(option);
        });
    }

    // NIDA Integration
    // async function fetchNIDAData(idNumber) {
    //     try {
    //         const response = await fetch(`/api/nida/${idNumber}`, {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         });

    //         const data = await response.json();

    //         if (!response.ok) {
    //             throw new Error('Sorry, we can\'t find your identification data from NIDA system. Please contact NIDA for more details.');
    //         }

    //         // Auto-populate fields with NIDA data
    //         document.getElementById('otherNames').value = data.otherNames;
    //         document.getElementById('surname').value = data.surname;
    //         document.getElementById('nationality').value = data.nationality;

    //         // Make the auto-populated fields readonly
    //         document.getElementById('otherNames').readOnly = true;
    //         document.getElementById('surname').readOnly = true;
    //         document.getElementById('nationality').disabled = true;

    //     } catch (error) {
    //         const errorDiv = document.getElementById('identificationNumber')?.nextElementSibling;
    //         if (errorDiv) {
    //             errorDiv.textContent = error.message;
    //             errorDiv.style.display = 'block';
    //         }
    //     }
    // }

    // Validation functions
    function validateTinNumber(tinNumber) {
        return /^\d{9}$/.test(tinNumber);
    }

    function validateQuantity(quantity) {
        return quantity > 0;
    }

    function validateRequiredField(fieldId, errorMessage) {
        const field = document.getElementById(fieldId);
        const errorDiv = field?.nextElementSibling;
        
        if (!field?.value) {
            if (errorDiv) {
                errorDiv.textContent = errorMessage;
                errorDiv.style.display = 'block';
            }
            return false;
        }
        return true;
    }

    // Reset functions
    function resetNIDAFields() {
        const fields = ['otherNames', 'surname', 'nationality'];
        fields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                field.value = '';
                field.readOnly = false;
                if (fieldId === 'nationality') {
                    field.disabled = false;
                }
            }
        });
    }

    function resetConditionalFields() {
        const fields = ['rwandanFields', 'foreignerFields', 'specifyPurposeField'];
        fields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                field.style.display = 'none';
            }
        });
    }

    // Event Listeners
    // ID Number input handler
    document.getElementById('identificationNumber')?.addEventListener('blur', function() {
        if (this.value && document.getElementById('applicantCitizenship').value === 'Rwandan') {
            fetchNIDAData(this.value);
        }
    });

    // Citizenship change handler
    citizenshipSelect?.addEventListener('change', function() {
        const rwandanFields = document.getElementById('rwandanFields');
        const foreignerFields = document.getElementById('foreignerFields');
        const idNumber = document.getElementById('identificationNumber');
        const passportNumber = document.getElementById('passportNumber');

        if (this.value === 'Rwandan') {
            if (rwandanFields) rwandanFields.style.display = 'block';
            if (foreignerFields) foreignerFields.style.display = 'none';
            if (idNumber) idNumber.required = true;
            if (passportNumber) passportNumber.required = false;
        } else if (this.value === 'Foreigner') {
            if (rwandanFields) rwandanFields.style.display = 'none';
            if (foreignerFields) foreignerFields.style.display = 'block';
            if (idNumber) idNumber.required = false;
            if (passportNumber) passportNumber.required = true;
            resetNIDAFields();
        } else {
            if (rwandanFields) rwandanFields.style.display = 'none';
            if (foreignerFields) foreignerFields.style.display = 'none';
        }
    });

    // Purpose of importation change handler
    purposeSelect?.addEventListener('change', function() {
        const specifyPurposeField = document.getElementById('specifyPurposeField');
        const specifyPurpose = document.getElementById('specifyPurpose');

        if (this.value === 'Other') {
            if (specifyPurposeField) specifyPurposeField.style.display = 'block';
            if (specifyPurpose) specifyPurpose.required = true;
        } else {
            if (specifyPurposeField) specifyPurposeField.style.display = 'none';
            if (specifyPurpose) specifyPurpose.required = false;
        }
    });

    // Weight input handler
    document.getElementById('weight')?.addEventListener('input', function() {
        const unitOfMeasurement = document.getElementById('unitOfMeasurement');
        if (unitOfMeasurement) {
            if (this.value && this.value > 0) {
                unitOfMeasurement.required = true;
                const errorDiv = unitOfMeasurement.nextElementSibling;
                if (errorDiv) {
                    errorDiv.textContent = 'Unit of measurement is required when weight is provided';
                }
            } else {
                unitOfMeasurement.required = false;
            }
        }
    });

    // TIN Number validation
    document.getElementById('tinNumber')?.addEventListener('input', function() {
        const errorDiv = this.nextElementSibling;
        if (errorDiv) {
            if (!validateTinNumber(this.value)) {
                errorDiv.textContent = 'Please provide a valid TIN number (9 digits)';
                errorDiv.style.display = 'block';
            } else {
                errorDiv.style.display = 'none';
            }
        }
    });

    // Quantity validation
    document.getElementById('quantityOfProducts')?.addEventListener('input', function() {
        const errorDiv = this.nextElementSibling;
        if (errorDiv) {
            if (!validateQuantity(this.value)) {
                errorDiv.textContent = 'Please provide a number greater than zero';
                errorDiv.style.display = 'block';
            } else {
                errorDiv.style.display = 'none';
            }
        }
    });

    // Form submission handler
    form?.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Clear previous error messages
        errorMessages.forEach(msg => msg.style.display = 'none');

        // Validate weight and unit of measurement
        const weight = document.getElementById('weight')?.value;
        const unitOfMeasurement = document.getElementById('unitOfMeasurement');
        const unitErrorDiv = unitOfMeasurement?.nextElementSibling;
        
        if (weight && weight > 0 && !unitOfMeasurement?.value && unitErrorDiv) {
            unitErrorDiv.textContent = 'Unit of measurement is required when weight is provided';
            unitErrorDiv.style.display = 'block';
            return;
        }

        // Collect form data
        const formData = {
            businessOwner: {
                applicantCitizenship: document.getElementById('applicantCitizenship')?.value,
                identificationNumber: document.getElementById('identificationNumber')?.value,
                passportNumber: document.getElementById('passportNumber')?.value,
                otherNames: document.getElementById('otherNames')?.value,
                surname: document.getElementById('surname')?.value,
                nationality: document.getElementById('nationality')?.value,
                phoneNumber: document.getElementById('phoneNumber')?.value,
                emailAddress: document.getElementById('emailAddress')?.value,
                address: {
                    province: document.getElementById('province')?.value,
                    district: document.getElementById('district')?.value
                }
            },
            businessDetails: {
                businessType: document.getElementById('businessType')?.value,
                companyName: document.getElementById('companyName')?.value,
                tinNumber: document.getElementById('tinNumber')?.value,
                registrationDate: document.getElementById('registrationDate')?.value,
                businessAddress: {
                    province: document.getElementById('businessProvince')?.value,
                    district: document.getElementById('businessDistrict')?.value
                }
            },
            productInformation: {
                importationDetails: {
                    purposeOfImportation: document.getElementById('purposeOfImportation')?.value,
                    specifyPurpose: document.getElementById('specifyPurpose')?.value
                },
                productDetails: {
                    productCategory: document.getElementById('productCategory')?.value,
                    productName: document.getElementById('productName')?.value,
                    weightKg: document.getElementById('weight')?.value || null,
                    unitOfMeasurement: document.getElementById('unitOfMeasurement')?.value,
                    quantityOfProducts: document.getElementById('quantityOfProducts')?.value,
                    descriptionOfProducts: document.getElementById('descriptionOfProducts')?.value
                }
            }
        };

        try {
            const response = await fetch('http://localhost:5000/api/permits', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                if (data.errors) {
                    data.errors.forEach(error => {
                        const fieldName = error.field.split('.').pop();
                        const field = document.getElementById(fieldName);
                        if (field) {
                            const errorDiv = field.nextElementSibling;
                            if (errorDiv && errorDiv.classList.contains('error-message')) {
                                errorDiv.textContent = error.message;
                                errorDiv.style.display = 'block';
                            }
                        }
                    });
                }
                throw new Error(data.message || 'Submission failed');
            }

            // Success
            alert('Application submitted successfully! You will receive confirmation via email.');
            form.reset();
            resetConditionalFields();
            resetNIDAFields();
            
        } catch (error) {
            console.error('Error:', error);
            alert(error.message);
        }
    });

    // Initialize dropdowns
    initializeLocationDropdowns();
    initializeNationalityDropdown();
});