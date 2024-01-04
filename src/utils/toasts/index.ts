import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const songNotification = () => {
  toast('Song created successfully', {
    type: toast.TYPE.SUCCESS,
    bodyClassName: 'notification-song',
    progressStyle: {
      backgroundColor: '#1b998b',
    },
  });
};

const songUpdateNotification = () => {
  toast('Song information updated', {
    type: toast.TYPE.SUCCESS,
    progressStyle: {
      backgroundColor: '#1b998b',
    },
  });
};

const songDeleteNotification = () => {
  toast('Song successfully deleted', {
    type: toast.TYPE.SUCCESS,
    progressStyle: {
      backgroundColor: '#1b998b',
    },
  });
};

const playlistNotification = () => {
  toast('Playlist successfully created', {
    type: toast.TYPE.SUCCESS,
    progressStyle: {
      backgroundColor: '#1b998b',
    },
  });
};

const playlistDeleteNotification = () => {
  toast('Playlist successfully deleted', {
    type: toast.TYPE.SUCCESS,
    progressStyle: {
      backgroundColor: '#1b998b',
    },
  });
};

const profileNotification = () => {
  toast('Profile information updated', {
    type: toast.TYPE.SUCCESS,
    progressStyle: {
      backgroundColor: '#1b998b',
    },
  });
};

const textCopyClickboard = () => {
  toast('text copied to the clickboard', {
    type: toast.TYPE.SUCCESS,
    progressStyle: {
      backgroundColor: '#1b998b',
    },
  });
};

export {
  songUpdateNotification,
  songNotification,
  playlistNotification,
  profileNotification,
  playlistDeleteNotification,
  songDeleteNotification,
  textCopyClickboard,
};
