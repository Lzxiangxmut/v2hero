function ScrollHead(){
    var Header = jQuery('header');

    jQuery(window).scroll(function(){
        var ScrollTop = jQuery(this).scrollTop();
        ScrollTop >= 200 ? Header.addClass('on') : Header.removeClass('on');
    })
}

function ActionMenu(Action){
    var Nav = jQuery('nav'),
        Header = jQuery('header'),
        Body = jQuery('#body');

    switch(Action){
        case 'Open':
            jQuery('body').addClass('over');
            Nav.addClass('open');
            Header.addClass('left');
            Body.addClass('left');
            break;
        case 'Close':
            jQuery('body').removeClass('over');
            Nav.removeClass('open');
            Header.removeClass('left');
            Body.removeClass('left');
            break;
        default:
            jQuery('body').toggleClass('over');
            Nav.toggleClass('open');
            Header.toggleClass('left');
            Body.toggleClass('left');
            break;
    }
}

function Banner(Banner,Effect,AutoPlay){
    var Bd = jQuery('.bd',Banner),
        Hd = jQuery('.hd',Banner),
        Bar = jQuery('.bar',Bd),
        Item = jQuery('.item',Bar),
        Prev = jQuery('.prev',Banner),
        Next = jQuery('.next',Banner),
        Class = 'on',
        Index = 0,
        _X = DownTime = MoveDistance = Left = 0,
        DMax = -(Item.width()),
        Time,Width,MouseInterval,ImgMove;

    if(!Banner.length || Item.length < 2 || !Effect){
        return;
    }

    switch(Effect){
        case 'Fold':
            Banner.addClass('fold');
            break;
        case 'Slide':
            Banner.addClass('slide');
            break;
    }

    Item.each(function(i,e){
        DMax += jQuery(e).width();
        (i==Index) && jQuery(e).addClass(Class);
        Hd.append('<a href="javascript:;" class="'+(i==Index?Class:'')+'"></a>');
    });

    Hd.children('a').click(function(){
        Index = jQuery(this).index();
        Slide(Index);
        AutoPlay && clearInterval(Time);
        AutoPlay && Auto();
    });

    Prev.click(function(){
        if(Index > 0) Index--;
        // else Index = 0;
        Slide(Index);
        AutoPlay && clearInterval(Time);
        AutoPlay && Auto();
    });

    Next.click(function(){
        if(Index < Item.length - 1) Index++;
        // else Index = 0;
        Slide(Index);
        AutoPlay && clearInterval(Time);
        AutoPlay && Auto();
    });

    //touch是在移动端使用的
    Banner.on('touchstart',function(e){
        _X = e.originalEvent.targetTouches[0].pageX;	//记录鼠标点下时的位置	!!这条是手机上使用的!!
        ImgMove = true;
        AutoPlay && clearInterval(Time);
        (Effect == 'Slide') && Banner.removeClass('slide');
        Left = parseFloat(Bar.css('left'));
        DownTime = 0;       //记录鼠标点下的到松开的时间
        MouseInterval = setInterval(function(){DownTime++;},1);
    });
    jQuery('body').on('touchmove',function(e){
        if(ImgMove){
            var X = e.originalEvent.targetTouches[0].pageX-_X;	//记录鼠标移动了多远

            MoveDistance = Left+X;
            if(MoveDistance < 0 && MoveDistance > -DMax){
                Bar.css({left:MoveDistance+'px'});
            }
        }
    });
    jQuery('body').on('touchend',function(e){
        if(ImgMove){
            var L = parseFloat(Bar.css('left')),
                W = Banner.width();
            clearInterval(MouseInterval);

            if(DownTime < 50){      //鼠标快速滑过
                if(e.originalEvent.changedTouches[0].pageX > _X && Index > 0){	//向左滑
                    Index--;
                }else if(e.originalEvent.changedTouches[0].pageX < _X && Index < (Item.length-1)){	//向右滑
                    Index++;
                }
            }else{
                Index = Math.abs(Math.round(L/W));
            }

            Slide(Index);
            (Effect == 'Slide') && Banner.addClass('slide');
            AutoPlay && Auto();
        }
        ImgMove = false;
    });

    function Auto(){
        Time = setInterval(function(){
            if(Index < Item.length - 1) Index++;
            else Index = 0;
            Slide(Index);
        },5000);
    }

    function Slide(i){
        StopBtn(i);
        Width = Banner.width();
        Bar.css({'left':-(Width*i)+'px'});
        Item.eq(i).addClass(Class).siblings(Item).removeClass(Class);
        Hd.children('a').eq(i).addClass(Class).siblings('a').removeClass(Class);
    }

    function StopBtn(i){
        i == Item.length-1 ? Next.addClass('stop') : Next.removeClass('stop');
        i == 0 ? Prev.addClass('stop') : Prev.removeClass('stop');
    }

    StopBtn(Index);
    Slide(Index);

    AutoPlay && Auto();
}

function slideHoliday(){
    $('#notice20121001').slideDown(2000);
	$('#header-blank').height(0);
    setTimeout(function(){
        $('#notice20121001').slideUp(2000);
		$('#header-blank').animate({'height':'100px'}, 2000);
    }, 10000)
}

function SlideBox(Box,ScrollNum,DefaultDirection,RowNum){
    if(!Box.length){return false;}

    Box.each(function(BoxI,BoxE){
        var Bd = jQuery('.bd',jQuery(BoxE)),
            Hd = jQuery('.hd',jQuery(BoxE)),
            Bar = jQuery('.bar',Bd),
            Item = jQuery('.item',Bar),
            Prev = jQuery('.prev',jQuery(BoxE)),
            Next = jQuery('.next',jQuery(BoxE)),
            Index = 0,
            Scroll = !isNaN(ScrollNum) ? ScrollNum : 1,
            Row = !isNaN(RowNum) ? RowNum : 1,
            MaxPage = Math.ceil(Item.length/Row/Scroll)-1,
            Direction = (DefaultDirection == 'left' || DefaultDirection == 'top') ? DefaultDirection : 'left',
            TouchTimer,ImgMove,DMax,MoveDistance,MouseInterval,_X,Left;

        Action(Index);
        Init();

        if(Hd && Math.ceil(Item.length/Scroll) > 1 && !Hd.children().length){
            for(var i = 0; i < Math.ceil(Item.length/Scroll); i++){
                Hd.append('<a class="'+(i==Index?'on':'')+'"></a>')
            }
        }

        Hd.children().click(function(){
            Index = jQuery(this).index();
            Action(Index);
        });

        Prev.click(function(){
            Index > 0 ? (Index--,Action(Index)) : '';
        });

        Next.click(function(){
            Index < MaxPage ? (Index++,Action(Index)) : '';
        });

        if(Direction == 'left'){
            //touch是在移动端使用的
            Bd.on('touchstart',function(e){
                DMax = Item.width()*(Item.length-1);
                _X = e.originalEvent.targetTouches[0].pageX;    //记录鼠标点下时的位置    !!这条是移动端使用的!!
                ImgMove = true;
                Bar.removeClass('trans');
                Left = parseFloat(Bar.css(Direction));
                TouchTimer = 0;       //记录鼠标点下的到松开的时间
                MouseInterval = setInterval(function(){TouchTimer++;},1);
            });
            jQuery('body').on('touchmove',function(e){
                if(ImgMove){
                    var X = e.originalEvent.targetTouches[0].pageX-_X;  //记录鼠标移动了多远

                    MoveDistance = Left+X;
                    if(MoveDistance < 0 && MoveDistance > -DMax){
                        Bar.css(Direction,MoveDistance+'px');
                    }
                }
            });
            jQuery('body').on('touchend',function(e){
                if(ImgMove){
                    var L = parseFloat(Bar.css(Direction)),
                        W = jQuery(window).width();
                    clearInterval(MouseInterval);

                    if(TouchTimer < 50){      //鼠标快速滑过
                        if(e.originalEvent.changedTouches[0].pageX > _X && Index > 0){  //向左滑
                            Index--;
                        }else if(e.originalEvent.changedTouches[0].pageX < _X && Index < MaxPage){  //向右滑
                            Index++;
                        }
                    }else{
                        Index = Math.abs(Math.round(L/W));
                        Index >= MaxPage ? Index-- : '';
                    }

                    Bar.addClass('trans');
                    Action(Index);
                }
                ImgMove = false;
            });
        }

        jQuery(window).resize(function(){
            Init();
        });

        function Action(i){
            var Distance = (Direction=='left'?Item.outerWidth(true):Item.outerHeight(true))*Scroll;
            Bar.css(Direction,-Distance*i);
            Hd.children().eq(i).addClass('on').siblings().removeClass('on');
            i > 0 ? Prev.removeClass('stop') : Prev.addClass('stop');
            i < MaxPage ? Next.removeClass('stop') : Next.addClass('stop');
        }

        function Init(){
            var Height = Item.outerHeight(true)*Row;
            Bd.height(Height);
        }
    });
}

function ProductsBox(){
    var Products = jQuery('#products.index'),
        Category = jQuery('.category-list.hide992 .item',Products),
        CateMenu = jQuery('.btn-group',Products),
        List = jQuery('.products-list',Products),
        Item = jQuery('.item',List),
        Prev = jQuery('.prev',Products),
        Next = jQuery('.next',Products),
        WindowWidth = jQuery(window).width(),
        _Col = 3,
        _Row = 4,
        Col = _Col,
        Row = _Row,
        NowPage = 0,
        MoveLeft,
        MaxPage,_X,_Y,ImgMove,
        LimitDistance,
        TouchInterval,TouchTimer,
        BreakPoints = {
            992 : {
                Col : 2,
                Row : 4
            }
        },
        Method = {
            getActiveBreakpoint : function(){
                if(!BreakPoints) return false;
                var Points = [], Point, Breakpoint;
                for( Point in BreakPoints ){
                    if( BreakPoints.hasOwnProperty(Point) ){
                        Points.push(Point);
                    }
                }
                Points.sort(function(a,b){
                    return parseInt(a, 10) > parseInt(b, 10);
                });
                for(var i = 0; i < Points.length; i++){
                    Point = Points[i];
                    if(Point >= window.innerWidth && !Breakpoint){
                        Breakpoint = Point;
                    }
                }
                return Breakpoint;
            },
            slideList : function(i){
                var Distance = -(i*(Col*Item.outerWidth(true)));
                List.css({left:Distance});
            },
            changeList : function(){
                var Breakpoint = Method.getActiveBreakpoint(),
                    ItemWidth = Item.outerWidth(true),
                    ItemHeight = Item.outerHeight(true),
                    PageWidth = Col*ItemWidth,
                    Page = 0,
                    Left = 0,
                    Top = 0,
                    row = 0,
                    i = 0,
                    realRow;

                if(Breakpoint){
                    Col = BreakPoints[Breakpoint].Col;
                    Row = BreakPoints[Breakpoint].Row;
                }else{
                    Col = _Col;
                    Row = _Row;
                }
                PageWidth = Col*ItemWidth;
                Item.each(function(k,e){
                    jQuery(e).css({left:Left,top:Top});
                    jQuery(e).attr('status')=='on' ? i++ : '';
                    if(i % (Col*Row) == 0){
                        Top = 0;
                        row = 0;
                        Left = Page*PageWidth;
                        jQuery(e).attr('status')=='on' ? Page++ : '';
                    }else{
                        if(i%Col==0){
                            Left = Page*PageWidth;
                            row++;
                            Top = row*ItemHeight;
                        }else{
                            Left += ItemWidth;
                        }
                    }
                    //alert(i+' '+Col*Row+' '+(i%(Col*Row)));
                });

                realRow = i >= Col*Row ? Row : Math.ceil(i/Col);
                MaxPage = Math.ceil(i/(Col*Row));

                List.css({height:realRow*ItemHeight});
                Method.slideList(0);
            },
            changeCate : function(Cate){
                var CId = parseInt(Cate.attr('cid')),
                    Index = Cate.index(),
                    Txt = Cate.text();
                Category.eq(Index).addClass('on').siblings(Category).removeClass('on');
                jQuery('.btn',CateMenu).html(Txt+' <span class="caret"></span>');

                Item.children('.main').addClass('animated');
                if(CId){
                    Item.each(function(i,e){
                        jQuery(e).attr('cid')==CId?jQuery(e).attr('status','on'):jQuery(e).attr('status','off');
                    });
                }else{
                    Item.attr('status','on');
                }
                Method.changeList();
            }

        };

    Item.imagesLoaded(function(){
        Method.changeList();
    });
    Category.click(function(){
        Method.changeCate(jQuery(this));
    });
    jQuery('.dropdown-menu li',CateMenu).click(function(){
        Method.changeCate(jQuery(this));
    });
    Prev.click(function(){
        NowPage > 0 ? NowPage-- : '';
        Method.slideList(NowPage);
    });
    Next.click(function(){
        NowPage < MaxPage-1 ? NowPage++ : '';
        Method.slideList(NowPage);
    });

    List.parents('.products-bg').on('touchstart',function(e){
        LimitDistance = List.parent().width()*(MaxPage-1);
        _X = e.originalEvent.targetTouches[0].pageX;
        ImgMove = true;
        List.removeClass('trans');
        MoveLeft = parseFloat(List.css('left'));
        TouchTimer = 0;
        TouchInterval = setInterval(function(){TouchTimer++;},1);
    });
    jQuery('body').on('touchmove',function(e){
        if(ImgMove){
            var X = e.originalEvent.targetTouches[0].pageX-_X;	//记录鼠标移动了多远

            MoveDistance = MoveLeft+X;
            if(MoveDistance < 0 && MoveDistance > -LimitDistance){
                List.css('left',MoveDistance+'px');
            }
        }
    });
    jQuery('body').on('touchend',function(e){
        if(ImgMove){
            var L = parseFloat(List.css('left')),
                W = parseFloat(List.parent().width());
            clearInterval(TouchInterval);

            if(TouchTimer < 50){      //鼠标快速滑过
                if(e.originalEvent.changedTouches[0].pageX > _X && NowPage > 0){	//向左滑
                    NowPage--;
                }else if(e.originalEvent.changedTouches[0].pageX < _X && NowPage < (MaxPage-1)){	//向右滑
                    NowPage++;
                }
            }else{
                NowPage = Math.abs(Math.round(L/W));
            }

            List.addClass('trans');
            Method.slideList(NowPage);
        }
        ImgMove = false;
    });

    jQuery(window).resize(function(){
        if(WindowWidth != jQuery(window).width()){
            Method.changeList();
            WindowWidth = jQuery(window).width();
        }
    });
}

function ProductMsg(){
    jQuery('body').on('click','.products-list .item .cover',function(){
        if(jQuery(window).width() <= 768){
            jQuery('#body').toggleClass('on');
            jQuery(this).parents('.item').toggleClass('on').parents('.products-list').toggleClass('on');
        }
    });

    jQuery('body').on('click','.products-list .item .mask',function(){
        if(jQuery(window).width() <= 768){
            jQuery('#body').removeClass('on');
            jQuery(this).parents('.item').removeClass('on').parents('.products-list').removeClass('on');
        }
    });
}

function ShowCountUp(Obj){          //元素进入浏览器可视区域后运行数值变化
    var Demos = SetCountUp(Obj);
    ScrollShow(Obj,false,function(){
        for(i = 0; i < Demos.length; i++){
            Demos[i].start();
        }
    });
}

function SetCountUp(Obj){      //设置数值变化     Obj:对象需要拥有ID
    var Demo = [],
        DefauitOptions = {
            useEasing : false,
            useGrouping : true,
            separator : '',
            decimal : '.',
            prefix : '',
            suffix : ''
        };

    Obj.each(function(i,e){
        if(jQuery(e).attr('id') != undefined){
            var Id = jQuery(e).attr('id'),
                Start = jQuery(e).attr('data-start'),
                End = jQuery(e).attr('data-end'),
                Decimals = jQuery(e).attr('data-decimals'),
                Duration = jQuery(e).attr('data-duration'),
                useEasing = jQuery(e).attr('data-useEasing'),
                useGrouping = jQuery(e).attr('data-useGrouping'),
                separator = jQuery(e).attr('data-separator'),
                decimal = jQuery(e).attr('data-decimal'),
                prefix = jQuery(e).attr('data-prefix'),
                suffix = jQuery(e).attr('data-suffix'),
                Options = {
                    useEasing : useEasing != undefined ? useEasing : DefauitOptions.useEasing,
                    useGrouping : useGrouping != undefined ? useGrouping : DefauitOptions.useGrouping,
                    separator : separator != undefined ? separator : DefauitOptions.separator,
                    decimal : decimal != undefined ? decimal : DefauitOptions.decimal,
                    prefix : prefix != undefined ? prefix : DefauitOptions.prefix,
                    suffix : suffix != undefined ? suffix : DefauitOptions.suffix
                };

            Demo[i] = new CountUp(Id, Start, End, Decimals, Duration, Options);
        }
    });

    return Demo;
}

function ScrollShow(Obj,Repeat,Callbacks){          //对象滚动到浏览器可视区域时执行回调函数
    if(Obj.length){
        Obj.each(function(i,e){
            var Site = jQuery(e).offset(),
                Height = jQuery(e).outerHeight(true),
                WinTop = jQuery(this).scrollTop(),         //滚动条位置
                WinHeight = jQuery(this).height(),      //窗口高度
                WinArea = WinTop+WinHeight,        //浏览器可视区域
                IsRepeat = Repeat === true ? true : false,      //重复执行
                Switch = true;                                  //开关

            jQuery(window).scroll(function(){
                Site = jQuery(e).offset();
                Height = jQuery(e).outerHeight(true);
                WinTop = jQuery(this).scrollTop();
                WinHeight = jQuery(this).height();
                WinArea = WinTop+WinHeight;
                //document.title = parseInt(Site.top)+' '+WinArea+' | '+parseInt(Height+Site.top)+' '+WinTop;
                if(Site.top <= WinArea && (Height+Site.top) >= WinTop && Switch){
                    jQuery.isFunction(Callbacks) && Callbacks();
                    Switch = false;
                }else{
                    if(IsRepeat === true && Switch === false){
                        Switch = true
                    }
                }
            });
        });
    }
    return;
}

function Preview(){
    if(!jQuery('#viewPage').length) return false;

    var PreviewBtn = jQuery('.preview-button'),
        View = jQuery('#viewPage'),
        Page = jQuery('.iframePage',View);

    PreviewBtn.children('a').click(function(){
        var Width = jQuery(this).attr('data-width');
        if(Width){
            if(jQuery(window).width()<Width){
                alert('请在宽屏电脑上操作！');
                return false;
            }

            switch(Width){
                case 'max':
                    Page.removeAttr('style');
					Page.css({"border": "none", "margin":"0"});
                    break;
                default:
                    Page.width(Width);
					Page.css({"height":"90%", "border": "40px solid #303C42", "border-radius": "30px", "margin":"2% auto"});
                    break;
            }
        }
        return false;
    });
}

function toTop() {
    jQuery('html,body').animate({scrollTop:0},300);
}

function popService(data){
    var num = parseInt(Math.random()*data.length),
        service = data[num];

    window.open('http://wpa.qq.com/msgrd?v=3&uin='+service.QQNumber+'&site=qq&menu=yes');
}

function OptHot(A){
    var Hotline = jQuery('#hotline');

    if(A){
        Hotline.parents('.item').addClass('open');
    }else{
        Hotline.parents('.item').removeClass('open');
    }
}

function OptOnline(A){          //开关在线咨询
    var Online = jQuery('#online');

    if(A){
        Online.parents('.item').addClass('open');
    }else{
        Online.parents('.item').removeClass('open');
    }
}

function OptQrcode(A){
    var Qrcode = jQuery('#wechat-qrcode');

    switch(A){
        case 0:
            Qrcode.stop(true,false).slideUp(300);
            break;
        case 1:
            Qrcode.stop(true,false).slideDown(300);
            break;
        default :
            Qrcode.stop(true,false).slideToggle(300);
            break;
    }
}

var ProductsImage = {
    Images : '.product-images',
    Imgs : ['pc','tablet','phone'],
    Img : '.image-',
    Speed : 6,
    Move : function(Img,Direction){
        var top = Math.abs(parseFloat(Img.css('top'))),
            height = Img.height(),
            area = Img.parent().height(),
            offset = 2,
            distance = 0,
            place = 0,
            thisObj = this;
        switch(Direction){
            case 'Up':
                place = height-area-offset;
                distance = place-top;
                break;
            case 'Down':
                place = 0;
                distance = top;
                break;
        };
        Img.stop(false,false).animate({top: -place}, distance*thisObj.Speed);
    },
    Run : function(){
        var thisObj = this;
        for(var i in thisObj.Imgs){
            $(thisObj.Img+thisObj.Imgs[i]+' .img',$(thisObj.Images)).hover(function(){
                thisObj.Move($(this).children(),'Up');
            },function(){
                thisObj.Move($(this).children(),'Down');
            });
        }
    }
};

(function($){
    $.fn.SlideBox = function(options){
        $.fn.SlideBox.defaults = {
            Effect : 'Slide',
            mainCell : '.bd',
            titCell : '.hd',
            targetCell : null,
            trigger : 'mouseover',
            Prev : '.prev',
            Next : '.next',
            titOnClassName : 'on',
            Scroll : 1,
            Vis : 1,
            interTime : 5000,
            defaultIndex : 0,
            breakPoints : undefined,
            autoPlay : false,
            autoPage : false,
            Opp : false,
            Loop : true,
            mouseOverStop : false,
            StartFun : null,
            EndFun : null
        };

        return this.each(function(){
            var Opt = $.extend({},$.fn.SlideBox.defaults,options),
                Slide = this,
                Effect = Opt.Effect,
                PrevBtn = $(Opt.Prev,Slide),
                NextBtn = $(Opt.Next,Slide),
                mainBox = $(Opt.mainCell,Slide),
                tarObj = $(Opt.targetCell,Slide),
                Index = parseInt(Opt.defaultIndex),
                interTime = parseInt(Opt.interTime),
                Scroll = parseInt(Opt.Scroll),
                Vis = parseInt(Opt.Vis),
                titOn = Opt.titOnClassName,
                autoPlay = (Opt.autoPlay=='false'||Opt.autoPlay==false)?false:true,
                autoPage = (Opt.autoPage=='false'||Opt.autoPage==false)?false:true,
                Opp = (Opt.Opp=='false'||Opt.Opp==false)?false:true,
                Loop = (Opt.Loop=='false'||Opt.Loop==false)?false:true,
                mouseOverStop = (Opt.mouseOverStop=='false'||Opt.mouseOverStop==false)?false:true

            Slide.getActiveBreakpoint = function(){
                if( !Opt.breakPoints ) return false;

                var breakpoint = false,
                    points = [], point;
                for( point in Opt.breakPoints ){
                    if( Opt.breakPoints.hasOwnProperty(point) ){
                        points.push(point);
                    }
                }
                points.sort(function(a, b){
                    return parseInt(a, 10) > parseInt(b, 10);
                });
                for(var i = 0; i < points.length; i++){
                    point = points[i];
                    if(point >= window.innerWidth && !breakpoint){
                        breakpoint = point;
                    }
                }

                return breakpoint || 'Max';
            };

        });
    }
})(jQuery);

jQuery('body').on('dragstart','img',function(){ return false; });

jQuery(window).ready(function(){
    ScrollHead();
    Banner(jQuery('#banner'),'Slide',true);
    Banner(jQuery('#small-banner'),'Slide',true);
    ProductsBox();
    ProductMsg();
    SlideBox(jQuery('.cooperation-box.s5'),5);
    SlideBox(jQuery('.cooperation-box.s3'),3);
    SlideBox(jQuery('.like-box'),2);
    SlideBox(jQuery('.evaluation-list .box'),1);
    SlideBox(jQuery('.team-list.s3'),3);
    SlideBox(jQuery('.team-list.s1'),1);
    ShowCountUp(jQuery('#about .number .i .n'));
    Preview();
    ProductsImage.Run();
    //jQuery('.SendCode').SendCode({Type:'Phone',Timer:5});

    jQuery('.stopP').click(function(e){
        e.stopPropagation();
    });

    jQuery('body').click(function(){
        jQuery('nav').removeClass('on');
    });
});