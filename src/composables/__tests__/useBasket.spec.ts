import { nextTick } from "vue";
import { describe, it, expect } from "vitest";
import { useBasket } from "../useBasket";
import type { BookedExperience } from "@/interfaces/experience";
import exp from "constants";

const bookedExperienceMock: Array<BookedExperience> = [
  {
    id: 2,
    name: "Double Room",
    img: "https://placehold.co/600x400",
    type: "double",
    price: 80,
    availability: true,
    startDate: "2022-01-01",
    endDate: "2022-01-02",
  },
  {
    id: 4,
    name: "Single Room",
    img: "https://placehold.co/600x400",
    type: "single",
    price: 55,
    availability: true,
    startDate: "2025-01-01",
    endDate: "2025-02-01",
  },
];

describe("useBasket", () => {
  beforeEach(() => {
    const { clearBasket } = useBasket();
    clearBasket();
  });
  it("should add an experience to the basket", async () => {
    const { basket, addToBasket } = useBasket();
    const experience = bookedExperienceMock[0];

    addToBasket(experience);
    await nextTick();

    expect(basket.value.length).toEqual(1);
    expect(basket.value).toContainEqual(experience);
  });

  it("should remove an experience from the basket by id", async () => {
    const { basket, addToBasket, removeFromBasket } = useBasket();
    const experience1 = bookedExperienceMock[0];
    const experience2 = bookedExperienceMock[1];

    addToBasket(experience1);
    addToBasket(experience2);

    removeFromBasket(experience1.id);
    await nextTick();

    expect(basket.value.length).toEqual(1);
    expect(basket.value).toContainEqual(experience2);
  });

  it("should not remove any experience if id does not exist", () => {
    const { basket, addToBasket, removeFromBasket } = useBasket();
    const experience = bookedExperienceMock[0];

    addToBasket(experience);
    removeFromBasket(100);

    expect(basket.value).toContainEqual(experience);
  });

  it("should return true if experience is available", () => {
    const { addToBasket, isExperienceAvailable } = useBasket();
    const experience = bookedExperienceMock[0];

    expect(isExperienceAvailable(experience)).toBe(true);

    addToBasket(experience);

    const newExperience = { ...experience, startDate: "2022-01-03", endDate: "2022-01-04" };
    expect(isExperienceAvailable(newExperience)).toBe(true);
  });

  it("should return false if experience is not available", () => {
    const { addToBasket, isExperienceAvailable } = useBasket();
    const experience = bookedExperienceMock[0];

    addToBasket(experience);

    expect(isExperienceAvailable(experience)).toBe(false);
  });

  it("should return false if experience date are not available", () => {
    const { addToBasket, isExperienceAvailable } = useBasket();
    const experience = bookedExperienceMock[0];

    addToBasket(experience);

    const newExperience = { ...experience, startDate: "2022-01-02", endDate: "2022-01-03" };
    expect(isExperienceAvailable(newExperience)).toBe(false);
  });

  it("should return false if experience is undefined isExperienceAvailable", () => {
    const { isExperienceAvailable } = useBasket();

    expect(isExperienceAvailable(undefined)).toBe(false);
  });
});
