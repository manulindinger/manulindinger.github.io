async function setdetails() {
    const container = document.querySelector('.projects');
    const containerinfo = document.querySelector('.projects-info');

    try {
        const response = await fetch('projekte.json');
        const projects = await response.json();

        if (projects.length === 0) {
            container.innerHTML = 'Keine Projekte gefunden';
            return;
        }

        containerinfo.innerHTML = `<p id="project-info"><b>Anzahl Projekte: </b>${projects.length}</p>`;
        projects.forEach(project => {
            container.innerHTML += `
                <div class="project">
                    <div>
                        <h2 class="project-title">${project.title}</h2>
                        <p class="project-date hidden">${project.date}</p>
                        <p class="project-description hidden">
                            ${project.description}
                        </p>
                        <a href="${project.link}" class="project-link hidden" target="_blank">
                            ${project.linkname}
                        </a>
                    </div>

                    <button class="dropdown-btn">﹀</button>
                </div>
            `;
        });
        document.querySelectorAll('.dropdown-btn').forEach(button => {
            button.addEventListener('click', () => {
                const description = button.parentElement.querySelector('.project-description');
                const date = button.parentElement.querySelector('.project-date');
                const link = button.parentElement.querySelector('.project-link');

                description.classList.toggle('hidden');
                link.classList.toggle('hidden');
                date.classList.toggle('hidden');

                button.textContent = description.classList.contains('hidden') ? '﹀' : '︿';
            });
        });

    } catch (error) {
        container.innerHTML = '<p class="project-text" id="project-error">JSON nicht verfügbar</p>';
        console.error(error);
    }
}

setdetails();

