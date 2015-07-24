$(function () {
    'use strict';
    var sidebar = $('.sidebar');
    var trig = $('.side-trigger');
    var mtrig = $('.mn-inner__menu a');
    var mnwrap = $('.mobile-nav__wrap');
    var mnwrapHeight = mnwrap.height();
    var navList = $('.mobile-nav__list');
    var body = $('body');
    var delayElements = $('.delay');
    var delayLen = delayElements.length;
    var backTop = $('.back-wrap');
    var backTrigger = $('.back-to-top');

    function init() {
        mnwrap.css({
            height: 0
        });

        navList.css({
            display: 'none'
        });
        delayElements.each(function (i, e) {
            $(e).css({
                opacity: 0,
                padding: '0 40px 0 0'
            });
        });
    }

    var fancyInit = function () {
        var isFancy = $(".isFancy");
        if (isFancy.length != 0) {
            var imgArr = $(".post-article img");
            for (var i = 0, len = imgArr.length; i < len; i++) {
                var src = imgArr.eq(i).attr("src");
                var title = imgArr.eq(i).attr("alt");
                imgArr.eq(i).replaceWith("<a href='" + src + "' title='" + title + "' rel='fancy-group' class='fancy-ctn nb fancybox'><img src='" + src + "' title='" + title + "'></a>");
            }
            $(".post-article .fancy-ctn").fancybox();
        }
    };

    // 左侧显示与隐藏动画
    var sidebarAnimation = {
        width: 300 + 'px',
        visible: false,
        speed: 180,
        // 控制sidebar显示
        show: function () {
            if (!sidebarAnimation.visible) {
                sidebar.animate({
                    width: sidebarAnimation.width
                }, sidebarAnimation.speed).show();
                body.animate({
                    paddingLeft: '300px'
                }, sidebarAnimation.speed);

                $(this).parent().animate({
                    marginLeft: '550px'
                }, 240);

                sidebarAnimation.visible = true;

            } else {
                sidebarAnimation.hide();
            }
        },

        // 控制sidebar隐藏
        hide: function () {
            sidebar.animate({
                width: '0'
            }, sidebarAnimation.speed, function () {
                sidebar.hide();
            });
            body.animate({
                paddingLeft: '0'
            }, sidebarAnimation.speed);

            sidebarAnimation.visible = false;

            trig.parent().animate({
                marginLeft: '450px'
            }, 240);
        }
    };

    var mobileNavAnimation = {
        visible: false,
        speed: 100,
        show: function (event) {
            if (!mobileNavAnimation.visible) {
                mnwrap.animate({
                    height: mnwrapHeight + 'px'
                }, mobileNavAnimation.speed, function () {
                    navList.fadeIn(mobileNavAnimation.speed);
                }).show();

                mobileNavAnimation.visible = true;
            } else {
                mobileNavAnimation.hide();
            }

            event.stopPropagation();
        },

        hide: function () {
            mnwrap.animate({
                height: 0
            }, mobileNavAnimation.speed, function () {
                navList.hide();
            });
            mobileNavAnimation.visible = false;
        }
    }


    // sidebar内元素延迟淡入动画
    function sidebarElementsDelay() {
        var len = delayElements.length,
            i;
        if (sidebarAnimation.visible) {
            for (i = 0; i < len; i++) {
                delayElements.eq(i).animate({
                    padding: '0 20px',
                    opacity: 1
                }, 300 + 60 * i);
            }
        } else {
            init();
        }
    }

    function backTopToggle() {
        var sX = $(document).scrollTop();
        if (sX > 100) {
            backTop.fadeIn();
        }
        if (sX <= 100) {
            backTop.fadeOut();
        }
    }

    fancyInit();
    init();

    // 绑定头像点击事件触发sidebar
    trig.on('click', sidebarAnimation.show);
    trig.on('click', sidebarElementsDelay);
    $(document).on('scroll', backTopToggle);
    backTrigger.on('click', function () {
        $('html, body').animate({
            scrollTop: 0
        }, 300);
    });

    mtrig.on('click', mobileNavAnimation.show);
    body.on('click', mobileNavAnimation.hide);

});
