import "./style.css";
import { animate } from "motion";

let controller;

const cardContainer = document.querySelector(".card");
const form = document.querySelector("#searchForm");
const keyword = document.querySelector("#keyword");
const errorEl = document.querySelector(".error");
const loader = document.querySelector(".loader");
const spinner = document.querySelector(".spinner");

let allPokemonList = [];

animate(spinner, { rotate: [0, 360] }, { duration: 1, repeat: Infinity, ease: "linear" });

const formNameMap = {
    "baile": "めらめらスタイル",
    "pom-pom": "ぱちぱちスタイル",
    "pau": "ふらふらスタイル",
    "sensu": "まいまいスタイル",
    "alola": "アローラのすがた",
    "galar": "ガラルのすがた",
    "hisui": "ヒスイのすがた",
    "paldea": "パルデアのすがた",
    "mega": "メガシンカ",
    "gmax": "キョダイマックス",
};

const typeNameMap = {
    normal: "ノーマル",
    fire: "ほのお",
    water: "みず",
    electric: "でんき",
    grass: "くさ",
    ice: "こおり",
    fighting: "かくとう",
    poison: "どく",
    ground: "じめん",
    flying: "ひこう",
    psychic: "エスパー",
    bug: "むし",
    rock: "いわ",
    ghost: "ゴースト",
    dragon: "ドラゴン",
    dark: "あく",
    steel: "はがね",
    fairy: "フェアリー"
};

const initApp = async () => {
    try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1500");
        if (!res.ok) throw new Error("初期データの取得に失敗しました");
        const data = await res.json();

        allPokemonList = data.results.map(p => {
            const baseName = p.name.split("-")[0];
            return {
                enName: p.name,
                baseEnName: baseName,
                jaName: "",
                url: p.url
            };
        });

        fetch("https://pokeapi.co/api/v2/pokemon-species?limit=1025")
            .then(res => res.json())
            .then(data => {
                data.results.forEach((species, index) => {
                    const id = index + 1;
                    // 日本語の名前を探す
                    fetch(species.url)
                        .then(res => res.json())
                        .then(speciesData => {
                            const jaNameObj = speciesData.names.find(n => n.language.name === "ja");
                            const jaName = jaNameObj ? jaNameObj.name : "";

                            // 該当する英語名を持つ要素に日本語名をマッピング
                            allPokemonList.forEach(p => {
                                if (p.baseEnName === species.name) {
                                    p.jaName = jaName;
                                }
                            });
                        });
                });
            });

    } catch (err) {
        console.error("初期化エラー:", err);
        errorEl.textContent = "データの初期化に失敗しました。リロードしてください。";
        errorEl.hidden = false;
    }
};

const createPokemonCard = async (pokemonObj, signal) => {
    const res = await fetch(pokemonObj.url, { signal });
    if (!res.ok) return null;
    const data = await res.json();

    let displayName = pokemonObj.jaName || data.name;

    const nameParts = data.name.split("-");
    if (nameParts.length > 1) {
        const formParts = nameParts.slice(1);
        const formEnName = formParts.join("-");


        const formJaName = formNameMap[formEnName] || formEnName;
        displayName = `${pokemonObj.jaName || nameParts[0]} (${formJaName})`;
    }


    const typesHtml = data.types.map(t => {
        const typeName = t.type.name;
        const jaTypeName = typeNameMap[typeName] || typeName;

        return `
        <span class="pokemon-type type-${typeName}">
            ${jaTypeName}
        </span>
    `;
    }).join("");

    return `
        <div class="pokemon-item">
            <h2>${displayName}</h2>
            <img src="${data.sprites.front_default || ''}" alt="${data.name}">
            <div class="type-container">
                ${typesHtml}
            </div>
        </div>
    `;
};

const searchPokemon = async (inputWord) => {
    if (controller) controller.abort();
    controller = new AbortController();

    errorEl.hidden = true;
    cardContainer.innerHTML = "";
    cardContainer.hidden = true;
    loader.hidden = false;

    const matchedPokemons = allPokemonList.filter(pokemon => {
        const matchJa = pokemon.jaName && pokemon.jaName.includes(inputWord);
        const matchEn = pokemon.enName.includes(inputWord);
        return matchJa || matchEn;
    });

    if (matchedPokemons.length === 0) {
        loader.hidden = true;
        errorEl.textContent = "見つかりませんでした";
        errorEl.hidden = false;
        return;
    }

    try {
        const targets = matchedPokemons;
        if (matchedPokemons.length > 100) {
            errorEl.textContent =
                `検索結果が${matchedPokemons.length}件あります。もう少し絞り込んでください`;
            errorEl.hidden = false;
            loader.hidden = true;
            return;
        }
        const cardPromises = targets.map(pokemon => createPokemonCard(pokemon, controller.signal));
        const cardsHtmlArray = await Promise.all(cardPromises);

        cardContainer.innerHTML = cardsHtmlArray.filter(Boolean).join("");
        cardContainer.style.display = "flex";
        cardContainer.style.flexWrap = "wrap";
        cardContainer.hidden = false;

    } catch (err) {
        if (err.name === "AbortError") return;
        console.error(err);
        errorEl.textContent = "エラーが発生しました";
        errorEl.hidden = false;
    } finally {
        loader.hidden = true;
    }
};

// イベントリスナーの設定
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchName = keyword.value.trim().toLowerCase();
    if (searchName) {
        searchPokemon(searchName);
    }
});

// アプリの起動
initApp();