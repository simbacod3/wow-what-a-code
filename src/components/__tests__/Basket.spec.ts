import { ref } from "vue";
import { shallowMount } from "@vue/test-utils";
import { describe, it, expect, vi, type Mock } from "vitest";
import Basket from "@components/ui/Basket.vue";
import { useBasket } from "@composables/useBasket";

vi.mock("@composables/useBasket");

const factory = ({ withModalStubs = false } = {}) =>
  shallowMount(Basket, {
    global: {
      stubs: {
        ...(withModalStubs && {
          Modal: {
            template: "<div><slot /></div>",
          },
        }),
      },
    },
  });

const spyClearBasket = vi.fn();

describe("Basket.vue", () => {
  beforeAll(() => {
    vi.resetAllMocks();
    (useBasket as Mock).mockReturnValue({
      basket: ref([]),
      clearBasket: spyClearBasket,
    });
  });
  it("should render properly", () => {
    const wrapper = factory();
    expect(wrapper.exists()).toBeTruthy();
  });

  it("should renders basket button", () => {
    const wrapper = factory();
    expect(wrapper.find("button").text()).toBe("Basket");
  });

  it("should opens  and close the modal", async () => {
    const wrapper = factory();
    const button = wrapper.find("button");
    await button.trigger("click");
    const modal = wrapper.findComponent({ name: "Modal" });
    expect(modal.props("isOpen")).toBe(true);
    await modal.vm.$emit("close");
    expect(modal.props("isOpen")).toBe(false);
  });

  it("should displays empty basket message", () => {
    (useBasket as Mock).mockReturnValue({ basket: [], clearBasket: vi.fn() });
    const wrapper = factory({ withModalStubs: true });
    expect(wrapper.find("h4").text()).toBe("Nothing inside the basket");
  });

  it("should displays experiences in the Modal", () => {
    const experiences = [
      { id: 1, name: "Experience 1" },
      { id: 2, name: "Experience 2" },
    ];
    (useBasket as Mock).mockReturnValue({ basket: experiences, clearBasket: vi.fn() });
    const wrapper = factory({ withModalStubs: true });
    const items = wrapper.findAllComponents({ name: "ExpCard" });
    expect(items).toHaveLength(experiences.length);
  });

  it("clears the basket", async () => {
    (useBasket as Mock).mockReturnValue({
      basket: [{ id: 1, name: "Experience 1" }],
      clearBasket: spyClearBasket,
    });
    const wrapper = factory({ withModalStubs: true });
    const button = wrapper.find(".wac-basket__clear-button");
    await button.trigger("click");
    await wrapper.find("button").trigger("click");
    expect(spyClearBasket).toHaveBeenCalled();
  });
});
