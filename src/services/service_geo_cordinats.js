class ServiceGeoCordinats {
  async getCords(id) {
    const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${id}/?fields=latlng`);

    if (res.ok) {
      return res.json();
    }
  }
}

export default ServiceGeoCordinats;