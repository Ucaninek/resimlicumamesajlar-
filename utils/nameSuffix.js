module.exports = {
    SUFFIX_TYPES: {
        A: '0',
        B: '1'
    },
    getSuffix(name, type) {

        switch (type) {
            case this.SUFFIX_TYPES.A:
                if (name.endsWith('em') || name.endsWith('im') || name.endsWith('iş') || name.endsWith('er') || name.endsWith('en')) return 'e';
                else if (name.endsWith('n') || name.endsWith('m') || name.endsWith('k') || name.endsWith('ış') || name.endsWith('ar')) return 'a';
                else if (name.endsWith('ı')) return 'na';
                else if (name.endsWith('i') || name.endsWith('e')) return 'ye';
                else if (name.endsWith('a')) return 'ya';
                else return 'a';
                break;
            case this.SUFFIX_TYPES.B:
                if (name.endsWith('an')) return 'ı';
                else if (name.endsWith('n') || name.endsWith('m')) return 'i';
                else if (name.endsWith('i') || name.endsWith('e')) return 'yi';
                else if (name.endsWith('a')) return 'yı';
                else if (name.endsWith('t')) return 'u';
                else return 'ı';
                break;
            default:
                return 'a';
                break;
        }

    }
}