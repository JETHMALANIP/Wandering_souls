let wishList = [];


function setup() {
    const events = document.querySelectorAll(".but");
    for (let i = 0; i < events.length; i++) {
        events[i].onclick = function (e) {
            additems(e);

        }
    }
}

function additems(e) {
    const eventid = e.target.getAttribute("id");

    if (!wishList.find(item => item === eventid)) {

        document.getElementById(eventid).innerHTML = "🖤"
        const eventdiv = document.getElementById("event" + eventid);

        const wishdiv = document.createElement("div");
        wishdiv.setAttribute("id", "wish" + eventid);
        wishdiv.setAttribute("class", "event");
        wishdiv.innerHTML = eventdiv.innerHTML;

        const removebtn = document.createElement("input");
        removebtn.setAttribute("type", "button");
        removebtn.setAttribute("value", "Remove");
        removebtn.setAttribute("class", "btn btn-secondary m-3");
        removebtn.onclick = function () {
            delitems(eventid);
        }
        wishdiv.appendChild(removebtn);

        let cont = document.getElementById("wishlist");
        cont.appendChild(wishdiv);

        wishList.push(eventid);
    }

    function delitems(eventid) {
        const event = document.getElementById("wish" + eventid);
        event.remove();
        wishList = wishList.filter(item=> item !== eventid);
        document.getElementById(eventid).innerHTML = "🤍"

    }
}

window.addEventListener("load", setup);