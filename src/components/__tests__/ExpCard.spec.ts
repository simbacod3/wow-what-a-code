import { describe, it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import ExpCard from "@components/ui/ExpCard.vue";
import type { ExpCardInterface } from "@components/ui/ExpCard.vue";

import AvailabilityBadge from "@components/ui/AvailabilityBadge.vue";
import type { Experience } from "@/interfaces/experience";

const defaultExp: Experience = {
  id: 1,
  name: "Single Room",
  img: "https://placehold.co/600x400",
  type: "single",
  price: 50,
  availability: true,
};
const factory = ({ experience }: ExpCardInterface) =>
  shallowMount(ExpCard, {
    props: { experience },
    global: {
      stubs: {
        "router-link": {
          template: "<a><slot /></a>",
        },
      },
    },
  });

describe("ExpCard", () => {
  const wrapper = factory({ experience: defaultExp });
  it("should renders properly", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  it("should contain a link", () => {
    const link = wrapper.find("a");
    expect(link.exists()).toBeTruthy();
    expect(link.text()).toEqual("Single Room");
  });
  it("should display all information", () => {
    const importantInfo: Array<keyof Experience> = ["name", "price", "type"];
    importantInfo.forEach((info) => {
      expect(wrapper.text()).toContain(defaultExp[info]);
    });
  });
  it("should contain a AvailabilityBadge", () => {
    const availabilityBadge = wrapper.findComponent(AvailabilityBadge);
    expect(availabilityBadge.exists()).toBeTruthy();
  });
});
