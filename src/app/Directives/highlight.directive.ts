import { Directive,OnInit, ElementRef,Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnInit {
  @Input() Value:string="";
  constructor(private eleRef:ElementRef) { }

  ngOnInit(){  
   let value=parseInt(this.Value);
 

   if(value>0){
    this.eleRef.nativeElement.style.color='green'; 
   }
   else{
    this.eleRef.nativeElement.style.color='red'; 
   }
     
  
    
    
} 

}
