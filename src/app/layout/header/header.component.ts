import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, OnChanges, SimpleChanges, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from '../menu/menu.component';
import { MenuService } from '../../services/menu.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, MenuComponent, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnChanges {

  @Input() name: string = 'abc';

  @Output() filter: EventEmitter<string> = new EventEmitter<string>();

  input: string = '';

  menu: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
  }

  change(event: any) {
    this.filter.emit(this.input)
  }

  constructor(private data: MenuService) { }

  tempMenu: boolean = false;

  toggleMenu() {
    this.data.shareMenu.subscribe(x => this.tempMenu = x);
    this.data.toggleMenu(!this.tempMenu);
  }
}
