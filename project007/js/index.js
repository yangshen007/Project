window.onload = function () {

    // 轮播功能 
    function banner() {
        let timer = null;
        let index = 0;
        timer = setInterval(auto, 3000);

        function auto() {
            index++;
            if (index == $("#banner_index li").size()) {
                index = 0;
            }
            $("#banner_index li").eq(index).addClass("current").siblings().removeClass("current");
            $("#big_banner li").eq(index).fadeIn(1000).siblings().fadeOut(1000);
        }

        $("#banner_index li").mouseenter(function () {
            clearInterval(timer);
            index = $(this).index() - 1;
            auto();
        }).mouseleave(function () {
            timer = setInterval(auto, 3000);
        })
    }
    banner();

    // 产品选项卡
    function productsSelect() {
        let $list = $(".products-layout .left-layout .tabs-nav li");
        let $goods = $(".products-layout .left-layout .goods-common");

        $list.mouseenter(function () {
            $(this).addClass("tabs-selected").siblings().removeClass("tabs-selected");
            let index = $(this).index();
            $goods.eq(index).removeClass("goods-hide").siblings().not(".tabs-nav").addClass("goods-hide")
        })
    }
    productsSelect();

    // 新闻选项卡
    function newsSelect() {
        let $list = $(".right-layout .fastnews h3 span");
        let $news = $(".right-layout .fastnews ul");

        $list.mouseenter(function () {
            let index = $(this).index();
            $news.eq(index).removeClass("news-hide").siblings().not("h3").addClass("news-hide");
        })
    }
    newsSelect();

    //楼层直达 
    function floorTo() {
        let flag = true;
        let $floorNav = $(".floor-arrive .floor-nav");
        let $floorNum = $(".floor-arrive .floor-nav ul li"); // 楼层号
        let $floors = $(".floor-arrive .one-floor"); //楼层

        $floorNum.mouseenter(function () {
            $(this).find("a").css("color", "#ffac00");
        }).mouseleave(function () {
            $(this).find("a").css("color", "#000");
        })

        $floorNum.click(function () {
            flag = false;
            $(this).find("a").addClass("selected")
                .end()
                .siblings()
                .find("a")
                .removeClass("selected");
            let index = $(this).index();
            //console.log(index);
            let $floorx = $floors.eq(index);
            let fTop = $floorx.offset().top;

            $("body,html").animate({
                scrollTop: fTop - 78
            }, 1000, function () {
                flag = true;
            });

        })

        //操作滚动条
        $(window).scroll(function () {
            //楼层吸顶
            //获取页面滚走的距离
            if (flag) {
                let sTop = $(document).scrollTop();
                //使用filter遍历每一个楼层 并返回满足某个条件的楼层
                // 条件: 某个楼层距离body的top值 - 页面滚走的距离 <　楼层高度/2
                let $floor = $floors.filter(function (index) {
                    return Math.abs($(this).offset().top - sTop) < $(this).height() / 2;
                })

                //获取当前在可视区中高度最高的楼层的下标
                let index = $floor.index();
                console.log(index);
                if(index!=-1){     
                    $floorNum.eq(index-1).find("a").addClass("selected")
                        .end()
                        .siblings()
                        .find("a")
                        .removeClass("selected");
                }
                $floorNav.removeClass("floor-nav-fix");
                if (sTop > $floorNav.offset().top) {
                    $floorNav.addClass("floor-nav-fix");
                }
            }
        })
    }
    floorTo();




}