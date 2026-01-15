const Task = require('../models/Task');

class TaskRepository {
    constructor() {
        // Simpan data di memori sementara (array), nanti bisa diganti database
        this.tasks = [];
        this.nextId = 1;
    }

    create(taskData) {
        const task = new Task(
            this.nextId++,
            taskData.title,
            taskData.description,
            taskData.userId,
            taskData
        );
        this.tasks.push(task);
        return task;
    }

    findById(id) {
        return this.tasks.find(task => task.id === id);
    }

    findByUserId(userId) {
        return this.tasks.filter(task => task.userId === userId);
    }

    findByCategory(category) {
        return this.tasks.filter(task => task.category === category);
    }

    update(id, updates) {
        const task = this.findById(id);
        if (task) {
            Object.assign(task, updates);
            task.updatedAt = new Date();
        }
        return task;
    }

    delete(id) {
        const index = this.tasks.findIndex(task => task.id === id);
        if (index > -1) {
            return this.tasks.splice(index, 1)[0];
        }
        return null;
    }
}

module.exports = TaskRepository;