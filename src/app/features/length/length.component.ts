import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnitService } from '../../core/services/unit.service';
import { HistoryService } from '../../core/services/history.service';
import { Unit } from '../../core/models';
import { 
  ValueInputComponent, 
  UnitSelectorComponent, 
  SwapButtonComponent,
  ResultDisplayComponent 
} from '../../shared/components';

@Component({
  selector: 'app-length',
  standalone: true,
  imports: [
    CommonModule, 
    ValueInputComponent, 
    UnitSelectorComponent, 
    SwapButtonComponent,
    ResultDisplayComponent
  ],
  templateUrl: './length.component.html'
})
export class LengthComponent implements OnInit {
  units: Unit[] = [];
  
  fromUnit: string = 'meter';
  toUnit: string = 'foot';
  inputValue: number = 1;
  outputValue: number = 0;

  constructor(
    private unitService: UnitService,
    private historyService: HistoryService
  ) {}

  ngOnInit(): void {
    this.loadUnits();
  }

  private async loadUnits(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 100));
    this.units = this.unitService.getUnitsByCategory('length');
    this.convert();
  }

  get fromUnitData(): Unit | undefined {
    return this.unitService.getUnitById('length', this.fromUnit);
  }

  get toUnitData(): Unit | undefined {
    return this.unitService.getUnitById('length', this.toUnit);
  }

  get unitOptions() {
    return this.units.map(u => ({
      code: u.id,
      name: u.name,
      symbol: u.symbol
    }));
  }

  onFromUnitChange(id: string): void {
    this.fromUnit = id;
    this.convert();
  }

  onToUnitChange(id: string): void {
    this.toUnit = id;
    this.convert();
  }

  onValueChange(value: number): void {
    this.inputValue = value;
    this.convert();
  }

  swap(): void {
    const temp = this.fromUnit;
    this.fromUnit = this.toUnit;
    this.toUnit = temp;
    this.convert();
  }

  convert(): void {
    if (!this.fromUnitData || !this.toUnitData) return;
    
    this.outputValue = this.unitService.convert(
      this.inputValue, 
      this.fromUnitData, 
      this.toUnitData
    );

    this.historyService.add({
      type: 'unit',
      fromCode: this.fromUnit,
      toCode: this.toUnit,
      fromValue: this.inputValue,
      toValue: this.outputValue
    });
  }
}