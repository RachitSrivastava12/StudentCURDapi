const {Router} = require('express');
const controller = require('./controller');
const router = Router();

router.get('/',
    controller.getSTudents
);
router.get("/get/:id",
    controller.getStudentByid
)
router.post("/addThisStudent",
    controller.addStudent
)
router.delete("/remove/:id", 
    controller.deleteStudent
)

module.exports = router;