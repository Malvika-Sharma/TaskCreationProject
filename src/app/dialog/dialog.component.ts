import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
    
      
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  public subtasks=[{des:"UI development",checked:true}]
  public tasks=[
    {
      taskname:'This task cannot be deleted',
      subtasklist:[{des:"Create card",checked:true}
    ,{des:"Implement grid view",checked:true},
    {des:"Create buttons",checked:true}],
      taskdescription:'This is an assignment task, create different cards based on the input values. The image cannot be rendered in the card due to absence of any backend',
      color:this.getColor()
    }
  ]
  public formGroup:any;
  constructor(private formBuilder:FormBuilder){}
  ngOnInit(){
    this.formGroup=this.formBuilder.group({
      taskName:['',Validators.required],
      taskDescription:[''],
      subtask:['']
    }
    )
  }
  getColor(){
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }
  previewImage(e:any){
    var file=e.target.files;
    if (file.length>0){
      var fileReader=new FileReader();
      fileReader.onload=function(e:any){
        document.getElementById("preview")?.setAttribute('src',e?.target?.result)
      }
      fileReader.readAsDataURL(file[0])
    }
  
  }

  saveSubtask(){
    if(this.formGroup?.controls?.subtask?.value.length>0){
    this.subtasks.push({des:this.formGroup?.controls?.subtask?.value,checked:true})
    this.formGroup?.controls?.subtask?.setValue('')
    }
  }
  setCheckValue(e:any,i:any){
    this.subtasks[i].checked=e?.checked;
  }
  saveTask(){
    this.formGroup.markAllAsTouched()
    if(this.formGroup.valid){
      var taskObject={
        taskname:this.formGroup?.controls?.taskName?.value,
        subtasklist:this.subtasks.filter(e=>e.checked),
        taskdescription:this.formGroup?.controls?.taskDescription?.value,
        color:this.getColor()
      }
      this.tasks.push(taskObject)
      this.formGroup.reset();
    }
    
    
  
  }
  deleteCard(index:any){
    this.tasks.splice(index,index);
  }
      
    
      

}
