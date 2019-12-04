<?php
$z[0]=Array("field","",238,257);
$z[0][4]=array();
$z[0][4]['name']="title";
$z[1]=Array("global","",258,284);
$z[1][4]=array();
$z[1][4]['name']="cfg_webname";
$z[2]=Array("field","",325,354);
$z[2][4]=array();
$z[2][4]['name']="keywords";
$z[3]=Array("field","",394,452);
$z[3][4]=array();
$z[3][4]['name']="description";
$z[3][4]['function']="html2text(@me)";
$z[4]=Array("include","",1496,1531);
$z[4][4]=array();
$z[4][4]['filename']="head.htm";
$z[5]=Array("global","",2234,2259);
$z[5][4]=array();
$z[5][4]['name']="cfg_cmsurl";
$z[6]=Array("type"," <a href=\"[field:typelink/]\" class=\"file ico trans fl middle wow fadeInUp\">[field:typename/]</a>",2670,2801);
$z[6][4]=array();
$z[6][4]['typeid']="12";
$z[7]=Array("global","",2843,2864);
$z[7][4]=array();
$z[7][4]['name']="cfg_qq";
$z[8]=Array("list","\r\n        <div [field:global runphp='yes' name=autoindex]\r\n            \$a=\"class='item wow fadeInUp fr'\";\r\n            \$b=\"class='item wow fadeInUp fl'\";\r\n            if ((@me%2)==0 && @me!=30) @me=\$a;\r\n            else  @me=\$b;\r\n            [/field:global]>\r\n        <div class=\"date fl\">\r\n          <div class=\"year\">[field:pubdate function=\"MyDate('Y',@me)\"/]</div>\r\n          <div class=\"day\">[field:pubdate function=\"MyDate('m-d',@me)\"/]</div>\r\n        </div>\r\n        <div class=\"info fl\">\r\n          <div class=\"name text-over\"><a href=\"[field:arcurl/]\" class=\"trans\">[field:title/]</a></div>\r\n          <div class=\"brief over\">[field:description function=\"cn_substr(@me,500)\"/]...</div>\r\n        </div>\r\n      </div>\r\n      ",3034,3803);
$z[8][4]=array();
$z[8][4]['pagesize']="6";
$z[9]=Array("pagelist","",3868,3924);
$z[9][4]=array();
$z[9][4]['listitem']="pre,next,pageno";
$z[9][4]['listsize']="5";
$z[10]=Array("include","",4074,4111);
$z[10][4]=array();
$z[10][4]['filename']="footer.htm";

?>