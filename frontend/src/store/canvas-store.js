export const canvasStore = {
state: {
    currCanvas: null
},
getters:{
    canvas(state) {
        return state.currCanvas
    }
},
mutations:{
    setCanvas(state, {canvasImg}){
        state.currCanvas=canvasImg
    }
}
}