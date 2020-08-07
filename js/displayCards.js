// =========================
// Define state for displaying cards (if homepage or project page)
// =========================
var displayAllCardsId = document.getElementById("display-all-cards-state");
var stateValue = displayAllCardsId.childNodes[1].id;
console.log(stateValue);

// Amount of posts to show
N = 5;


// =========================
// Blog Post Data Structure
// =========================
class BlogPost {
    constructor(day, month, year, title, description, tag, imglink, blogpostlink) {
      this.day = day;
      this.month = month;
      this.year = year;
      this.title = title;
      this.description = description;
      this.tag = tag;
      this.imglink = imglink;
      this.blogpostlink = blogpostlink;
    }
}

// =========================
// Custom sort by date
// =========================
function sort_date_compare(bp0, bp1) {
    return new Date(bp1.year, bp1.month, bp1.day).getTime() - new Date(bp0.year, bp0.month, bp0.day).getTime();
}

// =========================
// Create cards
// =========================
function showCards(tag) {
    // Reset root
    cardsRoot.innerHTML = "";

    // Filter blog posts
    var filteredPosts = blogPosts;
    if (tag != "all")
    {
        filteredPosts = blogPosts.filter(elem => elem.tag == tag);
    }

    console.log("BlogPosts");
    console.log(blogPosts);

    console.log("Filtered");
    console.log(filteredPosts);

    // Get length of cards
    var showMoreButton = false;
    var nrCards;
    if (stateValue == "yes")
    {
        nrCards = filteredPosts.length;
    }
    else if (filteredPosts.length > N)
    {
        nrCards = N
        showMoreButton = true;
    } 
    else
    {
        nrCards = filteredPosts.length
    }

    // Populate root with cards
    for (var i = 0; i < nrCards; i++)
    {
        console.log("Cards " + i + " created.");
        cardsRoot.appendChild(createCard(filteredPosts[i]));
    }

    // Show more button
    if (showMoreButton)
    {
        console.log("Create <show more> button.");
        cardsRoot.appendChild(createMoreButton());
    }

}

// Create a more button
function createMoreButton()
{
    // Create root card
    var moreButtonRoot = document.createElement("DIV");
    moreButtonRoot.setAttribute('class', 'col-10 col-sm-5 col-lg-3 px-0 mx-2 mb-5');

    // Create link
    var linkToPost = document.createElement("a");
    linkToPost.href = "projects.html";

    // Create card
    var moreButton = document.createElement("DIV");
    moreButton.setAttribute('class', 'show-more-card justify-content-center align-items-center d-flex');

    // Create h4
    var moreText = document.createElement("H4");
    moreText.setAttribute('class', 'show-more-text');
    moreText.textContent = "Show More";

    moreButtonRoot.appendChild(linkToPost);
    linkToPost.appendChild(moreButton);
    moreButton.appendChild(moreText);

    return moreButtonRoot;
}

// Create a blog post card (based on info given by bp)
function createCard(bp)
{
    // Create card
    var card = document.createElement("DIV");
    card.setAttribute('class', 'card col-10 col-sm-5 col-lg-3 px-0 mx-2 mb-5');
    
    // Create link
    var linkToPost = document.createElement("a");
    linkToPost.href = bp.blogpostlink;  

    // Create image
    var img = document.createElement("IMG");
    img.setAttribute('class', 'card-img-top');
    // img.src = blogImgsPath + bp.imglink;
    img.src = bp.imglink;
    img.alt = bp.title;

    // Create body card
    var card_body = document.createElement("DIV");
    card_body.setAttribute('class', 'card-body');

    // Create tag
    var card_tag = document.createElement("DIV");
    card_tag.setAttribute('class', 'card-tag');
    var tagVal = bp.tag;
    if (bp.tag == "machinelearning") tagVal = "ml";
    card_tag.textContent = tagVal;

    // Create title
    var card_title = document.createElement("H5");
    card_title.setAttribute('class', 'card-title');
    card_title.textContent = bp.title;

    // Create description
    var card_desc = document.createElement("p");
    card_desc.setAttribute('class', 'card-text');
    card_desc.textContent = bp.description;

    // Create date
    var card_date = document.createElement("p");
    card_date.setAttribute('class', 'card-date');
    card_date.textContent = bp.day + "." + bp.month + "." + bp.year;
    
    // Parenting
    card.appendChild(linkToPost);
    
    linkToPost.appendChild(img);
    linkToPost.appendChild(card_body);

    card_body.appendChild(card_tag);
    card_body.appendChild(card_title);
    card_body.appendChild(card_desc);
    card_body.appendChild(card_date);

    return card;
}


// =========================
// Main Function
// =========================
function setupBlog(blogPosts)
{
    // Read json file
    fetch('blog-posts/posts.json').then(function(response) {
        return response.json();
    }).then(function(obj){

        // Here: If read was successful 
        var amountOfBlogPosts = Object.keys(obj['posts']).length;

        // Create blog post objects
        for (var i = 0; i < amountOfBlogPosts; i++)
        {
            var post = obj['posts'][i];
            blogPosts.push(new BlogPost(post['day'], 
                                        post['month'], 
                                        post['year'], 
                                        post['title'], 
                                        post['description'],
                                        post['tag'],
                                        post['imglink'],
                                        post['blogpostlink']
                                        ));
        }

        // Sort blog posts by date
        blogPosts.sort(sort_date_compare);

        // Create cards
        showCards("all");

    }).catch(function(error){
        // Here: error
        console.error("Something went wrong when reading blog .json file!");
        console.error(error);
    });
}

// =========================
// Set up filtering buttons
// =========================
// Get buttons
var parentButtons = document.getElementsByClassName("button-group");
var buttons = parentButtons[0].children;
var nrButtons = buttons.length;

// Add event listeners to buttons
for (var i = 0; i < nrButtons; i++)
{
    var buttonTag = buttons[i].id;
    console.log(buttonTag);
    buttons[i].addEventListener("click", showCardsHandler, false);
    buttons[i].myParam0 = buttonTag;
}

// Function called when clicking button
function showCardsHandler(e)
{    
    for (var i = 0; i < buttons.length; i++)
    {
        buttons[i].setAttribute('class', '');
    }
    this.setAttribute('class', 'active');
    showCards(e.currentTarget.myParam0);

    $('html, body').animate({
        scrollTop: $("#projects").offset().top
      }, 800, function(){
   
        // Add hash (#) to URL when done scrolling (default click behavior)
        // window.location.hash = hash;
        window.location.href = "#projects";

      });
}


// =========================
// Call main function
// =========================
// var blogImgsPath = "img/portfolio/";
var cardsRoot = document.getElementById("fill-cards-here");
var blogPosts = new Array();
setupBlog(blogPosts);
