import styled from "styled-components";

const StyledBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh; /* Prend toute la hauteur de la fenêtre */
`;

const Img = styled.img`
  height: 4 0rem;
  width: auto;
`;

function Background() {
  const src = "/back.svg";

  return (
    <StyledBackground>
      <Img src={src} alt="Back" />
    </StyledBackground>
  );
}

export default Background;
