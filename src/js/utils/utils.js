export default class Utils {
    static parseAddress(fullAddress = "") {
        let addressComponents = fullAddress.split(',');
        let street, ward, district, city, country;

        switch (addressComponents.length) {
            case 0: {
                break;
            }
            case 1: {
                [country] = addressComponents;
                break;
            }
            case 2: {
                [street, country] = addressComponents;
                break;
            }
            case 3: {
                [street, city, country] = addressComponents;
                break;
            }
            case 4: {
                [street, district, city, country] = addressComponents;
                break;
            }
            default: {
                [street, ...addressComponents] = addressComponents;
                addressComponents.reverse();
                [country, city, district, ...ward] = addressComponents;
                ward = ward.join(', ');
                break;
            }
        }
        return {
            street: street ? street.trim() : "",
            ward: ward ? ward.trim() : "",
            district: district ? district.trim() : "",
            city: city ? city.trim() : "",
            country: country ? country.trim() : ""
        }
    }
}
