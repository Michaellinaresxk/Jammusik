export const formatDuration = ms => {
  if (!ms) return '0:00';

  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);

  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};
