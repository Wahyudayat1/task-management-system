const TaskService = require("../../../src/services/TaskService");

describe("TaskService", () => {
  let taskService;

  // Reset service sebelum setiap test dijalankan
  beforeEach(() => {
    taskService = new TaskService();
  });

  describe("createTask", () => {
    test("should create task with valid data", () => {
      // Arrange
      const userId = 1;
      const taskData = {
        title: "New Task",
        description: "Task description",
      };

      // Act
      const task = taskService.createTask(userId, taskData);

      // Assert
      expect(task).toBeDefined();
      expect(task.title).toBe("New Task");
      expect(task.userId).toBe(userId);
    });

    test("should throw error for empty title", () => {
      // Arrange
      const userId = 1;
      const taskData = {
        title: "",
        description: "Task description",
      };

      // Act & Assert
      expect(() => {
        taskService.createTask(userId, taskData);
      }).toThrow("Task title is required");
    });
  });

  describe("getUserTasks", () => {
    test("should filter tasks by category", () => {
      // Arrange
      const userId = 1;
      taskService.createTask(userId, { title: "Work Task", category: "work" });
      taskService.createTask(userId, {
        title: "Personal Task",
        category: "personal",
      });
      taskService.createTask(userId, {
        title: "Another Work Task",
        category: "work",
      });

      // Act
      const workTasks = taskService.getUserTasks(userId, { category: "work" });

      // Assert
      expect(workTasks).toHaveLength(2);
      expect(workTasks.every((task) => task.category === "work")).toBe(true);
    });
  });
});
