const { Task } = require('../models');

exports.createTask = async (req, res) => {
  try {
   
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Unauthorized: User ID not found on request. Please log in.' });
    }

    const { title, description, status } = req.body;

    const task = await Task.create({
      title,
      description,
      status: status,
      owner: req.user.id
    })

    res.status(201).json(task);
  } catch (err) {
    
    console.error('Task creation failed:', err);

    let message = "Server Error";
    let statusCode = 500;

  
    if (err.name === 'ValidationError') {
      
      const messages = Object.values(err.errors).map(val => val.message);
      message = messages.join(', ');
      statusCode = 400; 
    } else if (err.code === 11000) {
     
      message = "Duplicate key error: A field value already exists.";
      statusCode = 400;
    }

    res.status(statusCode).json({ message: message });
  }
};


exports.getTasks = async (req, res) => {
  try {
    const query = req.user.role === 'admin' ? {} : { owner: req.user.id };

    const tasks = await Task.find(query).sort({ createdAt: -1 });

    res.json(tasks);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error from getTasks' });
  }
};


exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    if (req.user.role !== 'admin' && task.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You can update only your task' });
    }

    const { title, description, status } = req.body;
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) task.status = status;

    const updated = await task.save();
    res.json(updated);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;                 
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    const isOwner = task.owner.toString() === req.user.id;
    const isAdmin = req.user.role === 'admin';
    if (!isOwner && !isAdmin) return res.status(403).json({ message: 'You can delete only your task' });

    await task.deleteOne();                   
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};