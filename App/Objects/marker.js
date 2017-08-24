class Marker {
  create(id, name, text, lat, lng) {
    this.id = id;
    this.name = name;
    this.text = text;
    this.lat = lat;
    this.lng = lng;
  }

  getName() {
    return this.name;
  }
}

export default Marker;
