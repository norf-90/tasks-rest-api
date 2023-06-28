const countStatistics = tasks => {
  const result = tasks.reduce(
    (reducer, task, index, array) => {
      switch (task.category) {
        case 'todo':
          reducer.increaseToDo(array);
          break;
        case 'in-progres':
          reducer.increaseInProgres(array);
          break;
        case 'done':
          reducer.increaseDone(array);
          break;
        default:
          console.log("Something goes wrong. Category haven't any expected values");
      }
      return reducer;
    },
    {
      todoQuantity: 0,
      todoPercents: 0,
      inProgresQuantity: 0,
      inProgresPercents: 0,
      doneQuantity: 0,
      donePercents: 0,
      increaseToDo(array) {
        this.todoQuantity += 1;
        this.todoPercents = (this.todoQuantity / array.length) * 100;
      },
      increaseInProgres(array) {
        this.inProgresQuantity += 1;
        this.inProgresPercents = (this.inProgresQuantity / array.length) * 100;
      },
      increaseDone(array) {
        this.doneQuantity += 1;
        this.donePercents = (this.doneQuantity / array.length) * 100;
      },
    }
  );
  return result;
};

module.exports = countStatistics;