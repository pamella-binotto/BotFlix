const moodTextArea = document.getElementById("mood-textarea");
const searchButton = document.getElementById("search-button");

document.addEventListener("DOMContentLoaded", () => {
	setupEventListeners();
});

function setupEventListeners() {
	moodTextArea.addEventListener("keypress", event => {
		if (event.key === "Enter" && !event.shiftKey) {
			event.preventDefault();
			handleSearch();
		}
	});

	searchButton.addEventListener("click", handleSearch);
}

async function handleSearch() {
	const mood = moodTextArea.value.trim();

	if (!mood) {
		alert("Preencha o campo de humor!");
		return;
	}

	try {
		const response = await fetch("https://pamellabinotto.app.n8n.cloud/webhook/botflix", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ userPrompt: mood }),
		});

		console.log("Status da resposta:", response.status, response.statusText);

		if (!response.ok) {
			const text = await response.text().catch(() => "");
			console.error("Erro na resposta do servidor:", response.status, response.statusText, text);
			alert("Erro ao se comunicar com o servidor. Tente novamente mais tarde.");
			return;
		}

		const data = await response.json();

		if (data && Array.isArray(data.results) && data.results.length > 0) {
			const movie = data.results[0];
			const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

			const resultsDiv = document.getElementById("results");
			const moviesGrid = document.getElementById("movies-grid");

			resultsDiv.classList.add("show");

			moviesGrid.innerHTML = `<div class="movie-card">
                <div class="movie-poster">
                    <img src="${posterUrl}" alt="${movie.title}" />
                </div>
                <div class="movie-info">
                    <div class="movie-title">${movie.title}</div>
                    <div class="movie-overview">${movie.overview || "Sem descrição."}</div>
                    <div class="movie-rating">⭐ ${movie.vote_average?.toFixed() || "N/A"} / 10</div>
                </div>
            </div>`;
		} else {
			alert("Nenhum resultado encontrado para o humor informado.");
		}
	} catch (error) {
		console.error("Erro ao realizar a requisição:", error);
		alert("Erro ao se comunicar com o servidor. Verifique sua conexão e tente novamente.");
	}
}
