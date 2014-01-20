window.onload = function() {
    var R = Raphael("paper", 300, 300);
    var attr = {
        fill: "#333",
        stroke: "#666",
        "stroke-width": 1,
        "stroke-linejoin": "round" , 
        "s":'ss'
    };
    var aus = {};
    aus.tas = R.path(mapArea2SvgPath(pp)).attr(attr);
    for (var state in aus) {
        aus[state].color = Raphael.getColor();
        (function(st, state) {
            switchBgColor(st, R, "red,blue,green,yellow,#FFFFFF", 50);
        })(aus[state], state);
    }
};
var pp = '347,8,344,10,343,12,343,16,343,17,343,18,341,19,338,20,337,19,334,20,330,20,327,21,326,22,324,23,322,25,317,28,314,32,312,35,309,36,308,37,307,37,302,37,302,42,300,45,301,48,302,49,303,50,303,52,303,54,302,54,301,54,299,55,298,55,296,55,296,56,294,56,293,56,291,57,289,57,288,58,286,58,285,58,283,59,282,59,281,59,279,60,277,60,276,60,274,60,273,60,272,61,270,62,268,63,266,63,267,65,269,67,271,70,270,71,270,72,271,72,272,73,273,73,275,74,276,75,277,75,278,76,279,76,279,78,280,78,281,80,281,81,280,82,279,82,278,82,277,83,276,83,275,84,274,85,274,86,274,87,275,87,276,88,278,88,278,89,278,90,278,91,279,92,279,94,277,94,277,94,276,95,275,94,273,93,272,93,271,93,270,93,269,93,268,93,267,92,265,92,265,93,264,93,263,94,261,94,258,93,256,92,255,92,254,92,253,91,251,91,250,90,249,91,248,90,247,89,245,89,244,89,243,89,242,89,240,89,238,89,237,90,236,90,233,91,232,90,230,90,230,90,228,90,227,91,226,91,225,91,223,91,222,91,220,92,219,92,218,92,217,93,216,93,215,95,214,95,214,97,213,97,211,98,209,98,208,99,207,99,205,98,204,98,203,98,202,98,200,98,199,99,198,100,196,100,193,101,191,103,189,103,188,103,187,103,186,103,184,103,183,103,182,103,180,103,179,103,178,103,176,103,175,102,174,102,174,100,172,99,171,99,170,100,169,99,168,99,167,99,166,99,165,100,164,101,163,101,162,102,161,103,160,104,159,105,157,105,155,105,154,104,154,103,153,103,151,103,150,103,149,103,148,104,147,104,146,103,145,104,144,103,142,103,141,102,140,103,139,103,139,105,138,105,137,107,136,107,135,110,134,110,133,111,133,112,133,114,132,115,131,115,130,115,129,115,127,115,126,115,125,115,124,115,123,116,122,117,122,116,121,116,120,115,119,115,118,114,117,114,116,114,116,113,115,114,114,113,113,113,113,112,112,111,112,110,112,109,112,108,111,108,111,107,110,106,110,105,109,105,109,103,110,103,110,102,109,102,108,102,107,102,106,101,105,102,104,102,103,102,102,102,101,102,100,101,99,101,98,101,97,101,96,100,95,100,94,100,93,99,93,99,92,98,91,98,91,97,90,96,89,96,88,97,87,97,86,97,85,97,85,96,85,95,84,95,83,95,82,94,83,93,84,92,83,91,83,90,83,89,83,88,82,88,82,87,81,86,80,85,79,85,78,85,77,86,76,85,76,84,75,83,74,83,73,83,72,82,71,82,70,82,69,82,68,82,67,82,66,81,65,81,64,81,63,81,63,80,64,79,65,79,66,78,67,79,68,79,69,78,70,78,71,78,72,77,72,76,71,76,70,75,69,74,69,73,70,72,69,71,69,70,69,69,68,69,68,68,67,66,67,65,68,64,68,64,68,63,67,62,66,62,65,61,64,61,63,61,62,61,61,61,60,60,59,61,58,61,57,62,56,62,55,61,54,61,54,60,53,60,52,59,52,58,53,58,54,57,55,57,55,56,54,56,53,55,53,54,52,53,51,53,50,53,51,52,51,51,52,50,53,50,54,49,55,48,55,48,56,47,55,46,56,45,56,44,57,43,57,42,58,42,59,42,60,42,61,42,62,42,63,41,64,40,65,40,66,39,67,39,68,39,68,38,68,37,69,37,70,37,71,37,72,37,73,37,74,37,75,36,76,36,76,35,77,35,78,35,78,36,79,37,79,38,79,39,80,39,81,39,82,39,82,38,83,39,84,38,85,38,86,38,87,38,88,38,89,38,90,37,90,36,91,35,92,34,91,33,92,33,93,32,93,31,94,31,95,30,96,29,97,29,98,30,99,30,100,30,101,30,101,29,101,28,101,27,102,27,103,27,104,27,105,27,106,26,106,25,107,25,108,24,109,24,110,25,110,24,111,24,112,25,113,25,114,25,115,25,116,24,117,24,118,24,119,23,120,23,121,22,122,22,122,21,123,21,124,21,125,20,126,20,127,19,128,19,129,19,130,19,131,19,132,19,133,18,133,17,134,17,135,16,135,15,136,15,137,15,138,14,138,13,138,13,138,12,138,11,138,10,137,9,138,8,138,8,138,7,139,7,140,6,141,6,142,6,142,5,141,5,140,4,141,3,142,3,143,3,144,2,145,2,145,2,145,1,144,0,144,-1,145,-2,144,-3,144,-3,143,-4,143,-5,142,-6,142,-7,141,-8,141,-9,140,-10,140,-11,140,-12,140,-13,140,-14,139,-15,140,-16,140,-17,139,-18,138,-18,137,-19,136,-19,135,-19,134,-20,134,-20,134,-21,135,-21,136,-22,137,-22,138,-22,139,-22,140,-22,141,-23,142,-23,143,-23,144,-23,145,-23,146,-23,147,-24,148,-24,149,-24,150,-24,151,-25,152,-25,153,-25,154,-25,155,-25,156,-26,157,-26,158,-27,159,-26,160,-26,161,-25,162,-25,162,-24,163,-25,164,-25,165,-25,167,-24,168,-24,168,-25,168,-26,167,-27,166,-28,165,-28,164,-29,164,-30,165,-31,165,-32,165,-33,165,-34,166,-34,167,-35,167,-36,168,-37,168,-38,169,-38,169,-39,170,-40,170,-41,171,-42,171,-43,171,-44,172,-45,172,-46,173,-47,173,-48,174,-49,174,-50,175,-50,176,-50,177,-50,178,-50,179,-49,180,-49,181,-49,182,-48,183,-48,184,-48,185,-47,186,-47,187,-47,188,-47,189,-47,190,-48,191,-47,192,-47,193,-47,194,-47,195,-47,196,-48,197,-48,198,-48,199,-48,200,-48,201,-48,202,-48,203,-48,204,-48,205,-48,206,-48,207,-49,208,-50,208,-50,209,-51,209,-52,208,-53,208,-54,208,-55,207,-56,207,-57,207,-58,207,-59,207,-60,207,-61,207,-62,207,-63,208,-64,209,-65,209,-65,210,-66,212,-66,213,-66,214,-66,215,-66,216,-66,217,-67,218,-67,219,-67,220,-67,221,-68,222,-69,223,-70,222,-71,223,-71,223,-72,222,-73,223,-74,224,-74,225,-75,226,-75,227,-75,228,-75,229,-75,230,-75,231,-75,232,-74,232,-75,233,-75,234,-75,235,-76,236,-75,237,-74,237,-73,236,-73,235,-72,236,-71,237,-71,238,-70,239,-70,240,-70,239,-69,238,-68,239,-68,240,-67,241,-67,242,-67,243,-66,244,-66,245,-65,246,-65,246,-64,246,-63,247,-63,248,-62,249,-62,250,-62,251,-62,252,-61,253,-60,254,-60,255,-60,255,-61,256,-61,258,-61,259,-61,259,-60,260,-59,261,-59,261,-58,263,-58,264,-58,264,-59,265,-59,265,-58,266,-57,267,-57,268,-57,269,-56,270,-55,270,-54,270,-53,271,-52,271,-51,272,-51,272,-50,273,-49,274,-48,274,-47,276,-47,276,-47,277,-46,277,-44,278,-44,278,-42,278,-42,278,-40,277,-39,276,-39,277,-38,277,-37,278,-36,278,-35,277,-34,275,-33,275,-32,274,-31,274,-30,273,-29,273,-28,274,-27,275,-26,275,-25,276,-25,276,-24,277,-24,278,-24,279,-24,280,-24,282,-23,283,-23,284,-23,285,-23,286,-22,287,-23,289,-23,290,-23,291,-23,292,-23,293,-22,294,-22,295,-22,296,-22,297,-22,298,-22,299,-22,301,-22,302,-22,303,-22,304,-22,305,-22,306,-22,308,-21,309,-21,310,-21,311,-21,312,-20,313,-20,314,-19,316,-19,317,-18,318,-18,319,-17,320,-16,321,-16,322,-15,323,-15,324,-14,325,-14,326,-13,327,-13,328,-13,329,-12,330,-12,332,-12,333,-12,335,-12,334,-11,334,-10,334,-9,335,-9,336,-9,337,-8,337,-7,338,-6,338,-5,339,-4,339,-3,340,-2,340,-1,341,0,341,1,341,1,342,2,343,3,344,3,345,4,346,5,347,5,347,6,347,7';

function mapArea2SvgPath(path) {
    var arr = path.split(',');
    var p = ' M ' + arr.shift() + ',' + arr.shift();
    var len = arr.length;
    for (var i = 0; i < len; i += 2) {
        p += ' L ' + arr[i] + ',' + arr[i + 1];
    }
    return p;
};

function switchBgColor(st, R, colors, time) {
    var num = 0;
    var arr = colors.split(",");
    var len = arr.length;

    function renderBgColor() {
        st.animate({
            fill: arr[num],
            stroke: "#666"
        }, time);
        st.toFront();
        R.safari();
        if (num === len - 1)
            num = 0;
        else
            num++;
    };
    setTimeout(function() {
        renderBgColor();
    }, time);
    setInterval(function() {
        renderBgColor();
    }, time * len);
};

