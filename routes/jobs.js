const express = require('express');
const { getAllJobs, getJob, updateJob, deleteJob, createJob } = require('../controllers/jobs');

const router = express.Router();

router.route('/').get(getAllJobs).post(createJob);
router.route('/:id').patch(updateJob).delete(deleteJob).get(getJob);

module.exports = router;