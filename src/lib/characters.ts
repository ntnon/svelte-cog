import type { ICharacter } from "./interfaces";

export const narrator: ICharacter = {
    name: 'Narrator',
    char: '📖Narrator',
    talkingSpeed: 1,
    symbol: '📖'
}

export const king: ICharacter = {
    name: 'King',
    char: '🤴🏾King',
    talkingSpeed: 1,
    symbol: '🤴🏾'
}

export const academic: ICharacter = {
    name: 'Academic',
    char: '🧑🏽‍🏫Academic',
    talkingSpeed: 1,
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
    talkingSpeed: 15,
    symbol: '🙋🏼‍♂️'
};

export const wizard: ICharacter = {
    name: 'Wizard',
    char: '🧙🏻‍♂️Wizard',
    talkingSpeed: 1,
    symbol: '🧙🏻‍♂️'
};

export const guy: ICharacter = {
    name: 'Guy',
    char: '🤵🏾‍♂️Guy',
    talkingSpeed: 1,
    symbol: '🤵🏾‍♂️'
};

export const doctor: ICharacter = {
    name: 'Doctor',
    char: '👩🏽‍⚕️Doctor',
    talkingSpeed: 1,
    symbol: '👩🏽‍⚕️'
};

export const scientist: ICharacter = {
    name: 'Scientist',
    char: '🧑🏼‍🔬Scientist',
    talkingSpeed: 1,
    symbol: '🧑🏼‍🔬'
}


export const allCharacters: ICharacter[] = [
    king, academic, mayor, neighbor, narrator, wizard, guy, doctor, scientist
]