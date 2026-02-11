document.addEventListener('DOMContentLoaded', () => {
    const projectsGrid = document.getElementById('projects-grid');
    const filterContainer = document.getElementById('filter-container');
    const projectCountLabel = document.getElementById('project-count');

    if (!projectsGrid || !filterContainer) return;

    const allTags = new Set();
    projectsData.forEach(project => {
        project.tags.forEach(tag => allTags.add(tag));
    });

    const sortedTags = Array.from(allTags).sort();

    const allBtn = createFilterBtn('All', 'all', true);
    filterContainer.appendChild(allBtn);

    sortedTags.forEach(tag => {
        const btn = createFilterBtn(tag, tag);
        filterContainer.appendChild(btn);
    });

    renderProjects('all');

    function createFilterBtn(label, filterValue, isActive = false) {
        const btn = document.createElement('button');
        btn.className = `filter-btn ${isActive ? 'active' : ''}`;
        btn.textContent = label;
        btn.dataset.filter = filterValue;

        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderProjects(filterValue);
        });

        return btn;
    }

    function renderProjects(filter) {
        projectsGrid.innerHTML = '';

        const filteredProjects = filter === 'all'
            ? projectsData
            : projectsData.filter(p => p.tags.includes(filter));

        if (projectCountLabel) {
            projectCountLabel.textContent = `Showing ${filteredProjects.length} project${filteredProjects.length !== 1 ? 's' : ''}`;
        }

        if (filteredProjects.length === 0) {
            projectsGrid.innerHTML = '<p class="no-results">No projects found with this tag.</p>';
            return;
        }

        filteredProjects.forEach(project => {
            const card = createProjectCard(project);
            projectsGrid.appendChild(card);
        });

        const cards = projectsGrid.querySelectorAll('.bento-item');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    function createProjectCard(project) {
        const colClass = project.description.length > 100 ? 'span-2' : '';

        const div = document.createElement('div');
        div.className = `bento-item ${colClass}`;

        let tagsHtml = '';
        project.tags.forEach(tag => {
            tagsHtml += `<span class="skill-tag">${tag}</span>`;
        });

        div.innerHTML = `
            <div style="display: flex; align-items: start; justify-content: space-between; margin-bottom: 12px;">
                <i class="${project.icon} bento-icon" style="margin-bottom: 0;"></i>
                <div class="project-links">
                     <!-- Add github/demo links here if they existed in data -->
                </div>
            </div>
            
            <h3 class="bento-title">${project.title}</h3>
            <p class="bento-text" style="margin-bottom: 16px;">
                ${project.description}
            </p>
            
            <div class="skill-tags" style="margin-bottom: 24px;">
                ${tagsHtml}
            </div>
            
            <a href="${project.link}" class="btn btn-secondary" style="width: fit-content;">View Details</a>
        `;

        return div;
    }
});
