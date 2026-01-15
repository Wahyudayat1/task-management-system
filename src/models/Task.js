class Task {
    constructor(id, title, description, userId, options = {}) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.userId = userId; // Menyimpan ID pemilik tugas
        this.priority = options.priority || 'medium';
        this.category = options.category || 'general'; // Fitur baru: Kategori
        this.dueDate = options.dueDate || null;       // Fitur baru: Tenggat waktu
        this.completed = false;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    markComplete() {
        this.completed = true;
        this.completedAt = new Date();
        this.updatedAt = new Date();
    }

    updateCategory(newCategory) {
        this.category = newCategory;
        this.updatedAt = new Date();
    }

    isOverdue() {
        // Cek apakah tugas sudah lewat tenggat waktu
        if (!this.dueDate || this.completed) return false;
        return new Date() > new Date(this.dueDate);
    }
}

module.exports = Task;