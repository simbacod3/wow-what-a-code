import { shallowMount } from "@vue/test-utils";
import Filters from "@components/filters/Filters.vue";
import type { FiltersInterface } from "@components/filters/Filters.vue";
import PriceRange from "@components/filters/PriceRange.vue";
import DatePicker from "@components/filters/DatePicker.vue";
import { FilterType, type FilterValue } from "@/interfaces/filters";

const factory = (
  { filters, activeFilters }: FiltersInterface & { activeFilters: Array<FilterValue> } = {
    filters: [],
    activeFilters: [],
  }
) =>
  shallowMount(Filters, {
    props: { filters, activeFilters },
  });

describe("Filters", () => {
  it("should renders properly", () => {
    const wrapper = factory();
    expect(wrapper.exists()).toBeTruthy();
  });
  it("should render a select filter correctly", () => {
    const wrapper = factory({
      filters: [
        {
          type: FilterType.Select,
          values: ["value1", "value2"],
          label: "Select a value",
          property: "type",
        },
      ],
      activeFilters: [[]],
    });
    const select = wrapper.find("select");
    expect(select.exists()).toBeTruthy();
    const label = wrapper.find("label");
    expect(label.exists()).toBeTruthy();
    expect(label.text()).toEqual("Select a value");
  });

  it("should render a input checkbox filter correctly", () => {
    const wrapper = factory({
      filters: [
        {
          type: FilterType.Checkbox,
          label: "Select a value",
          property: "availability",
        },
      ],
      activeFilters: [false],
    });
    const input = wrapper.find("input");
    expect(input.exists()).toBeTruthy();
    const label = wrapper.find("label");
    expect(label.exists()).toBeTruthy();
    expect(label.text()).toEqual("Select a value");
  });

  it('should render a "PriceRange" component correctly', () => {
    const wrapper = factory({
      filters: [
        {
          type: FilterType.Range,
          label: "",
          min: 0,
          max: 100,
          property: "price",
        },
      ],
      activeFilters: [[0, 100]],
    });
    const priceRange = wrapper.findComponent(PriceRange);
    expect(priceRange.exists()).toBeTruthy();
  });

  it('should render a "DatePicker" component correctly', () => {
    const wrapper = factory({
      filters: [
        {
          type: FilterType.Date,
          label: "",
        },
      ],
      activeFilters: [["", ""]],
    });
    const datePicker = wrapper.findComponent(DatePicker);
    expect(datePicker.exists()).toBeTruthy();
  });
  it("should correctly update activeFilters when updating a filter", () => {
    const wrapper = factory({
      filters: [
        {
          type: FilterType.Range,
          label: "",
          min: 0,
          max: 100,
          property: "price",
        },
      ],
      activeFilters: [[0, 100]],
    });
    const priceRange = wrapper.findComponent(PriceRange);
    expect(priceRange.exists()).toBeTruthy();
    priceRange.vm.$emit("update:minPrice", 10);
    expect(wrapper.vm.activeFilters).toEqual([[10, 100]]);
  });
  it("should correctly update activeFilters when updating a select filter", async () => {
    const wrapper = factory({
      filters: [
        {
          type: FilterType.Select,
          values: ["value1", "value2"],
          label: "Select a value",
          property: "type",
        },
      ],
      activeFilters: [["value1"]],
    });
    const select = wrapper.find("select");
    await select.setValue("value2");
    expect(wrapper.vm.activeFilters).toEqual([["value2"]]);
  });

  it("should correctly update activeFilters when updating a checkbox filter", async () => {
    const wrapper = factory({
      filters: [
        {
          type: FilterType.Checkbox,
          label: "Select a value",
          property: "availability",
        },
      ],
      activeFilters: [false],
    });
    const checkbox = wrapper.find("input");
    await checkbox.setValue(true);
    expect(wrapper.vm.activeFilters).toEqual([true]);
  });

  it("should correctly update activeFilters when updating a date filter", () => {
    const wrapper = factory({
      filters: [
        {
          type: FilterType.Date,
          label: "",
        },
      ],
      activeFilters: [["", ""]],
    });
    const datePicker = wrapper.findComponent(DatePicker);
    datePicker.vm.$emit("update:startDate", "2025-01-01");
    expect(wrapper.vm.activeFilters).toEqual([["2025-01-01", ""]]);
    datePicker.vm.$emit("update:endDate", "2025-01-02");
    expect(wrapper.vm.activeFilters).toEqual([["2025-01-01", "2025-01-02"]]);
  });
});
