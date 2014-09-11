
function buildList(parent, branch)
{
    var listBranch = [];

    var elementsMenu = jQuery(parent).children('li');
    var label = '';
    var newBranch = Object();
    var listTemp = [];
    elementsMenu.each(function() {
        label = jQuery(jQuery(jQuery(this).children('a')).children('span')).html();

        if (jQuery(this).hasClass('parent')) {
            var childElementsMenu = jQuery(this).children('ul');
            newBranch.list = branch.list.slice(0);
            newBranch.value = branch.value;
            newBranch.label = branch.label;

            newBranch.list.push(this);
            newBranch.value = newBranch.value + '>' + label;
            newBranch.label = newBranch.label + '>' + label;
            var tempList = buildList(childElementsMenu, newBranch);
            listBranch = listBranch.concat(tempList);
        } else {
            listTemp = branch.list.slice(0);
            listTemp.push(this);

            listBranch.push({
                list: listTemp,
                value: branch.value + '>' + label,
                label: branch.value + '>' + label
            });
        }
    });
    return listBranch;
}

jQuery( document ).ready(function( $ ) {
    var nav = $('#nav');

    var list = buildList(nav, {
        list: [],
        value: '',
        label: ''
    });

    $(".help-search-menu").autocomplete({
        minLength: 0,
        source: list,
        select: function( event, ui ) {

            var list = ui.item.list;
            var item = list[list.length - 1];
            var a = $(item).children('a');
            document.location.href = $(a).attr('href');
            return false;
        },
        focus: function(event, ui) {
            var list = ui.item.list;
            $($("#nav").find('li')).removeClass('over');
            $($("#nav")).find('span').removeClass('select-menu');
            $($("#nav")).find('span').removeClass('select-menu-interim');

            for (var i = 0; i < list.length; i++) {
                if (i == list.length - 1) {
                    $($(list[i]).find('span')).addClass('select-menu');
                    continue;
                }

                $(list[i]).addClass('over');

                if (i == 0)
                    continue;

                var a = $(list[i]).children('a');
                var span = $(a).children('span');
                $(span).addClass('select-menu-interim');
            }

            return false;
        },
        close: function( event, ui ) {
            $($("#nav").find('li')).removeClass('over');
            $($("#nav")).find('span').removeClass('select-menu');
            $($("#nav")).find('span').removeClass('select-menu-interim');
        }
    });
});