// inspired by https://css-tricks.com/snippets/jquery/smooth-scrolling/
      // https://codepen.io/lucapalomba/pen/JRoRZq
      // SMOOTH SCROLL
      $(document).ready(function () {
        var TopOffset = 85;    
        $('a[data-smooth]').click(function() {
          if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
              $('html, body').animate({
                scrollTop: target.offset().top - TopOffset
              }, 500);

              // NAV-ITEM CLCIK EVENT: Activate selected nav-item.
              $('.nav-item').removeClass('active');
              $(this).parent().addClass('active');
              return false;
            }
          }
        });


        // SCROLL EVENT
        // https://stackoverflow.com/questions/9979827/change-active-menu-item-on-page-scroll
        // Cache selectors
        var topMenu = $("#top-menu"),
        topMenuHeight = topMenu.outerHeight()+400,
        // All list items
        menuItems = topMenu.find("a"),
        // Anchors corresponding to menu items
        scrollItems = menuItems.map(function(){
          var item = $($(this).attr("href"));
          if (item.length) { return item; }
        });

        console.log(scrollItems);
        console.log("Part 0");


        // Bind to scroll
        $(window).scroll(function(){
          // Get container scroll position
          var fromTop = $(this).scrollTop()+topMenuHeight;

          // Get id of current scroll item
          var cur = scrollItems.map(function(){
            if ($(this).offset().top < fromTop)
              return this;
          });
          // Get the id of the current element
          cur = cur[cur.length-1];
          var id = cur && cur.length ? cur[0].id : "";
          // Set/remove active class
          menuItems
            .parent().removeClass("active")
            .end().filter("[href='#"+id+"']").parent().addClass("active");
        });
        console.log("Part 1");


      });