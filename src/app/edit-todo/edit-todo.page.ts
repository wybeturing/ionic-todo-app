import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Todo} from '../interfaces/todo'
import {TodoService} from '../services/todo.service';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.page.html',
  styleUrls: ['./edit-todo.page.scss'],
})
export class EditTodoPage implements OnInit {

  public todo:Todo;
  private editMode: boolean = false;
  private karl:EditTodoPage;

  constructor(private route:ActivatedRoute, private todoService: TodoService, private navCtrl: NavController) { 

    this.todo = {
      id: 0,
      title: "",
      description: ""

    }

  }

  ngOnInit() {
    // grab id from route
    let id = this.route.snapshot.paramMap.get('id');
    if(id != null){
      this.todoService.load().then(() =>{
        this.editMode = true;
        this.todo = this.todoService.getTodo(id);
      })
    }
  }

  saveTodo(){
    if(this.editMode){
      this.todoService.save();
    }
    else{
      this.todoService.addTodo(this.todo);
    }
    
    this.navCtrl.navigateBack('home');
  }
}
