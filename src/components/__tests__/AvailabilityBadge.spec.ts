import { describe, it, expect } from "vitest";

import { shallowMount } from "@vue/test-utils";
import AvailabilityBadge from "@components/ui/AvailabilityBadge.vue";
import type { AvailabilityBadgeInterface } from "@components/ui/AvailabilityBadge.vue";

const factory = ({ availability }: AvailabilityBadgeInterface) =>
  shallowMount(AvailabilityBadge, { props: { availability } });

describe("ExpCard", () => {
  it("should renders properly", () => {
    const wrapper = factory({ availability: true });
    expect(wrapper.exists()).toBeTruthy();
  });
  it("should display correctly if available", () => {
    const wrapper = factory({ availability: true });
    expect(wrapper.text()).toEqual("Available");
    expect(wrapper.classes()).toContain("wac-availability-badge--available");
  });
  it("should display correctly if unavailable", () => {
    const wrapper = factory({ availability: false });
    expect(wrapper.text()).toEqual("Unavailable");
    expect(wrapper.classes()).toContain("wac-availability-badge--unavailable");
  });
});
