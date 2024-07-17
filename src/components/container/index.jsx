import styled from 'styled-components';

const StyledContainer = styled.div`
  padding: 1rem;
`;

export default function Container(props) {
  const {
    as,
    'data-testid': dataTestId = 'container',
    className,
    children,
  } = props;
  return (
    <StyledContainer data-testid={dataTestId} as={as} className={className}>
      {children}
    </StyledContainer>
  );
}
