document.addEventListener("DOMContentLoaded",() => {
    fetchData();
});

// groupBoxRender ja groupPeopleRender toimivat yhdessä
// Toinen piirtää ryhmät ja toinen ryhmien jäsenet
// Tässä tiedostossa haetaan tiedot ja piirretään ryhmät

// Haetaan tiedot serveriltä
async function fetchData() {
    try{
        const response = await fetch("http://localhost:3000/api/groups", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if(response.ok){
            const data = await response.json();
            console.log("Data fetched successfully:", data);
            
            displayGroups(data);
        } else{
            console.error("Failed to fetch data:", response.status);
        }
    } catch(error){
        // Handle eroor
        console.error("Error fetching data:", error);
    }
}

// Ryhmät renderöidään haetun tiedon perusteella
function displayGroups(data){
    const groupsList = document.getElementById("groups-list");
    groupsList.innerHTML = ''; 

    data.forEach(group => {
        const groupLink = document.createElement('a');
        groupLink.href = `groupview.html?groupId=${group.groupId}`;
        groupLink.className = 'group-btn';
        groupLink.textContent = `Ryhmä ${group.groupId}`;
        groupsList.appendChild(groupLink);
    });
}