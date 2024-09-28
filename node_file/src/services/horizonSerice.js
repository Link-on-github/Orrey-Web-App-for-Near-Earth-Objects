const axios = require('axios');

async function fetchHorizonsData(start_time, stop_time, step_size = '1d', des_id = '54481740') {
  const url = "https://ssd.jpl.nasa.gov/api/horizons.api";
  const params = {
    format: 'json',
    COMMAND: `'DES=${des_id};'`,
    OBJ_DATA: 'YES',
    MAKE_EPHEM: 'YES',
    EPHEM_TYPE: 'OBSERVER',
    CENTER: '500@399',
    START_TIME: start_time,
    STOP_TIME: stop_time,
    STEP_SIZE: step_size,
    QUANTITIES: '1'
  };

  try {
    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching data from Horizons API:', error);
    return null;
  }
}

function parseHorizonsData(data) {
  if (!data || !data.result) {
    return { x: [], y: [], z: [] };
  }

  const lines = data.result.split('\n');
  const x = [], y = [], z = [];
  let parse = false;

  for (const line of lines) {
    if (line.includes('$$SOE')) {
      parse = true;
      continue;
    }
    if (line.includes('$$EOE')) {
      break;
    }
    if (parse) {
      const parts = line.trim().split(/\s+/);
      if (parts.length >= 4) {
        x.push(parseFloat(parts[2]));
        y.push(parseFloat(parts[3]));
        z.push(parseFloat(parts[4]));
      }
    }
  }

  return { x, y, z };
}

async function getAsteroidTrajectory(des_id = '54481740', start_time = '2024-01-01', stop_time = '2024-12-31') {
  const data = await fetchHorizonsData(start_time, stop_time, '1d', des_id);
  return parseHorizonsData(data);
}

module.exports = {
  getAsteroidTrajectory
};