const Task = require('../models/Task');

// @desc    Get all tasks
// @route   GET /tasks
// @access  Public
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json({ success: true, count: tasks.length, data: tasks });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Get single task
// @route   GET /tasks/:id
// @access  Public
exports.getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ success: false, error: 'Task not found' });
        }

        res.status(200).json({ success: true, data: task });
    } catch (err) {
        // Check for CastError (invalid ObjectId)
        if (err.name === 'CastError') {
             return res.status(400).json({ success: false, error: 'Invalid Task ID' });
        }
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Create new task
// @route   POST /tasks
// @access  Public
exports.createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json({ success: true, data: task });
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({ success: false, error: messages });
        }
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Update task
// @route   PUT /tasks/:id
// @access  Public
exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!task) {
            return res.status(404).json({ success: false, error: 'Task not found' });
        }

        res.status(200).json({ success: true, data: task });
    } catch (err) {
         if (err.name === 'CastError') {
             return res.status(400).json({ success: false, error: 'Invalid Task ID' });
        }
        if (err.name === 'ValidationError') {
             const messages = Object.values(err.errors).map(val => val.message);
             return res.status(400).json({ success: false, error: messages });
        }
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Delete task
// @route   DELETE /tasks/:id
// @access  Public
exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {
            const result = await Task.findById(req.params.id); // Double check if needed, but findByIdAndDelete returns null if not found
             if(!result) return res.status(404).json({ success: false, error: 'Task not found' });
        }

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
         if (err.name === 'CastError') {
             return res.status(400).json({ success: false, error: 'Invalid Task ID' });
        }
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};
