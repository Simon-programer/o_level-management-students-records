let students = [];

document.getElementById("studentForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const id = document.getElementById("studentId").value;
    const age = document.getElementById("age").value;
    const gender = document.getElementById("gender").value;
    const form = document.getElementById("formLevel").value;

    
    if (students.some(student => student.id === id)) {
        alert("Student ID already exists!");
        return;
    }

    const newStudent = {
        id: id,
        name: name,
        age: age,
        gender: gender,
        form: parseInt(form),
        performance: []
    };

    students.push(newStudent);
    displayStudents();
    document.getElementById("studentForm").reset();
});

function displayStudents() {
    const table = document.getElementById("studentTable");
    table.innerHTML = "";

    students.forEach((student, index) => {
        let average = calculateAverage(student);

        table.innerHTML += `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.form}</td>
                <td>${average}</td>
                <td>
                    <button onclick="addPerformance(${index})">Add Results</button>
                    <button onclick="promoteStudent(${index})">Promote</button>
                    <button onclick="deleteStudent(${index})">Delete</button>
                </td>
            </tr>
        `;
    });
}

function addPerformance(index) {
    const mathematics = parseInt(prompt("Mathematics score:"));
    const english = parseInt(prompt("English score:"));
    const science = parseInt(prompt("Science score:"));
    const socialStudies = parseInt(prompt("Social Studies score:"));

    const record = {
        form: students[index].form,
        subjects: { mathematics, english, science, socialStudies }
    };

    students[index].performance.push(record);
    displayStudents();
    displayResults(); 
}

function calculateAverage(student) {
    if (student.performance.length === 0) return "N/A";

    let latest = student.performance[student.performance.length - 1];
    let subjects = latest.subjects;

    let total = subjects.mathematics + subjects.english + subjects.science + subjects.socialStudies;
    return (total / 4).toFixed(2);
}

function promoteStudent(index) {
    if (students[index].form < 4) {
        students[index].form += 1;
        alert("Student promoted!");
    } else {
        alert("Student already completed O-Level.");
    }
    displayStudents();
}

function deleteStudent(index) {
    students.splice(index, 1);
    displayStudents();
}

function displayResults() {
    const resultsTable = document.getElementById("resultsTable");
    resultsTable.innerHTML = "";

    students.forEach(student => {
        if (student.performance.length > 0) {
            let latest = student.performance[student.performance.length - 1];
            let subjects = latest.subjects;
            let average = calculateAverage(student);

            resultsTable.innerHTML += `
                <tr>
                    <td>${student.id}</td>
                    <td>${student.name}</td>
                    <td>${student.form}</td>
                    <td>${subjects.mathematics}</td>
                    <td>${subjects.english}</td>
                    <td>${subjects.science}</td>
                    <td>${subjects.socialStudies}</td>
                    <td>${average}</td>
                </tr>
            `;
        }
    });
}

document.getElementById("searchForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const query = document.getElementById("searchQuery").value.toLowerCase();
    const resultsBody = document.getElementById("searchResultsBody");
    const resultsTable = document.getElementById("searchResultsTable");

    resultsBody.innerHTML = "";

    const filteredStudents = students.filter(student => 
        student.id.toLowerCase().includes(query) || student.name.toLowerCase().includes(query)
    );

    if (filteredStudents.length > 0) {
        filteredStudents.forEach(student => {
            let average = calculateAverage(student);

            resultsBody.innerHTML += `
                <tr>
                    <td>${student.id}</td>
                    <td>${student.name}</td>
                    <td>${student.form}</td>
                    <td>${average}</td>
                </tr>
            `;
        });
        resultsTable.style.display = "table";
    } else {
        resultsTable.style.display = "none";
        alert("No matching records found.");
    }
});