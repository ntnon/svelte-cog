import type { ICharacter } from "./interfaces";

export const narrator: ICharacter = {
    name: 'Narrator',
    char: '📖Narrator',
    talkingSpeed: 45,
    symbol: '📖'
}

export const king: ICharacter = {
    name: 'King',
    char: '🤴🏾King',
    talkingSpeed: 55,
    symbol: '🤴🏾'
}

export const academic: ICharacter = {
    name: 'Academic',
    char: '🧑🏽‍🏫Academic',
    talkingSpeed: 35,
    symbol: '🧑🏽‍🏫'

}
export const mayor: ICharacter = {
    name: 'Mayor',
    char: '👩🏼‍💼Mayor',
    talkingSpeed: 20,
    symbol: '👩🏼‍💼'
};
export const neighbor: ICharacter = {
    name: 'Neighbor',
    char: '🙋🏼‍♂️Neighbor',
    talkingSpeed: 55,
    symbol: '🙋🏼‍♂️'
};

export const wizard: ICharacter = {
    name: 'Wizard',
    char: '🧙🏻‍♂️Wizard',
    talkingSpeed: 20,
    symbol: '🧙🏻‍♂️'
};

export const guy: ICharacter = {
    name: 'Guy',
    char: '🤵🏾‍♂️Guy',
    talkingSpeed: 35,
    symbol: '🤵🏾‍♂️'
};
export const guyBalloon: ICharacter = {
    name: 'Guy',
    char: '🎈🤵🏾‍♂️🎈Guy',
    talkingSpeed: 35,
    symbol: '🎈🤵🏾‍♂️🎈'
};

export const doctor: ICharacter = {
    name: 'Doctor',
    char: '👩🏽‍⚕️Doctor',
    talkingSpeed: 35,
    symbol: '👩🏽‍⚕️'
};

export const scientist: ICharacter = {
    name: 'Scientist',
    char: '🧑🏼‍🔬Scientist',
    talkingSpeed: 35,
    symbol: '🧑🏼‍🔬'
}

export const farmer: ICharacter = {
    name: 'Farmer',
    char: '👩🏻‍🌾Farmer',
    talkingSpeed: 35,
    symbol: '👩🏻‍🌾'
}

export const detective: ICharacter = {
    name: 'Detective',
    char: '🕵️‍♂️Detective',
    talkingSpeed: 35,
    symbol: '🕵️‍♂️'
}

export const artist: ICharacter = {
    name: 'Artist',
    char: '👨🏾‍🎨Artist',
    talkingSpeed: 35,
    symbol: '👨🏾‍🎨'
}

export const chef: ICharacter = {
    name: 'Chef',
    char: '🧑🏻‍🍳Chef',
    talkingSpeed: 35,
    symbol: '🧑🏻‍🍳'
}

export const allCharacters: ICharacter[] = [
    king, chef, academic, farmer, mayor, neighbor, narrator, detective, wizard, guy, doctor, scientist, artist
]