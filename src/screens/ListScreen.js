import './ListScreen.css';
import Nav from '../Nav';
import { db, auth } from '../firebase';
import ListRow from '../ListRow';
import { useLocation } from 'react-router-dom';

function ListScreen() {
  const listArr = useLocation();

  const base_url = "https://image.tmdb.org/t/p/original/"


  
  // db.collection("users").doc(`${auth.currentUser.uid}`).collection("my-movie-list").get()
  // .then(querySnapshot => {
  //   querySnapshot.forEach((doc) => {
  //     // console.log(doc.id, " => ", doc.data());
  //     const divContainer = document.createElement("div");
  //     divContainer.classList.add("movieContainer");
      
  //     const imgContainer = document.createElement("div");
  //     imgContainer.classList.add("imgContainer");
      
  //     const descContainer = document.createElement("div");
  //     descContainer.classList.add("descContainer");

  //     const title = document.createElement("h1");
  //     title.classList.add("titleH1");
  //     title.innerText = `${doc.data().name}`;

  //     const details = document.createElement("div");
  //     details.classList.add("details");

  //     const desc = document.createElement("h3");
  //     desc.classList.add("descH3");
  //     desc.innerText = `${doc.data().overview}`;

  //     const bttnDiv = document.createElement("div");
  //     bttnDiv.classList.add("bttnContainer");
  //     const bttn = document.createElement("button");
  //     bttn.classList.add("playTrailer_bttn");
  //     bttn.innerText = `Play`;
  //     bttn.addEventListener("click", () => {console.log("clicked")});
  //     bttnDiv.appendChild(bttn);

  //     const img = document.createElement("img");
  //     img.setAttribute("src", `${base_url + (doc.data().poster_path || doc.data().backdrop_path)}`);
  //     imgContainer.appendChild(img);
      
  //     divContainer.appendChild(imgContainer);
  //     descContainer.appendChild(title);
  //     descContainer.appendChild(details);
  //     descContainer.appendChild(desc);
  //     descContainer.appendChild(bttnDiv);
      
  //     divContainer.appendChild(descContainer);
  

  //     const listScreen = document.getElementsByClassName("listScreen")[0];
  //     listScreen.appendChild(divContainer);

  //     document.getElementsByClassName("scrollingDiv")[0].appendChild(divContainer);
  //   });
  // })   
  
    console.log(listArr);
  return (
    <div className="listScreen">
        <Nav />
        <div className="scrollingDiv">
          {/* {listArr.map((movie, i) => <ListRow listM={}/>)} */}
          {Array.from(listArr).map((movie, index) =>  <ListRow key={movie[index]} />)}
          <div className="videoPlayer_holder">
            <span className="close">&#10006;</span>
            <iframe title="Video of show/movie" className="video" allowFullScreen="1" ></iframe>
          </div>  
        </div>
    </div>
  )
  
}
  

export default ListScreen