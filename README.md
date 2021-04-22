# verschillende syntaxes Promises
async/await en .then
##async/await:
```javascript
async function onSubmit(event) {
    event.preventDefault()
    const [email, password] = event.target

    const response = await app.auth().signIn(email.value)
    setUser(response)
}
```
##.then:
```javascript
function onSubmit(e){
    app.auth().signIn(email.value)
        .then( response => setUser(response))
}
```
##arrow
```javascript
 const onSubmit = async event => {
    event.preventDefault()
    const [email, password] = event.target
    
    const response = await app.auth().signIn(email.value)
    setUser(response)
}
```