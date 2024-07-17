import Heading from '.';
import { render, screen } from '@testing-library/react';

describe('Heading', () => {
  it.each([[1], [2], [3], [4], [5], [6]])(
    'Returns <h%i> tag when provided with level prop of corresponding value',
    (level) => {
      render(<Heading level={level} />);
      expect(screen.getByRole('heading').nodeName).toBe('H' + level);
    },
  );

  it.each([[-7], [-1], [0], [7]])(
    'Throws an error if provided a level prop out of the range 1 - 6: %i',
    (level) => {
      expect(() => render(<Heading level={level} />)).toThrowError();
    },
  );

  it('Defaults to heading level 1 if no level prop is provided', () => {
    render(<Heading />);
    expect(screen.getByRole('heading').nodeName).toBe('H1');
  });

  it('Renders child text', () => {
    render(<Heading>Some Heading Text</Heading>);
    expect(screen.getByText(/some heading text/i)).toBeInTheDocument();
  });

  it('Renders child jsx', () => {
    render(
      <Heading>
        <button>Some JSX</button>
      </Heading>,
    );
    expect(screen.getByText(/some jsx/i)).toBeInTheDocument();
  });

  it('Applies className prop to the root element of the component', () => {
    render(<Heading className={'someClass'} />);
    expect(screen.getByRole('heading').classList).toContain('someClass');
  });
});
