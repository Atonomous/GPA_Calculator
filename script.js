document.addEventListener('DOMContentLoaded', function() {
    // Initialize with empty subject list
    const subjectsContainer = document.getElementById('subjects-container');
    const addSubjectBtn = document.getElementById('add-subject');
    const loadPresetBtn = document.getElementById('load-preset');
    
    // Grade to points mapping
    const gradePoints = {
        'A+': 4.0,
        'A': 4.0,
        'A-': 3.7,
        'B+': 3.3,
        'B': 3.0,
        'B-': 2.7,
        'C+': 2.3,
        'C': 2.0,
        'C-': 1.7,
        'D+': 1.3,
        'D': 1.0,
        'F': 0.0
    };
    
    // Add a new subject row
    function addSubject(name = '', credits = '', grade = '') {
        const subjectRow = document.createElement('div');
        subjectRow.className = 'subject-row';
        
        subjectRow.innerHTML = `
            <input type="text" class="subject-name" placeholder="Subject name" value="${name}">
            <input type="number" class="credit-hours" placeholder="Credits" min="0" step="0.5" value="${credits}">
            <select class="grade">
                ${Object.keys(gradePoints).map(g => 
                    `<option value="${g}" ${grade === g ? 'selected' : ''}>${g}</option>`
                ).join('')}
            </select>
            <button class="remove-btn">×</button>
        `;
        
        // Add event listeners for changes
        const inputs = subjectRow.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.addEventListener('change', calculateGPA);
        });
        
        // Add remove button functionality
        const removeBtn = subjectRow.querySelector('.remove-btn');
        removeBtn.addEventListener('click', function() {
            subjectsContainer.removeChild(subjectRow);
            calculateGPA();
        });
        
        subjectsContainer.appendChild(subjectRow);
    }
    
    // Calculate GPA
    function calculateGPA() {
        const subjectRows = document.querySelectorAll('.subject-row');
        let totalCredits = 0;
        let totalPoints = 0;
        
        subjectRows.forEach(row => {
            const credits = parseFloat(row.querySelector('.credit-hours').value) || 0;
            const grade = row.querySelector('.grade').value;
            
            totalCredits += credits;
            totalPoints += credits * gradePoints[grade];
        });
        
        const gpa = totalCredits > 0 ? (totalPoints / totalCredits) : 0;
        
        document.getElementById('total-credits').textContent = totalCredits.toFixed(1);
        document.getElementById('total-points').textContent = totalPoints.toFixed(2);
        document.getElementById('gpa').textContent = gpa.toFixed(2);
    }
    
    // Load preset subjects
    function loadPresetSubjects() {
        // Clear existing subjects
        subjectsContainer.innerHTML = '';
        
        // Add predefined subjects
        addSubject('OOP', '3', 'A');
        addSubject('OOP Lab', '1', 'A');
        addSubject('Applied Physics', '3', 'A');
        addSubject('DLD', '2', 'A');
        addSubject('DLD Lab', '1', 'A');
        addSubject('Expository Writing', '3', 'A');
        addSubject('Probability & Statistics', '3', 'A');
        addSubject('Quran Translation', '0.5', 'A');
        
        calculateGPA();
    }
    
    // Event listeners
    addSubjectBtn.addEventListener('click', function() {
        addSubject();
    });
    
    loadPresetBtn.addEventListener('click', loadPresetSubjects);
    
    // Initialize with one empty subject
    addSubject();
});