document.addEventListener('DOMContentLoaded', () => {
    const projectsGrid = document.getElementById('projects-grid');
    const filterPills = document.querySelectorAll('.filter-pill');
    const projectCountLabel = document.getElementById('project-count');

    if (!projectsGrid) return;

    // ── Render on load ──────────────────────────────────────
    renderProjects('all');

    // ── Filter pill clicks ──────────────────────────────────
    filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            filterPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            renderProjects(pill.dataset.filter);
        });
    });

    // ── Render function ─────────────────────────────────────
    function renderProjects(filter) {
        projectsGrid.innerHTML = '';

        const filtered = filter === 'all'
            ? projectsData
            : projectsData.filter(p => p.category === filter);

        if (projectCountLabel) {
            projectCountLabel.textContent = `${filtered.length} project${filtered.length !== 1 ? 's' : ''}`;
        }

        if (filtered.length === 0) {
            projectsGrid.innerHTML = '<div class="no-results"><i class="fas fa-folder-open" style="font-size:2rem; margin-bottom:12px; display:block; opacity:0.3;"></i>No projects in this category yet.</div>';
            return;
        }

        filtered.forEach((project, i) => {
            const card = createProjectCard(project);
            card.style.opacity = '0';
            card.style.transform = 'translateY(16px)';
            projectsGrid.appendChild(card);

            setTimeout(() => {
                card.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, i * 70);
        });
    }

    // ── Card builder ────────────────────────────────────────
    function createProjectCard(project) {
        const card = document.createElement('a');
        card.href = project.link;
        card.className = 'project-card';

        const catLabel = {
            dotnet: '.NET',
            unity: 'Unity',
            web: 'Web',
        }[project.category] || project.category;

        const catClass = 'cat-' + (project.category || 'web');

        const tagsHtml = project.tags
            .map(tag => `<span class="tag tag-orange">${tag}</span>`)
            .join('');

        card.innerHTML = `
            <div class="project-card-top">
                <div class="project-icon"><i class="${project.icon}"></i></div>
                <span class="project-cat-badge ${catClass}">${catLabel}</span>
            </div>
            <div class="project-title">${project.title}</div>
            <p class="project-desc">${project.description}</p>
            <div class="project-tags">${tagsHtml}</div>
            <div class="project-card-footer">
                <span class="project-view-link">View Details <i class="fas fa-arrow-right"></i></span>
            </div>
        `;

        return card;
    }
});
