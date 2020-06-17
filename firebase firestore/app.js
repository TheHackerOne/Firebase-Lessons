const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');

function renderCafe(doc) {
    let li = document.createElement('li')
    let name = document.createElement('span')
    let city = document.createElement('span')
    let cross = document.createElement('div');

    li.setAttribute('data-id',doc.id);
    name.textContent = doc.data().name;
    city.textContent = doc.data().city;
    cross.textContent = 'X';

    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(cross);

    cafeList.appendChild(li);

    //deleting data
    cross.addEventListener('click',(e)=>{
        let id = e.target.parentElement.getAttribute('data-id');

        //deleting data
        db.collection('cafes').doc(id).delete();
    })
}


//updating data

db.collection('cafes').doc('kskHfJYfnsjcCD').update({
    name: 'raj kumari'
})
//other data elements stay intact
//use .set instead of .update to overwrite completely

//getting data

db.collection('cafes').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if(change.type == 'added'){
            renderCafe(change.doc);
        }else if (change.type == 'removed'){
            let li = cafeList.querySelector('[data-id=' + change.doc.id + ']');
            cafeList.removeChild(li);
        }
    })
})

// order the data

// db.collection('cafes').orderBy('name').where('city','==','delhi').get().then(snapshot => {
//     snapshot.docs.forEach(doc => {
//         renderCafe(doc)
//     });
// })
// .catch(err => console.log(err))

//saving data 
form.addEventListener('submit',(e) => {
    e.preventDefault();

    db.collection('cafes').add({
        name: form.name.value,
        city: form.city.value
    });

    form.name.value = '';
    form.city.value = '';
})