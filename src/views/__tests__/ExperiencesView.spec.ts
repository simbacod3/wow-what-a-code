import { describe, it, expect, type Mock } from "vitest";

import { shallowMount } from "@vue/test-utils";
import ExperiencesView from "@pages/ExperiencesView.vue";
import { useDataInjection } from "@composables/useDataInjection";

vi.mock("@composables/useDataInjection");

const factory = () => shallowMount(ExperiencesView);

describe("ExperiencesView", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    (useDataInjection as Mock).mockReturnValue({});
  });

  it("should renders properly", () => {
    const wrapper = factory();
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.text()).toContain("No results");
  });
  it("should renders a list", () => {
    (useDataInjection as Mock).mockReturnValue({ experiences: [{ id: 1, title: "Experience 1" }] });
    const wrapper = factory();
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.text()).not.toContain("No results");
    const list = wrapper.find(".wac-experiences-page__list");
    expect(list.exists()).toBeTruthy();
  });
});
