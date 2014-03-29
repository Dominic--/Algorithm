function findTagsByName(list, name) 
{
    var tags = document.getElementsByTagName('pre');
   
    for (var i = 0; i < tags.length; i++) {
        if (tags[i].getAttribute('name') == name) {
            tags[i].className = 'array';
            list.push(tags[i]);
        }
    }
}


function init_array()
{
    var arrays = [];

    findTagsByName(arrays, 'array');

    for (var i = 0; i < arrays.length; i++) {
        var html = "";

        var ele = arrays[i].innerHTML.replace(/(^\s*)|(\s*$)/g, "").split(',');
        for (var j = 0; j < ele.length; j++) {
            if (ele[j].indexOf('C') == 0) {
                html += ('<span class="array-ele cyan">' + ele[j].replace('C', '') + '</span>');
            } 
            else if (ele[j].indexOf('O') == 0) {
                html += ('<span class="array-ele orange">' + ele[j].replace('O', '') + '</span>');
            }
            else if (ele[j].indexOf('G') == 0) {
                html += ('<span class="array-ele green">' + ele[j].replace('G', '') + '</span>');
            }
            else {
                html += ('<span class="array-ele">' + ele[j] + '</span>');
            }
        }

        arrays[i].innerHTML = html;

        width = ele.length * 50 + 80;
        arrays[i].style.width =  width + "px";
    }
}

function init_tree()
{
    var trees = [];

    findTagsByName(trees, 'tree');
}
