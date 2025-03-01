import {Directive, ElementRef, Input, OnChanges, SimpleChanges} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appDraftHighlight]'
})
export class DraftHighlightDirective implements OnChanges {
  @Input() appDraftHighlight: string | null = null;

  constructor(private readonly el: ElementRef) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['appDraftHighlight']) {
      this.el.nativeElement.style.backgroundColor = this.appDraftHighlight === 'Captured' ? '#FFAA1D' : '';
    }
  }
}
