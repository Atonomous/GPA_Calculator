document.addEventListener('DOMContentLoaded', function() {
    const subjectsContainer = document.getElementById('subjects-container');
    const addSubjectBtn = document.getElementById('add-subject');
    
    // Grading scale based on your requirements
    const gradePoints = {
        'A': 4.00,   // 85% & above
        'A-': 3.70,  // 80-84%
        'B+': 3.30,  // 75-79%
        'B': 3.00,   // 70-74%
        'B-': 2.70,  // 65-69%
        'C+': 2.30,  // 61-64%
        'C': 2.00,   // 58-60%
        'C-': 1.70,  // 55-57%
        'D': 1.00,   // 50-54%
        'F': 0.00    // Below 50%
    };
    
    // Convert percentage to grade
    function percentageToGrade(percentage) {
        percentage = parseFloat(percentage);
        if (percentage >= 85) return 'A';
        if (percentage >= 80) return 'A-';
        if (percentage >= 75) return 'B+';
        if (percentage >= 70) return 'B';
        if (percentage >= 65) return 'B-';
        if (percentage >= 61) return 'C+';
        if (percentage >= 58) return 'C';
        if (percentage >= 55) return 'C-';
        if (percentage >= 50) return 'D';
        return 'F';
    }
    
    // Add a new subject row
    function addSubject(name = '', credits = '', percentage = '') {
        const subjectRow = document.createElement('div');
        subjectRow.className = 'subject-row';
        
        subjectRow.innerHTML = `
            <input type="text" class="subject-name" placeholder="Subject" value="${name}">
            <input type="number" class="credit-hours" placeholder="Credits" min="0" step="0.5" value="${credits}">
            <input type="number" class="percentage" placeholder="%" min="0" max="100" value="${percentage}">
            <span class="grade-display">${percentage ? percentageToGrade(percentage) : ''}</span>
            <button class="remove-btn">×</button>
        `;
        
        // Update grade display when percentage changes
        const percentageInput = subjectRow.querySelector('.percentage');
        const gradeDisplay = subjectRow.querySelector('.grade-display');
        
        percentageInput.addEventListener('input', function() {
            const grade = percentageToGrade(this.value);
            gradeDisplay.textContent = grade;
            gradeDisplay.className = 'grade-display grade-' + grade.replace('+', '').replace('-', '');
            calculateGPA();
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
            const percentage = parseFloat(row.querySelector('.percentage').value) || 0;
            const grade = percentageToGrade(percentage);
            
            totalCredits += credits;
            totalPoints += credits * gradePoints[grade];
        });
        
        const gpa = totalCredits > 0 ? (totalPoints / totalCredits) : 0;
        
        document.getElementById('total-credits').textContent = totalCredits.toFixed(1);
        document.getElementById('total-points').textContent = totalPoints.toFixed(2);
        document.getElementById('gpa').textContent = gpa.toFixed(2);
    }
    
    // Event listeners
    addSubjectBtn.addEventListener('click', function() {
        addSubject();
    });
    
    // Initialize with one empty subject
    addSubject();
});