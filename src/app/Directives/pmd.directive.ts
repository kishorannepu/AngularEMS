import {Directive,OnInit, ElementRef,Input} from '@angular/core';

@Directive({
  selector: '[appPmd]'
})
export class PmdDirective implements OnInit {
  @Input() color:string="";
  constructor(private eleRef:ElementRef) { }
  ngOnInit(){ 
    let value=parseInt(this.color); 
  if(value>0){
    this.eleRef.nativeElement.style.color='green'; 
    
  }
   else{
    this.eleRef.nativeElement.style.color='red'; 
   }

   if(this.color == "ON"){
    this.eleRef.nativeElement.style.backgroundColor='green'; 
   }else if(this.color == "OFF"){
    this.eleRef.nativeElement.style.backgroundColor='red'; 
   }
  }
}
