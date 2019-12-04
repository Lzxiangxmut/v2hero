<div [field:global runphp='yes' name=autoindex]
            $a="class='item border-box over wow fadeInUp fr'";
            $b="class='item border-box over wow fadeInUp fl'";
            if ((@me%2)==0 && @me!=30) @me=$a;
            else  @me=$b;
            [/field:global]>
        <div class="relative clean">
          <div class="cover fl relative"> <img src="/skin/images/notebook.png" alt="[field:title/]" class="trans max-w100" ondragstart="return false;">
            <div class="img absolute text-center fz0"><img src="[field:picname/]" alt="[field:title/]" class="trans" ondragstart="return false;"></div>
          </div>
          <div class="info fl">
            <div class="clean">
              <div class="logo fl text-center over fz0"><img src="[field:picname/]" alt="[field:title/]" class="middle max-w100 inline-block"><span class="middle-span"></span></div>
              <div class="title fl">
                <div class="name">[field:title/]</div>
                <div class="date">合作时间:[field:pubdate function="MyDate('Y/m/d',@me)"/]</div>
              </div>
            </div>
            <div class="brief over">[field:description function="cn_substr(@me,300)"/]...</div>
            <a href="[field:arcurl/]" class="view block text-center" rel="nofollow">查看内容</a> </div>
        </div>
      </div>