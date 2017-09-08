// Max z-index.
let maxZ = 0;
// Current draggable window.
let draggableWindow = null;
// Offsets.
let offX = 0;
let offY = 0;
// Position.
var width = Math.max(document.documentElement.clientWidth,
    window.innerWidth || 0);
var height = Math.max(document.documentElement.clientHeight,
    window.innerHeight || 0);

// On DOM ready.
$(document).ready(function() {
    let windows = $('.draggable_window');
    windows.each(function(index, item) {
        // Setting z-index.
        $(item).css('z-index', index);
        // Settings max width and height.
        let w = parseFloat($(item).css('width'))/width*100 + 'vw';
        let h = parseFloat($(item).css('height'))/height*100 + 'vh';
        $(item).css('min-width', w);
        $(item).css('min-height', h);
        // Visiblity.
        if (!$(item).data('visible')) {
            $(item).hide();
        }
    });

    maxZ = windows.length - 1;
});

// Press on the window.
$(document).on('mousedown', '.draggable_window', function() {
    $(this).css('z-index', ++maxZ);
});

// Press on the window header.
$(document).on('mousedown', '.window_header', function(e) {
    // Window.
    let currentWindow = $(this).parent();
    // Position.
    let position = $(currentWindow).offset();
    // Settings offsets.
    offX = e.pageX - position.left;
    offY = e.pageY - position.top;
    // If window is draggable.
    if ($(currentWindow).data('movable')) {
        $(this).css('margin', '0');
        draggableWindow = currentWindow;
        $(this).css('cursor', 'move');
    }

});

// Unpress header.
$(document).mouseup(function() {
    if (draggableWindow) {
        // Меняем курсор на стандартный.
        $(draggableWindow).children('.window_header').css('cursor', 'default');
        draggableWindow = null;
    }
});

// If window is draggable - drag it.
$(document).mousemove(function(ev) {
    if (draggableWindow) {
        $(draggableWindow).css('left', ev.pageX - offX + 'px');
        $(draggableWindow).css('top', ev.pageY - offY + 'px');
    }
});

// Close the window.
$(document).on('click', '.close_window', function() {
    let currentWindow = $(this).parent().parent();
    $(currentWindow).fadeOut(250);
    $(currentWindow).data('active', 'false');
});

// Creating window.
$(document).on('click', '.btn', function() {
    let child = $(this).data('child');
    if (child && $(child).css('display') == 'none') {
        // Center the window.
        $(child).css('top', Math.max(0, (($(window).height() - $(child).outerHeight()) / 2) + $(window).scrollTop()) + 'px');
        $(child).css('left', Math.max(0, (($(window).width() - $(child).outerWidth()) / 2) + $(window).scrollLeft()) + 'px');
        // Z-index
        $(child).css('z-index', ++maxZ);
        // Show.
        $(child).fadeIn(250);
        $(child).data('active', 'true');
    }
});
