import React, {useEffect, useState} from 'react';
import { Feather as Icon} from '@expo/vector-icons';
import { View, ImageBackground, Text, Image, StyleSheet, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';

interface IBGEUFResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}

interface PickerData {
  key: string;
  label: string;
  value: string;
}

const Home = () => {
    const [ufs, setUfs] = useState<PickerData[]>([]);
    const [cities, setCities] = useState<PickerData[]>([]);

    const [selectedUf, setSelectedUfs] = useState('0');
    const [selectedCity, setSelectedCity] = useState('0');

    const navigation = useNavigation();

    function handleNavigateToPoints(){
        navigation.navigate('Points', {
          uf: selectedUf,
          city: selectedCity
        });
    };

    useEffect(() => {
      axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome').then(response => {       
          const ufInitials = response.data.map(uf => {
            const data = {
              key: uf.sigla,
              label: uf.sigla,
              value: uf.sigla
            };

            return data;
          });
          setUfs(ufInitials);
      });
    }, []);    
  
  useEffect(() => {
      if(selectedUf === '0'){
          return;
      }

      axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(response => {
          const cityNames = response.data.map(city => {
            const data = {
              key: city.nome,
              label: city.nome,
              value: city.nome
            };

            return data;
          });
          setCities(cityNames);        
      });

  }, [selectedUf])

    return (
      <KeyboardAvoidingView 
        style={{flex:1}} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ImageBackground 
            source={require('../../../assets/home-background.png')} 
            style={styles.container}
            imageStyle={{width:274, height: 368}}

            >
            <View style={styles.main}>
                <Image source={require('../../../assets/logo.png')} />
                <View>
                  <Text style={styles.title}>Seu marketplace de coleta de resíduos.</Text>
                  <Text style={styles.description}>Ajudamos as pessoas a encontrarem pontos de coleta de forma eficiente.</Text>
                </View>
            </View>

            <View style={styles.footer}>
              {/*
                <TextInput
                 style={styles.input}
                  placeholder="Digite a UF"
                  value={uf}
                  maxLength={2}
                  autoCapitalize="characters"
                  autoCorrect={false}
                  onChangeText={text => setUf(text)}
                />

                <TextInput
                  style={styles.input}
                  placeholder="Digite a cidade"
                  value={city}
                  autoCorrect={false}
                  onChangeText={text => setCity(text)}
                />                

              */}
                <RNPickerSelect
                    onValueChange={(value) => setSelectedUfs(value)}
                    placeholder={{
                        label: 'Selecione uma UF',
                        value: '0',
                        color: '#9EA0A4',
                      }}
                    useNativeAndroidPickerStyle={false}
                    style={pickerSelectStyles}
                    items={ufs}                   
                />

                <RNPickerSelect
                    onValueChange={(value) => setSelectedCity(value)}
                    placeholder={{
                        label: 'Seleciona a cidade',
                        value: '0',
                        color: '#9EA0A4',
                      }}
                    useNativeAndroidPickerStyle={false}
                    style={pickerSelectStyles}
                    items={cities}                   
                />

                <RectButton 
                    style={styles.button} 
                    onPress={handleNavigateToPoints}>
                    <View style={styles.buttonIcon}>
                    <Text>
                        <Icon name="arrow-right" color="#FFF" size={24} />
                    </Text>
                    </View>

                    <Text style={styles.buttonText}>
                        Entrar
                    </Text>
                </RectButton>
            </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
}; 

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 32
    },
  
    main: {
      flex: 1,
      justifyContent: 'center',
    },
  
    title: {
      color: '#322153',
      fontSize: 32,
      fontFamily: 'Ubuntu_700Bold',
      maxWidth: 260,
      marginTop: 64,
    },
  
    description: {
      color: '#6C6C80',
      fontSize: 16,
      marginTop: 16,
      fontFamily: 'Roboto_400Regular',
      maxWidth: 260,
      lineHeight: 24,
    },
  
    footer: {},
  
    select: {},
  
    input: {
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 10,
      marginBottom: 8,
      paddingHorizontal: 24,
      fontSize: 16,
    },
  
    button: {
      backgroundColor: '#34CB79',
      height: 60,
      flexDirection: 'row',
      borderRadius: 10,
      overflow: 'hidden',
      alignItems: 'center',
      marginTop: 8,
    },
  
    buttonIcon: {
      height: 60,
      width: 60,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    buttonText: {
      flex: 1,
      justifyContent: 'center',
      textAlign: 'center',
      color: '#FFF',
      fontFamily: 'Roboto_500Medium',
      fontSize: 16,
    }
  });

  const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    // inputAndroid: {
    //   fontSize: 16,
    //   paddingHorizontal: 10,
    //   paddingVertical: 8,
    //   borderWidth: 0.5,
    //   borderColor: 'purple',
    //   borderRadius: 8,
    //   color: 'black',
    //   paddingRight: 30, // to ensure the text is never behind the icon
    // },

    inputAndroid: {
      height: 60,
      fontSize: 16,
      backgroundColor: '#FFF',
      paddingHorizontal: 24,
      borderRadius: 10,
      marginBottom: 8,
    },
  });

export default Home;