import styled from 'styled-components/native';

export default styled.TouchableOpacity`
  width: ${props => props.width || 'auto'};
  background-color: ${props => props.bgColor || '#eee'};
  padding: 10px 20px;
  border-radius: 100px;
  justify-content: center
  align-items: center;
`;
