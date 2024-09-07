const moviesearch = document.querySelector(".moviesearch");
const genresearch = document.querySelector(".genresearch");
const movietitle = document.querySelector(".movietitle");
const moviegenre = document.querySelector(".moviegenre");
const card = document.querySelector(".card");
const card2 = document.querySelector(".card2");
let moviesarr; 
let checkBox1 = document.getElementById("myCheck1");
let checkBox2 = document.getElementById("myCheck2");

let namebutton= document.querySelector("button[type='submit']");
const apiKey = "82484e21";let i=0;

  moviesearch.addEventListener("submit", async event => {
    console.log("safe");
    event.preventDefault();

    const title = movietitle.value;

    if(title){
        try{
            const movieData = await getmovieData(title);
            displaymovieInfo(movieData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else{
        displayError("Please enter a title");
    }
});

genresearch.addEventListener("submit", async event => {
    i=0;
    console.log("safe");
    event.preventDefault();

    const genre = getOption();

    if(genre){
        try{
            const moviesofgenre = await getGenremovies(genre);storemovies(moviesofgenre);
            displaymovies(i);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else{
        displayError("Please select a Genre");
    }
});

async function getmovieData(title){

    
    const apiUrl = `http://www.omdbapi.com/?t=${title}&apikey=${apiKey}`;
    let response;
    try{ response= await fetch(apiUrl);}
    catch(error) {throw error;}

    console.log(response);

    if(!response.ok){
        throw new Error("Could not fetch Movie details");
    }

    return await response.json();
}

function displaymovieInfo(data){

  const {Title: title, 
           Year: year, 
           Plot: synopsis,
           Poster:imgsrc,
           Error:error
        } = data;
    console.log(error);
    if(error!="Movie not found!")
    {card.textContent = "";
    card.style.display = "flex";
   

    const movieDisplay = document.createElement("h1");
    const yearDisplay = document.createElement("p");
    const synopsisDisplay = document.createElement("p");
    const posterDisplay = document.createElement("img");

    movieDisplay.textContent = title;
    yearDisplay.textContent = `Release Year: ${year}`;
    synopsisDisplay.textContent = `Synopsis: ${synopsis}`;
    posterDisplay.setAttribute('src', imgsrc);
    posterDisplay.setAttribute('height', '500px');
    posterDisplay.setAttribute('width', '400px');

    movieDisplay.classList.add("movieDisplay");
    yearDisplay.classList.add("yearDisplay");
    synopsisDisplay.classList.add("synopsisDisplay");
    posterDisplay.classList.add("posterDisplay");

    card.appendChild(movieDisplay);
    card.appendChild(yearDisplay);
    card.appendChild(synopsisDisplay);
    card.appendChild(posterDisplay);}
   
    else displayError(error);

}

function displayError(message){

    alert(message);
}

function searchbytitle() {
        genresearch.style.display="none";
        moviesearch.style.display = "flex";
 
  }

  function searchbygenre() {
    // Get the checkbox
    moviesearch.style.display = "none";
    genresearch.style.display="flex";}

function getOption() {
            selectElement =
                document.querySelector('#select1');
            output =
                selectElement.options
                [selectElement.selectedIndex].value;
                console.log(output);
                return output;
        }

async function getGenremovies(genreid)
{
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2Y2FiNWYyNTA0Y2QwY2ZkYmE1MjBiNDBmN2U4ZGY3YSIsInN1YiI6IjY2NGU0NjU4ZWQyNmUzMmZmNzM0YTJhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Qto7z8Jhl9WgL88G5CglKmllcOjzNfw6DFeCnhzNdCE'
    }
  };
  let response;
  
  try{ response= await fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${genreid}`, options);}
    catch(error) {throw error;}

    console.log(response);

    if(!response.ok){
        throw new Error("Could not fetch this Genre");
    }

    return await response.json();
    
}

function storemovies(moviesofgenre){
    //const moviesarr= JSON.parse(moviesofgenre);
    const {results: genrearr}=moviesofgenre;
    moviesarr=genrearr;}

function nxt(){console.log("here");
        
        let n=moviesarr.length;i=(i+1)%n;
        displaymovies(i);
    
    }
function prev(){console.log("here");
        
        let n=moviesarr.length;if(i!=0)i=(i-1)%n; else i=n-1;
        displaymovies(i);
    
    }


function displaymovies(i){
    const {title: title, 
        release_date: date, 
        overview: synopsis,
        poster_path:imgsrc,
             Error:error
          } = moviesarr[i];
      console.log(error);
      if(error!="Movie not found!")
      {card2.textContent = "";
      card2.style.display = "flex";
     let splitdt = date.split('-');
  
      const movieDisplay = document.createElement("h1");
      const yearDisplay = document.createElement("p");
      const synopsisDisplay = document.createElement("p");
      const posterDisplay = document.createElement("img");
      const nxtbtn=document.createElement("button");
      const prevbtn=document.createElement("button");
      const liner=document.createElement("div");
  
      movieDisplay.textContent = title;
      yearDisplay.textContent = `Release Year: ${splitdt[0]}`;
      synopsisDisplay.textContent = `Synopsis: ${synopsis}`;
      posterDisplay.setAttribute('src', `https://image.tmdb.org/t/p/original/${imgsrc}`);
      posterDisplay.setAttribute('height', '500px');
      posterDisplay.setAttribute('width', '400px');
      liner.setAttribute('class', 'liner');
      nxtbtn.setAttribute('type', 'submit');nxtbtn.setAttribute('id', 'nxtbtn');nxtbtn.setAttribute('onclick', "nxt()");nxtbtn.textContent="Next";
      nxtbtn.style.display="inline";
      prevbtn.setAttribute('type', 'submit');prevbtn.setAttribute('id', 'prevbtn');prevbtn.setAttribute('onclick', "prev()");prevbtn.textContent="Prev";
      prevbtn.style.display="inline";
      movieDisplay.classList.add("movieDisplay");
      yearDisplay.classList.add("yearDisplay");
      synopsisDisplay.classList.add("synopsisDisplay");
      posterDisplay.classList.add("posterDisplay");
  
      card2.appendChild(movieDisplay);
      card2.appendChild(yearDisplay);
      card2.appendChild(synopsisDisplay);
      card2.appendChild(posterDisplay);
      liner.appendChild(prevbtn);liner.appendChild(nxtbtn);
      card2.append(liner);
      

      //let nxt=document.getElementById("nxtbtn");
      
    }
     
      else displayError(error);
  
  }

  
