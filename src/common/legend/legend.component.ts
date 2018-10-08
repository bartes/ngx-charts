import {
  Component, Input, ChangeDetectionStrategy, Output, EventEmitter,
  SimpleChanges, OnChanges, ChangeDetectorRef, ViewEncapsulation
 } from '@angular/core';
import { formatLabel } from '../label.helper';
import { isRelatedEntry } from '../domain.helper';

@Component({
  selector: 'ngx-charts-legend',
  template: `
    <div [style.width.px]="width">
      <header class="legend-title" *ngIf="title?.length > 0">
        <span class="legend-title-text">{{title}}</span>
      </header>
      <div class="legend-wrap" [class.horizontal-legend]="horizontal">
        <ul class="legend-labels"
          [style.max-height.px]="horizontal ? 25 : height - 45">
          <li
            *ngFor="let entry of legendEntries; trackBy: trackBy"
            class="legend-label">
            <ngx-charts-legend-entry
              [label]="entry.label"
              [formattedLabel]="entry.formattedLabel"
              [color]="entry.color"
              [isActive]="isActive(entry)"
              [isHidden]="isHidden(entry)"
              (select)="labelClick.emit($event)"
              (toggle)="labelToggle.emit($event)"
              (activate)="activate($event)"
              (deactivate)="deactivate($event)">
            </ngx-charts-legend-entry>
          </li>
        </ul>
      </div>
    </div>
  `,
  styleUrls: ['./legend.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LegendComponent implements OnChanges {

  @Input() data;
  @Input() title;
  @Input() colors;
  @Input() height;
  @Input() width;
  @Input() activeEntries;
  @Input() horizontal = false;
  @Input() hiddenEntries;

  @Output() labelClick: EventEmitter<any> = new EventEmitter();
  @Output() labelToggle: EventEmitter<any> = new EventEmitter();
  @Output() labelActivate: EventEmitter<any> = new EventEmitter();
  @Output() labelDeactivate: EventEmitter<any> = new EventEmitter();

  legendEntries: any[] = [];

  constructor(private cd: ChangeDetectorRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  update(): void {
    this.cd.markForCheck();
    this.legendEntries = this.getLegendEntries();
  }

  getLegendEntries(): any[] {
    const items = [];

    for(const label of this.data) {
      const formattedLabel = formatLabel(label);

      const idx = items.findIndex((i) => {
        return i.label === formattedLabel;
      });

      if (idx === -1) {
        items.push({
          label,
          formattedLabel,
          color: this.colors.getColor(label)
        });
      }
    }

    return items;
  }

  isActive(entry): boolean {
    return isRelatedEntry(this.activeEntries, entry.label);
  }

  isHidden(entry): boolean {
    return isRelatedEntry(this.hiddenEntries, entry.label);
  }

  activate(item) {
    this.labelActivate.emit(item);
  }

  deactivate(item) {
    this.labelDeactivate.emit(item);
  }

  trackBy(index, item): string {
    return item.label;
  }

}
