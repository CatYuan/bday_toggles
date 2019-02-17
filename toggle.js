//all javascript is for the
// "emojer" maker & mixer-upper
//the actual emoji toggles are NOT made with JS
var emojiGrid = document.querySelector(".emoji-grid");

var emojiSearch_left = document.querySelector(".emoji-search.left");
var emojiSearch_right = document.querySelector(".emoji-search.right");
var searchCounter = 0;

var searches = [emojiSearch_left,emojiSearch_right];

var mixBtn = document.querySelector(".mix");


emojiGrid.addEventListener("click",function(e){
  searchGlow(e);
  if(e.target.tagName == "P"){
      searches[searchCounter].value = e.target.textContent;
  }
  searchCounter++;
  
});

emojiGrid.addEventListener("mouseover",searchGlow);

//glows the searchbar up 
function searchGlow(e){
  
  var target = e.target;
  //reset if the counter gets too big
  if(searchCounter >= searches.length){
    searchCounter = 0;
  }
  if(target.tagName != "P"){
    return;
  };
  searches[searchCounter].focus();//activate focus styling
  
  
  target.addEventListener("mouseout",function(){
    target.blur();
  })

}

//swap in emojis into the example emojer
var example = document.querySelector(".emobel[for='example']");
mixBtn.addEventListener("click",function(e){
  //ensure both search fields have some content in them
  //before setting their values on a toggle
  if(emojiSearch_left.value && emojiSearch_right.value){
    example.style.setProperty("--before","'" + emojiSearch_left.value + "'");
    example.style.setProperty("--after","'" + emojiSearch_right.value + "'")
  }
});
