// Disease information and titles
const diseaseInfo = {
    diabetes: {
        title: 'Diabetes Prediction',
        description: 'Enter patient data to predict diabetes risk'
    },
    heart: {
        title: 'Heart Disease Prediction',
        description: 'Enter cardiovascular data to assess heart disease risk'
    },
    parkinsons: {
        title: "Parkinson's Disease Prediction",
        description: 'Enter voice measurement data to predict Parkinson\'s disease'
    },
    liver: {
        title: 'Liver Disease Prediction',
        description: 'Enter liver function test results to predict liver disease'
    },
    hepatitis: {
        title: 'Hepatitis Prediction',
        description: 'Enter screening data to predict hepatitis risk'
    },
    jaundice: {
        title: 'Jaundice Prediction',
        description: 'Enter assessment data to predict jaundice risk'
    }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeDarkMode();
    initializeForms();
});

// Navigation functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get disease type
            const disease = this.getAttribute('data-disease');
            
            // Update header
            updateHeader(disease);
            
            // Show corresponding prediction card
            showPredictionCard(disease);
        });
    });
}

// Update header based on selected disease
function updateHeader(disease) {
    const titleElement = document.getElementById('disease-title');
    const descriptionElement = document.getElementById('disease-description');
    
    titleElement.textContent = diseaseInfo[disease].title;
    descriptionElement.textContent = diseaseInfo[disease].description;
}

// Show the appropriate prediction card
function showPredictionCard(disease) {
    // Hide all prediction cards
    const allCards = document.querySelectorAll('.prediction-card');
    allCards.forEach(card => card.classList.remove('active'));
    
    // Show selected card
    const selectedCard = document.getElementById(`${disease}-card`);
    if (selectedCard) {
        selectedCard.classList.add('active');
    }
}

// Dark mode functionality
function initializeDarkMode() {
    const themeToggle = document.getElementById('themeToggle');
    const themeSlider = themeToggle.querySelector('.toggle-slider');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        enableDarkMode();
    }
    
    themeToggle.addEventListener('click', function() {
        if (document.body.classList.contains('dark-mode')) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });
}

function enableDarkMode() {
    document.body.classList.add('dark-mode');
    const themeToggle = document.getElementById('themeToggle');
    const themeSlider = themeToggle.querySelector('.toggle-slider');
    
    themeToggle.classList.add('active');
    themeSlider.textContent = '🌙';
    localStorage.setItem('theme', 'dark');
}

function disableDarkMode() {
    document.body.classList.remove('dark-mode');
    const themeToggle = document.getElementById('themeToggle');
    const themeSlider = themeToggle.querySelector('.toggle-slider');
    
    themeToggle.classList.remove('active');
    themeSlider.textContent = '☀️';
    localStorage.setItem('theme', 'light');
}

// Initialize all forms
function initializeForms() {
    // Diabetes form
    const diabetesForm = document.getElementById('diabetes-form');
    diabetesForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handlePrediction('diabetes', diabetesForm);
    });
    
    // Heart disease form
    const heartForm = document.getElementById('heart-form');
    heartForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handlePrediction('heart', heartForm);
    });
    
    // Parkinson's form
    const parkinsonsForm = document.getElementById('parkinsons-form');
    parkinsonsForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handlePrediction('parkinsons', parkinsonsForm);
    });
    
    // Liver disease form
    const liverForm = document.getElementById('liver-form');
    liverForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handlePrediction('liver', liverForm);
    });
    
    // Hepatitis form
    const hepatitisForm = document.getElementById('hepatitis-form');
    hepatitisForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handlePrediction('hepatitis', hepatitisForm);
    });
    
    // Jaundice form
    const jaundiceForm = document.getElementById('jaundice-form');
    jaundiceForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handlePrediction('jaundice', jaundiceForm);
    });
}

// Handle prediction for any disease
function handlePrediction(disease, form) {
    // Validate all required fields are filled
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    // Get form data
    const formData = new FormData(form);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    // Show loading state
    showLoading(disease);
    
    // Hide previous results
    hideResult(disease);
    
    // Simulate API call with setTimeout
    // In production, replace this with actual API call
    setTimeout(() => {
        try {
            const prediction = simulatePrediction(disease, data);
            hideLoading(disease);
            showResult(disease, prediction);
            
            // Log prediction for debugging (remove in production)
            console.log(`${disease} prediction:`, prediction);
        } catch (error) {
            hideLoading(disease);
            showError(disease, 'An error occurred while processing your data. Please try again.');
            console.error('Prediction error:', error);
        }
    }, 2000);
}

// Show error message
function showError(disease, errorMessage) {
    const resultElement = document.getElementById(`${disease}-result`);
    
    if (!resultElement) return;
    
    resultElement.classList.remove('result-positive', 'result-negative');
    resultElement.classList.add('result-error');
    
    const errorHTML = `
        <h3>❌ Error</h3>
        <p style="font-size: 1.2rem; margin: 1rem 0;">${errorMessage}</p>
        <p style="font-size: 1rem;">Please check your input values and try again.</p>
    `;
    
    resultElement.innerHTML = errorHTML;
    resultElement.classList.add('show');
}

// Add progress indicator to loading
function showLoading(disease) {
    const loadingElement = document.getElementById(`${disease}-loading`);
    if (loadingElement) {
        // Add progress text
        const progressText = loadingElement.querySelector('p');
        if (progressText) {
            let dots = 0;
            const progressInterval = setInterval(() => {
                dots = (dots + 1) % 4;
                progressText.textContent = 'Analyzing data' + '.'.repeat(dots);
            }, 500);
            
            // Store interval ID to clear later
            loadingElement.dataset.intervalId = progressInterval;
        }
        
        loadingElement.classList.add('show');
    }
    
    // Disable submit button
    const form = document.getElementById(`${disease}-form`);
    const submitBtn = form.querySelector('.btn-predict');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Processing...';
}

// Hide loading spinner
function hideLoading(disease) {
    const loadingElement = document.getElementById(`${disease}-loading`);
    if (loadingElement) {
        // Clear progress interval
        const intervalId = loadingElement.dataset.intervalId;
        if (intervalId) {
            clearInterval(parseInt(intervalId));
        }
        
        loadingElement.classList.remove('show');
    }
    
    // Enable submit button
    const form = document.getElementById(`${disease}-form`);
    const submitBtn = form.querySelector('.btn-predict');
    submitBtn.disabled = false;
    
    // Reset button text based on disease
    const diseaseNames = {
        diabetes: 'Predict Diabetes Risk',
        heart: 'Predict Heart Disease Risk',
        parkinsons: "Predict Parkinson's Risk",
        liver: 'Predict Liver Disease Risk',
        hepatitis: 'Predict Hepatitis Risk',
        jaundice: 'Predict Jaundice Risk'
    };
    
    submitBtn.textContent = diseaseNames[disease] || 'Predict';
}

// Hide result section
function hideResult(disease) {
    const resultElement = document.getElementById(`${disease}-result`);
    if (resultElement) {
        resultElement.classList.remove('show');
    }
}

// Show prediction result
function showResult(disease, prediction) {
    const resultElement = document.getElementById(`${disease}-result`);
    
    if (!resultElement) return;
    
    // Clear previous classes
    resultElement.classList.remove('result-positive', 'result-negative');
    
    // Add appropriate class based on prediction
    if (prediction.hasDisease) {
        resultElement.classList.add('result-positive');
    } else {
        resultElement.classList.add('result-negative');
    }
    
    // Get risk level
    const riskLevel = getRiskLevel(prediction.probability);
    
    // Build result HTML with more details
    const resultHTML = `
        <h3>${prediction.hasDisease ? '⚠️ High Risk Detected' : '✅ Low Risk Detected'}</h3>
        <div class="probability">${prediction.probability}%</div>
        <p style="font-size: 1.1rem; margin: 1rem 0;">
            <strong>Risk Level:</strong> ${riskLevel.emoji} ${riskLevel.text}
        </p>
        <p style="margin: 1rem 0;"><strong>${prediction.message}</strong></p>
        <div style="background: rgba(255,255,255,0.2); padding: 1rem; border-radius: 10px; margin-top: 1.5rem;">
            <p style="margin: 0;"><strong>📋 Recommendation:</strong></p>
            <p style="margin: 0.5rem 0 0 0;">${prediction.recommendation}</p>
        </div>
        <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 2px solid rgba(255,255,255,0.3);">
            <p style="font-size: 0.9rem; opacity: 0.9;">
                <strong>⚕️ Disclaimer:</strong> This is a predictive tool and not a substitute for professional medical advice. 
                Always consult with qualified healthcare professionals for accurate diagnosis and treatment.
            </p>
        </div>
    `;
    
    resultElement.innerHTML = resultHTML;
    resultElement.classList.add('show');
    
    // Scroll to result
    setTimeout(() => {
        resultElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
}

// Get risk level classification
function getRiskLevel(probability) {
    if (probability >= 80) {
        return { text: 'Very High Risk', emoji: '🔴' };
    } else if (probability >= 60) {
        return { text: 'High Risk', emoji: '🟠' };
    } else if (probability >= 40) {
        return { text: 'Moderate Risk', emoji: '🟡' };
    } else if (probability >= 20) {
        return { text: 'Low Risk', emoji: '🟢' };
    } else {
        return { text: 'Very Low Risk', emoji: '🟢' };
    }
}

// Simulate ML prediction (replace with actual API call in production)
function simulatePrediction(disease, data) {
    // This is a mock prediction function
    // In production, this would call your backend ML model
    
    // Calculate risk based on input values for more realistic predictions
    const probability = calculateRiskScore(disease, data);
    const hasDisease = probability > 50;
    
    let message, recommendation;
    
    if (hasDisease) {
        message = `The model indicates a ${probability}% probability of ${getDiseaseFullName(disease)}.`;
        recommendation = `⚠️ Please consult with a healthcare professional immediately for proper diagnosis and treatment. Early detection is crucial for better outcomes.`;
    } else {
        message = `The model indicates a low risk (${100 - probability}% probability of being healthy) for ${getDiseaseFullName(disease)}.`;
        recommendation = `✅ Continue maintaining a healthy lifestyle with regular exercise, balanced diet, and adequate sleep. Schedule regular check-ups to monitor your health.`;
    }
    
    return {
        hasDisease,
        probability,
        message,
        recommendation
    };
}

// Calculate risk score based on disease type and input data
function calculateRiskScore(disease, data) {
    let riskScore = 0;
    
    switch(disease) {
        case 'diabetes':
            // Higher glucose, BMI, age, and pregnancies increase risk
            if (data.glucose > 140) riskScore += 30;
            else if (data.glucose > 120) riskScore += 20;
            
            if (data.bmi > 30) riskScore += 25;
            else if (data.bmi > 25) riskScore += 15;
            
            if (data.age > 45) riskScore += 15;
            if (data.pregnancies > 3) riskScore += 10;
            
            riskScore += Math.random() * 20; // Add some variance
            break;
            
        case 'heart':
            // Age, cholesterol, blood pressure factors
            if (data.age > 55) riskScore += 20;
            if (data.chol > 240) riskScore += 25;
            else if (data.chol > 200) riskScore += 15;
            
            if (data.trestbps > 140) riskScore += 20;
            if (data.cp === '3') riskScore += 15; // Asymptomatic is higher risk
            if (data.exang === '1') riskScore += 15;
            
            riskScore += Math.random() * 15;
            break;
            
        case 'parkinsons':
            // Voice measurement abnormalities
            if (data.jitter_percent > 0.005) riskScore += 20;
            if (data.shimmer > 0.03) riskScore += 20;
            if (data.nhr > 0.03) riskScore += 15;
            if (data.hnr < 20) riskScore += 15;
            if (data.rpde > 0.5) riskScore += 15;
            
            riskScore += Math.random() * 15;
            break;
            
        case 'liver':
            // Liver enzyme levels
            if (data.tb > 1.2) riskScore += 25;
            if (data.db > 0.3) riskScore += 20;
            if (data.sgpt > 40) riskScore += 15;
            if (data.sgot > 40) riskScore += 15;
            if (data.alkphos > 130) riskScore += 10;
            
            riskScore += Math.random() * 15;
            break;
            
        case 'hepatitis':
            // Hepatitis markers
            if (data.bilirubin > 1.5) riskScore += 25;
            if (data.alk_phosphate > 130) riskScore += 20;
            if (data.sgpt > 50) riskScore += 20;
            if (data.sgot > 50) riskScore += 15;
            if (data.albumin < 3.5) riskScore += 10;
            
            riskScore += Math.random() * 15;
            break;
            
        case 'jaundice':
            // Bilirubin levels and symptoms
            if (data.total_bilirubin > 2.5) riskScore += 30;
            else if (data.total_bilirubin > 1.5) riskScore += 20;
            
            if (data.direct_bilirubin > 0.5) riskScore += 20;
            if (data.yellow_eyes === '1') riskScore += 15;
            if (data.yellow_skin === '1') riskScore += 15;
            if (data.dark_urine === '1') riskScore += 10;
            
            riskScore += Math.random() * 10;
            break;
            
        default:
            riskScore = Math.floor(Math.random() * 100);
    }
    
    // Ensure score is between 0 and 100
    return Math.min(Math.max(Math.floor(riskScore), 0), 100);
}

// Get full disease name
function getDiseaseFullName(disease) {
    const names = {
        diabetes: 'Diabetes',
        heart: 'Heart Disease',
        parkinsons: "Parkinson's Disease",
        liver: 'Liver Disease',
        hepatitis: 'Hepatitis',
        jaundice: 'Jaundice'
    };
    
    return names[disease] || disease;
}

// Form validation helpers
function validateNumberInput(input) {
    const value = parseFloat(input.value);
    const min = parseFloat(input.getAttribute('min')) || 0;
    const max = parseFloat(input.getAttribute('max')) || Infinity;
    
    if (isNaN(value) || value < min || value > max) {
        input.setCustomValidity(`Please enter a valid number between ${min} and ${max}`);
        input.style.borderColor = '#ff6b6b';
        return false;
    }
    
    input.setCustomValidity('');
    input.style.borderColor = '#51cf66';
    return true;
}

// Add input validation to all number inputs
document.addEventListener('DOMContentLoaded', function() {
    const numberInputs = document.querySelectorAll('input[type="number"]');
    
    numberInputs.forEach(input => {
        // Validate on input
        input.addEventListener('input', function() {
            validateNumberInput(this);
        });
        
        // Reset border on blur if valid
        input.addEventListener('blur', function() {
            if (this.value && this.checkValidity()) {
                setTimeout(() => {
                    this.style.borderColor = '';
                }, 1000);
            }
        });
        
        // Add helpful placeholder text
        if (!input.placeholder) {
            const label = input.parentElement.querySelector('label');
            if (label) {
                const min = input.getAttribute('min');
                const max = input.getAttribute('max');
                if (min !== null) {
                    input.placeholder = `Min: ${min}`;
                }
            }
        }
    });
    
    // Add validation to select dropdowns
    const selectInputs = document.querySelectorAll('select');
    selectInputs.forEach(select => {
        select.addEventListener('change', function() {
            if (this.value) {
                this.style.borderColor = '#51cf66';
                setTimeout(() => {
                    this.style.borderColor = '';
                }, 1000);
            }
        });
    });
});

// Smooth scroll for navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        const mainContent = document.querySelector('.main-content');
        mainContent.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Add animation to form fields on focus
document.addEventListener('DOMContentLoaded', function() {
    const formInputs = document.querySelectorAll('.form-group input, .form-group select');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
            this.parentElement.style.transition = 'transform 0.3s ease';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
        });
    });
    
    // Add reset buttons to all forms
    addResetButtons();
});

// Add reset button functionality to all forms
function addResetButtons() {
    const forms = document.querySelectorAll('.prediction-card form');
    
    forms.forEach(form => {
        // Create reset button
        const resetBtn = document.createElement('button');
        resetBtn.type = 'button';
        resetBtn.className = 'btn-reset';
        resetBtn.textContent = '🔄 Reset Form';
        resetBtn.style.cssText = `
            background: #6c757d;
            color: white;
            padding: 1rem 2rem;
            border: none;
            border-radius: 12px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            margin-left: 1rem;
            transition: all 0.3s ease;
        `;
        
        // Add hover effect
        resetBtn.addEventListener('mouseenter', function() {
            this.style.background = '#5a6268';
            this.style.transform = 'translateY(-2px)';
        });
        
        resetBtn.addEventListener('mouseleave', function() {
            this.style.background = '#6c757d';
            this.style.transform = 'translateY(0)';
        });
        
        // Add reset functionality
        resetBtn.addEventListener('click', function() {
            const formId = form.id;
            const disease = formId.replace('-form', '');
            
            // Reset form
            form.reset();
            
            // Hide result
            hideResult(disease);
            
            // Show success message
            showResetMessage(form);
        });
        
        // Insert reset button next to submit button
        const submitBtn = form.querySelector('.btn-predict');
        submitBtn.parentNode.appendChild(resetBtn);
    });
}

// Show reset confirmation message
function showResetMessage(form) {
    const message = document.createElement('div');
    message.className = 'reset-message';
    message.textContent = '✓ Form has been reset';
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #51cf66;
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        font-weight: 600;
        box-shadow: 0 5px 20px rgba(81, 207, 102, 0.4);
        animation: slideInRight 0.5s ease;
        z-index: 1000;
    `;
    
    document.body.appendChild(message);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        message.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => {
            document.body.removeChild(message);
        }, 500);
    }, 3000);
}

// Add CSS animations for messages
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .btn-predict:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none !important;
    }
    
    body.dark-mode .btn-reset {
        background: #495057 !important;
    }
    
    body.dark-mode .btn-reset:hover {
        background: #343a40 !important;
    }
`;
document.head.appendChild(style);