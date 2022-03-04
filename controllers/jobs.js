const Job = require('../models/Job');
const { BadRequestError, NotFoundError } = require('../errors/index');
const { StatusCodes } = require('http-status-codes');

const getAllJobs = async (req, res) => {
    const {userId}=req.user;
    const jobs=await Job.find({createdBy: userId}).sort('createdAt');
    res.status(StatusCodes.OK).json({jobs, count: jobs.length});
}

const getJob = async (req, res) => {
    const {id}=req.params;
    if(!id){
        throw new BadRequest('Id is required');
    }
    const job=await Job.findById({_id: id});
    if(!job){
        throw new NotFoundError('No Job found with this particular id');
    }
    res.status(StatusCodes.OK).send({job});
}

const createJob = async (req, res) => {
    const { company, position, status } = req.body;
    const { userId } = req.user;
    if (!company || !position) {
        throw new BadRequestError('Please provide required parameters..');
    }
    const job = await Job.create({ company, position, status, createdBy: userId });
    console.log('I am getting hitted');
    res.status(StatusCodes.CREATED).json({ job });
}

const deleteJob = async (req, res) => {
    const {
        user:{userId},
        params:{id:jobId}
    }=req;
    const job=await Job.findOneAndDelete({_id: jobId, createdBy: userId});
    if(!job){
        throw new NotFoundError('No Job found with this particular id');
    }
    res.status(StatusCodes.OK).send();
}

const updateJob = async (req, res) => {
    // a modern way to destructure any object
    const {
        body:{ company, position, status},
        user:{userId},
        params:{id:jobId}
    }=req;
    if(!company||company===''||!position||position===''||!status){
        throw new BadRequestError('Please provide the required parameters');
    }
    // their are 2 new options passed in the end please pay attention to it also
    const job=await Job.findOneAndUpdate({_id:jobId, createdBy: userId},req.body,{new:true,runValidators: true});
    if(!job){
        throw new NotFoundError('No Job found with this particular id');
    }
    res.status(StatusCodes.OK).send({job});
}

module.exports = {
    getAllJobs, getJob, createJob, deleteJob, updateJob
}