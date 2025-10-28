document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const groupToDisplay = params.get('groupId');
    fetchData(groupToDisplay);
});

// groupBoxRender ja groupPeopleRender toimivat yhdessä
// Toinen piirtää ryhmät ja toinen ryhmien jäsenet
// Tässä tiedostossa haetaan tiedot ja piirretään ryhmien jäsenet

// Tiedot haetaan serveriltä
async function fetchData(groupToDisplay) {
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
            displayPeople(data, groupToDisplay);
        } else {
            console.error("Failed to fetch data:", response.status);
        }
    } catch (error) {
        // Handle eroor
        console.error("Error fetching data:", error);
    }
}

// Apufuntio: auttaa XSS-suojauksessa
function escapeHtml(str = '') {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

// Ryhmän jäsenet renderöidään haetun tiedon perusteella
function displayPeople(data, groupToDisplay) {
    const container = document.getElementById("container");
    container.innerHTML = '';

    if (!groupToDisplay) {
        container.textContent = 'Ryhmää ei valittu.';
        return;
    }

    const group = data.find(g => String(g.groupId) === String(groupToDisplay));
    if (!group) {
        container.textContent = 'Ryhmää ei löytynyt.';
        return;
    }

    const box = document.createElement('div');
    box.className = 'info-box';

    group.members.forEach(member => {
        const box = document.createElement('div');
        box.className = 'info-box member';
        box.innerHTML = `
            <h2>Nimi: ${escapeHtml(member.name ?? "Ei tietoa")}</h2>
            <p>Ikä: ${escapeHtml(member.age ?? "Ei tietoa")}</p>
            <p>Kotipaikkakunta: ${escapeHtml(member.birth ?? "Ei tietoa")}</p>
            <p>Harrastus: ${escapeHtml(member.hobby ?? "Ei tietoa")}</p>
        `;
        container.appendChild(box);
    });
}