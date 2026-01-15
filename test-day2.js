// test-day2.js
const TaskService = require('./src/services/TaskService');

console.log("=== PENGUJIAN DAY 2 ===");

try {
    // 1. Menyalakan Service (Mesin Baru)
    const service = new TaskService();
    
    // 2. Mencoba Membuat Tugas Baru (Fitur Day 2)
    const tugasBaru = service.createTask(1, { 
        title: 'Coba Fitur Day 2', 
        description: 'Test Repository dan Service',
        category: 'kuliah', // Ini fitur baru!
        priority: 'high'
    });
    
    console.log("✅ SUKSES! Tugas berhasil dibuat:");
    console.log(tugasBaru);

} catch (error) {
    console.log("❌ ERROR:", error.message);
}