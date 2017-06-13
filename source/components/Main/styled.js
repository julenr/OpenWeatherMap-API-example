import styled from 'styled-components';

export const Cities = styled.div`
  font-family: Arial;
  width: 100%;
  max-width: 1280px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  font-size: 2rem;
  color: lightgray;
`;

export const City = styled.div`
  background: radial-gradient(circle farthest-side at 67% 26%, lightblue 0, blue 100%);
  flex: 0 0 230px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 350px;
  margin: 15px;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 3px 15px 0 rgba(0, 0, 0, .58);
`;

export const Title = styled.div`
  font-weight: bold;
  font-size: 2rem;
  letter-spacing: .1rem;
  color: white;
`;

export const Degrees = styled.div`
  font-size: 6rem;
  color: white;
`;


export const Historic = styled.div`
  width: 100%;
  flex: 1 1;
  overflow: scroll;
  color: lightgray;
`;
