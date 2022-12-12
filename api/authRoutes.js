const { Router } = require('express');
const authController = require('../controllers/authController');

const router = Router();

router.get('/student/signup', authController.stu_signup_get);
router.post('/student/signup', authController.signup_post);
router.get('/student/login', authController.stu_login_get);
router.post('/student/login', authController.login_post);

router.get('/logout', authController.logout_get);

router.get('/instructor/signup', authController.ins_signup_get);
router.post('/instructor/signup', authController.signup_post);
router.get('/instructor/login', authController.ins_login_get);
router.post('/instructor/login', authController.login_post);

module.exports = router;