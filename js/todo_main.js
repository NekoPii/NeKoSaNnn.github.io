window.onload = function() {
    vt.success("Welcome Back 🌸~", {
        title: undefined,
        position: "top-right",
        duration: 1500,
        closable: true,
        focusable: true,
        callback: undefined
    });

    let now_type = window.location.hash.split("#")[1]
    if (!now_type) {
        now_type = "ALL"
    }

    model.init(function() {
        window.location.href = "#ALL"
        initMyToDo();
    });



    $("#All_btn").addEventListener("click", function() {
        window.location.href = "#ALL"
        vt.success("Change To All ~", {
            title: undefined,
            position: "top-right",
            duration: 1000,
            closable: true,
            focusable: true,
            callback: undefined
        })
        $("#All_btn").classList.add("active")
        $("#Done_btn").classList.remove("active")
        $("#ToDo_btn").classList.remove("active")
        $("#Star_btn").classList.remove("active")
        filter(event, "ALL")
    })
    $("#Done_btn").addEventListener("click", function() {
        window.location.href = "#Done"
        vt.success("Change To Done ~", {
            title: undefined,
            position: "top-right",
            duration: 1000,
            closable: true,
            focusable: true,
            callback: undefined
        })
        $("#All_btn").classList.remove("active")
        $("#Done_btn").classList.add("active")
        $("#ToDo_btn").classList.remove("active")
        $("#Star_btn").classList.remove("active")
        filter(event, "Done")
    })
    $("#ToDo_btn").addEventListener("click", function() {
        window.location.href = "#ToDo"
        vt.success("Change To ToDo ~", {
            title: undefined,
            position: "top-right",
            duration: 1000,
            closable: true,
            focusable: true,
            callback: undefined
        })
        $("#All_btn").classList.remove("active")
        $("#Done_btn").classList.remove("active")
        $("#ToDo_btn").classList.add("active")
        $("#Star_btn").classList.remove("active")
        filter(event, "ToDo")
    })
    $("#Star_btn").addEventListener("click", function() {
        window.location.href = "#Star"
        vt.success("Change To Star ~", {
            title: undefined,
            position: "top-right",
            duration: 1000,
            closable: true,
            focusable: true,
            callback: undefined
        })
        $("#All_btn").classList.remove("active")
        $("#Done_btn").classList.remove("active")
        $("#ToDo_btn").classList.remove("active")
        $("#Star_btn").classList.add("active")
        filter(event, "Star")
    })

    $("#delete_All").addEventListener("click", function() {

        deleteAll(event, now_type)
    })
    $("#done_All").addEventListener("click", function() {
        doneAll()
    })
    $("#notdone_All").addEventListener("click", function() {
        notdoneAll()
    })
}

function initMyToDo() {
    var todo_cnt = 0;
    var done_cnt = 0;
    let hash = window.location.hash.split("#")[1]
    for (let key in model.data.todo_items) {
        let item = model.data.todo_items[key]
        if (item.done) done_cnt++;
        else todo_cnt++;

        let now_check_btn = $CRE("div"),
            now_check_i = $CRE("i")
        now_check_btn.classList.add("check_btn")
        now_check_btn.appendChild(now_check_i)
        now_check_btn.addEventListener("click", function() {
            doneToDo(event, this)
        })

        let now_content = $CRE("div"),
            now_text = $CRE("div"),
            now_datetime = $CRE("div")
        now_content.classList.add("todo_content")
        now_text.classList.add("todo_text")
        now_text.innerHTML = item.content
        now_datetime.classList.add("todo_datetime")
        now_content.appendChild(now_text)
        now_content.appendChild(now_datetime)
        now_content.addEventListener("click", function() { //考虑到移动端无法使用dblclick，使用click间隔模拟
            editText(event, this)
        })

        let now_del_btn = $CRE("div"),
            now_del_i = $CRE("i")
        now_del_btn.classList.add("delete_btn")
        now_del_i.classList.add("far")
        now_del_i.classList.add("fa-trash-alt")
        now_del_btn.title = "Delete"
        now_del_btn.appendChild(now_del_i)
        now_del_btn.addEventListener("click", function() {
            deleteToDo(event, this)
        })

        let now_star_btn = $CRE("div"),
            now_star_i = $CRE("i")
        now_star_btn.classList.add("star_btn")
        now_star_i.classList.add("far")
        now_star_i.classList.add("fa-star")
        now_star_btn.appendChild(now_star_i)
        now_star_btn.addEventListener("click", function() {
            starToDo(event, this)
        })

        let now_div = $CRE("div")
        now_div.setAttribute("id", key)
        now_div.classList.add("item")
        if (item.done) {
            now_div.classList.remove("pink")
            now_div.classList.add("blue")
        } else {
            now_div.classList.remove("blue")
            now_div.classList.add("pink")
        }

        now_div.appendChild(now_check_btn)
        now_div.appendChild(now_content)
        now_div.appendChild(now_del_btn)
        now_div.appendChild(now_star_btn)

        updateStar(now_div, hash, model.data.todo_items[key].star)
        updateDone(now_div, model.data.todo_items[key].done)
        updateDateTime(now_div, model.data.todo_items[key].datetime, model.data.todo_items[key].isModify)

        now_div.classList.remove("hide")
        now_div.classList.remove("show")
        now_div.classList.add("show")

        $("#todo_items").appendChild(now_div)

    }
}

function addToDo() {
    let input_content = $("#add_input").value,
        hash = window.location.hash.split("#")[1]
    input_content = input_content.trim()
    if (input_content.length >= 1) {
        let timestamp = new Date().getTime(),
            now_item_id = "item-" + timestamp,
            datetime = new Date()
        model.data.todo_items[now_item_id] = {
            content: input_content,
            datetime: datetime.format("yyyy-MM-dd hh:mm:ss"),
            done: false,
            star: false,
            isModify: false,
        }
        model.flush()
        let item = model.data.todo_items[now_item_id]

        let now_check_btn = $CRE("div"),
            now_check_i = $CRE("i")
        now_check_btn.classList.add("check_btn")
        now_check_btn.appendChild(now_check_i)
        now_check_btn.addEventListener("click", function() {
            doneToDo(event, this)
        })

        let now_content = $CRE("div"),
            now_text = $CRE("div"),
            now_datetime = $CRE("div")
        now_content.classList.add("todo_content")
        now_text.classList.add("todo_text")
        now_text.innerHTML = item.content
        now_datetime.classList.add("todo_datetime")
        now_datetime.innerHTML = item.datetime
        now_content.appendChild(now_text)
        now_content.appendChild(now_datetime)
        now_content.addEventListener("click", function() { //考虑到移动端无法使用dblclick，使用click间隔模拟
            editText(event, this)
        })

        let now_del_btn = $CRE("div"),
            now_del_i = $CRE("i")
        now_del_btn.classList.add("delete_btn")
        now_del_i.classList.add("far")
        now_del_i.classList.add("fa-trash-alt")
        now_del_btn.title = "Delete"
        now_del_btn.appendChild(now_del_i)
        now_del_btn.addEventListener("click", function() {
            deleteToDo(event, this)
        })

        let now_star_btn = $CRE("div"),
            now_star_i = $CRE("i")
        now_star_btn.classList.add("star_btn")
        now_star_i.classList.add("far")
        now_star_i.classList.add("fa-star")
        now_star_btn.appendChild(now_star_i)
        now_star_btn.addEventListener("click", function() {
            starToDo(event, this)
        })

        let now_div = $CRE("div")
        now_div.setAttribute("id", now_item_id)
        now_div.classList.add("item")
        now_div.classList.remove("hide")
        now_div.classList.remove("show")
        now_div.classList.add("show")
        if (item.done) {
            now_div.classList.remove("pink")
            now_div.classList.add("blue")
        } else {
            now_div.classList.remove("blue")
            now_div.classList.add("pink")
        }
        now_div.appendChild(now_check_btn)
        now_div.appendChild(now_content)
        now_div.appendChild(now_del_btn)
        now_div.appendChild(now_star_btn)

        $("#todo_items").appendChild(now_div)

        updateStar(now_div, hash, false)
        updateDone(now_div, false)

        $("#add_input").value = ""
        vt.success("Add Note ~", {
            title: undefined,
            position: "top-right",
            duration: 1000,
            closable: true,
            focusable: true,
            callback: undefined
        })
    } else {
        vt.error("Input Can't be Empty ~", {
            title: undefined,
            position: "top-right",
            duration: 1000,
            closable: true,
            focusable: true,
            callback: undefined
        })
    }
}

function updateMyToDo(hash) {
    var todo_items = $All(".item")
    for (let item of todo_items) {
        if (item) {
            let item_id = item.getAttribute("id")
            let now_item = model.data.todo_items[item_id]
            if (now_item) {
                if (hash === "ALL" || (hash === "Done" && now_item.done) || (hash === "ToDo" && (!now_item.done)) || (hash === "Star" && now_item.star)) {
                    item.classList.remove("hide")
                    item.classList.remove("show")
                    setTimeout(function() {
                        item.classList.add("show")
                    }, 10)
                    item.style.display = "flex"
                    item.querySelector(".todo_text").innerHTML = now_item.content
                    updateDone(item, now_item.done)
                    updateDateTime(item, now_item.datetime, now_item.isModify)
                } else {
                    item.classList.remove("hide")
                    item.classList.remove("show")
                    item.classList.add("hide")
                    item.querySelector(".todo_text").innerHTML = now_item.content
                    updateDone(item, now_item.done)
                    updateDateTime(item, now_item.datetime, now_item.isModify)
                    setTimeout(function() {
                        item.style.display = "none"
                    }, 10)

                }
            }
        }
    }
}

function updateMyOneToDo(item) { //为Modify服务
    let item_id = item.getAttribute("id")
    let now_item = model.data.todo_items[item_id]
    item.querySelector(".todo_text").innerHTML = now_item.content
    updateDone(item, now_item.done)
    updateDateTime(item, now_item.datetime, now_item.isModify)
}

function deleteToDo(event, now) {
    let now_item = now.parentNode
    let now_id = now_item.getAttribute("id")
    delete model.data.todo_items[now_id]
    model.flush()
    setItemStyle(now_item, "Delete", "")
}

function starToDo(event, now) {
    let now_item = now.parentNode,
        now_id = now_item.getAttribute("id"),
        hash = window.location.hash.split("#")[1]
    model.data.todo_items[now_id].star = !model.data.todo_items[now_id].star
    model.flush()
    updateStar(now_item, hash, model.data.todo_items[now_id].star)
}

function updateStar(now_item, hash, isStar) { //更新Star样式表
    let now_start_btn = now_item.querySelector(".star_btn"),
        now_star_i = now_start_btn.querySelector("i")
    if (isStar) { //前置状态已收藏，进行取消收藏操作
        now_star_i.classList.remove("far")
        now_star_i.classList.add("fas")
        now_star_i.classList.add("Star")
        now_start_btn.title = "Cancel"

    } else { //前置状态未收藏，进行收藏操作
        now_star_i.classList.remove("fas")
        now_star_i.classList.remove("Star")
        now_star_i.classList.add("far")
        now_start_btn.title = "Star"
    }
    if (hash === "Star") {
        now_item.classList.add("hide")
        setTimeout(function() {
            now_item.style.display = "none"
        }, 400)
    }
}

function doneToDo(event, now) {
    let now_item = now.parentNode,
        now_id = now_item.getAttribute("id")
    model.data.todo_items[now_id].done = !model.data.todo_items[now_id].done
    model.flush()
    updateDone(now_item, model.data.todo_items[now_id].done)
}

function editText(event, now) {
    let now_item = now.parentNode,
        now_modal = $("#modal")
    now_modal.open(now_item)
}

function setItemStyle(now_item, type, hash) {
    let now_check = now_item.querySelector(".check_btn"),
        now_check_i = now_check.querySelector("i")
    if (type === "Done") { //已完成样式，只可能在
        if (hash === "Done") {
            setTimeout(function() {
                now_item.classList.remove("pink")
                now_item.classList.add("blue")
            }, 400)
        } else if (hash === "ToDo") {
            now_item.classList.remove("hide")
            now_item.classList.remove("show")
            now_item.classList.add("hide")
            setTimeout(function() {
                now_item.style.display = "none"
                now_item.classList.remove("pink")
                now_item.classList.add("blue")
            }, 400)
        } else { //ALL变色不用延时
            now_item.classList.remove("pink")
            now_item.classList.add("blue")
        }
        now_check_i.classList.remove("far")
        now_check_i.classList.remove("fa-square")
        now_check_i.classList.add("fas")
        now_check_i.classList.add("fa-check-square")
    } else
    if (type === "ToDo") { //待完成样式
        if (hash === "Done") {
            now_item.classList.remove("hide")
            now_item.classList.remove("show")
            now_item.classList.add("hide")
            setTimeout(function() {
                now_item.style.display = "none"
                now_item.classList.remove("blue")
                now_item.classList.add("pink")
            }, 400)
        } else if (hash === "ToDo") {
            setTimeout(function() {
                now_item.classList.remove("blue")
                now_item.classList.add("pink")
            }, 400)
        } else { //ALL变色不用延时
            now_item.classList.remove("blue")
            now_item.classList.add("pink")
        }
        now_check_i.classList.remove("fas")
        now_check_i.classList.remove("fa-check-square")
        now_check_i.classList.add("far")
        now_check_i.classList.add("fa-square")
    } else if (type === "Delete") {
        now_item.classList.remove("hide")
        now_item.classList.remove("show")
        now_item.classList.add("hide")
        setTimeout(function() {
            $("#todo_items").removeChild(now_item)
                //now_item.style.display = "none"
        }, 400)
    }
}


function deleteAll() {
    let hash = window.location.hash.split("#")[1]
    for (let key in model.data.todo_items) {
        let now_item = model.data.todo_items[key]
        if (hash === "ALL" || (hash === "Done" && now_item.done) || (hash === "ToDo" && !now_item.done) || (hash === "Star" && now_item.star)) {
            delete model.data.todo_items[key]
            model.flush()
            setItemStyle($("#" + key), "Delete", hash)
        }
    }
    updateMyToDo(hash)
}

function doneAll() {
    for (let key in model.data.todo_items) {
        if (model.data.todo_items[key].done) {
            continue
        }
        model.data.todo_items[key].done = true
        updateDone($("#" + key), true)
    }
    model.flush()
}

function notdoneAll() {
    for (let key in model.data.todo_items) {
        if (!model.data.todo_items[key].done) {
            continue
        }
        model.data.todo_items[key].done = false
        updateDone($("#" + key), false)
    }
    model.flush()
}

function clearAll() {
    $("#todo_items").innerHTML = ""
}

function updateDone(now_item, isDone) {
    let now_text = now_item.querySelector(".todo_text"),
        hash = window.location.hash.split("#")[1]
    if (isDone) {
        let now_content = now_text.innerHTML,
            now_s = $CRE("s")
        now_s.innerHTML = now_content
        now_text.innerHTML = ""
        now_text.appendChild(now_s)
        setItemStyle(now_item, "Done", hash)
    } else {
        let now_s = now_text.querySelector("s")
        if (now_s) {
            let now_content = now_s.innerHTML
            now_text.removeChild(now_s)
            now_text.innerHTML = now_content
        }
        setItemStyle(now_item, "ToDo", hash)
    }
}

function updateDateTime(now_item, datetime, isModify) {
    let now_datetime = now_item.querySelector(".todo_datetime")
    now_datetime.innerHTML = datetime
    if (isModify) {
        let new_tag = $CRE("span")
        new_tag.innerHTML = "&nbsp;&nbsp;New&nbsp;!"
        new_tag.classList.add("modify_tag")
        now_datetime.appendChild(new_tag)
    }
}

function filter(event, type) {
    updateMyToDo(type)
}

function search() {

}

$("#add").addEventListener("click", addToDo)


$("#add_input").addEventListener("keydown", function(event) {
    var e = event || window.event;
    if (e && e.keyCode == 13) {
        addToDo()
    }
})

$('.btn-triger').addEventListener("click", function() {
    let float_btn_group = this.parentNode
    if (float_btn_group.classList.contains("open")) {
        float_btn_group.classList.remove("open")
        this.querySelector(".fa-bars").style.display = ""
        this.querySelector(".fa-reply-all").style.display = "none"
        this.setAttribute("title", "Menu")

    } else {
        float_btn_group.classList.add("open")
        this.querySelector(".fa-bars").style.display = "none"
        this.querySelector(".fa-reply-all").style.display = ""
        this.setAttribute("title", "Back")

    }
})