export default class Utility {

    /**
     * 
     * @param {String} hex
     * @param {Number} opacity
     * 
     * @returns {String} rgb/rgba
     */
    static convertHex(hex, opacity = 0) {
        hex = hex.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);

        let result;

        if (opacity) {
            result = `rgba(${r},${g},${b},${opacity})`;
        } else {
            result = `rgb(${r},${g},${b})`;
        }

        return result;
    }
}