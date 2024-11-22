// Global variable to store the data
let allData = [];
let countdownTimer;
let countdownValue = 10;

const API_URL = "https://script.googleusercontent.com/macros/echo?user_content_key=rYdPYHnZO0K4quvKCk-rPtPTbil_h5JO0SMYsGnUVZbCu0uw-xqv3d955W07XHSPEsrPeMm9cjNznYML0UjhQoQL-xPG5GWYm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnPnxmQEFzp4mHjR31VNMmQnI7V7nzLaplU5-VycdK-MfsO26v7535yDU98-P9oQ1v47qjhsbNZmGkLWLxVOm0MOV-mPxIk_Kd9z9Jw9Md8uu&lib=M0lsbAYAVLnIBkgppLjA8AAZORf4TutOS";

async function fetchData() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    if (Array.isArray(data) && data.length > 0) {
      allData = data; // Store the data globally
    } else {
      console.error("No data found.");
      document.getElementById("tableBody").innerHTML = "<tr><td colspan='9'>No data available.</td></tr>";
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function populateTable(data) {
  const tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = ""; // Clear previous table data

  data.forEach(row => {
    const tr = document.createElement("tr");
    row.forEach(cell => {
      const td = document.createElement("td");
      td.textContent = cell;
      tr.appendChild(td);
    });
    tableBody.appendChild(tr);
  });
}

function startLoader() {
  const loader = document.getElementById("loader");
  const countdownElement = document.getElementById("countdown");

  loader.style.display = "flex"; // Show the loader

  countdownTimer = setInterval(() => {
    if (countdownValue > 0) {
      countdownElement.textContent = countdownValue--; // Decrement countdown
    } else {
      clearInterval(countdownTimer); // Stop countdown when it reaches 0
    }
  }, 1000); // Update countdown every second
}

function stopLoader() {
  clearInterval(countdownTimer); // Stop the countdown timer
  document.getElementById("loader").style.display = "none"; // Hide the loader
}

// Call startLoader when window loads or before fetching data
window.onload = function() {
  startLoader(); // Start loader and countdown on window load
  fetchData();    // Fetch data in the background
  setTimeout(stopLoader, 10000); // Stop loader after 15 seconds
};

// Trigger search when input is provided and enter is pressed
document.getElementById("searchInput").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {  // Check if the Enter key was pressed
      const searchQuery = document.getElementById("searchInput").value.trim();
      
      if (searchQuery) {
        searchTable(searchQuery);  // Perform search if there's input
      } else {
        // If the search input is empty, clear the table
        document.getElementById("tableBody").innerHTML = "";
      }
    }
  });
  
  // Trigger search when search button is clicked
  document.getElementById("searchBtn").addEventListener("click", function () {
    const searchQuery = document.getElementById("searchInput").value.trim();
    
    if (searchQuery) {
      searchTable(searchQuery);  // Perform search if there's input
    } else {
      // If the search input is empty, clear the table
      document.getElementById("tableBody").innerHTML = "";
    }
  });
  

function searchTable(query) {
  const filteredData = allData.filter(row => {
    return row.some(cell => String(cell).toLowerCase().includes(query.toLowerCase()));
  });

  populateTable(filteredData);
}
