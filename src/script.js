
function redirectToPage(url) {
    window.location.href = url;
}

const people = [
  { name: "Aino", age: 23, job: "Ohjelmoija" },
  { name: "Joona", age: 21, job: "Ohjelmoija" },
  { name: "Sirpa", age: 68, job: "Opettaja" },
  { name: "Niko", age: 23, job: "Prisma" },
  { name: "Niko", age: 23, job: "Prisma" }
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

document.addEventListener('DOMContentLoaded', renderInfoBoxes);