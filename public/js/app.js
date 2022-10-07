const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageone = document.querySelector('#msg-1')
const messagetwo = document.querySelector('#msg-2')

// messageone.textContent = 'hello'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    messageone.textContent = 'loading...'
    messagetwo.textContent = ''

    
fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {

        if (data.error){
            messageone.textContent = data.error
        }else{
            messageone.textContent = data.location
            messagetwo.textContent = data.forecast
        }
    })

})
})