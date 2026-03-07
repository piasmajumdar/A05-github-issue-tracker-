document.getElementById('login-btn').addEventListener('click', ()=>{
    console.log("hello");
    const username = document.getElementById('input-username').value;
    const password = document.getElementById('input-password').value;

    if(username === 'admin' && password === 'admin123'){
        window.location.assign("./home.html");
    }else{
        alert('wrong credentials')
    }
})