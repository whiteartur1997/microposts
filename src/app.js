import { http } from './http';
import { ui } from './ui';

// Get Posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);
// Add post listener
document.querySelector('.post-submit').addEventListener
  ('click', submitPost);
// Delete post
ui.posts.addEventListener('click', deletePost);
// Listener for edit state
ui.posts.addEventListener('click', enableEdit);
// Listen for cancel
document.querySelector('.card-form').addEventListener
  ('click', cancelEdit);

function getPosts() {
  http.get('http://localhost:3000/posts')
  .then(response => {
    ui.showPosts(response);
  })
  .catch(err => console.log(err));
}

function submitPost() {
  const title = ui.titleInput.value;
  const body = ui.bodyInput.value;
  const id = ui.idInput.value;  
  if(title === "" || body === "") {
    ui.showAlert("Please fill in inputs to make post", "alert alert-danger");
    return;
  } else {
    const data = {
      title,
      body,
    }
    // Check if the ID is presented in input
    if(id === '') {
      // Create Post
      http.post('http://localhost:3000/posts', data)
        .then(data => {
          ui.showAlert('Post added', 'alert alert-success');
          ui.clearFields();
          getPosts();
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      // Update post
      http.put(`http://localhost:3000/posts/${id}`, data)
        .then(data => {
          ui.showAlert("Post updated", 'alert alert-success');
          ui.changeFormState("regular");
          getPosts();
        })
    }
  }  
}

function deletePost(e) {
  e.preventDefault();
  if(e.target.parentElement.classList.contains('delete')) {
    http.delete(`http://localhost:3000/posts/${e.target.parentElement.getAttribute("data-id")}`)
      .then(data => {
        ui.showAlert('Post deleted', 'alert alert-danger');
        getPosts();
      })
      .catch(err => console.log(err))
  }
}

// Edit state
function enableEdit(e) {
  e.preventDefault();
  if(e.target.parentElement.classList.contains("edit")) {
    const id = e.target.parentElement.dataset.id;
    const body = 
      e.target.parentElement.previousElementSibling.textContent;
    const title =   
      e.target.parentElement.previousElementSibling.
      previousElementSibling.textContent;
    const data = {
      id,
      body,
      title
    };
    
    ui.fillForm(data);
  }
}

function cancelEdit(e) {
  e.preventDefault();
  if(e.target.classList.contains("post-cancel")) {
    ui.changeFormState("regular");
  }
}