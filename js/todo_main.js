window.onload = function() {
    vt.success("Welcome Back 🌸~", {
        title: undefined,
        position: "top-right",
        duration: 1500,
        closable: true,
        focusable: true,
        callback: undefined
    });

    model.init(function() {
        window.location.href = "#ALL"
        initMyToDo();
    });

    $("#add").addEventListener("click", addToDo)


    $("#add_input").addEventListener("keydown", function(event) {
        var e = event || window.event;
        if (e && e.keyCode == 13) {
            addToDo()
        }
    })

    $("#search").addEventListener("click", function() {
        Search()
    })

    $("#search_input").addEventListener("keydown", function(event) {
        var e = event || window.event;
        if (e && e.keyCode == 13) {
            Search()
        }
    })

    /*初始化搜索栏与添加栏状态切换*/
    if ($("#search_or_add").value === "search") {
        $("#search_or_add").setAttribute("title", "Search")
        $("#search_input").style.display = "none"
        $("#search").style.display = "none"
        $("#add_input").style.display = ""
        $("#add").style.display = ""
        $("#search_text").classList.remove("show")
        $("#search_text").classList.add("hide")
        $("#search_text").style.visibility = "hidden"
    } else if ($("#search_or_add").value === "add") {
        $("#search_or_add").setAttribute("title", "Add Todo")
        $("#add_input").style.display = "none"
        $("#add").style.display = "none"
        $("#search_input").style.display = ""
        $("#search").style.display = ""
        $("#search_text").classList.remove("hide")
        $("#search_text").classList.add("show")
        $("#search_text").style.visibility = "visible"
    }

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
        deleteAll()
    })
    $("#done_All").addEventListener("click", function() {
        doneAll()
    })
    $("#notdone_All").addEventListener("click", function() {
        notdoneAll()
    })
    $("#clear_Done").addEventListener("click", function() {
        clearDone()
    })
    $("#search_or_add").addEventListener("click", function() {
        changeModel() //Add or Search
    })
}

function initMyToDo() {
    let todo_cnt = 0,
        done_cnt = 0,
        star_cnt = 0,
        hash = window.location.hash.split("#")[1]
    for (let key in model.data.todo_items) {
        let item = model.data.todo_items[key]
        if (item.done) done_cnt++;
        else if (!item.done) todo_cnt++;
        if (item.star) star_cnt++;

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
        now_del_i.classList.add("Delete")
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
    $("#done_cnt").innerHTML = done_cnt
    $("#todo_cnt").innerHTML = todo_cnt
    $("#star_cnt").innerHTML = star_cnt
    if (JSON.stringify(model.data.todo_items) == "{}") {
        $("#filter_btn").classList.remove("show")
        $("#filter_btn").classList.add("hide")
        $("#filter_btn").style.visibility = "hidden"
    } else {
        $("#filter_btn").classList.remove("hide")
        $("#filter_btn").classList.add("show")
        $("#filter_btn").style.visibility = "visible"
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
        if (hash === "Done") {
            model.data.todo_items[now_item_id] = {
                content: input_content,
                datetime: datetime.format("yyyy-MM-dd hh:mm:ss"),
                done: true,
                star: false,
                isModify: false,
            }
            model.flush()
        } else if (hash === "Star") {
            model.data.todo_items[now_item_id] = {
                content: input_content,
                datetime: datetime.format("yyyy-MM-dd hh:mm:ss"),
                done: false,
                star: true,
                isModify: false,
            }
            model.flush()
        } else {
            model.data.todo_items[now_item_id] = {
                content: input_content,
                datetime: datetime.format("yyyy-MM-dd hh:mm:ss"),
                done: false,
                star: false,
                isModify: false,
            }
            model.flush()
        }

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
        now_del_i.classList.add("Delete")
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

        if (hash === "Done") {
            updateStar(now_div, hash, false)
            updateDone(now_div, true)
        } else if (hash === "Star") {
            updateStar(now_div, hash, true)
            updateDone(now_div, false)
        } else {
            updateStar(now_div, hash, false)
            updateDone(now_div, false)
        }

        $("#add_input").value = ""
        vt.success("Add Note ~", {
            title: undefined,
            position: "top-right",
            duration: 1000,
            closable: true,
            focusable: true,
            callback: undefined
        })
        updateMyToDo(hash)
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
    if ($("#filter_btn").classList.contains("hide")) {
        $("#filter_btn").classList.remove("hide")
        $("#filter_btn").classList.add("show")
        $("#filter_btn").style.visibility = "visible"
    }
}

function updateMyToDo(hash) {
    let todo_items = $All(".item"),
        todo_cnt = 0,
        done_cnt = 0,
        star_cnt = 0
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
                if (now_item.done) {
                    done_cnt++
                } else if (!now_item.done) {
                    todo_cnt++
                }
                if (now_item.star) {
                    star_cnt++
                }
            }
        }
    }
    $("#done_cnt").innerHTML = done_cnt
    $("#todo_cnt").innerHTML = todo_cnt
    $("#star_cnt").innerHTML = star_cnt
    if (JSON.stringify(model.data.todo_items) == "{}") {
        $("#filter_btn").classList.remove("show")
        $("#filter_btn").classList.add("hide")
        $("#filter_btn").style.visibility = "hidden"
    } else {
        $("#filter_btn").classList.remove("hide")
        $("#filter_btn").classList.add("show")
        $("#filter_btn").style.visibility = "visible"
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
    if (model.data.todo_items[now_id].done) {
        $("#done_cnt").innerHTML = (parseInt($("#done_cnt").innerHTML) - 1)
    } else if (!model.data.todo_items[now_id].done) {
        $("#todo_cnt").innerHTML = (parseInt($("#todo_cnt").innerHTML) - 1)
    }
    if (model.data.todo_items[now_id].star) {
        $("#star_cnt").innerHTML = (parseInt($("#star_cnt").innerHTML) - 1)
    }
    delete model.data.todo_items[now_id]
    model.flush()
    setItemStyle(now_item, "Delete", "")
    if (JSON.stringify(model.data.todo_items) == "{}") {
        $("#filter_btn").classList.remove("show")
        $("#filter_btn").classList.add("hide")
        $("#filter_btn").style.visibility = "hidden"
    }
}

function starToDo(event, now) {
    let now_item = now.parentNode,
        now_id = now_item.getAttribute("id"),
        hash = window.location.hash.split("#")[1]
    model.data.todo_items[now_id].star = !model.data.todo_items[now_id].star
    model.flush()
    if (model.data.todo_items[now_id].star) {
        $("#star_cnt").innerHTML = parseInt($("#star_cnt").innerHTML) + 1
    } else if (!model.data.todo_items[now_id].star) {
        $("#star_cnt").innerHTML = parseInt($("#star_cnt").innerHTML) - 1
    }
    updateStar(now_item, hash, model.data.todo_items[now_id].star)
}

function updateStar(now_item, hash, isStar) { //更新Star样式表
    let now_start_btn = now_item.querySelector(".star_btn"),
        now_star_i = now_start_btn.querySelector("i")
    if (isStar) { //变更成为已收藏
        now_star_i.classList.remove("far")
        now_star_i.classList.add("fas")
        now_star_i.classList.add("Star")
        now_start_btn.title = "Cancel"

    } else { //变更成为未收藏
        now_star_i.classList.remove("fas")
        now_star_i.classList.remove("Star")
        now_star_i.classList.add("far")
        now_start_btn.title = "Star"
    }
    if (hash === "Star" && !isStar) {
        now_item.classList.remove("show")
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
    if (model.data.todo_items[now_id].done) {
        $("#done_cnt").innerHTML = (parseInt($("#done_cnt").innerHTML) + 1)
        $("#todo_cnt").innerHTML = (parseInt($("#todo_cnt").innerHTML) - 1)
    } else if (!model.data.todo_items[now_id].done) {
        $("#done_cnt").innerHTML = (parseInt($("#done_cnt").innerHTML) - 1)
        $("#todo_cnt").innerHTML = (parseInt($("#todo_cnt").innerHTML) + 1)
    }
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
        now_check_i.classList.add("Checked")
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
        now_check_i.classList.remove("Checked")
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
    let hash = window.location.hash.split("#")[1],
        cnt = 0
    for (let key in model.data.todo_items) {
        let now_item_div = $("#" + key)
        if (now_item_div.classList.contains("show")) {
            delete model.data.todo_items[key]
            model.flush()
            setItemStyle(now_item_div, "Delete", hash)
            cnt++
        }
    }
    filter(event, hash)
    if (cnt == 0) {
        vt.info("Nothing Delete ~", {
            title: undefined,
            position: "top-right",
            duration: 1500,
            closable: true,
            focusable: true,
            callback: undefined
        });
    } else {
        vt.success("Delete " + cnt + " item(s) ~", {
            title: undefined,
            position: "top-right",
            duration: 1500,
            closable: true,
            focusable: true,
            callback: undefined
        });
    }
}

function doneAll() {
    let hash = window.location.hash.split("#")[1],
        cnt = 0
    for (let key in model.data.todo_items) {
        let now_item = model.data.todo_items[key],
            now_item_div = $("#" + key)
        if (!now_item.done && now_item_div.classList.contains("show")) {
            model.data.todo_items[key].done = true
            updateDone($("#" + key), true)
            cnt++
        }
    }
    filter(event, hash)
    if (cnt == 0) {
        vt.info("Nothing Done ~", {
            title: undefined,
            position: "top-right",
            duration: 1500,
            closable: true,
            focusable: true,
            callback: undefined
        });
    } else {
        vt.success("Done " + cnt + " item(s) ~", {
            title: undefined,
            position: "top-right",
            duration: 1500,
            closable: true,
            focusable: true,
            callback: undefined
        });
    }
}

function notdoneAll() {
    let hash = window.location.hash.split("#")[1],
        cnt = 0
    for (let key in model.data.todo_items) {
        let now_item = model.data.todo_items[key],
            now_item_div = $("#" + key)
        if (now_item.done && now_item_div.classList.contains("show")) {
            model.data.todo_items[key].done = false
            updateDone($("#" + key), false)
            cnt++
        }
    }
    filter(event, hash)
    if (cnt == 0) {
        vt.info("Nothing Not Done ~", {
            title: undefined,
            position: "top-right",
            duration: 1500,
            closable: true,
            focusable: true,
            callback: undefined
        });
    } else {
        vt.success("Not Done " + cnt + " item(s) ~", {
            title: undefined,
            position: "top-right",
            duration: 1500,
            closable: true,
            focusable: true,
            callback: undefined
        });
    }
}

function clearDone() {
    let hash = window.location.hash.split("#")[1],
        cnt = 0
    for (let key in model.data.todo_items) {
        let now_item = model.data.todo_items[key],
            now_item_div = $("#" + key)
        if (now_item.done && now_item_div.classList.contains("show")) {
            delete model.data.todo_items[key]
            model.flush()
            setItemStyle(now_item_div, "Delete", hash)
            cnt++
        }
    }
    filter(event, hash)
    if (cnt == 0) {
        vt.info("Nothing Clear ~", {
            title: undefined,
            position: "top-right",
            duration: 1500,
            closable: true,
            focusable: true,
            callback: undefined
        });
    } else {
        vt.success("Clear " + cnt + " Done ~", {
            title: undefined,
            position: "top-right",
            duration: 1500,
            closable: true,
            focusable: true,
            callback: undefined
        });
    }

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

function filter(event, hash) {
    if ($("#search_or_add").value === "search") {
        updateMyToDo(hash)
    } else if ($("#search_or_add").value === "add") {
        updateMySearch(hash)
    }
}

function changeModel() {
    let now_i = $("#search_or_add").querySelector("i"),
        hash = window.location.hash.split("#")[1]
    if ($("#search_or_add").value === "search") { //切换到Search
        $("#search_content").value = ""
        $("#search_span").innerHTML = ""
        $("#search_or_add").setAttribute("title", "Add Todo")
        $("#search_text").classList.remove("hide")
        $("#search_text").classList.add("show")
        $("#search_text").style.visibility = "visible"
        $("#search_or_add").value = "add"
        now_i.classList.remove("fa-search")
        now_i.classList.add("fa-calendar-plus")
        $("#add_input").value = ""
        $("#search_input").value = ""
        $("#add_input").style.display = "none"
        $("#add").style.display = "none"
        $("#search_input").style.display = ""
        $("#search").style.display = ""
    } else if ($("#search_or_add").value === "add") { //切换到Add
        $("#search_content").value = ""
        $("#search_span").innerHTML = ""
        $("#search_or_add").setAttribute("title", "Search")
        $("#search_text").classList.remove("show")
        $("#search_text").classList.add("hide")
        $("#search_text").style.visibility = "hidden"
        $("#search_or_add").value = "search"
        now_i.classList.remove("fa-calendar-plus")
        now_i.classList.add("fa-search")
        $("#add_input").value = ""
        $("#search_input").value = ""
        $("#search_input").style.display = "none"
        $("#search").style.display = "none"
        $("#add_input").style.display = ""
        $("#add").style.display = ""
    }
    filter(event, hash)
}

function updateMySearch(hash) {
    let search_content = $("#search_content").value,
        todo_items = $All(".item"),
        todo_cnt = 0,
        done_cnt = 0,
        star_cnt = 0
    for (let item of todo_items) {
        let item_id = item.getAttribute("id")
        let now_item = model.data.todo_items[item_id]
        if (now_item) {
            if (search_content === "" || now_item.content.search(search_content) != -1) {
                if (now_item.done) {
                    done_cnt++
                } else if (!now_item.done) {
                    todo_cnt++
                }
                if (now_item.star) {
                    star_cnt++
                }
            }
            if ((hash === "ALL" || (hash === "Done" && now_item.done) || (hash === "ToDo" && (!now_item.done)) || (hash === "Star" && now_item.star)) && (search_content === "" || now_item.content.search(search_content) != -1)) {
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
    $("#done_cnt").innerHTML = done_cnt
    $("#todo_cnt").innerHTML = todo_cnt
    $("#star_cnt").innerHTML = star_cnt
}

function Search() {
    let input_content = $("#search_input").value,
        hash = window.location.hash.split("#")[1]
    input_content = input_content.trim()
    $("#search_content").value = input_content
    $("#search_span").innerHTML = input_content
    updateMySearch(hash)
    if (input_content === "") {
        vt.success("Search All ~", {
            title: undefined,
            position: "top-right",
            duration: 1500,
            closable: true,
            focusable: true,
            callback: undefined
        });
    } else {
        vt.success("Search for \"" + input_content + "\" ~", {
            title: undefined,
            position: "top-right",
            duration: 1500,
            closable: true,
            focusable: true,
            callback: undefined
        });
    }
}