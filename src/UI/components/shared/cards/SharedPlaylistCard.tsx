import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SharedPlaylistCardProps} from '../../../../types/songTypes';
import Icon from 'react-native-vector-icons/Ionicons';

export const SharedPlaylistCard = ({
  playlist,
  onAccept,
  onReject,
}: SharedPlaylistCardProps) => (
  <View style={styles.card}>
    <View style={styles.content}>
      <View style={styles.iconContainer}>
        <Icon name="musical-note" size={30} color="#fff" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{playlist.title}</Text>
        <View style={styles.sharedByContainer}>
          <Icon name="person-outline" size={20} color="#fff" />
          <Text style={styles.sharedBy}>{playlist.sharedBy}</Text>
        </View>
        <Text style={styles.date}>
          {new Date(playlist.sharedAt).toLocaleDateString()}
        </Text>
      </View>
    </View>

    <View style={styles.buttonContainer}>
      <TouchableOpacity
        onPress={() => onAccept(playlist.id)} // Ensure playlist.id is passed
        style={[styles.button, styles.acceptButton]}>
        <Icon name="checkmark" size={20} color="#fff" />
        <Text style={styles.buttonText}>Accept</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onReject(playlist.id)} // Ensure playlist.id is passed
        style={[styles.button, styles.rejectButton]}>
        <Icon name="close" size={20} color="#fff" />
        <Text style={styles.buttonText}>Reject</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 16,
    margin: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    // backdropFilter: 'blur(10px)',
  },
  content: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  sharedByContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  sharedBy: {
    marginLeft: 4,
    fontSize: 20,
    color: '#fff',
  },
  date: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  acceptButton: {
    backgroundColor: 'rgba(0,255,0,0.3)',
  },
  rejectButton: {
    backgroundColor: 'rgba(255,0,0,0.3)',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '500',
    marginLeft: 4,
  },
});
