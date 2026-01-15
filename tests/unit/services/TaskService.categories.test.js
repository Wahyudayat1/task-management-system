const TaskService = require("../../../src/services/TaskService");

describe("TaskService Categories", () => {
  let taskService;

  beforeEach(() => {
    taskService = new TaskService();
  });

  describe("getAvailableCategories", () => {
    test("should return unique categories for user", () => {
      // Arrange
      const userId = 1;
      taskService.createTask(userId, {
        title: "Work Task 1",
        category: "work",
      });
      taskService.createTask(userId, {
        title: "Work Task 2",
        category: "work",
      });
      taskService.createTask(userId, {
        title: "Personal Task",
        category: "personal",
      });

      // Act
      const categories = taskService.getAvailableCategories(userId);

      // Assert
      expect(categories).toEqual(["personal", "work"]);
    });
  });

  describe("getTasksByCategory", () => {
    test("should group tasks by category", () => {
      // Arrange
      const userId = 1;
      taskService.createTask(userId, { title: "Work Task", category: "work" });
      taskService.createTask(userId, {
        title: "Personal Task",
        category: "personal",
      });

      // Act
      const categorizedTasks = taskService.getTasksByCategory(userId);

      // Assert
      expect(categorizedTasks.work).toHaveLength(1);
      expect(categorizedTasks.personal).toHaveLength(1);
      expect(categorizedTasks.work[0].title).toBe("Work Task");
    });
  });
});
