$(function(){

    window.smoothScroll = function(target) {
        var scrollContainer = target;
        do { //find scroll container
            scrollContainer = scrollContainer.parentNode;
            if (!scrollContainer) return;
            scrollContainer.scrollTop += 1;
        } while (scrollContainer.scrollTop == 0);

        var targetY = 0;
        do { //find the top of target relatively to the container
            if (target == scrollContainer) break;
            targetY += target.offsetTop;
        } while (target = target.offsetParent);

        scroll = function(c, a, b, i) {
            i++; if (i > 30) return;
            c.scrollTop = a + (b - a) / 30 * i;
            setTimeout(function(){ scroll(c, a, b, i); }, 20);
        }
        // start scrolling
        scroll(scrollContainer, (scrollContainer.scrollTop - 42), targetY, 0);
    }

    $(".element").typed({
        strings: ["^500 I am Sree Keerthi Matta", "^500 I am a Full Stack Developer",
            "^500 I love coding","^500 I live in Boston"],
        typeSpeed: 30,
        backSpeed: 20,
        showCursor: false,
        loop: true
    });



    $(window).scroll(function() {
        var scroll = $(window).scrollTop();

        if (scroll >= 50) {
            $(".navbar-fixed-top").addClass("black");
            $(".navbar-fixed-top").removeClass("sree-keerthi-matta-navbar");
            $("li.navbar-section").addClass("white-font");
            $("li.navbar-section").removeClass("black-font");
            $(".navbar-section").addClass("white-font");
            $(".navbar-section").removeClass("black-font");

        }
        else if(scroll < 50){
            $(".navbar-fixed-top").removeClass("black");
            $(".navbar-fixed-top").addClass("sree-keerthi-matta-navbar");
            $("li.navbar-section").removeClass("white-font");
            $("li.navbar-section").addClass("black-font");
            $(".navbar-section").removeClass("white-font");
            $(".navbar-section").addClass("black-font");
        }
    });
});