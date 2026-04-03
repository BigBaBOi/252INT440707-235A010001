/**
 * HP FINAL EXAM - MAIN SCRIPT
 * Contains logic for Product Search, Form Validation, and Countdown Timer
 */

// --- GLOBAL NAVIGATION ---
document.addEventListener('DOMContentLoaded', () => {
    // Inject navigation for all pages if it doesn't exist
    const navPlaceholder = document.getElementById('main-nav');
    if (navPlaceholder) {
        navPlaceholder.innerHTML = `
            <nav>
                <div class="logo">HP EXAM 2026</div>
                <ul>
                    <li><a href="index.html">Trang chủ</a></li>
                    <li><a href="baitap18.html">Bài 18</a></li>
                    <li><a href="https://bigbaboi.github.io/FlashCardGame/" target="_blank">Bài 19</a></li>
                    <li><a href="baitap01.html">Sản phẩm</a></li>
                    <li><a href="baitap02.html">Đăng ký</a></li>
                    <li><a href="baitap03.html">Đếm ngược</a></li>
                    <li><a href="lythuyet.html">Lý thuyết</a></li>
                    <li><a href="attendance.html">Điểm danh</a></li>
                </ul>
            </nav>
        `;
    }
});

// --- TASK 1: PRODUCT LIST & SEARCH ---
const products = [
    { id: 1, name: "Iphone 15 Pro Max", price: "30.000.000đ", img: "img/iphone-15-pro-max_3.png" },
    { id: 2, name: "Samsung Galaxy S24 Ultra", price: "28.500.000đ", img: "img/samsung-galaxy-s22-ultra-1-1-750x500.jpg" },
    { id: 3, name: "Macbook Air M3", price: "26.000.000đ", img: "img/macbook-air-m3-13-inch-2024_1__3.webp" },
    { id: 4, name: "Sony WH-1000XM5", price: "8.500.000đ", img: "img/20220601_UZxFH0gKhi8BtRLbp3A6TPGw.jpeg" },
    { id: 5, name: "Apple Watch Series 9", price: "10.000.000đ", img: "img/apple-watch-s9-lte-45mm-vien-nhom-day-silicone-day-ngan-trang-starlight-1-750x500.jpg" }
];

function initProductSearch() {
    const searchInput = document.getElementById('search-input');
    const productList = document.getElementById('product-list');
    const errorMsg = document.getElementById('error-msg');

    const renderProducts = (filtered) => {
        productList.innerHTML = '';
        if (filtered.length === 0) {
            errorMsg.textContent = '❌ Không tìm thấy sản phẩm phù hợp!';
            return;
        }
        errorMsg.textContent = '';
        filtered.forEach(p => {
            const card = document.createElement('div');
            card.className = 'product-card';
            // Logic Safety: data is hardcoded, but we use textContent for dynamic parts normally
            // Here we use template literals but ensure name/price aren't user-generated
            card.innerHTML = `
                <img src="${p.img}" alt="${p.name}" style="width:100%; border-radius: 0.5rem; margin-bottom: 1rem;">
                <h3>${p.name}</h3>
                <p style="color: #818cf8; font-weight: bold; margin-top: 0.5rem;">${p.price}</p>
            `;
            productList.appendChild(card);
        });
    };

    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase().trim();
        const filtered = products.filter(p => p.name.toLowerCase().includes(term));
        renderProducts(filtered);
    });

    renderProducts(products); // Initial render
}

// --- TASK 2: FORM VALIDATION ---
function initRegistrationForm() {
    const form = document.getElementById('register-form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const github = document.getElementById('github').value.trim();
        const agree = document.getElementById('agree').checked;

        // Validation Regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        const githubRegex = /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_-]+\/?.*$/;

        if (!name) return alert('Vui lòng nhập tên!');
        if (!emailRegex.test(email)) return alert('Email không hợp lệ!');
        if (!passRegex.test(password)) return alert('Mật khẩu ít nhất 8 ký tự, gồm chữ hoa, chữ thường và số!');
        if (!githubRegex.test(github)) return alert('Link GitHub không hợp lệ!');
        if (!agree) return alert('Bạn phải đồng ý với điều khoản!');

        // Success: Store to LocalStorage
        const userData = { name, email, github, createdAt: new Date().toISOString() };
        localStorage.setItem('user_registered', JSON.stringify(userData));

        alert('✅ Đăng ký thành công! Dữ liệu đã lưu vào LocalStorage.');
        form.reset();
    });
}

// --- TASK 3: COUNTDOWN TIMER ---
let timerInterval;
function initCountdown(minutes = 10) {
    const display = document.getElementById('timer-display');
    const modal = document.getElementById('timer-modal');
    let timeLeft = minutes * 60;

    // Avoid memory leaks: clear existing interval if any
    if (timerInterval) clearInterval(timerInterval);

    const updateDisplay = () => {
        const m = Math.floor(timeLeft / 60);
        const s = timeLeft % 60;
        display.textContent = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;

        // Visual warning for < 1 min
        if (timeLeft < 60) {
            display.classList.add('timer-critical');
        } else {
            display.classList.remove('timer-critical');
        }
    };

    updateDisplay();

    timerInterval = setInterval(() => {
        timeLeft--;
        if (timeLeft < 0) {
            clearInterval(timerInterval);
            modal.style.display = 'flex';
            return;
        }
        updateDisplay();
    }, 1000);
}

function closeModal() {
    document.getElementById('timer-modal').style.display = 'none';
}
