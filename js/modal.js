var cancel = $("#cancel"),
    modal = $("#modal"),
    modal_content = modal.querySelector(".modal-content"),
    sure_btn = $("#sure")

sure_btn.addEventListener("click", function() {
    let now_modify_input = $("#modify_content").value,
        now_modify_id = $("#modify_id").value,
        now_modal = $("#modal"),
        now_datetime = new Date(),
        hash = window.location.hash.split("#")[1]
    if (now_modify_input.length >= 1) {
        model.data.todo_items[now_modify_id].content = now_modify_input
        model.data.todo_items[now_modify_id].datetime = now_datetime.format("yyyy-MM-dd hh:mm:ss")
        model.data.todo_items[now_modify_id].isModify = true
        model.flush()
        vt.success("Modify Success ~", {
            title: undefined,
            position: "top-right",
            duration: 1000,
            closable: true,
            focusable: true,
            callback: undefined
        })
        now_modal.close()
        updateMyOneToDo($("#" + now_modify_id))
    } else {
        vt.error("Content Can't be Empty ~", {
            title: undefined,
            position: "top-right",
            duration: 1000,
            closable: true,
            focusable: true,
            callback: undefined
        })
    }
})

modal.open = function(now_item) {
    let now_id = now_item.getAttribute("id"),
        now_modal_text = $("#modify_content"),
        now_modify_id = $("#modify_id")
    now_modal_text.value = model.data.todo_items[now_id].content
    now_modify_id.value = now_id
    modal_content.classList.remove("modal-hidden-anim")
    modal_content.classList.add("modal-show-anim")
    modal.style.display = "block";
}

modal.close = function() {
    modal_content.classList.remove("modal-show-anim")
    modal_content.classList.add("modal-hidden-anim")
    setTimeout(() => {
        modal.style.display = "none";
    }, 300);
}

modal_content.addEventListener("click", function(event) {
    event.stopPropagation();
})
cancel.addEventListener('click', function() {
    modal.close()
});

modal.addEventListener("click", function() {
    modal.close()
});