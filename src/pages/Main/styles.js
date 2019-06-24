import styled from 'styled-components/native';

export const Container = styled.View`
   flex: 1;
   align-items: center;
   padding: 0px;
`;

export const ContainerBusca = styled.View`
   flex: 0;
   width: 300px;
   height: 300px;
   background-color: #000000;
   margin: 0px;
`;

export const TxtInputLogin = styled.TextInput`
   width: 280;
   height: 60;
   align-items: center;
   text-align: center;
   padding: 10px;
   borderRadius: 40;
   backgroundColor: #00000010;
`;

export const BtnLogin = styled.TouchableOpacity`
   width: 230;
   height: 60;
   align-items: center;
   justify-content: center;
   padding: 10px;
   borderRadius: 40;
`;

export const BtnLoginText = styled.Text`
   color: #FFF;
   font-weight: bold;
   font-size: 14px;
`;