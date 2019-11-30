class SeviceGeocoder {
  async getData({ GPSLatitude, GPSLongitude }) {
    const api_key = '668d0ff8a40145fbb39d331c203442b6';
    const api_url = `https://api.opencagedata.com/geocode/v1/json?key=${api_key}&q=${encodeURIComponent(`${GPSLatitude.toString()},${GPSLongitude.toString()}`)}&pretty=1&no_annotations=1&language=en`;
    const data = {
      GPSLongitude,
      GPSLatitude
    };

    try {
      const res = await fetch(api_url);

      if (res.ok) {
        const { results } = await res.json();
        const components = results[0].components;

        for (let key in components) {
          const keys = ['country', 'ISO_3166-1_alpha-3'];

          if (keys.includes(key)) {
            if (key === 'ISO_3166-1_alpha-3') {
              data.id = components[key];
            } else {
              data[key] = components[key];
            }
          }
        }
      }
    } catch(e) {
      console.log(e);
    }

    return data;
  }
}

export default SeviceGeocoder;