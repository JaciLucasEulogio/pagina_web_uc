let icono_menu = document.querySelector('.icono-menu');
let header = document.querySelector('header');

icono_menu.onclick=function(){
    header.classList.toggle('open');
}


const nav=document.querySelector('.nav');

    window.addEventListener('scroll',function(){
        nav.classList.toggle('active',window.scrollY >0)
    })





// ----------------------------JAVASCRIPT_LINEA-DE-TIEMPO------------------------

const line = document.querySelector(".lineaDeTiempo_lineaInterior");

let i = 0;
let i2 = 1;
let target1 = document.querySelector(".lineaDeTiempo ul");
let target2 = document.querySelectorAll(".lineaDeTiempo ul li");

const timeline_events = document.querySelectorAll(".lineaDeTiempo ul li");

function showTime(e) {
    e.setAttribute("done", "true");
    e.querySelector(".lineaDeTiempo_punto").style.background = "rgb(251, 235, 128)";
    e.querySelector(".lineaDeTiempo ul li .fecha").style.opacity = "100%";
    e.querySelector(".lineaDeTiempo ul li p").style.opacity = "100%";
    e.querySelector(".lineaDeTiempo ul li p").style.transform = "translateY(0px)";
}

function hideTime(e) {
    e.removeAttribute("done");
    e.querySelector(".lineaDeTiempo_punto").style.background = "rgb(228, 228, 228)";
    e.querySelector(".lineaDeTiempo ul li .fecha").style.opacity = "0%";
    e.querySelector(".lineaDeTiempo ul li p").style.opacity = "0%";
    e.querySelector(".lineaDeTiempo ul li p").style.transform = "translateY(-10px)";
}
function slowLoop() {
    setTimeout(function () {
        showTime(timeline_events[i]);
        timelineProgress(i + 1);
        i++;
        if (i < timeline_events.length) {
            slowLoop();
        }
    }, 800);
}

function timelineProgress(value) {
    let progress = `${(value / timeline_events.length) * 100}%`;
    if (window.matchMedia("(min-width: 728px)").matches) {
        line.style.width = progress;
        line.style.height = "4px";
        } else {
        line.style.height = progress;
        line.style.width = "4px";
    }
}
let observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.intersectionRatio > 0.9) {
            if (window.matchMedia("(min-width: 728px)").matches) {
                slowLoop();
            } else {
                showTime(entry.target);
                timelineProgress(i2);
                i2++;
            }
            observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 1, rootMargin: "0px 0px -50px 0px" }
);
if (window.matchMedia("(min-width: 728px)").matches) {
    observer.observe(target1);
    } else {
        target2.forEach((t) => {
        observer.observe(t);
    });
}
timeline_events.forEach((li, index) => {
    li.addEventListener("click", () => {
        if (li.getAttribute("done")) {
            timelineProgress(index);
    
            // hide all timeline events from last upto the point clicked
            timeline_events.forEach((ev, idx) => {
            if (idx >= index) {
                hideTime(ev);
            }
            });
        } else {
            timelineProgress(index + 1);
            // show all timeline events from first upto the point clicked
            timeline_events.forEach((ev, idx) => {
            if (idx <= index) {
                showTime(ev);
            }
            });
        }
    });
});

var doit;
window.addEventListener("resize", () => {
    clearTimeout(doit);
    doit = setTimeout(resizeEnd, 1200);
    });

function resizeEnd() {
    i = 0;
    slowLoop();
}

    