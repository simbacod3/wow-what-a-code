
import flushPromises from 'flush-promises';
import { describe, expect, it, vi } from 'vitest';

import ExpCard from '@/components/expCard.vue';
import { mount } from '@vue/test-utils';

import ExperiencesView from '../ExperiencesView.vue';
import { expected } from './expected';

vi.mock("vue-router", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(expected),
  })
) as ReturnType<typeof vi.fn>;

describe("ExperiencesView.vue", () => {
  it("fetch datas from API and render it properly in ExpCard", async () => {
    const wrapper = mount(ExperiencesView);

    await flushPromises();

    const cards = wrapper.findAllComponents(ExpCard);
    expect(cards.length).toBe(12);

    const firstCard = cards[0];
    expect(firstCard.props("name")).toBe("Single Room");
    expect(firstCard.props("img")).toBe("https://placehold.co/600x400");
    expect(firstCard.props("type")).toBe("single");
    expect(firstCard.props("price")).toBe(50);
    expect(firstCard.props("availability")).toBe(true);
  });
});
