let form = document.querySelector('form');
form.addEventListener('submit', (event) => {
  event.preventDefault();

  let email = form.elements['email'].value;
  let password = form.elements['password'].value;

  let user = JSON.stringify({
    email: email,
    password: password
  });

  let postLogin = new XMLHttpRequest();
  postLogin.open('post', 'https://reqres.in/api/login');
  postLogin.setRequestHeader('content-type', 'application/json');   
  postLogin.onload = () => {
    let response = JSON.parse(postLogin.responseText);

    if(response.error != null) {
        alert('Login Failed');
    }
    else {
        window.location.href = 'Usertable/index.html'
    }
}
postLogin.send(user);
});
