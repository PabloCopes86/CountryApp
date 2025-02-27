import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  standalone: false,

  templateUrl: './search-box.component.html',
  styles: ``,
})
export class SearchBoxComponent implements OnInit {
  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSubscription?: Subscription;

  @Input()
  public placeHolder: string = '';
  @Input()
  public initialValue: string = '';

  @Output()
  public onValue = new EventEmitter<string>();
  @Output()
  public onDebounce = new EventEmitter<string>();

  ngOnInit(): void {
    this.debouncerSubscription = this.debouncer
      .pipe(debounceTime(500))
      .subscribe((value) => {
        this.onDebounce.emit(value);
      });
  }

  NgOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe();
  }

  emitValue(value: string): void {
    this.onValue.emit(value);
  }

  onKeyPress(searchTerm: string): void {
    this.debouncer.next(searchTerm);
  }
}
