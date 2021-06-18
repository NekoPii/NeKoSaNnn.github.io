window.model = {
    data: {
        todo_items: {
            //{content,
            //datetime,
            //done<bool>,
            //star<bool>,
            //isModify<bool>}
        },
        filter: 'All'
    },
    TOKEN: 'TodoMVC'
};

(function() {
    let model = window.model
    let Key = "todo_items"
    Object.assign(model, {
        init: function(callback) {
            let data = window.localStorage.getItem(Key)
            if (data) {
                model.data = JSON.parse(data)
            }
            if (callback) callback();
        },
        flush: function(callback) {
            window.localStorage.setItem(Key, JSON.stringify(model.data))
            if (callback) callback();
        },
        update: function(callback) {
            for (let key in model.data.todo_items) {
                let item = model.data.todo_items[key]
                if (item.isModify) {
                    let t1 = item.datetime,
                        dateBegin = new Date(t1.replace(/-/g, "/")), //replace方法将-转为/
                        dateEnd = new Date(),
                        dateDiff = dateEnd.getTime() - dateBegin.getTime(),
                        hours = Math.floor(dateDiff / (3600 * 1000))
                    console.log("hours:" + hours)
                    if (hours >= 6) {
                        item.isModify = false
                    }
                }
            }
            model.flush()
            if (callback) callback();
        }
    });
})();