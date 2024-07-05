import { Component, Input, SimpleChanges } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CoinNamePipe } from '../../pipes/coin-name.pipe';
import { MenuService } from '../../services/menu.service';
import { RouteService } from '../../services/route.service';

@Component({
  selector: 'app-menu-section',
  standalone: true,
  imports: [CommonModule, CoinNamePipe, RouterLink],
  templateUrl: './menu-section.component.html',
  styleUrl: './menu-section.component.css'
})
export class MenuSectionComponent {

  @Input() section!: any;

  @Input() currentPath!: string;

  active: boolean = false;

  renderImage() {
    if (this.active) {
      return this.section.active
    } else {
      return this.section.icon
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.currentPath === this.section.name) {
      this.active = true;
    } else {
      this.active = false;
    }
  }

  constructor(private data: MenuService) { }

  tempMenu: boolean = false;

  toggleMenu() {
    this.data.shareMenu.subscribe(x => this.tempMenu = x);
    this.data.toggleMenu(!this.tempMenu);
  }

}
