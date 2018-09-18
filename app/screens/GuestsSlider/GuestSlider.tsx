import React, {Component} from 'react';
import {ScrollView, View} from 'react-native';
import Guest from "../Guest/Guest";
import {NavigationScreenProps} from "react-navigation";
import { ParallaxSwiper, ParallaxSwiperPage } from 'react-native-parallax-swiper';
import {colors} from "../../config/styles";
import BackButton from "../../components/BackButton/BackButton";
import styles from './style';

class GuestSlider extends Component<NavigationScreenProps> {

    state = {
        guests: [
            {
                id: 0,
                name: 'Guest name',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac laoreet metus. Maecenas a mattis ex, malesuada aliquet tortor. Praesent eget libero et quam aliquet semper sed a neque.',
                imageUri: 'https://picsum.photos/500/400?image=64'
            },
            {
                id: 1,
                name: 'Guest name 1',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac laoreet metus.',
                imageUri: 'https://picsum.photos/400/600?image=1005'
            },
            {
                id: 2,
                name: 'Guest name 2',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                imageUri: 'https://picsum.photos/300/300?image=823'
            }
        ]
    };

    render() {
        const { navigation } = this.props;
        const { guests } = this.state;
        return (
            <View
                style={styles.container}
            >
                <BackButton navigation={navigation} />
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={styles.list}
                >
                    {guests.map((guest, index, list) => (

                        <ScrollView
                            key={guest.id}
                            showsVerticalScrollIndicator={false}
                            style={
                                [styles.listItem,
                                    {
                                        marginLeft: (index === 0) ? 30 : 0,
                                        marginRight: (index === list.length - 1) ? 30 : 0
                                    }
                            ]}>
                            <Guest
                                name={guest.name}
                                description={guest.description}
                                imageUri={guest.imageUri}
                            />
                        </ScrollView>
                    ))}
                </ScrollView>
            </View>
        );
    }
}

export default GuestSlider;
