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

    /**
     * For converting #1 to #001 and #10 to #010
     * 
     * @param {Number} index 
     * @returns {String} modifiedIndex 
     */
    static getPokemonNumber(index) {
        const length = index.toString().length;

        if (length === 1) {
            return `00${index}`;
        } else if (length === 2) {
            return `0${index}`;
        } else {
            return index;
        }
    }

    // To convert '-' and '_' separated words into camelCase
    static toCamelCase(string) {
        return string.replace(/([-_][a-z])/ig, ($1) => {
            return $1.toUpperCase()
                .replace('-', '')
                .replace('_', '');
        });
    };

    /**
     * Decamelizes a string
     * 
     * @param {String} str 
     * @returns {String} String in camelCase
     */
    static deCamelize(str) {
        if (str === 'hp') return 'HP';
        return str
            // insert a space before all caps
            .replace(/([A-Z])/g, ' $1')
            // uppercase the first character
            .replace(/^./, function (str) { return str.toUpperCase(); })
    }

    // To convert '-', '_' and ' ' separated words into camelCase
    static toCapitalize(string) {
        return string
            .toLowerCase()
            .split(/-| |_/)
            .map(s => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
    }

    /**
     * Convert value to percentage W.R.T 200
     * 
     * @param {Number} value
     * 
     * @returns {Number} converted percentage
     */
    static convertToPercentage(value) {
        return Math.floor((value / 200) * 100);
    }

    /**
     * Get ID from URL provide URL is of format
     * "https://pokeapi.co/api/v2/pokemon/1/" will return 1
     *
     * @param {String} url
     *
     * @returns {String} ID
     */
    static splitIdFromURL(url) {
        return url.split('/').slice(-2, -1)[0];
    }
}

export const TYPE_COLORS = {
    bug: '#B1C12E',
    dark: '#4F3A2D',
    dragon: '#755EDF',
    electric: '#FCBC17',
    fairy: '#F4B1F4',
    fighting: '#994025',
    fire: '#E73B0C',
    flying: '#A3B3F7',
    ghost: '#6060B2',
    grass: '#74C236',
    ground: '#D3B357',
    ice: '#A3E7FD',
    normal: '#C8C4BC',
    poison: '#934594',
    psychic: '#ED4882',
    rock: '#B9A156',
    steel: '#B5B5C3',
    water: '#3295F6'
};