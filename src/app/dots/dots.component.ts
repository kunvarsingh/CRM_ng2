import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dots',
  templateUrl: './dots.component.html',
  styleUrls: ['./dots.component.css']
})
export class DotsComponent implements OnInit {

  constructor() { }

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
    		data = document.createElement('input');
		    data.style.height = "auto";
		    data.style.width = "100%";
		    data.style.position = "relative";
		    data.setAttribute("placeholder","TextBox");

    		break;
      
      case "image":
        data = document.createElement('img');
        data.style.height = "auto";
        data.style.width = "20%";
        this.performClick(data,'file');
        // data.setAttribute("src","https://i.stack.imgur.com/yYoyW.png?s=64&g=1");
        data.style.position = "relative";
      break;

    	case "textArea" :	
			data = document.createElement('textarea');
		    data.style.height = "auto";
		    data.style.width = "100%";
		    data.style.position = "relative";
		    data.rows = "2";
		    data.cols = "5";
		    data.setAttribute("placeholder","TextArea");
		    break;

	    case "button":
  		  data = document.createElement('input');
  	    data.style.height = "auto";
  	    data.style.width = "20%";
  	    data.style.position = "relative";
  	    data.setAttribute("type" ,"button");
  	    data.setAttribute("name" ,"button");
  	    data.setAttribute("value","Click");
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


}

