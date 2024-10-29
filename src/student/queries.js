const getStudents = "SELECT * FROM students";
const getStudentById = "SELECT * FROM students WHERE id = $1";
const addStudent = "INSERT INTO students (name, email, age, dob) VALUES ($1, $2, $3, $4)";
const removeStudent ="Delete from students where id = $1";
const updateStudent = `
    UPDATE students 
    SET name = $1, email = $2, age = $3, dob = $4 
    WHERE id = $5;
`;
module.exports = {
    getStudents,
    getStudentById,
    addStudent,
    removeStudent,
    updateStudent
};
