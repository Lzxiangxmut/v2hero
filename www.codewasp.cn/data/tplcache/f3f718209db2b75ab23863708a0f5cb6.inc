<div [field:global runphp='yes' name=autoindex]
            $a="class='item wow fadeInUp fr'";
            $b="class='item wow fadeInUp fl'";
            if ((@me%2)==0 && @me!=30) @me=$a;
            else  @me=$b;
            [/field:global]  class="item wow fadeInUp fl">
      <div class="date fl">
        <div class="year">[field:pubdate function="MyDate('Y',@me)"/]</div>
        <div class="day">[field:pubdate function="MyDate('m-d',@me)"/]</div>
      </div>
      <div class="info fl">
        <div class="name text-over"><a href="[field:arcurl/]" class="trans">[field:title/]</a></div>
        <div class="brief over">[field:description function="cn_substr(@me,500)"/]...</div>
      </div>
    </div>