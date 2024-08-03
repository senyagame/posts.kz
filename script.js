const API_URL = 'https://jsonplaceholder.typicode.com';

const createPostBtn = document.getElementById('create-post-btn');
const postsContainer = document.getElementById('posts-container');
const loader = document.getElementById('loader');
const errorAlert = document.getElementById('error-alert');

let posts = [];

// Функция для отображения
async function displayPosts() {
    try {
        const html = posts.map(post => `
            <div class="card">
                <div class="card-body">
                    <hr>
                    <h5 class="card-title">Тема: ${post.title}</h5>
                    <p class="card-text">Содержание:</p>
                    <p class="card-text">${post.body}</p>
                    <hr>
                    <p class="card-text">Ответить на пост невозможно.</p>
                    <button class="btn btn-danger" onclick="deletePost(${post.id})">Удалить пост безвозвратно</button>
                    <button class="btn btn-secondary" onclick="updatePost(${post.id})">Обновить пост</button>
                </div>
            </div>
        `).join('');
        postsContainer.innerHTML = html;
    } catch (error) {
        errorAlert.style.display = 'block';
        errorAlert.textContent = 'Ошибка при отображении постов!';
    } finally {
        loader.style.display = 'none';
    }
}

// Функция создать
async function createPost() {
    try {
        const title = prompt('Введите заголовок вашего поста:');
        const body = prompt('Введите содержание вашего поста:');
        const response = await fetch(`${API_URL}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, body })
        });
        const newPost = await response.json();
        newPost.id = Math.floor(Math.random() * 1000);
        posts.push(newPost);
        displayPosts();
    } catch (error) {
        errorAlert.style.display = 'block';
        errorAlert.textContent = 'Ошибка при создании поста!';
    }
}

// Функция delete
async function deletePost(id) {
    try {
        posts = posts.filter(post => post.id !== id);
        displayPosts();
    } catch (error) {
        errorAlert.style.display = 'block';
        errorAlert.textContent = 'Ошибка при удалении поста!';
    }
}

// Функция обновлений
async function updatePost(id) {
    try {
        const title = prompt('Введите новый заголовок поста:');
        const body = prompt('Введите новый текст поста:');
        const updatedPost = posts.find(post => post.id === id);
        updatedPost.title = title;
        updatedPost.body = body;
        displayPosts();
    } catch (error) {
        errorAlert.style.display = 'block';
        errorAlert.textContent = 'Ошибка при обновлении поста!';
    }
}

createPostBtn.addEventListener('click', createPost);