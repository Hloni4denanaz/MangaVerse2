
document.addEventListener('DOMContentLoaded', function() {
    
    const enquiryForm = document.getElementById('enquiryForm');
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateForm(enquiryForm)) {
                submitForm(enquiryForm);
            }
        });
    }

    
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateForm(contactForm)) {
                submitForm(contactForm);
            }
        });
    }

    
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.dataset.category;
            filterProducts(category);
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });

    
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            searchProducts(this.value);
        });
    }

    
    animateStats();
});

function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');
        } else {
            field.classList.remove('error');
        }
        
        
        if (field.type === 'email' && !isValidEmail(field.value)) {
            isValid = false;
            field.classList.add('error');
        }
    });
    
    if (!isValid) {
        const responseDiv = form.querySelector('#formResponse');
        responseDiv.textContent = 'Please fill all required fields correctly.';
        responseDiv.style.color = 'var(--primary)';
    }
    
    return isValid;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function submitForm(form) {
    const formData = new FormData(form);
    const responseDiv = form.querySelector('#formResponse');
    
    
    responseDiv.textContent = 'Sending your message...';
    responseDiv.style.color = 'var(--accent)';
    
    setTimeout(() => {
        responseDiv.textContent = 'Your message has been sent successfully!';
        responseDiv.style.color = 'green';
        form.reset();
        
        
        setTimeout(() => {
            responseDiv.textContent = '';
        }, 5000);
    }, 1500);
}

function filterProducts(category) {
    const products = document.querySelectorAll('.product-card');
    
    products.forEach(product => {
        if (category === 'all' || product.dataset.category === category) {
            product.style.display = 'block';
            setTimeout(() => {
                product.style.opacity = '1';
            }, 50);
        } else {
            product.style.opacity = '0';
            setTimeout(() => {
                product.style.display = 'none';
            }, 300);
        }
    });
}

function searchProducts(query) {
    const products = document.querySelectorAll('.product-card');
    const searchTerm = query.toLowerCase();
    
    products.forEach(product => {
        const title = product.querySelector('h3').textContent.toLowerCase();
        const author = product.querySelector('.product-author').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || author.includes(searchTerm)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.dataset.count);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const counter = setInterval(() => {
            current += step;
            if (current >= target) {
                clearInterval(counter);
                stat.textContent = target.toLocaleString();
            } else {
                stat.textContent = Math.floor(current).toLocaleString();
            }
        }, 16);
    });
}


document.addEventListener('click', function(e) {
    if (e.target.classList.contains('add-to-cart')) {
        const productCard = e.target.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = productCard.querySelector('.product-price').textContent;
        
        alert(`Added ${productName} (${productPrice}) to your cart!`);
        
    }
});