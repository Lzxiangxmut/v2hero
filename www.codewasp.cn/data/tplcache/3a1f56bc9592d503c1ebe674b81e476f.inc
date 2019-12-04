[field:global runphp='yes' name=autoindex]
          $a="
          <div class='item inline-block relative wow fadeInUp last'>";
            $b="
            <div class='item inline-block relative wow fadeInUp'>";
              if ((@me%3)==0 && @me!=18)  @me=$a;
              else  @me=$b;
              [/field:global]
              <div class="main">
                <div class="cover scale relative"> <img src="/skin/images/notebook.png" alt="[field:title/]" class="trans scale-img max-w100">
                  <div class="img absolute text-center fz0"><img src="[field:picname/]" alt="[field:title/]" class="trans scale-img"></div>
                  <div class="opt absolute trans over hide768">
                    <div class="button-bg border-box clean"> <a href="[field:arcurl/]" class="button fl trans text-center" rel="nofollow">预览</a> <a href="[field:arcurl/]" class="links fr trans"><i></i>详细</a> </div>
                  </div>
                </div>
                <div class="info clean">
                  <div class="left fl">
                    <div class="name">[field:title/]</div>
                    <div class="category"></div>
                  </div>
                </div>
              </div>
              <div class="mask trans"></div>
              <div class="opt-msg trans over"> <a href="[field:arcurl/]" class="block trans text-center" rel="nofollow">预览</a> <a href="[field:arcurl/]" class="block trans text-center"><i></i>详细</a> </div>
            </div>