function onLoaded (){
    const container = document.querySelector(".container")

    const currentLocation = window.location.pathname;
    const id = currentLocation.slice(4)

    const todos = JSON.parse(localStorage.getItem('todos')) //или запрос на сервер
    const todoDetail = todos.find(el=>el.id===+id)
    if(todoDetail){
        container.innerHTML=template(todoDetail)
    }
 
    function template(el){
    return `
    <div class="detail__item"  >
        <span class="detail__item_text">Id: ${el.id}</span>
        <span class="detail__item_text">User Id: ${el.userId}</span>
        <span class="detail__item_text">Title: ${el.title}</span>
        <img class="detail__item_svg" src='./assets/svg/${el.completed?'ok':'cancel'}.svg' ></img>
    </div>
    `}
}


onLoaded()