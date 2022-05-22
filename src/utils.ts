export const calculateDistance = (location: any, destination: any) => {
    const R = 6371; // Radius of the earth in km
    let dLat: number = _deg2rad(destination.locationLatitude - location.locationLatitude);  // deg2rad below
    let dLon: number = _deg2rad(destination.locationLongitude - location.locationLongitude);
    let a: number =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(_deg2rad(location.locationLatitude)) * Math.cos(_deg2rad(destination.locationLatitude)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    let c: number = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let distance = R * c; // Distance in km
    return distance;
}

const _deg2rad = (deg: number) => {
    return deg * (Math.PI / 180)
}
