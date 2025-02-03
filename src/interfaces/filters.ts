import type { Experience } from "./experience";

export enum FilterType {
  Range = "range",
  Checkbox = "checkbox",
  Select = "select",
  Date = "date",
}

export type RangePriceValue = [number, number];
export type RangeDateValue = [string, string];
export type FilterValue = string[] | boolean | RangePriceValue | RangeDateValue;

export interface PriceRangeFilter {
  label: "";
  type: FilterType.Range;
  min: number;
  max: number;
  property: keyof { [K in keyof Experience as Experience[K] extends number ? K : never]: number };
}

export interface SelectFilter {
  type: FilterType.Select;
  label: string;
  values: Array<string>;
  property: keyof { [K in keyof Experience as Experience[K] extends string ? K : never]: string };
}

export interface CheckboxFilter {
  type: FilterType.Checkbox;
  label: string;
  property: keyof { [K in keyof Experience as Experience[K] extends boolean ? K : never]: boolean };
}

export interface DateFilter {
  type: FilterType.Date;
  label: "";
}

export type Filter = PriceRangeFilter | SelectFilter | CheckboxFilter | DateFilter;
