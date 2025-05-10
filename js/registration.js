// Registration form handling
document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registration-form');
    const additionalInfoForm = document.getElementById('additional-info-form');
    const userTypeSelection = document.getElementById('user-type-selection');
    const registrationDetails = document.getElementById('registration-details');
    const userTypeInput = document.getElementById('user-type');
    const backBtn = document.getElementById('back-btn');
    const popup = document.getElementById('additional-info-popup');
    const closePopup = document.querySelector('.close-popup');

    // Show registration form based on user type selection
    document.querySelectorAll('.user-type-btn').forEach(button => {
        button.addEventListener('click', function() {
            const type = this.dataset.type;
            userTypeInput.value = type;
            userTypeSelection.classList.add('hidden');
            registrationDetails.classList.remove('hidden');
            backBtn.style.display = 'flex';
        });
    });

    // Back button functionality
    backBtn.addEventListener('click', function() {
        registrationDetails.classList.add('hidden');
        userTypeSelection.classList.remove('hidden');
        backBtn.style.display = 'none';
    });

    // Form validation and submission
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                // Show additional information popup
                popup.style.display = 'flex';
                // Force a reflow
                popup.offsetHeight;
                popup.classList.add('active');
                // Prevent body scrolling
                document.body.style.overflow = 'hidden';
            }
        });
    }

    // Additional information form submission
    if (additionalInfoForm) {
        additionalInfoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateAdditionalInfo()) {
                const mainFormData = new FormData(registrationForm);
                const additionalFormData = new FormData(this);
                
                // Combine both form data
                const combinedData = new FormData();
                for (let [key, value] of mainFormData.entries()) {
                    combinedData.append(key, value);
                }
                for (let [key, value] of additionalFormData.entries()) {
                    combinedData.append(key, value);
                }

                // Here you would typically send the data to your server
                console.log('Form data:', Object.fromEntries(combinedData));
                
                // Show success message and close popup
                showMessage('Registration successful!', 'success');
                closePopupModal();
                
                // Reset forms
                registrationForm.reset();
                additionalInfoForm.reset();
                
                // Return to user type selection
                registrationDetails.classList.add('hidden');
                userTypeSelection.classList.remove('hidden');
                backBtn.style.display = 'none';
            }
        });
    }

    // Close popup
    closePopup.addEventListener('click', closePopupModal);

    // Close popup when clicking outside
    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
            closePopupModal();
        }
    });

    // Function to close popup
    function closePopupModal() {
        popup.classList.remove('active');
        // Wait for transition to complete before hiding
        setTimeout(() => {
            popup.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }

    // Password confirmation validation
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');
    
    if (confirmPassword) {
        confirmPassword.addEventListener('input', function() {
            if (this.value !== password.value) {
                this.setCustomValidity('Passwords do not match');
            } else {
                this.setCustomValidity('');
            }
        });
    }

    // Image preview for profile picture and ID card
    const profilePicture = document.getElementById('profile-picture');
    const idCardImage = document.getElementById('id-card-image');
    const profilePreview = document.getElementById('profile-preview');
    const idCardPreview = document.getElementById('id-card-preview');

    if (profilePicture) {
        profilePicture.addEventListener('change', function() {
            previewImage(this, profilePreview);
        });
    }

    if (idCardImage) {
        idCardImage.addEventListener('change', function() {
            previewImage(this, idCardPreview);
        });
    }
});

// Form validation function
function validateForm() {
    const requiredFields = registrationForm.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('error');
            isValid = false;
        } else {
            field.classList.remove('error');
        }
    });

    // Email validation
    const email = document.getElementById('email');
    if (email && !isValidEmail(email.value)) {
        email.classList.add('error');
        showMessage('Please enter a valid email address', 'error');
        isValid = false;
    }

    // Phone number validation
    const phone = document.getElementById('phone');
    if (phone && !isValidPhone(phone.value)) {
        phone.classList.add('error');
        showMessage('Please enter a valid phone number', 'error');
        isValid = false;
    }

    return isValid;
}

// Additional information validation
function validateAdditionalInfo() {
    const requiredFields = additionalInfoForm.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('error');
            isValid = false;
        } else {
            field.classList.remove('error');
        }
    });

    if (!isValid) {
        showMessage('Please fill in all required fields', 'error');
    }

    return isValid;
}

// Helper functions
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
    return /^\+?[\d\s-]{10,}$/.test(phone);
}

function previewImage(input, previewElement) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            previewElement.src = e.target.result;
            previewElement.style.display = 'block';
        }
        reader.readAsDataURL(input.files[0]);
    }
}

function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
} 