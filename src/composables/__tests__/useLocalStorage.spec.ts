import { nextTick } from "vue";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { useLocalStorage } from "@composables/useLocalStorage";

describe("useLocalStorage", () => {
  const key = "testKey";
  const defaultValue = "defaultValue";

  beforeEach(() => {
    localStorage.clear();
  });

  it("should initialize with default value if no stored value", () => {
    const data = useLocalStorage(key, defaultValue);
    expect(data.value).toBe(defaultValue);
  });

  it("should initialize with stored value if it exists", () => {
    localStorage.setItem(key, JSON.stringify("storedValue"));
    const data = useLocalStorage(key, defaultValue);
    expect(data.value).toBe("storedValue");
  });

  it("should update localStorage when data changes", async () => {
    const data = useLocalStorage(key, defaultValue);
    data.value = "newValue";
    await nextTick();
    expect(localStorage.getItem(key)).toBe(JSON.stringify("newValue"));
  });

  it("should handle deep watch for objects", async () => {
    const defaultValue = { a: 1 };
    const data = useLocalStorage(key, defaultValue);
    data.value.a = 2;
    await nextTick();
    expect(localStorage.getItem(key)).toBe(JSON.stringify({ a: 2 }));
  });
});
