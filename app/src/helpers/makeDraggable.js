export default function makeDraggable(id) {
    const elmnt = document.getElementById(id);
    //C&P from:
    //https://www.w3schools.com/howto/howto_js_draggable.asp
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onmousedown = dragMouseDown;
    elmnt.ontouchstart = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        if(e.touches) {
            e = e.touches[0];
        }
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        elmnt.ontouchend = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
        elmnt.ontouchmove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        if(e.touches) {
            e = e.touches[0];
        }
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        elmnt.ontouchend = null;
        document.onmousemove = null;
        elmnt.ontouchmove = null;
    }
}