import { ref } from "vue";
import { describe, it, expect, type Mock } from "vitest";

import { shallowMount } from "@vue/test-utils";
import ExperiencesView from "@pages/ExperiencesView.vue";
import { useDataInjection } from "@composables/useDataInjection";
import Filters from "@components/filters/Filters.vue";
import type { Experience } from "@/interfaces/experience";
import { FilterType, type Filter } from "@/interfaces/filters";

vi.mock("@composables/useDataInjection");

const factory = () => shallowMount(ExperiencesView);

describe("ExperiencesView", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    (useDataInjection as Mock).mockReturnValue({
      experiences: ref([]),
      filters: ref([]),
    });
  });

  it("should renders properly", () => {
    const wrapper = factory();
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.text()).toContain("No results");
  });
  it("should renders a list", () => {
    (useDataInjection as Mock).mockReturnValue({
      experiences: ref([{ id: 1, title: "Experience 1" }]),
      filters: ref([]),
    });
    const wrapper = factory();
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.text()).not.toContain("No results");
    const list = wrapper.find(".wac-experiences-page__list");
    expect(list.exists()).toBeTruthy();
  });
  describe("filteredExperiences", () => {
    const experiences: Array<Partial<Experience>> = [
      { id: 1, name: "Experience 1", type: "type1", availability: true, price: 100 },
      { id: 2, name: "Experience 2", type: "type2", availability: false, price: 200 },
      { id: 3, name: "Experience 3", type: "type1", availability: false, price: 300 },
    ];
    it("should return all experiences when no filters are set", () => {
      (useDataInjection as Mock).mockReturnValue({
        experiences: ref(experiences),
        filters: ref([]),
      });
      const wrapper = factory();
      const items = wrapper.findAll("li");
      expect(items.length).toEqual(experiences.length);
    });
    it("should return only available experiences", async () => {
      (useDataInjection as Mock).mockReturnValue({
        experiences: ref(experiences),
        filters: ref<Array<Filter>>([
          {
            type: FilterType.Checkbox,
            label: "Filter by Availability",
            property: "availability",
          },
        ]),
      });
      const wrapper = factory();
      const filters = wrapper.findComponent(Filters);
      expect(filters.exists()).toBeTruthy();
      filters.vm.$emit("update:activeFilters", [true]);
      await wrapper.vm.$nextTick();
      const items = wrapper.findAll("li");
      expect(items.length).toEqual(1);
    });
    it("should return only items within price range", async () => {
      (useDataInjection as Mock).mockReturnValue({
        experiences: ref(experiences),
        filters: ref<Array<Filter>>([
          {
            type: FilterType.Range,
            label: "",
            property: "price",
            min: 100,
            max: 300,
          },
        ]),
      });
      const wrapper = factory();
      const filters = wrapper.findComponent(Filters);
      expect(filters.exists()).toBeTruthy();
      filters.vm.$emit("update:activeFilters", [[200, 300]]);
      await wrapper.vm.$nextTick();
      const items = wrapper.findAll("li");
      expect(items.length).toEqual(2);
    });
    it("should return only items with same selected types", async () => {
      (useDataInjection as Mock).mockReturnValue({
        experiences: ref(experiences),
        filters: ref<Array<Filter>>([
          {
            type: FilterType.Select,
            label: "",
            property: "type",
            values: ["type1", "type2"],
          },
        ]),
      });
      const wrapper = factory();
      const filters = wrapper.findComponent(Filters);
      expect(filters.exists()).toBeTruthy();
      filters.vm.$emit("update:activeFilters", [["type1"]]);
      await wrapper.vm.$nextTick();
      let items = wrapper.findAll("li");
      expect(items.length).toEqual(2);
      filters.vm.$emit("update:activeFilters", [["type2"]]);
      await wrapper.vm.$nextTick();
      items = wrapper.findAll("li");
      expect(items.length).toEqual(1);
    });
    it("should return only items with same selected types and availability", async () => {
      (useDataInjection as Mock).mockReturnValue({
        experiences: ref(experiences),
        filters: ref<Array<Filter>>([
          {
            type: FilterType.Select,
            label: "",
            property: "type",
            values: ["type1", "type2"],
          },
          {
            type: FilterType.Checkbox,
            label: "",
            property: "availability",
          },
        ]),
      });
      const wrapper = factory();
      const filters = wrapper.findComponent(Filters);
      expect(filters.exists()).toBeTruthy();
      filters.vm.$emit("update:activeFilters", [["type1"], true]);
      await wrapper.vm.$nextTick();
      const items = wrapper.findAll("li");
      expect(items.length).toEqual(1);
    });
    it("should reset filters when clicking clear filter", async () => {
      (useDataInjection as Mock).mockReturnValue({
        experiences: ref(experiences),
        filters: ref<Array<Filter>>([
          {
            type: FilterType.Select,
            label: "",
            property: "type",
            values: ["type1", "type2"],
          },
        ]),
      });
      const wrapper = factory();
      const filters = wrapper.findComponent(Filters);
      expect(filters.exists()).toBeTruthy();
      filters.vm.$emit("update:activeFilters", [["type1"]]);
      await wrapper.vm.$nextTick();
      let items = wrapper.findAll("li");
      expect(items.length).toEqual(2);
      const clearButton = wrapper.find("button");
      expect(clearButton.exists()).toBeTruthy();
      clearButton.trigger("click");
      await wrapper.vm.$nextTick();
      items = wrapper.findAll("li");
      expect(items.length).toEqual(experiences.length);
    });
  });
});
