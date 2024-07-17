import Container from '.';
import { render, screen } from '@testing-library/react';

describe('Container', () => {
  it('Renders a div', () => {
    render(<Container />);
    expect(screen.getByTestId('container')).toBeInTheDocument();
  });

  it.each([
    [
      {
        as: 'main',
      },
    ],
    [
      {
        as: 'aside',
      },
    ],
  ])('Renders a $as when provided with an as prop', (props) => {
    render(<Container {...props} />);
    expect(screen.getByTestId('container').nodeName).toBe(
      props.as.toUpperCase(),
    );
  });

  it('Renders child text', () => {
    render(<Container>Some child text</Container>);
    expect(screen.getByText(/some child text/i)).toBeInTheDocument();
  });

  it('Renders child jsx', () => {
    render(
      <Container>
        <button>Some child jsx</button>
      </Container>,
    );
    expect(screen.getByText(/some child jsx/i)).toBeInTheDocument();
  });

  it('Applies className prop to the root element of the component', () => {
    render(<Container className={'someClass'} />);
    expect(screen.getByTestId('container').classList).toContain('someClass');
  });

  it('Applies dataTestId prop to the root element of the component', () => {
    render(<Container data-testid={'some-test-id'} />);
    expect(screen.getByTestId('some-test-id')).toBeInTheDocument();
  });
});
