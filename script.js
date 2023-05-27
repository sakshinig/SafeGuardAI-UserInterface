var Loading = document.getElementById('loader');
// define the callAPI function that takes a first name and last name as parameters
var callAPI = ()=>{
  // instantiate a headers object
  
  Loading.style.display = 'block';
  
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
    var isViolent = str.includes("Riot");
    var isFire = str.includes("Gun");
    var ViolenceMessage = document.getElementById('violence');
    var ViD = document.getElementById('vd');
    var Nothing = document.getElementById('nothing');
    
    if (isViolent){
      Nothing.style.display = 'none';
      ViolenceMessage.style.display = 'block';
      Loading.style.display = 'none';
      document.getElementById("rcscore").innerHTML = str.slice(str.indexOf("Riot")+4+14, str.indexOf("Riot")+4+19) + "%";
    }
    if (isFire){
      Nothing.style.display = 'none';
      ViD.style.display = 'block';
      Loading.style.display = 'none';
      document.getElementById("cscore").innerHTML = str.slice(str.indexOf("Gun")+3+14, str.indexOf("Gun")+3+14+5) + "%";
      
    }
    
  })
  .catch(error => console.log('error', error));

  //document.getElementById("report").innerHTML = response;
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