import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
declare const $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  buttonPanelSettings : boolean = false;
  textBoxPanelSettings : boolean = false;
  name : any;
  height : any;
  width : any;
  count : number =0;

  constructor() { 
    // $('textarea#froala-editor').froalaEditor();
 }

 ngOnInit() {
 }


 allowDrop(ev) {
   ev.preventDefault();
 }

 drag(ev, type) {
   localStorage.setItem("drawShape",type);
   ev.dataTransfer.setData("text", ev.target.id);
 }

drop(ev) {
   ev.preventDefault();
   var type = localStorage.getItem("drawShape");
   var data;
   
   switch (type) {

     case "input":
     this.buttonPanelSettings = false;
     this.textBoxPanelSettings = true;

       data = document.createElement('input');
       data.style.height = "10%";
       data.style.width = "100%";
       var count = document.getElementsByClassName("dynamic-text").length;
       data.className ="dynamic-text";
       data.id = "dynamic-text-"+count;
       data.style.position = "relative";
       data.onclick = this.clickCurrentInput.bind(this,count);
       data.setAttribute("placeholder","TextBox");

       // var node =`<input type="text" [(ngModel)]="username" placeholder="username">`;
       // var wrapper= document.createElement('div');
       // wrapper.innerHTML = node;
       // data = wrapper;
       
       console.log("Node::",data);
       break;
     
     case "image":
       data = document.createElement('img');
       data.style.height = "50%";
       data.style.width = "20%";
       this.performClick(data,'file');
       // data.setAttribute("src","https://i.stack.imgur.com/yYoyW.png?s=64&g=1");
       data.style.position = "relative";
     break;

     case "textArea" :	
     this.buttonPanelSettings = false;
     this.textBoxPanelSettings = true;

     data = document.createElement('textarea');
       data.style.position = "relative";
       data.id="froala-editor";
       data.rows = "2";
       data.cols = "50";
       data.setAttribute("placeholder","TextArea");
       var count = document.getElementsByClassName("dynamic-text").length;
       data.className ="dynamic-text";
       data.id = "dynamic-text-"+count;
       data.onclick = this.clickCurrentInput.bind(this,count);
       break;

     case "button":
     this.buttonPanelSettings = true;
     this.textBoxPanelSettings = false;

       data = document.createElement('input');
       data.style.height = "auto";
       data.style.width = "10%";
       data.style.position = "relative";
       var count = document.getElementsByClassName("dynamic-button").length;
       data.className ="dynamic-button";
       data.id = "dynamic-button-"+count;
       data.onclick = this.clickCurrentButton.bind(this,count);
       data.setAttribute("type" ,"button");
       data.setAttribute("name" ,"button");
       data.setAttribute("value","Button"+count);
     break;

     default:
       // code...
       break;
   }
   
   ev.target.appendChild(data);
    // var mainDiv = document.getElementById('newArea');
    // mainDiv.appendChild(data);
 }
 
performClick(data,elemId) {
  var elem = document.getElementById(elemId);
  if(elem && document.createEvent) {
     var evt = document.createEvent("MouseEvents");
     evt.initEvent("click", true, false);
     elem.dispatchEvent(evt);
     var image = this.previewFile(data,elem,evt);
     console.log("i perform on click");
     debugger;
  }
}

previewFile(data,element,event){
      console.log(data,element,event);

      // var file    = element.files[0]; //sames as here
      // var reader  = new FileReader();

      // reader.onloadend = function () {
      //   console.log("going to set current src for image");
      //     data.setAttribute("src",reader.result);
      //     return reader.result;
      // }

      // if (file) {
      //   console.log("got file");
      //     reader.readAsDataURL(file); //reads the data as a URL
      // } 
      // else {
      //     console.log("got file else");
      // }

      var file;
      let imageURL = new Promise((resolve, reject)=>{
        setTimeout(()=>{
          resolve(element.files);
        },2000);
      });
      
      
      var reader  = new FileReader();
      var URL = imageURL.then((success)=>{
        reader.readAsDataURL(success[0]);
      });

      reader.onloadend = function () {
        console.log("going to set current src for image");
          data.setAttribute("src",reader.result);
      }

 }

 // to download the files
 download(){
   var downloadHTML = document.getElementById("newArea");
   
   var download = `<!DOCTYPE html>
     <html>
     <title>HTML Tutorial</title>
     <body>`+downloadHTML.innerHTML+`
     </body>
     </html>`;
   console.log(download);
   this.downloadNew(download, "login.html", "text/plain");
 }


 downloadNew(data, filename, type) {
   var file = new Blob([data], {type: type});
   if (window.navigator.msSaveOrOpenBlob) // IE10+
       window.navigator.msSaveOrOpenBlob(file, filename);
   else { // Others
       var a = document.createElement("a"),
               url = URL.createObjectURL(file);
       a.href = url;
       a.download = filename;
       document.body.appendChild(a);
       a.click();
       setTimeout(function() {
           document.body.removeChild(a);
           window.URL.revokeObjectURL(url);  
       }, 0); 
   }
}

parseHTML(html) {
  var el = document.createElement("div");
  el.innerHTML = html;

  return el.childNodes;
}

  clickCurrentInput(count){
    this.buttonPanelSettings = false;
    this.textBoxPanelSettings = true;

    this.count = count;
    var element = document.getElementById("dynamic-text-"+count);
    if(element){
      this.height = element.style.height.split('%')[0];
      this.width = element.style.width.split('%')[0];
    }
    // $('#dynamic-text-'+count).draggable();
  }

  clickCurrentButton(count){
    this.buttonPanelSettings = true;
    this.textBoxPanelSettings = false;
    this.count = count;
    var element = document.getElementById("dynamic-button-"+count);
    if(element){
      this.height = element.style.height.split('%')[0];
      this.width = element.style.width.split('%')[0];
      // this.name = element.value;
    }

    // $('#dynamic-button-'+count).draggable();
  }

  saveButtonProperty(){
    var element = document.getElementById("dynamic-button-"+this.count);
    element.style.height = this.height+"%";
    element.style.width = this.width+"%";
    element.setAttribute("value",this.name);
  }

  saveTextboxProperty(){
    var element = document.getElementById("dynamic-text-"+this.count);
    element.style.height = this.height+"%";
    element.style.width = this.width+"%";
  }

}
