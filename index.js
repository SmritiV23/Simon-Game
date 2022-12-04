let buttonColors=["red", "blue", "green", "yellow"]
let gamePattern=[]
let userClickedPattern=[]
let level=0
let started=false
$(document).keypress(function (e) { 
    if(!started)
    {
        $("h1").text(`LEVEL ${level}`);
        setTimeout(function(){
            nextSequence();
        },100);
        
        started=true;
    }
   
});

function nextSequence(){

    level++;
    $("h1").text(`LEVEL ${level}`);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor=buttonColors[randomNumber]
    gamePattern.push(randomChosenColor)

    $("#"+ randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomChosenColor);

}

function playsound(inputSound)
{
    var audio = new Audio(`sound/${inputSound}.mp3`);
    audio.play();
}

$(".btn").click(function(){
    let userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playsound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length -1);
})

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]==userClickedPattern[currentLevel])
    {
        console.log("success")
        if(gamePattern.length==userClickedPattern.length)
        {
            setTimeout(function(){
                nextSequence();
            },1000 );

            userClickedPattern=[];
        }
    }
    else
    {
        console.log("wrong");
        playsound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
        $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart")

        startOver();
    }
    
 }

 function startOver(){
      level=0
      gamePattern=[]
      started=false
 }
function animatePress(currentColor){
       $("#"+currentColor).addClass("pressed");

       setTimeout(function () {
        $("#"+currentColor). removeClass("pressed")
        }, 100);
    
}