/*eslint-disable */


export const PLAYER_DIRECTION = Object.freeze({
    UP: 0,
    RIGHT: 1,
    DOWN: 2,
    LEFT: 3,
})


export function getPlayerDirection(direction){
    switch(direction){
        case PLAYER_DIRECTION.UP: 
            return "up"
        case PLAYER_DIRECTION.LEFT: 
            return "left"
        case PLAYER_DIRECTION.DOWN:
            return "down"
        case PLAYER_DIRECTION.RIGHT:
            return "right"
    }
}

export function checkValue(value){
    return ["", NaN, undefined].includes(value)
}