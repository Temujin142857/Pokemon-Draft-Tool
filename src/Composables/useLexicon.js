const Lexicon = {
    homeHeader: { en: "Welcome to DraftDex", fr: "Bienvenu au DraftDex" },
    headerLNG: { en: 'en', fr: 'fr' },
    home: {en: 'Home', fr: "Page d'Aqueuil"},
    roster: {en: 'Create Roster', fr: "Fait Roster"},
    matchup: {en: 'Matchup', fr: "Matchup"},
    moves: {en: 'Moves', fr: "Attaques"},
    social: {en: 'Social', fr: "Sociaux"},
    lng: {en: 'en', fr: "fr"},
};

export let lng='en';

export const getL = (key) => {
    if (!Lexicon[key]) return "";
    return Lexicon[key][lng] || "lexicon error";
};

export const swapLNG=(text)=>{
    lng=lng==='en' ? 'fr' : 'en';
    console.log(lng)
    for(const key in text){
        text[key]=getL(key);
    }
    return text;
}