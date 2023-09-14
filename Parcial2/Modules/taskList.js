// tasks/index.js

const tasks = [];

export function addTask(task) {
  tasks.push(task);
}

export function markTaskAsCompleted(task) {
  const index = tasks.indexOf(task);
  if (index > -1) {
    tasks[index] = {
      ...task,
      completed: true,
    };
  }
}

export function showTasks() {
  const completedTasks = tasks.filter((task) => task.completed);
  const incompleteTasks = tasks.filter((task) => !task.completed);

  console.log("Tareas completadas:");
  for (const task of completedTasks) {
    console.log(task.title);
  }

  console.log("Tareas incompletas:");
  for (const task of incompleteTasks) {
    console.log(task.title);
  }
}
