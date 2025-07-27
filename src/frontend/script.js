
function redirectToPage(url) {
    window.location.href = url;
}

const people = [
  { name: "Aino", age: 23, job: "Ohjelmoija" },
  { name: "Joona", age: 21, job: "Ohjelmoija" },
  { name: "Sirpa", age: 68, job: "Opettaja" },
  { name: "Niko", age: 23, job: "Prisma" },
  { name: "Kati", age: 21, job: "Powerpark" }
];

function renderInfoBoxes(){
    const container = document.getElementById('container');
    container.innerHTML = '';

    people.forEach(person => {
        const box = document.createElement('div');
        box.className = 'info-box';
        box.innerHTML = `
            <h2>${person.name}</h2>
            <p>Ikä: ${person.age}</p>
            <p>Työ: ${person.job}</p>
        `;
        container.appendChild(box);
    });
}

const groups = [
    { name: "Ryhmä 1", url: "groupview.html" },
    { name: "Ryhmä 2", url: "groupview.html" },
    { name: "Ryhmä 3", url: "groupview.html" },
    { name: "Ryhmä 4", url: "groupview.html" },
    { name: "Ryhmä 5", url: "groupview.html" }
];

function renderGroupBoxes(){
    const groupsList = document.getElementById('groups-list');
    groupsList.innerHTML = '';

    groups.forEach(group => {
        const groupLink = document.createElement('a');
        groupLink.href = group.url;
        groupLink.className = 'group-btn';
        groupLink.textContent = group.name;
        groupsList.appendChild(groupLink);
    });
}

document.addEventListener('DOMContentLoaded', renderInfoBoxes);
document.addEventListener('DOMContentLoaded', renderGroupBoxes);