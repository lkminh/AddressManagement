import https from 'https';

export default class Geocoder {
    static get ZERO_RESULTS() {
        return ZERO_RESULTS;
    }

    constructor(apiKey) {
        if (apiKey == null) {
            throw "Missing apiKey"
        }
        this.apiKey = apiKey;
    }

    reverseGeocoding(latitude, longitude, options = {}, callback) {
        if (latitude == null || latitude.length <= 0) {
            throw "Invalid latitude"
        }
        if (longitude == null || longitude.length <= 0) {
            throw "Invalid longitude"
        }

        let latlng = `${latitude},${longitude}`;
        let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng}&key=${this.apiKey}`;

        for (let i in options) {
            url += `&${i}=${options[i]}`;
        }

        https.get(url, (response) => {
            var bufferList = [];
            response.on('data', function (chunk) {
                bufferList.push(chunk);
            }).on('end', function () {
                var data = JSON.parse(Buffer.concat(bufferList).toString());
                if (data.status === 'OK' || data.status === 0) {
                    callback(undefined, data);
                } else {
                    callback(data.status);
                }
            }).on('error', function (error) {
                callback(error);
            });
        });

    }
}
