const { error } = require('console');
const pool = require('../../db');
const queries = require('./queries');

const getStudentByid = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getStudentById, [id], (error, results) => {
        if (error) {
            return res.status(500).send(error); // Send error if query fails
        }
        res.status(200).json(results.rows);
    });
};

const getSTudents = (req, res) => {
   // console.log('getting students');
    pool.query(queries.getStudents, (error, results) => {
        if (error) {
            return res.status(500).send(error); // Send error if query fails
        }
        res.status(200).json(results.rows);
    });
};

const addStudent = (req, res) => {
    const { name, email, age, dob } = req.body;

    // Check if the email already exists
    pool.query("SELECT * FROM students WHERE email = $1", [email], (error, results) => {
        if (error) {
            return res.status(500).send(error); // Send error if query fails
        }

        if (results.rows.length > 0) {
            return res.status(409).json({ message: 'Email already exists' }); // Conflict if email exists
        }

        // Proceed to add the new student if the email is unique
        pool.query(queries.addStudent, [name, email, age, dob], (error, results) => {
            if (error) {
                return res.status(500).send("Error adding student"); // Send error if insert fails
            }

            res.status(201).json({ message: 'Student added successfully' });
        });
    });
};
const deleteStudent = (req, res) => {
    const id = parseInt(req.params.id);

    // Execute the delete query
    pool.query(queries.removeStudent, [id], (error, results) => {
        if (error) {
            return res.status(500).send("Error deleting student"); // Send error if query fails
        }

        // Check if any row was deleted//rowcount give you thw no od row that were deleted
        if (results.rowCount > 0) {
            res.status(200).send("Student Deleted"); // Success response
        } else {
            res.status(404).send("Student does not exist"); // Not found response
        }
    });
};

// const updateStudent = (req,res) =>{
//     const id  = parseInt(req.params.id)
//     const name = req.body;

//     pool.query(queries.getStudentById, [id] ,(error,results) =>{
//         const noStudentFound = !results.rows.length;
//         if(noStudentFound){
//             res.send("Student does not exist in the database");
//         }

//         pool.query(queries.updateStudent, [name] ,(error,results) => {
//             if (error) throw error;
//             res.status(200).message("updated successfully");
//         }
        
//         )
//     })
// }

const updateStudent = (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email, age, dob } = req.body; // Destructure the body for multiple fields

    // Check if the student exists
    pool.query(queries.getStudentById, [id], (error, results) => {
        const noStudentFound = !results.rows.length;
        if (noStudentFound) {
            return res.status(404).send("Student does not exist in the database");
        }

        // Execute the update query
        pool.query(queries.updateStudent, [name, email, age, dob, id], (error, results) => {
            if (error) {
                return res.status(500).send("Error updating student"); // Handle query error
            }
            res.status(200).send("Updated successfully"); // Send success response
        });
    });
};



module.exports = {
    getSTudents,
    getStudentByid,
    addStudent,
    deleteStudent,
    updateStudent,
};
