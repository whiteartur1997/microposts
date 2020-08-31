class UI {
  constructor() {
    this.posts = document.querySelector("#posts");
    this.titleInput = document.querySelector("#title");
    this.bodyInput = document.querySelector("#body");
    this.idInput = document.querySelector("#id");
    this.postSubmit = document.querySelector(".post-submit");
    this.forState = 'add';
  }

  showPosts(posts) {
    let html = '';
    posts.forEach(post => {
      html += `
        <div class="card mb-3">
          <div class="card-body">
            <h4 class="card-title">${post.title}</h4>
            <p class="card-text">${post.body}</p>
            <a href="#" class="edit card-link" data-id="${post.id}">
              <i class="fa fa-pencil"></i>
            </a>
            <a href="#" class="delete card-link" data-id="${post.id}">
              <i class="fa fa-remove"></i>
            </a>
          </div>
        </div>
      `;
    });
    this.posts.innerHTML = html;
  }

  showAlert(message, className) {
    const div = document.createElement('div');
    div.className = className;
    div.appendChild(document.createTextNode(message));
    document.querySelector('.postsContainer').prepend(div);

    setTimeout(() => {
      this.clearAlert();
    }, 3000)
  }

  clearAlert() {
    const currentAlert = document.querySelector('.alert');
    if(currentAlert) {
      currentAlert.remove();
    }
  }

  clearFields() {
    this.titleInput.value = "";
    this.bodyInput.value = "";
  }

  fillForm(data) {
    this.idInput.value = data.id;
    this.titleInput.value = data.title;
    this.bodyInput.value = data.body;

    this.changeFormState('edit');
  }

  // Clear ID hidden
  clearIdInput() {
    this.idInput.value = '';
  }

  changeFormState(type) {
    if(type === 'edit') {
      this.postSubmit.textContent = "Edit post";
      this.postSubmit.className = 'post-submit btn btn-warning btn-block';

      // Create cancel button
      const button = document.createElement('button');
      button.className = 'post-cancel btn btn-block btn-light';
      button.appendChild(document.createTextNode('Cancel edit'));
      const cardForm = document.querySelector('.card-form');
      cardForm.appendChild(button);
    } else {
      this.postSubmit.textContent = "Post it";
      this.postSubmit.className = 'post-submit btn btn-primary btn-block';
      if(document.querySelector('.post-cancel').classList.contains('post-cancel')) {
        document.querySelector('.post-cancel').remove();
      }
      this.clearIdInput();
      this.clearFields();
    }
  }
}

export const ui = new UI();