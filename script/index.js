document.getElementById('login-btn').addEventListener('click', ()=>{
    console.log("hello");
    const inputUsername = document.getElementById('input-username');
    const inputPassword = document.getElementById('input-password');

    const username = inputUsername.value;
    const password = inputPassword.value;

    if(username === 'admin' && password === 'admin123'){
        window.location.assign("./home.html");
    }else{
        alert('wrong credentials');
        inputUsername.value = '';
        inputPassword.value = '';
    }
})