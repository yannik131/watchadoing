/* global L */
import PositionFactory from "./positionFactory";

class Bubble {
    constructor(pathElement, svgElement, svgEdgeLengthPx, activity) {
        this.svgPathElement = pathElement;
        this.svgElementOnMap = svgElement;
        this.svgEdgeLengthPx = svgEdgeLengthPx;
        this.activity = activity;
        
        this.title = this.addText(activity.name, { position: 'top'});
        this.subtitle = this.addText(activity.likeCount, { position: 'bottom' });
    }
    
    addText(text, { position }) {
        const fontSize = this.svgEdgeLengthPx/10;
        const newText = document.createElementNS(this.xmlNamespace, "text");
        newText.setAttribute("font-size", fontSize);
        newText.setAttribute("font-weight", "bold");
        newText.setAttribute("fill", "white");
        newText.id = `bubble-header-${this.bubbleCount}`;
        
        const textNode = document.createTextNode(text);
        
        newText.appendChild(textNode);
        this.svgElementOnMap.appendChild(newText);
        
        const bubbleWidth = this.svgPathElement.getBoundingClientRect().width;
        const bubbleHeight = this.pathElement.getBoundingClientRect().height;
        
        const textWidth = newText.getBoundingClientRect().width;
        const textHeight = newText.getBoundingClientRect().height;
        
        newText.setAttribute('x', svgEdgeLengthPx/2*(1-textWidth/bubbleWidth));
        
        if(position === 'top') {
            newText.setAttribute('y', svgEdgeLengthPx/2*(1-textHeight/bubbleHeight));
        }
        else if(position === 'bottom') {
            newText.setAttribute('y', svgEdgeLengthPx/2*(1+textHeight/bubbleHeight));
        }
        else {
            throw position;
        }
        
        return newText;
    }
    
    addClickEventListener() {
        //TODO: Do I need to create N tooltip divs for N bubbles or is 1 enough?
        document.addEventListener('click', (event) => {
            const rect = this.svgPathElement.getBoundingClientRect();
            const x = event.clientX;
            const y = event.clientY;
            
            if (x < rect.left || 
                x >= rect.right || 
                y < rect.top || 
                y >= rect.bottom) {
                return;
            }
            
            const tooltip = document.getElementById(bubbleId + '-tooltip');
                
            this.popper = createPopper(
                document.getElementById(bubbleId), 
                tooltip, 
                {
                    placement: 'bottom',
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 8]
                            }
                        }
                    ]
                }
            );
            
            for(const div of document.getElementsByClassName('tooltip')) {
                if(div === tooltip) {
                    continue;
                }
                div.classList.add('hidden');
            }
            
            tooltip.classList.toggle('hidden');
            this.popper.update();
        });

export default class BubbleFactory {
    constructor(map) {
        this.map = map;
        this.bubbleCount = 0;
        this.svgEdgeLengthPx = 601;
        this.xmlNamespace = 'http://www.w3.org/2000/svg';
        this.popper = null;
        this.bubbleSVG = require('../svg/bubble.svg');
        
        map.addEventListener('move', () => {
            if(this.popper) {
                popper.update();
            }
        });
    }
    
    setCenter(latitude, longitude) {
        this.center = [latitude, longitude];
    }
    
    createBubbles(activities, edgeLengthPx = 150) {
        const center = map.latLngToLayerPoint(this.center);
        this.positionFactory = new PositionFactory(center.x, center.y, edgeLengthPx);
        this.bubbles = [];
        
        activities.sort((a, b) => {
            return b.likeCount - a.likeCount;
        });
        
        this.maxLikes = activities[0].likeCount;
        this.bubbleCount = 0;
        
        for(const activity of activities) {
            this.createBubble(activity);
        }
    }
    
    createBubble(activity) {
        const position = this.positionFactory.getRandomPosition();
            
        const lowerLeftCornerLatLng = map.layerPointToLatLng([position[0]-edgeLengthPx/2, position[1]-edgeLengthPx/2]);
        const upperRightCornerLatLng = map.layerPointToLatLng([position[0]+edgeLengthPx/2, position[1]+edgeLengthPx/2]);
        
        const size = activity.likeCount / this.maxLikes;
        
        //viewBox parameters
        const width = 1/size * this.svgEdgeLengthPx;
        const xmin = this.svgEdgeLengthPx/2*(-1/size + 1);
        
        const maxXmin = 0;
        const minXmin = 2*xmin;
        const minYmin = xmin;
        const maxYmin = -xmin;
        
        const svgElement = document.createElementNS(this.xmlNamespace, 'svg');
        svgElement.setAttribute('xmlns', this.xmlNamespace);
        svgElement.setAttribute(
            'viewBox', `${getRandomFloat(minXmin, maxXmin)} ${getRandomFloat(minYmin, maxYmin)} ${width} ${this.svgEdgeLengthPx}`);
            
        const bubbleId = `bubble-${this.bubbleCount}`;
        svgElement.innerHTML = this.bubbleSVG.replace('bubble-N', bubbleId);
        
        L.svgOverlay(svgElement, [lowerLeftCornerLatLng, upperRightCornerLatLng], {
            interactive: true
        }).addTo(map);
        
        addBubbleText(title, svgElement, this.svgEdgeLengthPx);
        addBubbleText(subtitle, svgElement, this.svgEdgeLengthPx, false);
        
        ++bubbleCount;
        
        return svgElement;
    }
