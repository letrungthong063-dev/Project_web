// Lấy form và phần hiển thị kết quả
const form = document.getElementById("registerForm");
const result = document.getElementById("result");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Lấy dữ liệu
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const course = document.getElementById("course").value;
  const mode = document.querySelector("input[name='mode']:checked");
  const agree = document.getElementById("agree").checked;

  // Validation
  if (name.length < 3) {
    alert("Tên phải có ít nhất 3 ký tự!");
    return;
  }
  if (!email.includes("@") || !email.includes(".")) {
    alert("Email không hợp lệ!");
    return;
  }
  if (!/^[0-9]{9,11}$/.test(phone)) {
    alert("Số điện thoại phải từ 9-11 chữ số!");
    return;
  }
  if (course === "") {
    alert("Bạn chưa chọn khóa học!");
    return;
  }
  if (!mode) {
    alert("Bạn chưa chọn hình thức học!");
    return;
  }
  if (!agree) {
    alert("Bạn phải đồng ý điều khoản!");
    return;
  }

  // Hiển thị kết quả
  result.innerHTML = `
                                                                                                  <p>✅ Cảm ơn <b>${name}</b> đã đăng ký!</p>
                                                                                                      <p>Email: ${email}</p>
                                                                                                          <p>Điện thoại: ${phone}</p>
                                                                                                              <p>Khóa học: ${course}</p>
                                                                                                                  <p>Hình thức học: ${mode.value}</p>
                                                                                                                    `;

  // Reset form
  form.reset();
});

// Thêm hiệu ứng random background cho hero
let hero = document.querySelector(".hero");
setInterval(() => {
  let rand = Math.floor(Math.random() * 1000);
  hero.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), 
                                                                                                                                    url('https://picsum.photos/1200/800?random=${rand}')`;
}, 7000);
