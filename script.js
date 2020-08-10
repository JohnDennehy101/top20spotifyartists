//Setting indexPosition to 1 as this will be the top artist that a user listens to
let indexPosition = 1;
//Header
let siteHeader = document.getElementById("header-style");
//Parent container which contains all elements used to display data from API call
let contentContainer = document.getElementById("content-container");
//Initially hiding this segment until user has authorised
contentContainer.classList.add("content_container_hidden");
//Login with Spotify button
let loginWithSpotifyButton = document.getElementById("loginWithSpotify");

//App details
let client_id = "2d31dbf9f18b4f6580e667a5090396df";
let scopes = "user-top-read";
let redirect_uri = "http://yourtop20artists.netlify.app";

//Adding eventlistener to trigger authorisation flow. If user provides authorisation, api call is made with the correct authorisation token and the data is displayed.
loginWithSpotifyButton.addEventListener("click", () => {
  //Popup to let the user authorise Spotify
  let popup = window.open(
    `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&redirect_uri=${redirect_uri}&scope=${scopes}&show_dialog=true`,
    "Login with Spotify",
    "width=800,height=600"
  );

  window.spotifyCallback = (payload) => {
    // alert(payload)

    //Popup is hidden as authorisation is complete
    popup.close();
    //Fetch call is made to obtain the data with the correct authorisation provided in the call
    fetch("https://api.spotify.com/v1/me/top/artists", {
      headers: {
        Authorization: `Bearer ${payload}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      //Using a forEach loop to go through each object in the api response and creating the elements that will appear on the page
      .then((data) =>
        data.items.forEach((item) => {
          let containerEl = document.createElement("div");
          containerEl.classList.add("container");
          let positionNumberEl = document.createElement("p");
          positionNumberEl.textContent = indexPosition;
          positionNumberEl.classList.add("index-position");
          indexPosition++;
          let titleEl = document.createElement("p");
          let imgEl = document.createElement("img");
          let buttonEl = document.createElement("button");
          let externalLinkEl = document.createElement("a");
          buttonEl.textContent = "View On Spotify";
          externalLinkEl.href = `${item.external_urls.spotify}`;
          externalLinkEl.target = "_blank";
          externalLinkEl.appendChild(buttonEl);
          imgEl.src = item.images[1].url;
          imgEl.classList.add("image");
          titleEl.textContent = item.name;
          contentContainer.classList.remove("content_container_hidden");
          //Hiding login with Spotify Button
          loginWithSpotifyButton.style.display = "none";
          //Showing top 20 artists as all content included within this container
          contentContainer.classList.add("content_container_display");
          //Appending items to this container so that they are displayed on the page
          contentContainer.appendChild(containerEl);
          containerEl.appendChild(positionNumberEl);
          containerEl.appendChild(titleEl);
          containerEl.appendChild(imgEl);
          containerEl.appendChild(externalLinkEl);
        })
      );
  };
});
//checking the URL to see if the token has been appended for Spotify authorisation
this.token = window.location.hash.substr(1).split("&")[0].split("=")[1];

//If it has the token, the spotifyCallBack function is called with the token passed to enable the API call to be successful
if (this.token) {
  window.opener.spotifyCallback(this.token);
}
