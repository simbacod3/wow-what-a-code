# wow-what-a-code (10min read)

Welcome to the "wow-what-a-code" repository! 💯

This repository is a collection of exercises designed to challenge **your coding skills** and **problem-solving abilities**. The goal is to provide you with a variety of tasks that, **you and your reviewer**, will test your knowledge and help you improve as developers.

Each exercise comes with a specific task or problem that you need to solve. You are encouraged to explore different approaches, experiment with new techniques, and **think outside the box** to find the best solution.

Feel free to dive in, explore the exercises, and start resolving the tasks. Don't hesitate to ask for help and to **explain what you are actually doing**. 

And two last things... Even if code quality is a **must**:
> `A nice code is a functionnal code.`
  `A well done app, do what it should do.`

Happy coding! 🔥

## Coding conventions

For this exercice you will be asked to code in **Vue3**, **TypeScript** and **SCSS**. For code clarity, please respect the following guidelines:

- Use `TypeScript` in most of your files and use types when its needed.
- Use `Unit tests with Vitest` when it's needed even when it's not asked to. You should have at least one component tested to its fullest.
- Styles in components should only use SCSS or CSS and respects BEM architecture at its best
- Any AI agent tool is of course, authorized (its 2025, come on)
- Create one branch per exercice, and one Pull Request per exercice.
- Respect conventional commits
- Your branch name should be: `<branch-type>/<my-name>_<name-of-my-task>`, with your name as `jdoe` if you are `J`ohn `Doe`

## The story

**BaliVibes** is the new platform of the incredible indonesia island. It can give you the next upcoming craziest experiences to live in Bali with your friends or loved ones.

Today they want to improve this system by implementing the **Discover** and the **Search Experiences** features.

Developed in Vue3, TypeScript and SCSS you will be asked to finish the project they started in December.

You can find the platform here:


## 👇🏼 Your tasks

As a developer that belongs to **CrazyDevCompany**, you have to complete those tasks. Each tasks should be addressed with a Pull Request on the Github. There is no recommended order, its up to you to create your plan to develop those features.

1. [Feature 1 - Discover UI](#1-search-ui)
2. [Feature 2 - Filters & dates validation](#2-filters--dates-validation)
3. [Feature 3 - Reservation summary](#3-reservation-summary)

---

### 1. Discover UI

You need to implement a simple search user interface. The user should be able to see next upcoming experiences by arriving on the `/discover` page.

#### How to ?
- The user should arrive on the page and be able to see a list of cards with experiences.
- Create the `ExpCard component`
  - Use existing design system to create your component
  - The `ExpCard` component should be clickable and redirect to `/experience/<experience-id>`
  - The component should expose its interface (component signature)
  - The component should be a11y compliant.
- Display the Date like this: 03/12/2025 for example
- Get the data from the server
  - Data are stored in [https://jsonkeeper.com/b/34CU](https://jsonkeeper.com/b/34CU) (list of experiences)
- Store the data in the **best way you can, to use it later**
- Display the data in the appropriate page with responsive design of:
  - 4 columns for `desktop`
  - 3 columns for `tablet`
  - 1 column for `mobile`

#### Successfull condition

- [ ] A list of experiences are available when navigating on the `/discover`
- [ ] A `ExpCard.vue component` is created
- [ ] `ExpCard` exposes an interface
- [ ] Unit tests are done on the `ExpCard` for some UI purposes.
- [ ] Use a composable to execute your request to the server.
- [ ] The `ExpCard` list display is responsive
- [ ] The date format is respected

#### Gift task 🎁

- [ ] The request to get the data is unit tested

---

### 2. Filters & Dates validation 

The user should be able to filter the list of experiences actually on the page. Based on the following properties:

- `type`: This property aims to tell if an experience can be done in solo or couple or in groups. One or several properties could have been selected.
- `dateIn`: This property select the dates on which the experience starts.
- `dateOut`: This property select the dates on which the experience ends.
- `isTicketAvailable`: This property aims to select if this option is available or not.
- `priceFrom`: This property aims to select the starting price range
- `priceTo`: This property aims to select the ending price range

#### How to ?

- The user should arrive on the page `/discover` and see the filter component
- The user can interact with all the components of the filter. On any interaction the list automaticaly updates.
- Create a component `Filter.vue`
- This component should expose methods, events, props to handle filter, its up to you to decide how you want to create the component.

#### Successfull conditions

- [ ] `The user can consult the page by clicking`
- [ ] `The user should be able to filter the displayed list`
- [ ] `A component named Filters.vue has been created`
- [ ] `The Filter.vue component has been tested`
- [ ] `The Filter.vue component should use BEM conventons`
- [ ] `The logic behind the filter should be unit-tested`

### 3. Reservation summary

The user should be able to add an element to its `basket` and see the recap of his `basket`.

#### How to ?

- Find the basket system in the code.
- Find a way to add items to the basket.
- The basket should not be emptied when `the page is reloaded`.
- Open and `display the items` basket content.

#### Successfull conditions

- [ ] User can add experiences to its basket.
- [ ] User can see all his saved experiences when clicking on the `basket icon`
- [ ] Basket system is Unit Tested

---

## Recommended IDE Setup (1min read)

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
pnpm test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```
