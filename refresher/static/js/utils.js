"use strict"

class GeoEnglish {
    lat= 'Latitude';
    long= 'Longitude';
}
export const geo_eng = {
    lat: 'Latitude',
    long: 'Longitude'
};

export const geo_italian = {
    lat: 'Latitudine',
    long: 'Longitudine'
};

//`this` does not work with arrow functions 
export function geoLocation(greeting,user){
    let pos = getGeoLoc().then(result => {
        console.log(greeting+" "+user);
        let coord = result.split(';');
        console.log(this.lat+": "+coord[0]+"  "+this.long+": "+coord[1]);
    },error => console.log(error));
    
};

const getGeoLoc = () => {
    return new Promise((resolve,reject)=> {
        if (!navigator.geolocation) {
            reject('User has not allowed location services.');
        }
        navigator.geolocation.getCurrentPosition((pos)=> {
            let latitude = pos.coords.latitude;
            let longitude = pos.coords.latitude;
            resolve(latitude+";"+longitude);
        });
    });
}
