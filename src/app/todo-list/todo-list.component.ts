import { Component } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  todos:string[]=['Go to Gym','Visit The Elderly','Do Ten Pushups','Go on Vacation',]
  add(todoData:string) {
    this.todos.push(todoData)
  }
  removeTodo(removedData:string) {
    let answer= confirm(`Are you sure you want to delete this todoItem \n:${removedData}`)
    console.log(answer)
    if (answer) {
      this.todos= this.todos.filter(todo=>todo!=removedData)
      
    }
    
  }

}
