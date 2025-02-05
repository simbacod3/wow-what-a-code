import { describe, it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import DatePicker from "@components/filters/DatePicker.vue";

const factory = ({ startDate = "", endDate = "" } = {}) =>
  shallowMount(DatePicker, {
    props: { startDate, endDate },
  });

describe("DatePicker", () => {
  const wrapper = factory();

  it("should render properly", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("should update startDate input value", async () => {
    const startDate = "2021-10-01";
    await wrapper.setProps({ startDate });
    const input = wrapper.findAll("input")[0];
    expect(input.element.value).toBe(startDate);
  });

  it("should update endDate input value", async () => {
    const endDate = "2021-12-01";
    await wrapper.setProps({ endDate });
    const input = wrapper.findAll("input")[1];
    expect(input.element.value).toBe(endDate);
  });

  it("should update v-model when startDate input changes", async () => {
    const startDate = "2021-10-01";
    await wrapper.setProps({ startDate });
    const input = wrapper.findAll("input")[0];
    input.setValue("2021-11-01");
    await input.trigger("input");
    expect(wrapper.emitted()["update:startDate"][0]).toEqual(["2021-11-01"]);
  });

  it("should update v-model when endDate input changes", async () => {
    const endDate = "2021-12-01";
    await wrapper.setProps({ endDate });
    const input = wrapper.findAll("input")[1];
    input.setValue("2021-12-15");
    await input.trigger("input");
    expect(wrapper.emitted()["update:endDate"][0]).toEqual(["2021-12-15"]);
  });
});
