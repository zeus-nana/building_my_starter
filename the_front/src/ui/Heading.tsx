import styled, { css } from "styled-components";

type HeadingType = "h1" | "h2" | "h3" | "h4";

interface HeadingProps {
  type?: HeadingType;
}

const Heading = styled.h1<HeadingProps>`
  ${(props) =>
    props.type === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}
  ${(props) =>
    props.type === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}
    ${(props) =>
    props.type === "h3" &&
    css`
      font-size: 2rem;
      font-weight: 500;
    `}
    ${(props) =>
    props.type === "h4" &&
    css`
      font-size: 3rem;
      font-weight: 600;
      text-align: center;
    `}

    line-height: 1.4;
`;

Heading.defaultProps = {
  type: "h1",
};

export default Heading;
