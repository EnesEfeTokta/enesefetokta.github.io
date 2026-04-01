document.addEventListener('DOMContentLoaded', () => {
    const projectsGrid = document.getElementById('projects-grid');
    // Support both old class name (filter-pill) and new class name (proj-filter-pill)
    const filterPills = document.querySelectorAll('.proj-filter-pill, .filter-pill');
    const projectCountLabel = document.getElementById('project-count');

    if (!projectsGrid) return;

    renderProjects('all');

    filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            filterPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            renderProjects(pill.dataset.filter);
        });
    });

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

        // Accent line color per category
        const accentColors = {
            dotnet: 'rgba(106,159,216,0.6)',
            unity:  'rgba(200,128,90,0.6)',
            web:    'rgba(91,176,138,0.6)',
        };
        const accent = accentColors[project.category] || '#e50914';

        // Icon bg/color per category
        const iconStyles = {
            dotnet: { bg: 'rgba(74,106,154,0.15)', color: '#6a9fd8' },
            unity:  { bg: 'rgba(155,94,62,0.15)',  color: '#c8805a' },
            web:    { bg: 'rgba(61,122,94,0.15)',   color: '#5bb08a' },
        };
        const icon = iconStyles[project.category] || { bg: 'rgba(229,9,20,0.1)', color: '#e50914' };

        const tagsHtml = project.tags
            .map(tag => `<span class="project-tag">${tag}</span>`)
            .join('');

        card.style.setProperty('--card-accent', accent);

        card.innerHTML = `
            <div class="project-card-body">
                <div class="project-card-top">
                    <div class="project-icon" style="background:${icon.bg}; color:${icon.color};">
                        <i class="${project.icon}"></i>
                    </div>
                    <span class="project-cat-badge ${catClass}">${catLabel}</span>
                </div>
                <div class="project-title">${project.title}</div>
                <p class="project-desc">${project.description}</p>
                <div class="project-tags">${tagsHtml}</div>
                <div class="project-card-footer">
                    <span class="project-view-link">View Details <i class="fas fa-arrow-right"></i></span>
                </div>
            </div>
        `;

        return card;
    }
});
