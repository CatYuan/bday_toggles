
var url = window.location.href;
var normal_url = "https://fitbitapp--spritefullake.repl.co/";

//moods correspond to the chekcboxes in the UI
const moods = ["happy","mad","love"]; 
//a table containing the suggestions that take the health data as an input
//with the mood values being the keys of this object
const suggestions = {
  "010" : (data) => {
    let result = "";
    if(data != ""){
      result = data + "\n";
    }
    return result + "go take a short walk";
  },
  "011" : (data) => {
    let result = "";
    if(data != ""){
      result = data + "\n";
    }
    return result + "Eat whatever you want to eat"
  },
  "000" : (data) => {
    let result = "";
    if(data != ""){
      result = data + "\n";
    }
    return result + "Try something new and do something you have never done before";
  },
  "110" : (data) => {
    let result = "";
    if(data != ""){
      result = data + "\n";
    }
    return result +  "Think positively and try to sing a song";
  },
  "111" : (data) => {
    let result = "";
    if(data != ""){
      result = data + "\n";
    }
    return result +  "Take a break and talk to your friends/family";
  },
  "100" : (data) => {
    let result = "";
    if(data != ""){
      result = data + "\n";
    }
    return result +  "You are not alone, you are special and you can always meet new people!";
  },
  "101" : (data) => {
    let result = "";
    if(data != ""){
      result = data + "\n";
    }
    return result +  "Everything is good, keep it up, and don't stress too much!";
  },
  "001" : (data) => {
    let result = "";
    if(data != ""){
      result = data + "\n";
    }
    return result +  "Take a break and talk to your friends/family!";
  }
  
}

//we want to get the url ONLY if the 
//token data has been returned from the 
//FitBit OAuth


 
if (url != normal_url)
{
	//this means that we have received the access token!
	// get the url 
	var url = window.location.href;
	//getting the access token from url 
	var access_token = url.split("#")[1].split("=")[1].split("&")[0];
	// get the userid 
	var userId = url.split("#")[1].split("=")[2].split("&")[0];
	
	console.log(access_token);
	console.log(userId);
	console.log("FOUND THE ACCESS TOKEN");
 
 
 
  //let heartRate = await requestHeartRate(userId, access_token);
  //let activities = await requestActivities(userId, access_token);
  

  //requestSleep(userId, access_token).then(sleepData => watchSuggestion(computeSleep(sleepData)));
  sleepData = "";
 watchSuggestion(sleepData);
}

function obtainEmojiData(){
  return moods.map(mood => document.getElementById(mood).checked).map(state => {
    if(state){
      return 1;
    }
    else{
      return 0;
    }
  }).join('');
}
function computeEmojiData(moodData, healthData){
  return suggestions[moodData].call(this,healthData);
}

function watchSuggestion(healthData){
  document.querySelector("#suggestion").addEventListener("click",function(e){
    let emojiData = obtainEmojiData();
    let result = computeEmojiData(emojiData, healthData);
    
    document.querySelector('.toggle-holder').style.display = 'none';
    //document.querySelector('.toggle-holder').remove();
    document.querySelector('#output').innerText = result;
    document.querySelector('#suggestion').style.display = "none";
    
  });
  
}

function requestHeartRate(userId, access_token){
  //making a request to fitbit
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'https://api.fitbit.com/1/user/' + userId + '/activities/heart/date/today/1d.json');
	xhr.setRequestHeader("Authorization", 'Bearer ' + access_token);
	xhr.onload = function ()
	{
		if (xhr.status === 200)
		{
			console.log(JSON.parse(xhr.responseText));
		}
	};
	xhr.send()
};


async function  requestSleep(userId, access_token){
  var xhr = new XMLHttpRequest();
  var date = new Date()
  var today = date.getFullYear()+'-'+date.getMonth()+'-'+2
	xhr.open('GET', 'https://api.fitbit.com/1.2/user/' + userId + '/sleep/date/'+today+'.json');
	xhr.setRequestHeader("Authorization", 'Bearer ' + access_token);
	xhr.onload = function ()
	{
		if (xhr.status === 200)
		{
			console.log(JSON.parse(xhr.responseText));
		}
	};
	//xhr.send()
	return JSON.parse(xhr.responseText);
}
function computeSleep(data){
  //the sleep duration is in milliseconds

  //a healthy adult should get 8 hours of sleep or more
  let duration = data.sleep[0].duration;
  let hours = duration/1000.0/60.0/60.0;

  let efficiency = data.sleep[0].efficiency;

  if(hours < 8){
    return "Need to sleep more!";
  }
  else{
    return "";
  }


}

function requestActivities(userId, access_token){
  var xhr = new XMLHttpRequest();
  var date = new Date()
  var today = date.getFullYear()+'-'+date.getMonth()+'-'+(date.getDay()+1)
	xhr.open('GET', 'https://api.fitbit.com/1.2/user/' + userId + '/activities/date/'+today+'.json');
	xhr.setRequestHeader("Authorization", 'Bearer ' + access_token);
	xhr.onload = function ()
	{
		if (xhr.status === 200)
		{
			console.log(JSON.parse(xhr.responseText));
		}
	};
	xhr.send()
}
