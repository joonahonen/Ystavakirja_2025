document.addEventListener("DOMContentLoaded",() => {
    fetchData();
});

async function fetchData() {
    try {
        const response = await fetch("http://localhost:3000/api/groups", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Data fetched successfully:", data);
            // Process the data as needed, e.g., display it on the page
            processJSON(data);
        } else {
            console.error("Failed to fetch data:", response.status);
        }
    } catch (error) {
        // Handle eroor
        console.error("Error fetching data:", error);
    }
}

function processJSON(data) {
    // Function to process the JSON data
    // This could involve displaying it on the page or manipulating it as needed
    console.log("Processing JSON data...");
    console.log(data);
}