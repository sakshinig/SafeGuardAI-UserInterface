var ViD = document.getElementById('vd');
var Weapon = document.getElementById('wpn');
var ViolenceMessage = document.getElementById('violence');


var Loading = document.getElementById('loader');
// define the callAPI function that takes a first name and last name as parameters
var callAPI = ()=>{
  // instantiate a headers object
  
  
  Loading.style.display = 'block';

  ViolenceMessage.style.display = 'none';
  ViD.style.display = 'none';
  Weapon.style.display = 'none';

  
  var myHeaders = new Headers();
  // add content type header to object
  myHeaders.append("Content-Type", "application/json");
  // using built in JSON utility package turn object to string and store in a variable
  var raw = JSON.stringify();
  // create a JSON object with parameters for API call and store in a variable
  var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
  };
  // make API call with parameters and use promises to get response
  fetch("https://b6071s8dic.execute-api.us-east-2.amazonaws.com/recdev", requestOptions)
  .then(response => response.text())
  .then(result => {
    var str = JSON.parse(result).body;
    var isRiot = str.includes("Riot");
    var isFire = str.includes("Gun");
    var isWeapon = str.includes("Weapon");
    var Nothing = document.getElementById('nothing');
    var fcount = 0;
    
    if  (isRiot){
      Nothing.style.display = 'none';
      ViolenceMessage.style.display = 'block';
      document.getElementById("rcscore").innerHTML = str.slice(str.indexOf("Riot")+4+14, str.indexOf("Riot")+4+19) + "% Confidence";
      fcount++;
    }
    if (isFire){
      Nothing.style.display = 'none';
      ViD.style.display = 'block';
      document.getElementById("cscore").innerHTML = str.slice(str.indexOf("Gun")+3+14, str.indexOf("Gun")+3+19) + "% Confidence";
      fcount++;
    }
    if (isWeapon){
      Nothing.style.display = 'none';
      Weapon.style.display = 'block';
      document.getElementById("wscore").innerHTML = str.slice(str.indexOf("Weapon")+6+14, str.indexOf("Weapon")+6+19) + "% Confidence";
      fcount++;
    }
    
    document.getElementById("fcount").innerHTML = fcount;
    Loading.style.display = 'none';
    
  })
  .catch(error => console.log('error', error));

  //document.gthidetElementById("report").innerHTML = response;
}

// Get the Sidebar
var mySidebar = document.getElementById("mySidebar");

// Get the DIV with overlay effect
var overlayBg = document.getElementById("myOverlay");

// Toggle between showing and hiding the sidebar, and add overlay effect
function w3_open() {
  if (mySidebar.style.display === 'block') {
    mySidebar.style.display = 'none';
    overlayBg.style.display = "none";
  } else {
    mySidebar.style.display = 'block';
    overlayBg.style.display = "block";
  }
}

// Close the sidebar with the close button
function w3_close() {
  mySidebar.style.display = "none";
  overlayBg.style.display = "none";
}

function changeBG(){
  var lol = document.getElementById("lol");
  lol.style.display = "block";
}

function clickdrop() {
  var selectedOption = document.getElementById("select").value;
  if (selectedOption === "avengers") {
    document.getElementById("vidaven").style.display = "block";
  } else {
    document.getElementById("vidaven").style.display = "none";
  }
}