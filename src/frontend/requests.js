document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Kerätään tiedot lomakkeesta
        const nimi = document.getElementById("nimi").value.trim();
        const ika = document.getElementById("ika").value.trim();
        const tyo = document.getElementById("tyo").value.trim();

        // Varmistetaan että kaikki kentät on täytetty
        if (!nimi || !ika || !tyo) {
            alert("Kaikki kentät ovat pakollisia!");
            return;
        }

        // Kerätään tiedot objektiksi
        const data = {
            nimi: nimi,
            ika: ika,
            tyo: tyo
        };

        try{
            // Lähetetään tiedot palvelimelle
            const response = await fetch("http://localhost:3000/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            // Tarkistetaan vastaus

            // Jos onnistui:
            const result = await response.json();
            console.log(result);
            alert("Tietojen lähetys onnistui!")

            // Jos epäonnistui:
        } catch (error){
            console.error("Tietojen lähetyksessä tapahtui virhe:", error);
            alert("Tietojen lähetys epäonnistui. Yritä uudelleen myöhemmin.");
        }
    });
});