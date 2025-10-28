document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Kerätään tiedot lomakkeesta
        const groupID = document.getElementById("ryhma").value.trim();
        const name = document.getElementById("nimi").value.trim();
        const age = document.getElementById("ika").value.trim();
        const birth = document.getElementById("kotipaikkakunta").value.trim();
        const hobby = document.getElementById("harrastus").value.trim();

        // Varmistetaan että kaikki kentät on täytetty
        if (!groupID || !name || !age || !birth || !hobby) {
            alert("Kaikki kentät ovat pakollisia!");
            return;
        }

        // Kerätään tiedot objektiksi
        const data = {
            groupID: groupID,
            name: name,
            age: age,
            birth: birth,
            hobby: hobby
        };

        try{
            // Lähetetään tiedot palvelimelle
            const response = await fetch("http://localhost:3000/api/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            // Tarkistetaan vastaus

            // Jos onnistui:
            if (response.ok) {
                console.log("Tietojen lähetys onnistui!");
                alert("Tietojen lähetys onnistui!");
            } else {
                console.error("Tietojen lähetys epäonnistui:", response.statusText);
                alert("Tietojen lähetys epäonnistui.");
            }

            // Jos epäonnistui:
        } catch (error){
            console.error("Tietojen lähetyksessä tapahtui virhe:", error);
            alert("Tietojen lähetys epäonnistui. Yritä uudelleen myöhemmin.");
        }
    });
});