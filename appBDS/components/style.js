import styled from 'styled-components';
import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import Constants from 'expo-constants';

const StatusBarHeight = Constants.statusBarHeight;
// colors
export const Colors = {
    primary: '#ffffff',
    secondary: '#E5E7',
    tertiary: '#1F2937',
    darkLight: '#9CA3AF',
    brand: '#6D28D9',
    green: '#10B981',
    red: '#EF4444',
    blue:'#1E90FF',
    dark: '#000',
    light: '#f6f6f6',
    grey: '#A9A9A9',
    transparent: 'rgba(0,0,0,0)',
    white: '#FFF'
};

const {primary, secondary, tertiary, darkLight, brand, green, red, blue,dark,light, grey, transparent,white} = Colors;


// nền background
export const StyledContainer = styled.View`
    flex:1;
    padding:25px;
    padding-top: ${StatusBarHeight + 30}px;
    background-color: ${primary};
`;

// css thực thể của page
// flex:1;= flex:1 1 0n;(trong đó n là một đơn vị chiều dài).Nếu tất cả các mục trong thùng chứa flex sử dụng mẫu này,
// kích thước của chúng sẽ tỷ lệ thuận với hệ số uốn được chỉ định
export const InnerContainer = styled.View`
    flex:1;  
    width: 100%;
    align-items: center;
`;

export const WelcomeContainer = styled(InnerContainer)`
    padding:25px;
    padding-top:10px;
    justify-content:center;
`;

export const PageLogo = styled.Image`
    width:250px;
    height: 210px;
`;

export const Avatar = styled.Image`
    width:100px;
    height: 100px;
    margin:auto;
    border-radius:50px;
    border-width:2px;
    border-color: ${secondary};
    margin-bottom:10px;
    margin-top:10px;
`;

export const WelcomeImage = styled.Image`
    min-width:100%;
    height: 50%;   
`;

export const PageTitle = styled.Text`
    font-size:30px;
    text-align:center;
    font-weight:bold;
    color:${blue};
    padding:10px;

    ${(props) => props.welcome && `
        font-size:35px;
    `}

`;


export const SubTitle = styled.Text`
    font-size:18px;
    margin-bottom:20px;
    letter-spacing:1px;
    font-weight:bold;
    color:${tertiary};

    ${(props) => props.welcome && `
        margin-bottom:5px;
        font-weight:normal;
    `}
`;

// chứa các field text input, btn
export const StyledFormArea = styled.View`
    width:90%;
`;

// 
export const StyledTextInput = styled.TextInput`
    background-color:${tertiary};
    padding:15px;
    padding-left:55px;
    padding-right:55px;
    border-radius:5px;
    font-size:16px;
    height:60px;
    margin-vertical:3px;
    margin-bottom:10px;
    color:${primary}
`;

export const StyledInputLabel = styled.Text`
    text-align:left;
    font-size:13px;
    color:${tertiary}
`;

export const LeftIcon = styled.View`
    left:15px;
    top:38px;
    position:absolute;
    z-index:1;
`;

export const RightIcon = styled.TouchableOpacity`
    right:15px;
    top:38px;
    position:absolute;
    z-index:1;
`;

export const StyledButton= styled.TouchableOpacity`
    padding:15px;
    background-color:${blue};
    justify-content:center;
    border-radius:5px;
    margin-vertical:5px;
    align-items:center;
    height:60px;
    ${(props) => props.google == true && `
        background-color:${green};
        flex-direction:row;
        justify-content:center;
    `}
`;

export const ButtonText= styled.Text`
    color:${primary};
    font-size:16px;
    ${(props) => props.google == true && `
        padding:25px;
    `}
`;

export const MsgBox= styled.Text`
    text-align:center;
    font-size:13px;
    color: ${props => props.type == true ? green : red};
`;

export const Line= styled.View`
    height:1px;
    width:100%;
    background-color:${darkLight};
    margin-vertical:10px;
`;

export const ExtraView= styled.View`
    justify-content:center;
    flex-direction:row;
    align-items: center;
    padding:10px;
`;
export const ExtraText= styled.Text`
    justify-content:center;
    align-items: center;
    font-size:15px;
    color: ${tertiary};
`;

export const TextLink= styled.TouchableOpacity`
    justify-content:center;
    align-items: center;
`;

export const TextLinkContent= styled.Text`
    font-size:15px;
    color: ${brand};
`;





