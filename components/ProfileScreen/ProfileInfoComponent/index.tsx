import React from 'react'
import { View, ImageBackground } from 'react-native'
import {
  Avatar,
  Button,
  Headline,
  Subheading,
  Caption,
  Title,
} from 'react-native-paper'
import { Text } from '../../Themed'
import styles from './style'

const ProfileInfoComponent = () => {
  return (
    <View>
      <View style={styles.coverPhotoContainer}>
        <ImageBackground
          style={styles.coverPhoto}
          source={{ uri: 'https://picsum.photos/422' }}
          resizeMode='cover'
        />
      </View>
      <View style={styles.profileInfo}>
        <View style={styles.profilePhotoContainer}>
          <Avatar.Image
            size={120}
            source={{ uri: 'https://picsum.photos/101' }}
          />
        </View>
        <View style={styles.profileInfoContainer}>
          <Headline>Hari om Ojha</Headline>
          <Subheading>@harry</Subheading>
          <Caption style={styles.bio}>
            I am an Engineer <Text>💻</Text>
          </Caption>
          <View style={styles.gridView}>
            <View style={[styles.gridItem, styles.horizontalDivider]}>
              <Title>25</Title>
              <Text style={styles.gridText}>Posts</Text>
            </View>
            <View style={[styles.gridItem, , styles.horizontalDivider]}>
              <Title>17K</Title>
              <Text style={styles.gridText}>Followers</Text>
            </View>
            <View style={styles.gridItem}>
              <Title>384</Title>
              <Text style={styles.gridText}>Following</Text>
            </View>
          </View>
          <Button
            style={styles.followButton}
            mode='contained'
            onPress={() => console.log('Pressed')}
            labelStyle={styles.followBtnLabel}
          >
            Follow
          </Button>
        </View>
      </View>
    </View>
  )
}

export default ProfileInfoComponent
