// auth.js - Shared auth utilities

function getToken() {
    return localStorage.getItem("token");
}

function getUser() {
    const u = localStorage.getItem("user");
    return u ? JSON.parse(u) : null;
}

function requireAuth() {
    if (!getToken()) window.location.href = "/login";
}

function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
}

function authHeaders() {
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}`
    };
}

async function checkNotification() {
    try {
        const res = await fetch("/api/notification");
        const data = await res.json();
        if (data.active && data.message) {
            const div = document.createElement("div");
            div.className = "fixed top-0 left-0 right-0 bg-yellow-500 text-black text-center py-2 px-4 z-50 font-bold";
            div.textContent = data.message;
            document.body.prepend(div);
            setTimeout(() => div.remove(), (data.duration || 5) * 1000);
        }
    } catch {}
}

function renderNavbar(activePage) {
    const user = getUser();
    const isAdmin = user && user.role === "admin";

    const pages = [
        {href: "/dashboard", label: "Tạo BXH"},
        {href: "/backgrounds", label: "Backgrounds"},
        {href: "/logos", label: "Logo"},
        {href: "/history", label: "Lịch sử"},
    ];

    if (isAdmin) pages.push({href: "/admin", label: "Admin"});

    const desktopLinks = pages.map(p =>
        `<a href="${p.href}" class="px-3 py-2 rounded ${activePage === p.href ? 'bg-blue-600' : 'hover:bg-gray-700'}">${p.label}</a>`
    ).join("");

    const mobileLinks = pages.map(p =>
        `<a href="${p.href}" class="block px-4 py-3 ${activePage === p.href ? 'bg-blue-600' : 'hover:bg-gray-700'} border-b border-gray-700">${p.label}</a>`
    ).join("");

    return `
    <nav class="bg-gray-800 px-4 py-3">
        <div class="flex items-center justify-between">
            <a href="/dashboard" class="font-bold text-xl text-blue-400">YAHUB BXH</a>

            <!-- Desktop menu -->
            <div class="hidden md:flex items-center gap-2">
                ${desktopLinks}
                <span class="text-gray-400 text-sm ml-4">${user ? user.email : ""}</span>
                <button onclick="logout()" class="ml-2 bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm">Đăng xuất</button>
            </div>

            <!-- Mobile hamburger -->
            <button onclick="toggleMobileMenu()" class="md:hidden text-white text-2xl focus:outline-none">☰</button>
        </div>

        <!-- Mobile dropdown -->
        <div id="mobileMenu" class="hidden md:hidden mt-2 rounded-lg overflow-hidden border border-gray-700">
            ${mobileLinks}
            <div class="px-4 py-3 text-gray-400 text-sm border-b border-gray-700">${user ? user.email : ""}</div>
            <button onclick="logout()" class="w-full text-left px-4 py-3 bg-red-600 hover:bg-red-700 font-bold">Đăng xuất</button>
        </div>
    </nav>`;
}

function toggleMobileMenu() {
    const menu = document.getElementById("mobileMenu");
    menu.classList.toggle("hidden");
}
