"use stict";

//DOM OBJECTS


const button = document.getElementById("run");


button.addEventListener("click", function () {

    const mainScreen = document.querySelector(".main-screen");
    const pokeName = document.querySelector(".poke-name");
    const pokeId = document.querySelector(".poke-id");
    const pokeImg = document.querySelector(".poke-image");
    const pokeMoveOne = document.querySelector(".poke-move-one");
    const pokeMoveTwo = document.querySelector(".poke-move-two");
    const pokeMoveThree = document.querySelector(".poke-move-three");
    const pokeMoveFour = document.querySelector(".poke-move-four");
    let input = document.getElementById("user-input").value;
    let evoImgs = document.getElementById("evolution-img");

    fetch("https://pokeapi.co/api/v2/pokemon/" + input + "/")
        .then(res => res.json())
        .then(data => {
            console.log(data)

            pokeImg.src = data["sprites"]["front_default"];

            // mainScreen.classList.remove("hide");
            pokeName.textContent = data.name;
            console.log(data.name);
            pokeId.textContent = data["id"];


            const dataMoves = data["moves"];
            const dataFirstMove = dataMoves[0];
            const dataSecondMove = dataMoves[1];
            const dataThirdMove = dataMoves[2];
            const dataForthMove = dataMoves[3];

            // pokeMoveTwo.textContent = dataMoves[1]["move"]["name"];
            // pokeMoveThree.textContent = dataMoves[2]["move"]["name"];
            // pokeMoveFour.textContent = dataMoves[3]["move"]["name"];
            if(dataFirstMove == false && dataSecondMove == false && dataSecondMove == false && dataThirdMove == false){
                
                pokeMoveOne.classList.remove("hide");
                pokeMoveOne.innerHTML = "";
            }

            if (dataFirstMove) {
                pokeMoveOne.classList.remove("hide");
                pokeMoveOne.textContent = dataFirstMove["move"]["name"];
            } else {
                pokeMoveOne.classList.add("hide");
                pokeMoveOne.textContent = "";
            }

            if (dataSecondMove) {
                pokeMoveTwo.classList.remove("hide");
                pokeMoveTwo.textContent = dataSecondMove["move"]["name"];
            } else {
                pokeMoveTwo.classList.add("hide");
                pokeMoveTwo.textContent = "";
            }

            if (dataThirdMove) {
                pokeMoveThree.classList.remove("hide");
                pokeMoveThree.textContent = dataThirdMove["move"]["name"];
            } else {
                pokeMoveThree.classList.add("hide");
                pokeMoveThree.textContent = "";
            }

            if (dataForthMove) {
                pokeMoveFour.classList.remove("hide");
                pokeMoveFour.textContent = dataForthMove["move"]["name"];
            } else {
                pokeMoveFour.classList.add("hide");
                pokeMoveFour.textContent = "";
            }
            console.log(data);
        });

        async function evoluctionChain(){
            let evolutionChainAPI = await fetch ("https://pokeapi.co/api/v2/pokemon-species/" + input);
            const data = await evolutionChainAPI.json();

            const getDataFromChain = data.evolution_chain.url;
            pokemonEvolution(getDataFromChain);
        }
        evoluctionChain();

        async function pokemonEvolution(url){
            let pokemonEvolutionAPI = await fetch(url);
            const data = await pokemonEvolutionAPI.json();

                let add = [];
                let evolveTo= data.chain.evolves_to;

                if(data.chain){
                    add.push(data.chain.species.name);
                    console.log(data);
                }

                for(let i=0; i<evolveTo.length; i++){
                    if(evolveTo[i].evolve_to){
                        for(let x=0; x<evolveTo[i].evolve_to.length; x++){
                            add.push(evolveTo[i].evolve_to[x].species.name);
                        }
                    }
                }
                
                for(let y =0; y < add.length; y++){
                    let evoImgAPI = await fetch("https://pokeapi.co/api/v2/pokemon/" + add[y]);
                    let data = await evoImgAPI.json();

                    // evoImgs.src= data["sprites"]["front_default"];
                    evoImgs.innerHTML += "<img src=" + data.sprites['front_default'] + ">";

                }

        }

})