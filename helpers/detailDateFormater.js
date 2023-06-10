export function formatDetailDate(date) {
  const options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  };

  return new Date(date).toLocaleString('en-US', options);
}

export function formatHomeDate(date) {
  const options = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  return new Date(date).toLocaleString('en-US', options);
}

export function hourFormater(date) {
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  return new Date(date).toLocaleString('en-US', options).split(':').slice(0, 2).join(':');
}

export function formatTemperature(temp) {
  const celsius = temp - 273.15;
  return celsius.toFixed(1);
}