import React, {useState, useEffect} from 'react';
import { Dimensions,FlatList,TextInput,Pressable,ScrollView,SafeAreaView,Image, StyleSheet,View,Text,StatusBar,AsyncStorage,ImageBackground } from 'react-native';
import { Colors }   from './../components/style';
const {grey,blue,dark,light,brand, darkLight, primary,white,transparent} = Colors;

import Icon from 'react-native-vector-icons/MaterialIcons';
import {URL} from './../global'
import axios from 'axios';

const {width} = Dimensions.get('screen'); 
const Home = ({navigation,route})=>{
    const user = route.params;
    const ListOptions = () =>{
        // const optionsList = [
        //     {title: 'Lịch hẹn của bạn',img: require('./../assets/images/lichhen.jpg')},
        //     {title: 'BDS yêu thích',img: require('./../assets/images/favorite.png')},
        // ];
        return (           
                <View style={style.optionListContainer}>
                    <Pressable onPress={()=>navigation.navigate("Schedule",user)}>
                        <View style={style.optionCard} >
                            <Image style={style.optionCardImage} source={require('./../assets/images/lichhen.jpg')}/>
                            <Text style={{marginTop:10, fontSize:18,fontWeight: 'bold'}}>Lịch hẹn của bạn</Text> 
                        </View>
                     </Pressable>
                     <Pressable onPress={()=>navigation.navigate("Favorite",user)}>   
                        <View style={style.optionCard}>
                            <Image style={style.optionCardImage} source={require('./../assets/images/favorite.png')}/>
                            <Text style={{marginTop:10, fontSize:18,fontWeight: 'bold'}}>BDS yêu thích</Text> 
                        </View>
                    </Pressable>
                </View>                 
        )
    }

     const [selectedCategoryIndex,setselectedCategoryIndex]= React.useState(
        0,
    );
    // 

    // call api BDS
    const [bds, setdataBDS] = React.useState( [] );
    // call api Category
    const [categoryList, setdataCate] = React.useState( [] );
    // get user storages 
    //get user information
    const [userLogin,setUserLogin] = useState();
    const [userEmail,setUserEmail] = useState("");

    const load = async() =>{
        try {
           let us =  await AsyncStorage.getItem("Name")          
           if(us !== null){       
                setUserLogin(JSON.parse(us));           
                setUserEmail(userLogin.UserInfor.Name);
                // console.log(userEmail);
           }
        } catch (error) {
            setUserEmail("8xland");
            console.log("Get user Storage");
        }
    }
    useEffect(() => {
        const getDataBDS = async () =>{
            const response = await axios(URL + "bds");
            setdataBDS(response.data);
            //  console.log(response.data)
        }
         getDataBDS();

         const getDataCate = async () =>{
            const response = await axios(URL + "loaiBDS");
            setdataCate(response.data);
            //  console.log(response.data)
        }
         getDataCate();
        load();
    },[userEmail])


    ////////////////
    
    const Category = ({category, index}) =>{
        return ( 
             <Pressable onPress={()=>{
                setselectedCategoryIndex(index)
                const getDataBDStheoLoai = async () =>{
                    const response = await axios(URL + "BDStheoLoai/"+ category._id);
                    setdataBDS(response.data);
                    // console.log(response.data)
                }
                getDataBDStheoLoai();
                }}>
                <Text style={[
                    style.categoryListText,
                    (index == selectedCategoryIndex && style.activeCategoryListText),
                ]}>   
                    {category.Name}
                </Text>
            </Pressable>
        )      
    }
    // console.log(categoryList);
    const Card = ({bds}) =>{
        return (
            <Pressable onPress={()=>{                  
                    const tam = [];
                    tam.push(user);
                    tam.push(bds);
                    navigation.navigate("DetailBDS", tam)
                }
            }>
                <View style={style.card}>
                    <Image source={{uri:bds.Image[0]}} style={style.cardImage} />
                    <View style={{flexDirection:"row",justifyContent:"space-between", marginTop:10}}>
                        <Text style={{fontSize:16,fontWeight: 'bold'}}>{bds.title}</Text>
                        <Text style={{fontSize:16,fontWeight: 'bold',color: blue}}>$ {bds.Gia}</Text>
                    </View>
                    <Text style={{fontSize:14,color:grey, marginTop:5}}>{bds.Name}</Text>
                    <View style={{marginTop:10, flexDirection:'row'}}>
                        <View style={style.facility}>
                            <Icon name="location-on" size={18}/>
                            <Text style={style.facilityText}>{bds.Vitri}</Text>
                        </View>
                        <View style={style.facility}>
                            <Icon name="mood" size={18}/>
                            <Text style={style.facilityText}>{bds.Status}</Text>
                        </View>
                        <View style={style.facility}>
                            <Icon name="pages" size={18}/>
                            <Text style={style.facilityText}>{bds.Dientich} (hecta/m2)</Text>
                        </View>
                    </View>       
                </View>
            </Pressable>
        )
    }

    
    return (
        <SafeAreaView
            style={{backgroundColor:white, flex:1}}          
        >

           {/* <StatusBar 
                translucent={false} 
                backgroundColor={white}
                barStyle="dark-content"
            /> */}
            <View style={style.backgroundImageContainer}>
                <View style={style.header}>               
                    <View style={style.headerBtn}>
                        <Icon name="arrow-back-ios" color={white} size={20}
                            onPress={navigation.goBack}
                        />
                    </View>
                </View>
            </View>
            <View style={style.header}>
                <View>
                    <Text style={{color:grey}}>Xin chào</Text>
                    <Text style={{color:dark, fontSize:20, fontWeight:'bold'}}>
                        {user.UserInfor.Name}
                    </Text>
                </View>
                 <Pressable onPress={()=>{
                    navigation.navigate("EditUser", user)
                 }}>
                    <View>
                        <Image 
                            source={require('./../assets/images/admin.png')}
                            style={style.profileImage} 
                        />
                    </View>
                </Pressable>
            </View>
            <ScrollView>
                    <View style={{
                        flexDirection:"row",
                        justifyContent:"space-between",
                        paddingHorizontal:20,
                    }}>
                        <View style={style.searchInputContainer}>
                            <Icon name="search" size={25} color={grey}/>
                            <TextInput placeholder="Search lands" />
                        </View>
                        <View style={style.sortBtn}>
                            <Icon name="tune" color={white} size={25}/>
                        </View>
                    </View>
                    <ListOptions/>
                    <Pressable onPress={()=>{
                        const getDataBDStheoLoai = async () =>{
                            const response = await axios(URL + "bds");
                            setdataBDS(response.data);
                            // console.log(response.data)
                        }
                        getDataBDStheoLoai();
                        }}>
                        <Text style={{fontSize:18,fontWeight:'bold',paddingBottom:5,color:dark,paddingLeft:40,paddingVertical:20}}>
                            Trang chủ
                        </Text>                   
                    </Pressable>
                    <View style={style.categoryListContainer}>  
                        <FlatList
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        data={categoryList} 
                        renderItem={({item,index})=> <Category  category={item} index={index}/>} 
                        keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                    
                    <FlatList
                        snapInterval={width-20}
                        contentContainerStyle={{paddingLeft:20, paddingVertical:20}}
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        data={bds} 
                        renderItem={({item})=> <Card bds={item}/>}
                        keyExtractor={(item, index) => index.toString()}
                    />
            </ScrollView>
        </SafeAreaView>
    )
};
const style = StyleSheet.create({
    header:{
        paddingVertical:20,
        flexDirection:'row',
        justifyContent: 'space-between',
        paddingHorizontal:20
    },
    profileImage:{
        borderRadius:25,
        height:50,
        width:50,
    },
    searchInputContainer:{
       height:50,
       backgroundColor: light,
       flex:1,
       flexDirection: 'row',
       alignItems: 'center',
       paddingHorizontal:20,
       borderRadius:10,
    },
    sortBtn:{
        backgroundColor:dark,
        height:50,
        width:50,
        borderRadius:10,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft:10,
    },
    optionListContainer:{
        flexDirection:'row',
        justifyContent: 'space-between',
        marginTop:20,
        paddingHorizontal:20, 
    },
    optionCard:{
        height:210,
        width:width/2 -30,
        elevation:15,
        backgroundColor:white,
        alignItems:'center',
        borderRadius:15,
        paddingHorizontal:10,
        paddingTop:10,
    },
    optionCardImage:{
        height:140,
        borderRadius:10,
        width:'100%',
    },
    categoryListContainer:{
        marginTop:40,
        flexDirection:'row',
        justifyContent: 'space-between',
        paddingHorizontal:40,
    },
    categoryListText:{
        fontSize:16,
        fontWeight:'bold',
        paddingBottom:5,
        color:grey,
        marginLeft:5,
        marginRight:5,
    },
    activeCategoryListText:{
        color:dark, 
        borderBottomWidth:5,
        paddingBottom:5,
    },
    card:{
       height:250,
       backgroundColor:white, 
       elevation:10,
       width: width -40,
       marginRight:20,
        padding:15,
        borderRadius:20,
    },
    cardImage:{
        width:'100%',
        height:120,
        borderRadius:15,
    },
    facility:{
        flexDirection:'row',
        marginRight:15,
    },
    facilityText:{
        marginLeft:5,
        color:grey,
    },
    backgroundImageContainer:{
        elevation:20,
        marginTop:20,
        height:50,
    },
    backgroundImage:{
        borderRadius:10,
        height:'100%',
        width:'100%',
        overflow: 'hidden',
    },
    headerBtn:{
        height:40,
        width:40,
         backgroundColor:grey,
        borderRadius:5,
        justifyContent: 'center',
        alignItems:'center'
    }
});
export default Home;