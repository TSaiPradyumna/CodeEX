
// Leaderboard Chart and Data Management
class LeaderboardManager {
    constructor() {
        this.data = [];
        this.chart = null;
        this.searchInput = document.getElementById('search-leaderboard');
        this.sortSelect = document.getElementById('sort-leaderboard');
        this.tableBody = document.getElementById('leaderboard-tbody');
        this.chartCanvas = document.getElementById('leaderboard-chart');
        
        this.init();
    }

    init() {
        this.loadSampleData();
        this.setupEventListeners();
        this.renderTable();
        this.renderChart();
    }

    loadSampleData() {
        // Enhanced sample data with more details
        this.data = [
            {
                rank: 1,
                name: 'Aarav Sharma',
                score: 950,
                level: 'Advanced',
                projects: 12,
                department: 'Computer Science',
                year: '3rd Year',
                specialization: 'AI/ML',
                achievements: ['Hackathon Winner', 'Project Leader'],
                joinDate: '2023-01-15',
                lastActive: '2024-01-10'
            },
            {
                rank: 2,
                name: 'Bhavya Patel',
                score: 920,
                level: 'Advanced',
                projects: 10,
                department: 'Computer Science',
                year: '4th Year',
                specialization: 'Web Development',
                achievements: ['Code Review Expert', 'Mentor'],
                joinDate: '2022-08-20',
                lastActive: '2024-01-09'
            },
            {
                rank: 3,
                name: 'Chaitanya Reddy',
                score: 890,
                level: 'Intermediate',
                projects: 8,
                department: 'Electronics',
                year: '3rd Year',
                specialization: 'IoT',
                achievements: ['Innovation Award'],
                joinDate: '2023-02-10',
                lastActive: '2024-01-08'
            },
            {
                rank: 4,
                name: 'Diya Nair',
                score: 870,
                level: 'Intermediate',
                projects: 7,
                department: 'Computer Science',
                year: '2nd Year',
                specialization: 'Data Science',
                achievements: ['Rising Star'],
                joinDate: '2023-07-05',
                lastActive: '2024-01-07'
            },
            {
                rank: 5,
                name: 'Eshaan Gupta',
                score: 850,
                level: 'Intermediate',
                projects: 6,
                department: 'Mechanical',
                year: '3rd Year',
                specialization: 'Automation',
                achievements: ['Team Player'],
                joinDate: '2023-03-12',
                lastActive: '2024-01-06'
            },
            {
                rank: 6,
                name: 'Fiza Khan',
                score: 830,
                level: 'Intermediate',
                projects: 6,
                department: 'Computer Science',
                year: '2nd Year',
                specialization: 'Mobile Development',
                achievements: ['Quick Learner'],
                joinDate: '2023-09-18',
                lastActive: '2024-01-05'
            },
            {
                rank: 7,
                name: 'Gaurav Singh',
                score: 810,
                level: 'Intermediate',
                projects: 5,
                department: 'Electronics',
                year: '4th Year',
                specialization: 'Embedded Systems',
                achievements: ['Hardware Expert'],
                joinDate: '2022-11-30',
                lastActive: '2024-01-04'
            },
            {
                rank: 8,
                name: 'Hridya Menon',
                score: 790,
                level: 'Beginner',
                projects: 4,
                department: 'Civil',
                year: '1st Year',
                specialization: 'Smart Infrastructure',
                achievements: ['Enthusiastic Learner'],
                joinDate: '2023-08-25',
                lastActive: '2024-01-03'
            },
            {
                rank: 9,
                name: 'Ishaan Joshi',
                score: 770,
                level: 'Beginner',
                projects: 4,
                department: 'Computer Science',
                year: '1st Year',
                specialization: 'Programming Fundamentals',
                achievements: ['Consistent Performer'],
                joinDate: '2023-08-20',
                lastActive: '2024-01-02'
            },
            {
                rank: 10,
                name: 'Jaya Rao',
                score: 750,
                level: 'Beginner',
                projects: 3,
                department: 'Electronics',
                year: '2nd Year',
                specialization: 'Robotics',
                achievements: ['Creative Thinker'],
                joinDate: '2023-06-15',
                lastActive: '2024-01-01'
            },
            {
                rank: 11,
                name: 'Kiran Desai',
                score: 730,
                level: 'Beginner',
                projects: 3,
                department: 'Mechanical',
                year: '1st Year',
                specialization: 'CAD Programming',
                achievements: ['Design Expert'],
                joinDate: '2023-10-05',
                lastActive: '2023-12-31'
            },
            {
                rank: 12,
                name: 'Lakshmi Iyer',
                score: 710,
                level: 'Beginner',
                projects: 3,
                department: 'Computer Science',
                year: '1st Year',
                specialization: 'Web Basics',
                achievements: ['Dedicated Student'],
                joinDate: '2023-09-10',
                lastActive: '2023-12-30'
            },
            {
                rank: 13,
                name: 'Manav Shah',
                score: 690,
                level: 'Beginner',
                projects: 2,
                department: 'Civil',
                year: '2nd Year',
                specialization: 'GIS Programming',
                achievements: ['Problem Solver'],
                joinDate: '2023-04-22',
                lastActive: '2023-12-29'
            },
            {
                rank: 14,
                name: 'Nisha Varghese',
                score: 670,
                level: 'Beginner',
                projects: 2,
                department: 'Electronics',
                year: '1st Year',
                specialization: 'Circuit Design',
                achievements: ['Technical Enthusiast'],
                joinDate: '2023-08-30',
                lastActive: '2023-12-28'
            },
            {
                rank: 15,
                name: 'Omkar Yadav',
                score: 650,
                level: 'Beginner',
                projects: 2,
                department: 'Mechanical',
                year: '1st Year',
                specialization: 'Programming Basics',
                achievements: ['New Member'],
                joinDate: '2023-11-12',
                lastActive: '2023-12-27'
            }
        ];
    }

    setupEventListeners() {
        if (this.searchInput) {
            this.searchInput.addEventListener('input', (e) => {
                this.filterData(e.target.value);
            });
        }

        if (this.sortSelect) {
            this.sortSelect.addEventListener('change', (e) => {
                this.sortData(e.target.value);
            });
        }
    }

    renderTable(data = this.data) {
        if (!this.tableBody) return;

        this.tableBody.innerHTML = '';

        data.forEach((member, index) => {
            const row = document.createElement('tr');
            row.className = 'leaderboard-row';
            
            // Add hover effect
            row.addEventListener('mouseenter', () => {
                row.style.backgroundColor = 'rgba(57, 255, 20, 0.1)';
            });
            
            row.addEventListener('mouseleave', () => {
                row.style.backgroundColor = '';
            });

            row.innerHTML = `
                <td class="rank-cell">
                    <div class="rank-badge ${this.getRankClass(member.rank)}">
                        ${member.rank <= 3 ? this.getRankIcon(member.rank) : member.rank}
                    </div>
                </td>
                <td class="name-cell">
                    <div class="member-info">
                        <div class="member-name">${member.name}</div>
                        <div class="member-details">${member.department} • ${member.year}</div>
                    </div>
                </td>
                <td class="score-cell">
                    <div class="score-display">
                        <span class="score-number">${member.score}</span>
                        <div class="score-bar">
                            <div class="score-fill" style="width: ${(member.score / 1000) * 100}%"></div>
                        </div>
                    </div>
                </td>
                <td class="level-cell">
                    <span class="level-badge level-${member.level.toLowerCase()}">${member.level}</span>
                </td>
                <td class="projects-cell">
                    <div class="projects-count">
                        <i class="fas fa-project-diagram"></i>
                        <span>${member.projects}</span>
                    </div>
                </td>
            `;

            // Add click event for detailed view
            row.addEventListener('click', () => {
                this.showMemberDetails(member);
            });

            // Add stagger animation
            row.style.opacity = '0';
            row.style.transform = 'translateY(20px)';
            row.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

            this.tableBody.appendChild(row);

            // Trigger animation
            setTimeout(() => {
                row.style.opacity = '1';
                row.style.transform = 'translateY(0)';
            }, index * 50);
        });
    }

    renderChart() {
        if (!this.chartCanvas || typeof Chart === 'undefined') {
            console.log('Chart.js not loaded or canvas not found');
            return;
        }

        const ctx = this.chartCanvas.getContext('2d');
        
        // Prepare data for chart (top 10 members)
        const chartData = this.data.slice(0, 10);
        const labels = chartData.map(member => member.name.split(' ')[0]); // First names only
        const scores = chartData.map(member => member.score);
        const colors = chartData.map((_, index) => {
            if (index < 3) return '#FFD700'; // Gold for top 3
            if (index < 6) return '#39ff14'; // Accent color for top 6
            return '#0033cc'; // Primary color for rest
        });

        // Destroy existing chart if it exists
        if (this.chart) {
            this.chart.destroy();
        }

        this.chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Score',
                    data: scores,
                    backgroundColor: colors,
                    borderColor: colors,
                    borderWidth: 2,
                    borderRadius: 8,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Top 10 Performers',
                        color: '#ffffff',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    },
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: '#ffffff'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: '#ffffff'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    }
                },
                animation: {
                    duration: 1500,
                    easing: 'easeInOutQuart'
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        });
    }

    filterData(searchTerm) {
        const filtered = this.data.filter(member =>
            member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.specialization.toLowerCase().includes(searchTerm.toLowerCase())
        );
        this.renderTable(filtered);
    }

    sortData(sortBy) {
        let sorted = [...this.data];

        switch (sortBy) {
            case 'score':
                sorted.sort((a, b) => b.score - a.score);
                break;
            case 'name':
                sorted.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'projects':
                sorted.sort((a, b) => b.projects - a.projects);
                break;
            case 'department':
                sorted.sort((a, b) => a.department.localeCompare(b.department));
                break;
            default:
                sorted.sort((a, b) => a.rank - b.rank);
        }

        // Update ranks if sorting by score
        if (sortBy === 'score') {
            sorted.forEach((member, index) => {
                member.rank = index + 1;
            });
        }

        this.data = sorted;
        this.renderTable();
        this.renderChart();
    }

    getRankClass(rank) {
        if (rank === 1) return 'rank-gold';
        if (rank === 2) return 'rank-silver';
        if (rank === 3) return 'rank-bronze';
        return 'rank-default';
    }

    getRankIcon(rank) {
        const icons = {
            1: '<i class="fas fa-crown"></i>',
            2: '<i class="fas fa-medal"></i>',
            3: '<i class="fas fa-award"></i>'
        };
        return icons[rank] || rank;
    }

    showMemberDetails(member) {
        // Create modal for member details
        const modal = document.createElement('div');
        modal.className = 'member-modal';
        modal.innerHTML = `
            <div class="modal-overlay" onclick="this.parentElement.remove()"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${member.name}</h3>
                    <button class="modal-close" onclick="this.closest('.member-modal').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="member-stats">
                        <div class="stat-item">
                            <span class="stat-label">Rank</span>
                            <span class="stat-value">#${member.rank}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Score</span>
                            <span class="stat-value">${member.score}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Level</span>
                            <span class="stat-value">${member.level}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Projects</span>
                            <span class="stat-value">${member.projects}</span>
                        </div>
                    </div>
                    <div class="member-info-detailed">
                        <p><strong>Department:</strong> ${member.department}</p>
                        <p><strong>Year:</strong> ${member.year}</p>
                        <p><strong>Specialization:</strong> ${member.specialization}</p>
                        <p><strong>Joined:</strong> ${new Date(member.joinDate).toLocaleDateString()}</p>
                        <p><strong>Last Active:</strong> ${new Date(member.lastActive).toLocaleDateString()}</p>
                    </div>
                    <div class="achievements">
                        <h4>Achievements</h4>
                        <div class="achievement-list">
                            ${member.achievements.map(achievement => `
                                <span class="achievement-badge">${achievement}</span>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Add animation
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }

    // Method to add new member (for future backend integration)
    addMember(memberData) {
        const newMember = {
            ...memberData,
            rank: this.data.length + 1,
            joinDate: new Date().toISOString(),
            lastActive: new Date().toISOString()
        };

        this.data.push(newMember);
        this.sortData('score'); // Re-sort to update ranks
    }

    // Method to update member score
    updateMemberScore(memberName, newScore) {
        const member = this.data.find(m => m.name === memberName);
        if (member) {
            member.score = newScore;
            member.lastActive = new Date().toISOString();
            this.sortData('score');
        }
    }
}

// CSS for leaderboard enhancements
const leaderboardStyles = `
    .leaderboard-row {
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .rank-badge {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        font-weight: bold;
        font-size: 0.9rem;
    }
    
    .rank-gold {
        background: linear-gradient(45deg, #FFD700, #FFA500);
        color: #000;
        box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
    }
    
    .rank-silver {
        background: linear-gradient(45deg, #C0C0C0, #A0A0A0);
        color: #000;
        box-shadow: 0 0 10px rgba(192, 192, 192, 0.5);
    }
    
    .rank-bronze {
        background: linear-gradient(45deg, #CD7F32, #A0522D);
        color: #fff;
        box-shadow: 0 0 10px rgba(205, 127, 50, 0.5);
    }
    
    .rank-default {
        background: rgba(255, 255, 255, 0.1);
        color: #fff;
        border: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    .member-info {
        display: flex;
        flex-direction: column;
    }
    
    .member-name {
        font-weight: 600;
        color: #fff;
    }
    
    .member-details {
        font-size: 0.8rem;
        color: rgba(255, 255, 255, 0.7);
    }
    
    .score-display {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
    }
    
    .score-number {
        font-weight: bold;
        color: var(--accent-color);
        font-size: 1.1rem;
    }
    
    .score-bar {
        width: 60px;
        height: 4px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 2px;
        overflow: hidden;
    }
    
    .score-fill {
        height: 100%;
        background: var(--accent-color);
        border-radius: 2px;
        transition: width 0.5s ease;
    }
    
    .level-badge {
        padding: 0.25rem 0.75rem;
        border-radius: 15px;
        font-size: 0.8rem;
        font-weight: 600;
        text-transform: uppercase;
    }
    
    .level-beginner {
        background: #28a745;
        color: white;
    }
    
    .level-intermediate {
        background: #ffc107;
        color: #000;
    }
    
    .level-advanced {
        background: #dc3545;
        color: white;
    }
    
    .projects-count {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: rgba(255, 255, 255, 0.8);
    }
    
    .member-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .member-modal.show {
        opacity: 1;
    }
    
    .modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        cursor: pointer;
    }
    
    .modal-content {
        position: relative;
        background: var(--bg-dark);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: var(--border-radius);
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        transform: scale(0.9);
        transition: transform 0.3s ease;
    }
    
    .member-modal.show .modal-content {
        transform: scale(1);
    }
    
    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .modal-header h3 {
        margin: 0;
        color: var(--accent-color);
    }
    
    .modal-close {
        background: none;
        border: none;
        color: rgba(255, 255, 255, 0.7);
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 50%;
        transition: all 0.3s ease;
    }
    
    .modal-close:hover {
        background: rgba(255, 255, 255, 0.1);
        color: #fff;
    }
    
    .modal-body {
        padding: 1.5rem;
    }
    
    .member-stats {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
        margin-bottom: 2rem;
    }
    
    .stat-item {
        background: rgba(255, 255, 255, 0.05);
        padding: 1rem;
        border-radius: 8px;
        text-align: center;
    }
    
    .stat-label {
        display: block;
        font-size: 0.8rem;
        color: rgba(255, 255, 255, 0.7);
        margin-bottom: 0.5rem;
    }
    
    .stat-value {
        display: block;
        font-size: 1.2rem;
        font-weight: bold;
        color: var(--accent-color);
    }
    
    .member-info-detailed {
        margin-bottom: 1.5rem;
    }
    
    .member-info-detailed p {
        margin: 0.5rem 0;
        color: rgba(255, 255, 255, 0.8);
    }
    
    .achievements h4 {
        color: var(--accent-color);
        margin-bottom: 1rem;
    }
    
    .achievement-list {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }
    
    .achievement-badge {
        background: var(--primary-color);
        color: white;
        padding: 0.25rem 0.75rem;
        border-radius: 15px;
        font-size: 0.8rem;
    }
    
    @media (max-width: 768px) {
        .member-stats {
            grid-template-columns: 1fr;
        }
        
        .modal-content {
            width: 95%;
        }
        
        .leaderboard-table {
            font-size: 0.9rem;
        }
        
        .rank-badge {
            width: 35px;
            height: 35px;
            font-size: 0.8rem;
        }
    }
`;

// Add styles to document
const leaderboardStyleSheet = document.createElement('style');
leaderboardStyleSheet.textContent = leaderboardStyles;
document.head.appendChild(leaderboardStyleSheet);

// Initialize leaderboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const leaderboardManager = new LeaderboardManager();
    
    // Store reference globally for potential external access
    window.codeexLeaderboard = leaderboardManager;
});

console.log('Leaderboard system initialized successfully!');