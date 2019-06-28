import styled from 'styled-components/native';
import {Animated} from 'react-native';

export const Container = styled.View`
   flex: 1;
   align-items: center;
`;

export const ContainerBusca = styled.View`
   width: 100%;
   height: 60px;
   flex-direction: row;
   background-color: #00000005;
   justify-content: center;
   align-items: center;
`;

export const TxtInputLogin = styled.TextInput`
   width: 85%;
   height: 40px;
   align-items: center;
   text-align: center;
   padding: 10px;
   borderRadius: 40;
   backgroundColor: #00000010;
   margin-top: 5px;
`;

export const BtnAdvanSearch = styled.TouchableOpacity`
   width: 10%;
   height: 50px;
   justify-content: center;
   align-items: center;
   margin-top: 5px;
`;

export const BtnAdvanSearchImage = styled.Image`
   width: 80%;
   height: 80%;
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

export const FloatingBtn = styled.TouchableOpacity`
   position: absolute;
   width: 60;
   height: 60;
   align-items: center;
   justify-content: center;
   right: 30;
   bottom: 30;
   border-radius: 50px;
`;

export const FloatingBtnImage = styled.Image`
   width: 50%;
   height: 50%;
`;

export const BtnSair = styled.TouchableOpacity`
   position: absolute;
   height: 100%;
   align-items: center;
   justify-content: center;
   right: 0;
   padding-left: 20px;
   padding-right: 20px;
`;