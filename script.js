document.addEventListener('DOMContentLoaded', function() {
    const subjectsContainer = document.getElementById('subjects-container');
    const addSubjectBtn = document.getElementById('add-subject');
    
    // Percentage to GPA points conversion
    function percentageToPoints(percentage) {
        percentage = parseFloat(percentage);
        if (percentage >= 85) return 4.00;
        if (percentage >= 80) return 3.70;
        if (percentage >= 75) return 3.30;
        if (percentage >= 70) return 3.00;
        if (percentage >= 65) return 2.70;
        if (percentage >= 61) return 2.30;
        if (percentage >= 58) return 2.00;
        if (percentage >= 55) return 1.70;
        if (percentage >= 50) return 1.00;
        return 0.00;
    }
    
    // Add a new subject row
    function addSubject(name = '', credits = '', percentage = '') {
        const subjectRow = document.createElement('div');
        subjectRow.className = 'subject-row';
        
        subjectRow.innerHTML = `
            <input type="text" class="subject-name" placeholder="Subject" value="${name}">
            <input type="number" class="credit-hours" placeholder="Credits" min="0" step="0.5" value="${credits}">
            <input type="number" class="percentage" placeholder="%" min="0" max="100" value="${percentage}">
            <span class="points">${percentage ? percentageToPoints(percentage).toFixed(2) : ''}</span>
            <button class="remove-btn">×</button>
        `;
        
        // Update points when percentage changes
        const percentageInput = subjectRow.querySelector('.percentage');
        const pointsDisplay = subjectRow.querySelector('.points');
        
        percentageInput.addEventListener('input', function() {
            const points = percentageToPoints(this.value);
            pointsDisplay.textContent = points.toFixed(2);
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
            const points = parseFloat(row.querySelector('.points').textContent) || 0;
            
            totalCredits += credits;
            totalPoints += credits * points;
        });
        
        const gpa = totalCredits > 0 ? (totalPoints / totalCredits) : 0;
        
        document.getElementById('total-credits').textContent = totalCredits.toFixed(1);
        document.getElementById('total-points').textContent = totalPoints.toFixed(2);
        document.getElementById('gpa').textContent = gpa.toFixed(2);
    }
    const presetSubjects = [
        { name: "OOP", credits: 3, percentage: "" },
        { name: "OOP Lab", credits: 1, percentage: "" },
        { name: "Applied Physics", credits: 3, percentage: "" },
        { name: "DLD", credits: 2, percentage: "" },
        { name: "DLD Lab", credits: 1, percentage: "" },
        { name: "Expository Writing", credits: 3, percentage: "" },
        { name: "Probability & Statistics", credits: 3, percentage: "" },
        { name: "Quran Translation", credits: 0.5, percentage: "" }
    ];

    // Load preset subjects
    document.getElementById('load-preset').addEventListener('click', function() {
        // Clear existing subjects
        document.getElementById('subjects-container').innerHTML = "";
        
        // Add all preset subjects
        presetSubjects.forEach(subject => {
            addSubject(subject.name, subject.credits, subject.percentage);
        });
    });

    // Event listeners
    addSubjectBtn.addEventListener('click', function() {
        addSubject();
    });
    
    // Initialize with one empty subject
    addSubject();
});