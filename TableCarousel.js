let this.timerObj = [];
tablesCarousel: function() {
    this.tableScroll("comprehensive-operation");
},

tableScroll: function(id) {
    let me = this, height = 500, speed = 30, length = 6, headHasContent = true;
    if (this.timerObj[id]) {
        clearInterval(me.timerObj[id]);
        this.timerObj[id] = null;
    }
    if (me.$el.find(`#${id} tbody tr`).length > length) {
        me.$el.find(`#${id}`).parent().find('._table').remove();
        headHasContent = !!me.$el.find(`#${id} thead`).html();
        if (headHasContent) {
            me.$el.find(`#${id}`).parent().prepend(
                `<table class="_table"><thead>${me.$el.find(`#${id} thead`).html()}</thead></table>`
            ).css({ 'position': 'relative', 'overflow': 'hidden', 'height': height + 'px' });
            me.$el.find("._table").find('th').each(index => {
                $(this).css('width', me.$el.find(`#${ id } th:eq(${ index })`).width());
            });
        } else {
            me.$el.find(`#${ id }`).parent().prepend(
                `<table class="_table"><thead></thead></table>`
            ).css({ 'position': 'relative', 'overflow': 'hidden', 'height': height + 'px' });
        }

        me.$el.find("._table").css({ 'position': 'absolute', 'top': 0, 'left': 0, 'z-index': 9, 'width': '100%', 'background-color': '#0D2851' });
        me.$el.find(`#${ id }`).css({ 'position': 'absolute', 'top': 0, 'left': 0, 'z-index': 1, 'width': '100%' });
        me.$el.find(`#${ id } tbody`).html(me.$el.find(`#${ id } tbody`).html() + me.$el.find(`#${ id } tbody`).html());
        me.$el.find("._table").css('top', 0);
        me.$el.find(`#${ id }`).css('top', 0);
        var tableTop = 0;
        var outerHeight = me.$el.find(`#${ id } tbody tr`).outerHeight();
        this.timerObj[id] = setTimeout(setTimer, speed);
        me.$el.find(`#${ id } tbody`).hover(function () {
            let ids = $(this).parents("table").attr("id");
            if (me.timerObj[ids]) {
                clearInterval(me.timerObj[ids]);
                me.timerObj[ids] = null;
            }
        }, function () {
            let ids = $(this).parents("table").attr("id");
            if (me.timerObj[ids]) {
                clearInterval(me.timerObj[ids]);
                me.timerObj[ids] = null;
            }
            if (me.$el.find(`#${ ids } tbody tr`).length > length) {
                me.timerObj[ids] = setTimeout(setTimer, speed);
            }
        })
    }
    function setTimer() {
        if (tableTop <= -outerHeight * (me.$el.find(`#${id} tbody tr`).length + (headHasContent ? 1 : 0)) + height) {
            tableTop = 0;
        } else {
            tableTop -= 1;
        }
        me.$el.find(`#${id}`).css('margin-top', tableTop + 'px');
        me.timerObj[id] = setTimeout(function () {
            setTimer()
        }, speed);
    }
}
