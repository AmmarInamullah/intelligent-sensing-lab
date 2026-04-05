// ../js/visit.js

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const dateInput = form.elements["date"];
  const timeSelect = form.elements["time"];
  const visitorsInput = form.elements["Visitors_number"];
  const msgEl = document.getElementById("visit-message");

  function clearMessage() {
    msgEl.textContent = "";
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // luôn luôn hủy submit form
    clearMessage();     // khi re-check thì xóa message cũ

    const dateVal = dateInput.value.trim();
    const timeVal = timeSelect.value.trim();
    const visitorsRaw = visitorsInput.value.trim();

    // 1) Kiểm tra field không được bỏ trống
    if (!dateVal || !timeVal || !visitorsRaw) {
      msgEl.textContent = "Data not completed, please re-enter.";
      return;
    }

    // 2) Kiểm tra số người: >= 1 và là số nguyên
    const visitorsNum = Number(visitorsRaw);

    if (
      !Number.isInteger(visitorsNum) ||
      visitorsNum < 1 ||
      Number.isNaN(visitorsNum)
    ) {
      msgEl.textContent = "Please enter a valid number of people!";
      return;
    }

    // 3) Không có lỗi -> gọi reserve(date, time, no-of-visitors)
    //    reserve(...) được định nghĩa trong cw3cs2204.js
    const ok = reserve(dateVal, timeVal, visitorsNum);

    if (ok) {
      alert("Your reservation is successful!");
    } else {
      alert("Sorry, the reservation is full!");
    }
    // Đề yêu cầu: luôn hủy submit sau khi hiển thị message -> đã e.preventDefault() ở trên
  });

  // 4) Khi bấm nút Reset thì xóa error message
  form.addEventListener("reset", function () {
    clearMessage();
  });
});
