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

export const splitFullName = (fullName) => {
    let regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
    let nameArr = fullName.trim().split(/\s+/);
    let firstName = nameArr[0];
    let lastName = "";
    if(nameArr.length>1) {
        lastName = nameArr[nameArr.length-1];
    }
    if(nameArr.includes('Komal')) {
        console.log('The name contains "Komal"');
    }
    let midNameArr = [];
    let midName = "";
    if(nameArr.length>2) {
        midNameArr = nameArr.spice(1,nameArr.length-2);
    }

    
    for(let name of midNameArr) {
        if(midName.length == 0) {
            midName = name;
        } else {
            midName += " "+name;
        }
    }
    let nameAns = JSON.stringify({
        fName: firstName,
        mName: midName,
        lName: lastName
    });
    return nameAns;
}
