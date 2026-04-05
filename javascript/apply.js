// ======================= ES6 BONUS SECTION =======================

// ES6 Class: đại diện cho 1 lựa chọn internship
class ChosenGroup {
  constructor(division, group, rank) {
    this.division = division;
    this.group = group;
    this.rank = rank;
  }
}

// ES6 Map: ánh xạ className -> tên division
const divisionNameMap = new Map([
  ["forms-opt", "Optical Sensing Division"],
  ["forms-bio", "Bio-Sensing Division"],
  ["forms-smart", "Smart Sensing Division"],
]);

// ================================================================


document.addEventListener("DOMContentLoaded", function () {

  // ====== TAB DIVISION ======
  const divisionMap = {
    optical: {
      header: document.querySelector(".division.optical"),
      forms: document.querySelector(".forms-opt"),
      name: "Optical Sensing Division",
    },
    bio: {
      header: document.querySelector(".division.bio"),
      forms: document.querySelector(".forms-bio"),
      name: "Bio-Sensing Division",
    },
    smart: {
      header: document.querySelector(".division.smart"),
      forms: document.querySelector(".forms-smart"),
      name: "Smart Sensing Division",
    },
  };

  function setActiveDivision(key) {
    Object.keys(divisionMap).forEach((k) => {
      const { header, forms } = divisionMap[k];
      if (k === key) {
        header.classList.add("active");
        forms.classList.add("active");
      } else {
        header.classList.remove("active");
        forms.classList.remove("active");
      }
    });
  }

  // Default: Optical active
  setActiveDivision("optical");

  Object.keys(divisionMap).forEach((key) => {
    divisionMap[key].header.addEventListener("click", () => setActiveDivision(key));
  });



  // ====== TABLE ELEMENTS ======
  const chosenTableBody = document.querySelector("#chosen-table tbody");
  const totalGroupsSpan = document.getElementById("total-groups");
  const lastChangeSpan = document.getElementById("last-change");
  const applyMessage = document.getElementById("apply-message");
  const submitLink = document.getElementById("submit-link");
  const clearLink = document.getElementById("clear-link");


  // ====== HELPERS ======
  function isIntegerInput(str) {
    if (!str) return false;
    return /^-?\d+$/.test(str.trim());
  }

  function getOrdinal(n) {
    const rem10 = n % 10;
    const rem100 = n % 100;
    if (rem10 === 1 && rem100 !== 11) return n + "st";
    if (rem10 === 2 && rem100 !== 12) return n + "nd";
    if (rem10 === 3 && rem100 !== 13) return n + "rd";
    return n + "th";
  }

  function updateTable() {
    const rows = chosenTableBody.querySelectorAll("tr");
    let count = 0;

    rows.forEach((row) => {
      if (row.cells[1].textContent.trim() !== "") count++;
    });

    totalGroupsSpan.textContent = String(count);
    lastChangeSpan.textContent = new Date().toString();
  }



  // ====== ADD BUTTON HANDLER (rank of choice) ======
  function handleRankButtonClick(event) {
    event.preventDefault();
    applyMessage.textContent = "";

    const form = event.target.closest("form");
    const rankInputEl = form.querySelector("input[type='text']");
    const rankStr = rankInputEl.value.trim();

    if (!isIntegerInput(rankStr)) {
      alert("Please enter the rank of chosen group");
      return;
    }

    const rank = parseInt(rankStr, 10);
    if (rank < 1 || rank > 10) {
      alert("Please enter the rank of chosen group between 1 and 10");
      return;
    }

    const groupName = form.querySelector("label").textContent.trim();
    const formsContainer = form.closest(".forms");

    // Lấy tên division từ ES6 Map
    const divisionName = divisionNameMap.get(formsContainer.classList[1]);

    const rows = chosenTableBody.querySelectorAll("tr");
    let groupExists = false;
    let rankExists = false;

    rows.forEach((row) => {
      const existing = row.cells[1].textContent.trim();
      const r = parseInt(row.getAttribute("data-rank"), 10);
      if (existing === groupName) groupExists = true;
      if (existing !== "" && r === rank) rankExists = true;
    });

    if (groupExists) {
      alert("You have already chosen this group");
      return;
    }
    if (rankExists) {
      alert("You have already chosen the rank");
      return;
    }

    // ES6 class instance (bonus)
    const chosen = new ChosenGroup(divisionName, groupName, rank);

    // Update correct row
    const targetRow = chosenTableBody.querySelector(`tr[data-rank="${rank}"]`);
    targetRow.cells[0].textContent = chosen.division;
    targetRow.cells[1].textContent = chosen.group;

    updateTable();

    alert(
      `You have chosen ${chosen.group} as your ${getOrdinal(
        chosen.rank
      )} chosen group in ${chosen.division} successfully`
    );
  }


  document
    .querySelectorAll(".forms input[type='submit']")
    .forEach((btn) => btn.addEventListener("click", handleRankButtonClick));



  // ======================= INLINE HANDLER SUPPORT =======================
  // (để đáp ứng yêu cầu "2 ways of event handler setup")
  window.handleClearClick = function () {
    clearLink.click();
  };
  // ======================================================================



  // ====== SUBMIT LINK ======
  submitLink.addEventListener("click", function (event) {
    event.preventDefault();
    applyMessage.textContent = "";

    const chosenRanks = new Set(); // ES6 Set BONUS

    const rows = chosenTableBody.querySelectorAll("tr");
    rows.forEach((row) => {
      const groupText = row.cells[1].textContent.trim();
      if (groupText !== "") {
        chosenRanks.add(parseInt(row.getAttribute("data-rank"), 10));
      }
    });

    if (chosenRanks.size === 0) {
      applyMessage.textContent = "You have not chosen any groups.";
      return;
    }

    const sortedRanks = [...chosenRanks].sort((a, b) => a - b);
    const maxRank = sortedRanks[sortedRanks.length - 1];
    const missing = [];

    for (let r = 1; r <= maxRank; r++) {
      if (!chosenRanks.has(r)) missing.push(r);
    }

    if (missing.length > 0) {
      const parts = missing.map((r) => getOrdinal(r) + " chosen group");
      let listStr;

      if (parts.length === 1) listStr = parts[0];
      else if (parts.length === 2) listStr = parts[0] + " and " + parts[1];
      else listStr = parts.slice(0, -1).join(", ") + ", and " + parts[parts.length - 1];

      applyMessage.textContent =
        "You have not chosen your " +
        listStr +
        ", you can not leave any gap between your chosen groups.";
      return;
    }

    applyMessage.textContent =
      "You have successfully submitted your application at time " +
      new Date().toString();
  });



  // ====== CLEAR LINK ======
  clearLink.addEventListener("click", function (event) {
    event.preventDefault();

    chosenTableBody.querySelectorAll("tr").forEach((row) => {
      row.cells[0].textContent = "";
      row.cells[1].textContent = "";
    });

    applyMessage.textContent = "";
    updateTable();
  });
});
