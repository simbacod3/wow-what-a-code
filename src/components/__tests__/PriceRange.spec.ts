import { describe, it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import PriceRange from "@components/filters/PriceRange.vue";

const factory = ({ minPrice = 0, maxPrice = 500, minRange = 0, maxRange = 500 } = {}) =>
  shallowMount(PriceRange, {
    props: { minPrice, maxPrice, minRange, maxRange },
  });

describe("PriceRange", () => {
  let wrapper = factory();
  beforeEach(() => {
    wrapper = factory();
  });

  it("should render properly", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  it("should emit update:minPrice when updating input", async () => {
    const input = wrapper.findAll("input")[0];
    input.setValue(200);
    await input.trigger("input");
    expect(wrapper.emitted()["update:minPrice"][0]).toEqual([200]);
  });
  it("should emit update:maxPrice when updating input", async () => {
    const input = wrapper.findAll("input")[1];
    input.setValue(400);
    await input.trigger("input");
    expect(wrapper.emitted()["update:maxPrice"][0]).toEqual([400]);
  });
  it("should update input value when minPrice prop changes", async () => {
    await wrapper.setProps({ minPrice: 100 });
    const input = wrapper.findAll("input")[0];
    expect(input.element.value).toBe("100");
  });
  it("should update input value when maxPrice prop changes", async () => {
    await wrapper.setProps({ maxPrice: 300 });
    const input = wrapper.findAll("input")[1];
    expect(input.element.value).toBe("300");
  });
  it("should force maxPrice to be above minPrice", async () => {
    wrapper = factory({ minPrice: 300 });
    await wrapper.setProps({ maxPrice: 200 });
    expect(wrapper.emitted()["update:maxPrice"][0]).toEqual([300]);
  });
  it("should force minPrice to be bellow maxPrice", async () => {
    wrapper = factory({ maxPrice: 200 });
    await wrapper.setProps({ minPrice: 400 });
    expect(wrapper.emitted()["update:minPrice"][0]).toEqual([200]);
  });
});
