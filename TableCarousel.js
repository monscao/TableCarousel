tablesCarousel: function() {
    this.tableScroll("comprehensive-operation");
},

tableScroll: function(id) {
    let me = this, height = 500, speed = 30, length = 6;
    if (me.$el.find(`#${ id } tbody tr`).length > length) {
        me.$el.find(`#${ id }`).parent().find('._table').remove()
        me.$el.find(`#${ id }`).parent().prepend(
            `<table class="_table"><thead>${ me.$el.find(`#${ id } thead`).html() }</thead></table>`
        ).css({ 'position': 'relative', 'overflow': 'hidden', 'height': height + 'px', 'width': '100%' })
        me.$el.find("._table").find('th').each(index => {
            $(this).css('width', me.$el.find(`#${ id } th:eq(${ index })`).width());
        });

        me.$el.find("._table").css({ 'position': 'absolute', 'top': 0, 'left': 0, 'z-index': 9, 'width': '100%', 'background-color': '#112033' });
        me.$el.find(`#${ id }`).css({ 'position': 'absolute', 'top': 0, 'left': 0, 'z-index': 1, 'width': '100%' });
        me.$el.find(`#${ id } tbody`).html(me.$el.find(`#${ id } tbody`).html() + me.$el.find(`#${ id } tbody`).html());
        me.$el.find("._table").css('top', 0);
        me.$el.find(`#${ id }`).css('top', 0);
        var tableTop = 0;
        var outerHeight = me.$el.find(`#${ id } tbody tr`).outerHeight();

        function setTimer() {
            if (tableTop <= -outerHeight * me.$el.find(`#${ id } tbody tr`).length + 500) {
                tableTop = 0;
            } else {
                tableTop -= 1;
            }
            me.$el.find(`#${ id }`).css('margin-top', tableTop + 'px');
            clearTimeout(timer);
            timer = setTimeout(function() {
                setTimer()
            }, speed);
        }

        timer = setTimeout(setTimer, speed);
        me.$el.find(`#${ id } tbody`).hover(function() {
            clearTimeout(timer);
        }, function() {
            clearTimeout(timer);
            if (me.$el.find(`#${ id } tbody tr`).length > length) {
                timer = setTimeout(setTimer, speed);
            }
        })
    }
}