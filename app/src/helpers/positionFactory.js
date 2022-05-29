import { getRandomInteger, shuffleArray } from './utils';

let positionFactory = null;

export default class PositionFactory {
    constructor(centerX, centerY, edgeLength) {
        this.centerX = centerX;
        this.centerY = centerY;
        this.edgeLength = edgeLength;
        
        //Distance from the center of the position matrix
        this.positionLevel = 1;
        this.randomPositions = [
            [this.centerX, this.centerY]
        ];
    }
    
    static set(centerX, centerY, edgeLength) {
        if(centerX && centerY && edgeLength) {
            positionFactory = new PositionFactory(centerX, centerY, edgeLength);
        }
        else {
            throw 'Not enough arguments';
        }
    }
    
    static get() {
        if(positionFactory === null) {
            throw 'Not initialized yet';
        }
        return positionFactory;
    }
    
    generateRandomPositions() {
        if(this.randomPositions.length > 0) {
            return;
        }
        const newPositions = [];
        
        for(const i of [-this.positionLevel, this.positionLevel]) {
            for(let j = -this.positionLevel; j <= this.positionLevel; ++j) {
                newPositions.push(
                    [this.centerX+i*this.edgeLength, this.centerY+j*this.edgeLength]
                );
            }
        }
        for(let i = -this.positionLevel+1; i <= this.positionLevel-1; ++i) {
            newPositions.push(
                [this.centerX+i*this.edgeLength, this.centerY-this.positionLevel*this.edgeLength],
                [this.centerX+i*this.edgeLength, this.centerY+this.positionLevel*this.edgeLength]
            );
        }
        
        const removeCount = 0;//getRandomInteger(Math.ceil(0.2*newPositions.length), Math.ceil(0.5*newPositions.length));
        for(let i = 0; i < removeCount; ++i) {
            newPositions.splice(getRandomInteger(0, newPositions.length-1), 1);
        }
        shuffleArray(newPositions);
        this.randomPositions.push(...newPositions);
        ++this.positionLevel;
    }
    
    getRandomPosition() {
        this.generateRandomPositions();
        return this.randomPositions.shift();
    }
}