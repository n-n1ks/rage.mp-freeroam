$(document).on('ready', function() {
    $('.collapse_child').each(function(index, item) {
        $(item).css('display', 'none');
    });
});

$(document).on('click', '.collapse_parent', function() {
    let child = $(this).data('child');
    let parent = $(this).data('parent');
    $('.collapse_parent').each(function(index, item) {
        if ($(item).data('parent') == parent) {
            $($(item).data('child')).slideUp(250);
        }
    });
    if ($(child).css('display') == 'none')
        $(child).slideDown(250);
    else
        $(child).slideUp(250);
});
