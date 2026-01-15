const Task = require("../../../src/models/Task");

describe("Task Model", () => {
  describe("Task Creation", () => {
    test("should create task with required fields", () => {
      // Arrange
      const taskData = {
        id: 1,
        title: "Learn Testing",
        description: "Write comprehensive tests",
        userId: 1,
      };

      // Act
      const task = new Task(
        taskData.id,
        taskData.title,
        taskData.description,
        taskData.userId
      );

      // Assert
      expect(task.title).toBe("Learn Testing");
      expect(task.description).toBe("Write comprehensive tests");
      expect(task.userId).toBe(1);
      expect(task.completed).toBe(false);
      expect(task.priority).toBe("medium"); // default value
    });

    test("should set custom priority when provided", () => {
      // Arrange & Act
      const task = new Task(1, "High Priority Task", "Important work", 1, {
        priority: "high",
      });
      // Assert
      expect(task.priority).toBe("high");
    });
  });

  describe("Task Operations", () => {
    test("should mark task as complete", () => {
      // Arrange
      const task = new Task(1, "Test Task", "Description", 1);
      // Act
      task.markComplete();
      // Assert
      expect(task.completed).toBe(true);
      expect(task.completedAt).toBeDefined();
    });

    test("should identify overdue tasks", () => {
      // Arrange (Set tanggal kemarin)
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      const task = new Task(1, "Overdue Task", "Should be overdue", 1, {
        dueDate: yesterday,
      });

      // Act & Assert
      expect(task.isOverdue()).toBe(true);
    });
  });
});
