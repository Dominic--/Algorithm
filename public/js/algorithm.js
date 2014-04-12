function get_random_background()
{
    var list = ['rgba(255, 250, 205, 0.9)', 'aliceblue', 'rgba(250,235,215,0.9)',
                'azure', 'beige', 'blanchedalmond', 'rgba(222, 184, 135, 0.8)', 'rgba(95,158,160,0.8)',
                'rgba(255,248,220,0.9)', 'rgba(0,139,139,0.3)', 'rgba(169,169,169,0.4)', 'rgba(189,183,107,0.5)',
                'rgba(143,188,143,0.5)', 'ghostwhite', 'rgba(240,255,240,1)', 'rgba(230,230,250,0.8)', 'ivory',
                'lavenderblush', 'rgba(173,216,230,0.7)', 'rgba(240,128,128,0.2)', 'oldlace', 'rgba(175,238,238,0.4)',
                'rgba(255,192,203,0.3)', 'rgba(221,160,221,0.4)', 'whitesmoke'];
    var random = Math.floor(Math.random() * list.length);

    var nav_c = ['aliceblue', 'azure', 'black', 'honeydew', 'paleturquoise', 'palevioletred', 'plum'];
    var nav = Math.floor(Math.random() * nav_c.length);

    return list[random];
}

function get_random_nav()
{
    var list = ['aliceblue', 'azure', 'honeydew', 'paleturquoise', 'palevioletred', 'plum'];
    var random = Math.floor(Math.random() * list.length);

    return list[random];

}

function init_affix()
{
    var innerHtml = "";

    var hs = document.getElementsByTagName("h3");
    for (var i = 0; i < hs.length; i++) {
        if (i === 0)
            innerHtml += ('<li class="active"><a href="#' + hs[i].id + '">' + hs[i].innerHTML.replace(/<[^>]*>/g, "") + '</a></li>');
        else
            innerHtml += ('<li><a href="#' + hs[i].id + '">' + hs[i].innerHTML.replace(/<[^>]*>/g, "") + '</a></li>');
    }

    document.getElementById("my-affix").innerHTML = innerHtml;
}
