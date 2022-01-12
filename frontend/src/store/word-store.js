import { wordService } from "../services/words.service.js";
export const wordStore = {
state: {
    currWords: wordService.getRandomWords(),
    // chosenWord: wordService.getChosenWord()
    chosenWord:wordService.getChosenWord()? wordService.getChosenWord().word : null,
    difficulty:wordService.getChosenWord()? wordService.getChosenWord().difficulty : null,
},
getters:{
    words(state) {
        return state.currWords
    },
    chosenWord(state){
        return state.chosenWord
    },
    difficulty(state){
        return state.difficulty
    }
},
mutations:{
    setWords(state){
        state.currWords.length=0
        state.currWords=wordService.getRandomWords()
    },
    setChosenWord(state,{wordAndDifficulty}){
        state.chosenWord=wordAndDifficulty.word
        state.difficulty=wordAndDifficulty.difficulty
    },
},
actions:{
    setGame({commit,state}){
        state.difficulty=null
        state.chosenWord=null
        commit({type:"setWords"})
    },
    async setChosenWord({commit},{wordAndDifficulty}){
        await wordService.setChosenWord(wordAndDifficulty)
        commit ({type:"setChosenWord", wordAndDifficulty })
    }
}
}