(function() {
    var myFrames = Array.from(window.parent.frames);
    
    myFrames.forEach(function(frameItem) {
        var form = frameItem.document.getElementsByTagName('form')[0];
        form.addEventListener('submit', function($event) {
            $event.preventDefault();

            var myForm = $event.target;
            
            var event = new CustomEvent('message', { detail: myForm });
            window.parent.document.dispatchEvent(event);
            // $event.target.querySelector('textarea').value = '';
        })
    });

    window.parent.document.addEventListener('message', function($event) {
        var myElement = $event.detail;
        var myText = '';
        var framesListItems = Array.from(window.parent.frames);
        if(myElement.hasAttribute('id') && myElement.id === 'frame1-form') {
            myText = myElement.querySelector('textarea').value;
            framesListItems[1].document.querySelector('form textarea').value = myText;
        } else {
            myText = myElement.querySelector('textarea').value;
            framesListItems[0].document.querySelector('form textarea').value = myText;
        }
    });
})()