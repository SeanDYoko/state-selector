import State from './State'

class Country {
    code: string
    name: string
    states: State[]

    constructor(code: string, name: string)
    {
        this.code = code;
        this.name = name;
    }
};

export default Country