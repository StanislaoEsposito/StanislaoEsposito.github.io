document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const articleId = params.get('article');
    if (articleId) {
        loadArticleContent(articleId);
    } else {
        loadArticlesOverview();
    }
});

function loadArticlesOverview() {
    fetch('data/articles.json')
        .then(response => response.json())
        .then(data => {
            const articlesContainer = document.getElementById('articles');
            articlesContainer.innerHTML = ''; // Pulisce l'elemento prima di aggiungere nuovi articoli

            Object.keys(data).forEach(articleId => {
                const article = data[articleId];
                const articleCard = document.createElement('div');
                articleCard.className = 'card';
                articleCard.innerHTML = `
                    <img src="${article.image}" alt="${article.title}" class="article-img">
                    <h2>${article.title}</h2>
                    <p>${article.excerpt}</p>
                `;
                articleCard.addEventListener('click', () => {
                    window.location.href = `article.html?article=${articleId}`;
                });
                articlesContainer.appendChild(articleCard);
            });
        })
        .catch(error => {
            console.error('Errore nel caricamento degli articoli:', error);
            showError();
        });
}

function loadArticleContent(articleId) {
    fetch('data/articles.json')
        .then(response => response.json())
        .then(data => {
            const article = data[articleId];
            if (article) {
                document.getElementById('article-content').innerHTML = `
                    <img src="${article.image}" alt="${article.title}" class="article-img">
                    <h2>${article.title}</h2>
                    <p>${article.content}</p>
                `;
            } else {
                showError();
            }
        })
        .catch(showError);
}

function showError() {
    document.getElementById('article-content').innerHTML = `
        <h2>Articolo non trovato</h2>
        <p>Non è stato possibile trovare l'articolo richiesto.</p>
    `;
}

function toggleMenu() {
    const sideMenu = document.getElementById('sideMenu');
    if (sideMenu.style.width === '250px') {
        sideMenu.style.width = '0';
    } else {
        sideMenu.style.width = '250px';
    }
}