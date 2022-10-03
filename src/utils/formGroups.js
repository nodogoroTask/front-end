/**
 * a method to group all near by locations
 */
export const formGroups = (locations) => {
  let locationsGroups = new Map();
  for (const location of locations) {
    addLocationToGroups(location, locationsGroups);
  }
  return locationsGroups;
};

/**
 * a method add new location to the right group of locations
 */
export const addLocationToGroups = (location, locationsGroups) => {
  let key =
    parseFloat(location.coordinate.lat).toFixed(3) +
    "-" +
    parseFloat(location.coordinate.lng).toFixed(3);
  if (locationsGroups.has(key))
    locationsGroups.set(key, [...locationsGroups.get(key), location]);
  else locationsGroups.set(key, [location]);

  return locationsGroups;
};
