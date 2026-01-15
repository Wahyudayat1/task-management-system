const TaskRepository = require("../repositories/TaskRepository");

class TaskService {
  constructor() {
    this.taskRepository = new TaskRepository();
  }

  createTask(userId, taskData) {
    // Logika Bisnis: Validasi judul tidak boleh kosong
    if (!taskData.title || taskData.title.trim().length === 0) {
      throw new Error("Task title is required");
    }

    return this.taskRepository.create({
      userId: userId,
      ...taskData,
    });
  }

  getUserTasks(userId, filters = {}) {
    let tasks = this.taskRepository.findByUserId(userId);

    // Filter berdasarkan kategori
    if (filters.category) {
      tasks = tasks.filter((task) => task.category === filters.category);
    }

    // Filter berdasarkan status selesai
    if (filters.completed !== undefined) {
      tasks = tasks.filter((task) => task.completed === filters.completed);
    }

    // Filter tugas yang terlambat (Overdue)
    if (filters.overdue) {
      tasks = tasks.filter((task) => task.isOverdue());
    }

    return tasks;
  }

  updateTask(taskId, userId, updates) {
    const task = this.taskRepository.findById(taskId);

    if (!task) {
      throw new Error("Task not found");
    }

    // Validasi: Hanya pemilik tugas yang boleh mengedit
    if (task.userId !== userId) {
      throw new Error("Not authorized to update this task");
    }

    return this.taskRepository.update(taskId, updates);
  }

  // --- FITUR BARU DAY 4 (MULAI DARI SINI) ---

  getAvailableCategories(userId) {
    const tasks = this.taskRepository.findByUserId(userId);
    // Mengambil kategori unik dari semua tugas user tersebut
    const categories = [...new Set(tasks.map((task) => task.category))];
    return categories.sort();
  }

  getTasksByCategory(userId) {
    const tasks = this.taskRepository.findByUserId(userId);
    const categorizedTasks = {};

    // Mengelompokkan tugas berdasarkan kategorinya
    tasks.forEach((task) => {
      if (!categorizedTasks[task.category]) {
        categorizedTasks[task.category] = [];
      }
      categorizedTasks[task.category].push(task);
    });

    return categorizedTasks;
  }

  updateTaskCategory(taskId, userId, newCategory) {
    const task = this.taskRepository.findById(taskId);

    if (!task) {
      throw new Error("Task not found");
    }

    // Validasi kepemilikan
    if (task.userId !== userId) {
      throw new Error("Not authorized to update this task");
    }

    return this.taskRepository.update(taskId, { category: newCategory });
  }
}

module.exports = TaskService;
