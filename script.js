mouseX = 0;
mouseY = 0;
hoverX = 0;
hoverY = 0;
hoveredButton = null;

$(document).ready(function() {
    useTallestQuoteHeight();
    loopQuotes();
    populateFAQ();
    $(".section.contact textarea").attr("rows", 1);
    textarea = document.querySelector(".section.contact textarea");
    textarea.addEventListener('input', resizeTextarea, false);
    resizeTextarea();
});

$(window).resize(function() {
    useTallestQuoteHeight();
    sizeFAQs();
    resizeTextarea();
    $(".section.navbar").removeClass("open");
});

//QUOTE SLIDER CONTENT
const quotes = [
    {
        quote: "The meaning of life is to give life meaning.",
        attribution: "Viktor E. Frankl",
    },
    {
        quote: "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
        attribution: "Ralph Waldo Emerson",
    },
    {
        quote: "I am not what happened to me, I am what I choose to become.",
        attribution: "CG Jung",
    },
    {
        quote: "You miss 100% of the shots you don’t take.",
        attribution: "Wayne Gretzky",
    },
];

//FAQ QUESTIONS
const faq = [
    {
        question: "What kinds of issues do you help with?",
        answer: "We are able to focus on a multitude of challenges, from anxiety to depression, self-esteem issues or family conflict, as well as life transitions and career stressors. We want to be able to guide and support you through these moments and take your potential higher. We also specialize in performance improvement, either on the athletic field or in strategizing your next career move, as well as spirituality endeavors that create a visionary path for you.",
    },
    {
        question: "What can I expect in counseling-therapy?",
        answer: "While counseling looks different for everyone, we want to bring out the gifts within you. It is together we identify the strengths you already possess and discover any blocks that may be holding you back. We will align toward setting your personal goals and create workable techniques for your everyday life to cope and create new habits that you can practice over a lifetime.",
    },
    {
        question: "What methods do you use in practice?",
        answer: "We ascribe to solution-focused, evidence-based methods and use mindfulness-based practices. We look at challenges through a trauma-informed lens and realize that we all come with a set of values and behavior patterns that have worked for us so far. We use meditation, guided practice, and relaxation techniques as well as acceptance and commitment therapy (ACT) to guide and inform our daily lives toward betterment.",
    },
    {
        question: "How long will therapy take for me?",
        answer: "We value an individualized approach, so each session is different yet guided toward your goals. We will discuss progress at each of our sessions but generally speaking, our approach is brief and solution-focused. In the words of Stephen Covey, we ‘begin with the end in mind,’ that being a better you --  mentally, physically, spiritually.",
    },
];


currentQuote = 0;
quoteHeights = [];

//POPULATE QUOTES
quotes.forEach(function(quote, quoteIndex) {
    $(".quotes-wrapper").append(`
        <div class="quote-group">
            <span class="quote f-header-2">${quotes[quoteIndex].quote}</span>
            <span class="attribution f-header-4">${quotes[quoteIndex].attribution}</span>
        </div>
    `);
});

//SIZE QUOTES SECTION TO TALLEST QUOTE
function useTallestQuoteHeight() {
    quoteHeights = [];
    $(".quote-group").each(function(index) {
        quoteHeights.push($(this).outerHeight());
    });
    $(".quotes-wrapper").css("height", `${Math.max(...quoteHeights)}`)
}

//LOOP THROUGH AVAILABLE QUOTES
function loopQuotes() {
    $(".quote-group").each(function(index) {
        $(this).css("opacity", `${index === currentQuote ? "1" : "0"}`);
    });
    setTimeout(function() {
        if (currentQuote < quotes.length - 1) {
            currentQuote +=1;
        } else {
            currentQuote = 0;
        }
        $(".quote-group").each(function(index) {
            $(this).css({opacity: `${index === currentQuote ? "1" : "0"}`, transitionDelay: `${index === currentQuote ? "1s" : "0s"}`});
        });
        loopQuotes();
    }, 6000);
}

//POPULATE FAQ QUESTIONS
function populateFAQ() {
    faq.forEach(function(question, questionIndex) {
        $(".section.faq .questions").append(`
            <div class="group ${questionIndex === 0 ? "open" : ""}">
                <div class="top-bar">
                    <span class="question f-header-3">${faq[questionIndex].question}</span>
                    <div class="button"></div>
                </div>
                <div class="answer f-body-1">${faq[questionIndex].answer}</div>
            </div>
        `);
    });
    sizeFAQs();
};

//KEEP ACCORDION SIZING ACCURATE
function sizeFAQs() {
    $(".section.faq .group").each(function(index) {
        const closedHeight = $(this).children(".top-bar").outerHeight();
        const openHeight = $(this).children(".top-bar").outerHeight() + $(this).children(".answer").outerHeight();
        $(this).css({height: `${$(this).hasClass("open") ? openHeight : closedHeight}`})
    });
}

//TOGGLE FAQ "OPEN" STATE
$(document).on("click", ".section.faq .group", function() {
    if ($(this).hasClass("open")) {
        $(this).removeClass("open");
    } else {
        $(".section.faq .group").removeClass("open");
        $(this).addClass("open");
    }
    sizeFAQs();
});

//EXPAND "MESSAGE" TEXTAREA TO ACCOMMODATE ALL TEXT WHENEVER TEXTAREA VALUE CHANGES
function resizeTextarea() {
    textarea.style.height = "auto";
    textarea.style.height = (textarea.scrollHeight) + "px";
}



//TRACK WHICH BUTTON IS BEING HOVERED
$(document).on("mousemove", function(e) {

    if (hoveredButton !== null) {
        mouseX = e.pageX;
        mouseY = e.pageY;
        hoverX = mouseX - hoveredButton.offset().left;
        hoverY = mouseY - hoveredButton.offset().top;
        hoveredButton.children(".glow-hover").css({
           left:  `${hoverX}px`,
           top:   `${hoverY}px`,
        });
    }

});

//GIVE EACH BUTTON A HOVER EFFECT CHILD
$(".glowing").each(function(index) {
    $(this).append(`<div class="glow-hover"></div`);
})

//SET THE BUTTON BEING HOVERED
$(".glowing").hover(function() {
    hoveredButton = $(this);
}, function() {
    hoveredButton = null;
});

//OPEN AND CLOSE NAV MOBILE MENU
$(document).on("click", ".hamburger", function() {
    $(".section.navbar").toggleClass("open");
});

$(document).on("click", ".section.navbar .links .link", function() {
    $(".section.navbar").removeClass("open");
});

$(document).on("click", ".section.navbar .links .button", function() {
    $(".section.navbar").removeClass("open");
});
