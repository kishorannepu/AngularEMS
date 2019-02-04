import { Directive,OnInit, ElementRef,Input } from '@angular/core';

@Directive({
  selector: '[appRankSqFt]'
})
export class RankSqFtDirective implements OnInit {
  @Input() Value:string="";
  constructor(private eleRef:ElementRef) { }
  ngOnInit(){ 
    let value=parseInt(this.Value); 
  if(value == 1){
    this.eleRef.nativeElement.style.backgroundColor='green'; 
    
   }else if(value == 2){
    this.eleRef.nativeElement.style.backgroundColor='#ff9f00'; 
   }
   else{
    this.eleRef.nativeElement.style.backgroundColor='red'; 
   }
  }
}
