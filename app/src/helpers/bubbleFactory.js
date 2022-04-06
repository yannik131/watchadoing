import { randomInteger } from './randomInteger';

class BubbleFactory {
    constructor() {
        const canvasSize = 5000;
        this.centerX = canvasSize+window.innerWidth/2;
        this.centerY = canvasSize+window.innerHeight/2;
        
        const maxSizeFactor = 0.25;
        this.maxSize = window.innerHeight < window.innerWidth? maxSizeFactor*window.innerHeight : maxSizeFactor*window.innerWidth;
        this.minSize = this.maxSize*0.5;
        
        //Distance from the center of the position matrix
        this.positionLevel = 1;
        this.randomPositions = [
            [this.centerX, this.centerY]
        ];
    }
    
    generateRandomPositions() {
        if(this.randomPositions.length > 0) {
            return;
        }
        const newPositions = [];
        for(const i of [-this.positionLevel, this.positionLevel]) {
            for(let j = -this.positionLevel; j <= this.positionLevel; ++j) {
                newPositions.push(
                    [this.centerX+i*this.maxSize, this.centerY+j*this.maxSize]
                );
            }
        }
        for(let i = -this.positionLevel+1; i <= this.positionLevel-1; ++i) {
            newPositions.push(
                [this.centerX+i*this.maxSize, this.centerY-this.positionLevel*this.maxSize],
                [this.centerX+i*this.maxSize, this.centerY+this.positionLevel*this.maxSize]
            );
        }
        
        const removeCount = randomInteger(0.2*newPositions.length, Math.ceil(0.5*newPositions.length));
        for(let i = 0; i < removeCount; ++i) {
            newPositions.splice(randomInteger(0, newPositions.length-1), 1);
        }
        this.randomPositions.push(...newPositions);
        ++this.positionLevel;
    }
    
    getRandomPosition() {
        this.generateRandomPositions();
        return this.randomPositions.shift();
    }
    
    bubbleSize(relativeSize) {
        const size = relativeSize * this.maxSize;
        return size < this.minSize? this.minSize : size;
    }
    
    createBubble(relativeSize) {
        const size = this.bubbleSize(relativeSize);
        const position = this.getRandomPosition();
        
        const wiggleRoom = (this.maxSize-size)/2;
        const x = position[0]-size/2 + randomInteger(-wiggleRoom, wiggleRoom);
        const y = position[1]-size/2 + randomInteger(-wiggleRoom, wiggleRoom);
        
        return {
            x,
            y,
            size
        };
    }
}

export const bubbleFactory = new BubbleFactory();