# Reducing State in React

https://www.theodinproject.com/lessons/node-path-react-new-reducing-state

## Purpose

- Practice using reducers and context in react
- Employ a strict TDD methodology

## Result

In earlier projects I quickly abandoned writing tests first, getting caught up in creating components, feeling like I was wasting time trying to get tests to work properly. However, now I have written a lot of tests, I have much less trouble getting the tests to do what I need them to do. Even more importantly, I feel like I have a better idea of _what_ to test, _how_ to test and when to use mocking, which were things I had a lot of trouble with in previous projects.

I have also now experienced for myself the benefits of good tests! I am actually enthusiastic about writing them now.

### More thoughtful designs

For starters, I sit back and think more thoroughly about the component I am designing and how I want it to interface with the rest of the program, before starting to code anything. It engenders a design-first approach. This sounds strange - I should have always been doing this - but the tests allow you to methodically define what you want the code to do. It's a lot more thorough than roughly sketching out stuff on a bit of paper, which was previously my goto method for trying to design a system. The thought process there was, more or less: "I should have a design down before I start coding, and I can't start coding anything if I am writing on paper!"

### Easy refactoring

Originally the Heading component dynamically generated an element like so, and the tests verified that the correct heading type is returned in accordance with the level prop (the code has been edited for brevity):

```
  function Heading({ level = 1 }) {
    const Tag = 'h' + level;
    return <Tag>Some Heading</Tag>
  }
```

But once I needed to return a styled component, this was refactored to:

```
  const StyledHeading = styled.h1`
    /* styles */
  `;

  function Heading({ level = 1 }) {
    return (
      <StyledHeading as={'h' + level}>
        Some Styled Heading
      </StyledHeading>
    );
  }
```

And upon save, the test runs and confirms that the heading types are still correctly generated! This is the amazing advantage of testing the end result and not the implementation!

## Conclusion

I have now been cured of my severe case of testophobia and am more confident with reducers and context in react.
