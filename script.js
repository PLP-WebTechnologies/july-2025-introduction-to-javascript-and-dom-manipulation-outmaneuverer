// Variable declarations
let students = []; // Array to store all student objects
let totalStudents = 0; // Counter for total students
let passThreshold = 60; // Minimum grade to pass
const maxGrade = 100; // Maximum possible grade
const minGrade = 0; // Minimum possible grade

// Initial sample data 
let sampleStudentsAdded = false;

// Initialize  with some sample data
function initializeApp() {
  if (!sampleStudentsAdded) {
    students = [
      { name: "Alice Johnson", grade: 92, category: "excellent" },
      { name: "Bob Smith", grade: 78, category: "good" },
      { name: "Carol Davis", grade: 65, category: "good" },
      { name: "David Wilson", grade: 45, category: "needs-improvement" }
    ];
    totalStudents = students.length;
    sampleStudentsAdded = true;
    displayAllStudents();
  }
}

// Function to categorize grades using conditionals
function categorizeGrade(grade) {
  let category;
  let message;

  if (grade >= 90) {
    category = "excellent";
    message = "Outstanding work! 🌟";
  } else if (grade >= 80) {
    category = "good";
    message = "Great job! 👍";
  } else if (grade >= passThreshold) {
    category = "good";
    message = "Good work! ✓";
  } else {
    category = "needs-improvement";
    message = "Needs improvement 📚";
  }

  return { category, message };
}

// Function 1: Add a new student with validation
function addStudent() {
  const nameInput = document.getElementById('studentName');
  const gradeInput = document.getElementById('studentGrade');

  const name = nameInput.value.trim();
  const grade = parseInt(gradeInput.value);

  if (name === "") {
    showMessage("Please enter a student name!", "error");
    return;
  }

  if (isNaN(grade) || grade < minGrade || grade > maxGrade) {
    showMessage(`Please enter a valid grade between ${minGrade} and ${maxGrade}!`, "error");
    return;
  }

  if (students.some(student => student.name.toLowerCase() === name.toLowerCase())) {
    showMessage("A student with this name already exists!", "error");
    return;
  }

  const gradeInfo = categorizeGrade(grade);
  const newStudent = {
    name: name,
    grade: grade,
    category: gradeInfo.category,
    message: gradeInfo.message
  };

  students.push(newStudent);
  totalStudents++;

  nameInput.value = "";
  gradeInput.value = "";
  showMessage(`${name} added successfully with grade ${grade}!`, "success");

  displayAllStudents();
}

// Function 2: Calculate and display class statistics
function calculateStatistics() {
  if (students.length === 0) {
    showMessage("No students to calculate statistics for!", "error");
    return;
  }

  const totalGrades = students.reduce((sum, student) => sum + student.grade, 0);
  const averageGrade = Math.round(totalGrades / students.length * 100) / 100;
  const highestGrade = Math.max(...students.map(s => s.grade));
  const lowestGrade = Math.min(...students.map(s => s.grade));

  const excellentCount = students.filter(s => s.category === "excellent").length;
  const goodCount = students.filter(s => s.category === "good").length;
  const needsImprovementCount = students.filter(s => s.category === "needs-improvement").length;
  const passingCount = students.filter(s => s.grade >= passThreshold).length;

  const statsDiv = document.getElementById('statisticsDisplay');
  const statsContent = document.getElementById('statsContent');

  statsContent.innerHTML = `
    <p><strong>Total Students:</strong> ${totalStudents}</p>
    <p><strong>Class Average:</strong> ${averageGrade}%</p>
    <p><strong>Highest Grade:</strong> ${highestGrade}%</p>
    <p><strong>Lowest Grade:</strong> ${lowestGrade}%</p>
    <p><strong>Passing Students:</strong> ${passingCount} (${Math.round(passingCount/totalStudents*100)}%)</p>
    <p><strong>Grade Distribution:</strong></p>
    <ul>
      <li>Excellent (90-100): ${excellentCount} students</li>
      <li>Good (60-89): ${goodCount} students</li>
      <li>Needs Improvement (0-59): ${needsImprovementCount} students</li>
    </ul>
  `;

  statsDiv.style.display = 'block';
  showMessage("Statistics calculated successfully!", "success");
}

// LOOPS 

function displayAllStudents() {
  const displayDiv = document.getElementById('studentDisplay');
  displayDiv.innerHTML = "";

  if (students.length === 0) {
    displayDiv.innerHTML = "<p>No students added yet. Add some students to get started!</p>";
    return;
  }

  for (let i = 0; i < students.length; i++) {
    const student = students[i];

    const studentDiv = document.createElement('div');
    studentDiv.className = `student-item ${student.category}`;
    studentDiv.innerHTML = `
      <h4>${student.name}</h4>
      <div class="grade-display">Grade: ${student.grade}% - ${student.message}</div>
      <button onclick="removeStudent(${i})" class="danger">Remove Student</button>
    `;

    displayDiv.appendChild(studentDiv);
  }
}

function findStudentsByRange(minRange, maxRange) {
  const foundStudents = [];
  let index = 0;

  while (index < students.length) {
    const student = students[index];
    if (student.grade >= minRange && student.grade <= maxRange) {
      foundStudents.push(student);
    }
    index++;
  }
  return foundStudents;
}

//  DOM INTERACTIONS 

function showMessage(text, type) {
  const messageDiv = document.getElementById('message');
  messageDiv.textContent = text;
  messageDiv.className = type === "error" ? "error-message" : "success-message";

  setTimeout(() => {
    messageDiv.textContent = "";
    messageDiv.className = "";
  }, 3000);
}

function removeStudent(index) {
  if (index >= 0 && index < students.length) {
    const removedStudent = students.splice(index, 1)[0];
    totalStudents--;
    showMessage(`${removedStudent.name} removed successfully!`, "success");
    displayAllStudents();

    if (students.length === 0) {
      document.getElementById('statisticsDisplay').style.display = 'none';
    }
  }
}

function clearAllStudents() {
  if (students.length === 0) {
    showMessage("No students to clear!", "error");
    return;
  }

  const confirmed = confirm(`Are you sure you want to remove all ${students.length} students?`);

  if (confirmed) {
    students = [];
    totalStudents = 0;
    sampleStudentsAdded = false;

    document.getElementById('studentDisplay').innerHTML = "<p>No students added yet. Add some students to get started!</p>";
    document.getElementById('statisticsDisplay').style.display = 'none';
    showMessage("All students cleared successfully!", "success");
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  initializeApp();

  const nameInput = document.getElementById('studentName');
  const gradeInput = document.getElementById('studentGrade');

  nameInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      gradeInput.focus();
    }
  });

  gradeInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      addStudent();
    }
  });
});
