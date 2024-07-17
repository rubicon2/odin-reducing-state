import styled from 'styled-components';

const StyledHeading = styled.h1`
  margin-top: 0;
`;

export default function Heading(props) {
  const { level = 1, children, className } = props;

  if (level < 1 || level > 6)
    throw new Error('level prop is out of the range 1 - 6');

  return (
    <StyledHeading as={'h' + level} className={className}>
      {children}
    </StyledHeading>
  );
}
